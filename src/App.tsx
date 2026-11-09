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
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(() => getBoardLayout(level));
  const [isHelpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);
  const [isAboutDialogOpen, setAboutDialogOpen] = useState<boolean>(false);

  const resetGame = () => {
    const newLevel = 1;
    setLevel(newLevel);
    setSublevel(0);
    setBoardLayout(getBoardLayout(newLevel));
  }

  const levelUp = () => {
    const newSublevel = (sublevel + 1) % NUM_SUBLEVELS_PER_LEVEL;
    const newLevel = newSublevel > 0 ? level : level + 1;
    setLevel(newLevel);
    if (newLevel > highScore) {
      setHighScore(newLevel);
      localStorage.setItem('highScore', String(newLevel));
    }
    setBoardLayout(getBoardLayout(newLevel));
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
    <div className="flex flex-col items-center gap-y-6">
      <h1 id="header" className="font-mono text-zinc-950 dark:text-neutral-200 text-center text-2xl">Infinite Solo Chess</h1>

      <div id="gameContainer" className="grid grid-cols-[1fr_max-content_1fr]">
        <div id="leftIconContainer" className="flex flex-col gap-y-4 h-full justify-between py-2 mr-3">
          <button id="resetButton" title="Reset" onClick={resetGame}><i className="fa fa-refresh text-zinc-950 dark:text-neutral-200 cursor-pointer hover:text-white dark:hover:text-black" aria-hidden="true"></i></button>
        </div>

        <div id="boardContainer" className="flex flex-col items-center">
          <Board boardLayout={boardLayout} onPieceMove={handlePieceMove} />
        </div>

        <div id="rightIconContainer" className="flex flex-col gap-y-4 h-full justify-between py-2 ml-2">
          <button id="helpButton" onClick={() => setHelpDialogOpen(true)}><i className="fa fa-question text-zinc-950 dark:text-neutral-200 cursor-pointer hover:text-white dark:hover:text-black" aria-hidden="true"></i></button>
          <Dialog title="Help" headerText="How to Play" isOpen={isHelpDialogOpen} onClose={() => {setHelpDialogOpen(false)}}>
            <div className="space-y-3">
              <p>Goal: Capture the pieces so that only one remains.</p>
              <ul className="list-decimal list-disc space-y-1 ml-6">
                <li>Each piece moves as in a standard chess game.</li>
                <li>Each piece can capture up to two other pieces, but no piece can capture a king.</li>
                <li>If you reset the game, you return to Level 1.</li>
              </ul>
            </div>
          </Dialog>

          <button id="infoButton" onClick={() => setAboutDialogOpen(true)}><i className="fa fa-info text-zinc-950 dark:text-neutral-200 cursor-pointer hover:text-white dark:hover:text-black" aria-hidden="true"></i></button>
          <Dialog title="About" headerText="About This Game" isOpen={isAboutDialogOpen} onClose={() => {setAboutDialogOpen(false)}}>
            <div className="space-y-3">
              <p>Infinite Solo Chess was created by Teresa Gao, a software engineer and a fan of the original (non-infinite) version of the game on <a href="https://www.chess.com/solo-chess" className="underline hover:decoration-3">Chess.com</a>.</p>
              <p>Please feel free to say hi on <a href="https://www.linkedin.com/in/teresa-gao/" className="underline hover:decoration-3">LinkedIn</a> or check out the source code on <a href="https://github.com/teresa-gao/infinite-solo-chess" className="underline hover:decoration-3">GitHub</a>!</p>
            </div>
          </Dialog>
        </div>

        <div id="levelContainer" className="w-full flex flex-col gap-y-1 col-start-2 mt-5">
          <div id="level" className="font-mono text-zinc-950 dark:text-neutral-200 text-lg">Level {level}: {Array.from({ length: NUM_SUBLEVELS_PER_LEVEL - 1 }).map((_, index) => (
              <span key={`${level}${sublevel}-${index}`}><i className={index < sublevel ? "fa-solid fa-circle" : "fa-regular fa-circle"}></i></span>
            ))}
          </div>
          <div id="highScore" className="font-mono text-zinc-950 dark:text-neutral-200 text-sm">High Score: {highScore}</div>
        </div>
      </div>
    </div>
  )
}
