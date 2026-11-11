import { useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/react'

import { NUM_SUBLEVELS_PER_LEVEL } from './utils/constants'
import { getBoardLayout, evaluateEndSquare } from './utils/helpers'
import Board from './components/Board.tsx'
import type { PieceData } from './components/Piece.tsx'
import Dialog from './components/Dialog.tsx'

import './App.css'

export default function App() {
  const [level, setLevel] = useState<number>(1);
  const [sublevel, setSublevel] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(Number(localStorage.getItem('highScore')) || level);
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(() => getBoardLayout(level, sublevel));
  const [isInfoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);

  const resetGame = () => {
    setLevel(1);
    setSublevel(0);
    setBoardLayout(getBoardLayout(1, 0));
  }

  const levelUp = () => {
    const newSublevel = (sublevel + 1) % NUM_SUBLEVELS_PER_LEVEL;
    const newLevel = newSublevel > 0 ? level : level + 1;
    setLevel(newLevel);
    if (newLevel > highScore) {
      setHighScore(newLevel);
      localStorage.setItem('highScore', String(newLevel));
    }
    setBoardLayout(getBoardLayout(newLevel, newSublevel));
    setSublevel(newSublevel);
  }

  const handlePieceMove = (event: DragEndEvent) => {
    if (event.canceled) return;

    const endSquare = String(event.operation.target?.id);
    if (endSquare == String(undefined)) return;

    const pieceId = event.operation.source?.id;
    if (!pieceId) return;

    const startSquare = Object.keys(boardLayout).find(key => boardLayout[key].id === pieceId);
    if (!startSquare) return false;

    const piece = boardLayout[startSquare];

    const isValidEndSquare = evaluateEndSquare(piece, startSquare, endSquare, boardLayout);
    if (!isValidEndSquare) return;

    const { [startSquare]: _, ...newBoardLayout } = boardLayout;
    if (Object.keys(newBoardLayout).length === 1) {
      levelUp()
    } else {
      newBoardLayout[endSquare] = {id: piece.id + 'x', type: piece.type, numMoves: piece.numMoves + 1};
      setBoardLayout(newBoardLayout);
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-7 mx-4 my-10 font-mono text-zinc-950 dark:text-neutral-200">
      <header className="grid grid-cols-[1fr_auto_1fr] w-full">
        <div id="resetButtonContainer" className="flex flex-row">
          <button id="resetButton" onClick={resetGame}><i className="fa fa-refresh cursor-pointer hover:opacity-60" aria-hidden="true"></i></button>
        </div>

        <h1 className="text-xl font-bold">
          Infinite Solo Chess
        </h1>

        <div id="infoButtonContainer" className="flex flex-row-reverse">
          <button id="infoButton" onClick={() => setInfoDialogOpen(true)}><i className="fa fa-info-circle cursor-pointer hover:opacity-60 text-lg" aria-hidden="true"></i></button>
            <Dialog id="Info" headerText="About This Game" isOpen={isInfoDialogOpen} onClose={() => {setInfoDialogOpen(false)}}>
              <div className="space-y-4">
                <p>Infinite Solo Chess was created by Teresa Gao, a software engineer and a fan of the original (non-infinite) version of the game on <a href="https://www.chess.com/solo-chess" className="underline hover:opacity-60">Chess.com</a>.</p>
                <p>Please feel free to say hi on <a href="https://www.linkedin.com/in/teresa-gao/" className="underline hover:opacity-60">LinkedIn</a> or check out the source code on <a href="https://github.com/teresa-gao/infinite-solo-chess" className="underline hover:opacity-60">GitHub</a>!</p>
                <p>Piece design credits: <a href="https://commons.wikimedia.org/wiki/Category:PNG_chess_pieces/Standard_transparent" className="underline hover:opacity-60">Wikimedia Commons</a></p>
              </div>
            </Dialog>
          </div>
        </header>

        <main className="flex flex-col gap-6">
          <Board boardLayout={boardLayout} onPieceMove={handlePieceMove} />

          <div id="boardBottomContainer" className="w-full flex justify-between items-end">
            <p id="level">
              <span key={`${level}-${sublevel}`}><
                i className={`animate-blinking ${sublevel === 0 ? "fa-regular fa-circle" : (sublevel < NUM_SUBLEVELS_PER_LEVEL - 1 ? "fa-solid fa-circle-half-stroke" : "fa-solid fa-circle")}`}></i>
              </span> <span key={level} className="animate-blinking">Level {level}</span>
            </p>
            <div key={highScore} id="highScore" className="animate-blinking">High Score: {highScore}</div>
          </div>
        </main>

      <footer id="instructions" className="space-y-3">
        <hr className="h-px mt-3 mb-8 border-0 bg-zinc-950 dark:bg-neutral-200" />
        <h2 className="text-lg font-bold text-center">How to Play</h2>
        <div id="rules" className="space-y-3">
          <p>Goal: Capture the pieces so that only one remains.</p>
          <ul className="list-decimal list-disc space-y-2 ml-6">
            <li>Pieces can only move to capture other pieces.</li>
            <li>Each piece can capture up to two other pieces.</li>
            <li>No piece can capture a king.</li>
            <li>If you reset the game, you return to Level 1.</li>
          </ul>
          </div>
      </footer>
    </div>
  )
}
