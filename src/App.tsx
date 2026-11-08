import { useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/react'

import { getBoardLayout, evaluateEndSquare } from './utils/helpers'
import Board from './components/Board.tsx'
import type { PieceData } from './components/Piece.tsx'
import HelpDialog from './components/HelpDialog.tsx'

import './App.css'

export default function App() {
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState<number>(Number(localStorage.getItem('highScore')) || level);
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(() => getBoardLayout(level));
  const [isHelpDialogOpen, setHelpDialogOpen] = useState<boolean>(false);

  const resetGame = () => {
    const newLevel = 1;
    setLevel(newLevel);
    setBoardLayout(getBoardLayout(newLevel));
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
    if (Object.keys(newBoardLayout).length > 1) {
      newBoardLayout[endSquare] = {id: piece.id + 'x', type: piece.type, numMoves: piece.numMoves + 1};
      setBoardLayout(newBoardLayout);
    } else {
      const newLevel = level + 1;
      setLevel(newLevel);
      setBoardLayout(getBoardLayout(newLevel));

      if (newLevel > highScore) {
        setHighScore(newLevel);
        localStorage.setItem('highScore', String(newLevel));
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-6">
      <a href="https://github.com/teresa-gao/infinite-solo-chess" id="header" className="font-mono text-zinc-950 dark:text-neutral-200 text-center w-fit rounded-lg text-2xl hover:text-white dark:hover:text-black"><h1>Infinite Solo Chess</h1></a>

      <div id="gameContainer" className="flex">
        <div id="leftIconContainer" className="flex flex-col gap-y-4 h-full justify-between pt-2 pb-2 mr-3">
          <button onClick={resetGame}><i className="fa fa-refresh text-zinc-950 dark:text-neutral-200 cursor-pointer hover:text-white dark:hover:text-black" aria-hidden="true"></i></button>
        </div>

        <div id="boardContainer" className="flex flex-col items-center gap-y-6">
          <Board boardLayout={boardLayout} onPieceMove={handlePieceMove} />
        </div>

        <div id="rightIconContainer" className="flex flex-col gap-y-4 h-full justify-between pt-2 pb-2 ml-2">
          <button onClick={() => setHelpDialogOpen(true)}><i id="helpButton" className="fa fa-question text-zinc-950 dark:text-neutral-200 cursor-pointer hover:text-white dark:hover:text-black" aria-hidden="true"></i></button>
          <HelpDialog isOpen={isHelpDialogOpen} onClose={() => {setHelpDialogOpen(false)}} />
          <i id="infoButton" className="fa fa-info text-zinc-950 dark:text-neutral-200" aria-hidden="true"></i>
        </div>
      </div>

      <div id="levelContainer" className="flex flex-col gap-y-1">
        <div className="font-mono text-zinc-950 dark:text-neutral-200 text-center text-lg">Level {level}</div>
        <div className="font-mono text-zinc-950 dark:text-neutral-200 text-center text-sm">High Score: {highScore}</div>
      </div>
    </div>
  )
}
