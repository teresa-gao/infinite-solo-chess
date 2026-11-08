import { useState } from 'react'
import Board from './components/Board.tsx'
import './App.css'

export default function App() {
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState<number>(Number(localStorage.getItem('highScore')) || level);

  function onSolve() {
    const newLevel = level + 1;
    setLevel(newLevel);
    if (newLevel > highScore) {
      setHighScore(newLevel);
      localStorage.setItem('highScore', String(newLevel));
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-6">
      <a href="https://github.com/teresa-gao/infinite-solo-chess" id="header" className="font-mono text-black dark:text-white text-center w-fit rounded-lg text-2xl">Infinite Solo Chess</a>
      <div className="flex">
        <div id="leftIconContainer" className="flex flex-col gap-y-4 h-full justify-between pt-2 pb-2 mr-3">
          <i className="fa fa-refresh text-black dark:text-white" aria-hidden="true"></i>
        </div>
        <div id="boardContainer" className="flex flex-col items-center gap-y-6">
          <Board level={level} onSolve={onSolve} />
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
