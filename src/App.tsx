import { useState } from 'react'
import type { DragEndEvent } from '@dnd-kit/react'

import { getBoardLayout, evaluateEndSquare } from './utils/helpers'
import Board from './components/Board.tsx'
import type { PieceData } from './components/Piece.tsx'

import './App.css'

export default function App() {
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState<number>(Number(localStorage.getItem('highScore')) || level);
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(() => getBoardLayout(level));

  const onPieceMove = (event: DragEndEvent) => {
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

  const resetGame = () => {
    const newLevel = 1;
    setLevel(newLevel);
    setBoardLayout(getBoardLayout(newLevel));
  }

  return (
    <div className="flex flex-col items-center gap-y-6">
      <a href="https://github.com/teresa-gao/infinite-solo-chess" id="header" className="font-mono text-black dark:text-white text-center w-fit rounded-lg text-2xl">Infinite Solo Chess</a>
      <div className="flex">
        <div id="leftIconContainer" className="flex flex-col gap-y-4 h-full justify-between pt-2 pb-2 mr-3">
          <button onClick={resetGame}><i className="fa fa-refresh text-black dark:text-white cursor-pointer" aria-hidden="true"></i></button>
        </div>
        <div id="boardContainer" className="flex flex-col items-center gap-y-6">
          <Board boardLayout={boardLayout} onPieceMove={onPieceMove} />
        </div>
        <div id="rightIconContainer" className="flex flex-col gap-y-4 h-full justify-between pt-2 pb-2 ml-2">
          <i className="fa fa-question text-black dark:text-white" aria-hidden="true"></i>
          <i className="fa fa-info text-black dark:text-white" aria-hidden="true"></i>
        </div>
      </div>
      <div id="levelContainer" className="flex flex-col gap-y-1">
        <div className="font-mono text-black dark:text-white text-center text-lg">Level {level}</div>
        <div className="font-mono text-black dark:text-white text-center text-sm">High Score: {highScore}</div>
      </div>
    </div>
  )
}
