import Board from './components/Board.tsx'

import './App.css'

function App() {
  return (
    <div id="app" className="flex flex-col items-center gap-y-6">
      <a href="https://github.com/teresa-gao/infinite-solo-chess" id="header" className="font-mono bg-white dark:bg-black text-black dark:text-white text-center w-fit p-2.5 rounded-lg text-2xl">Infinite Solo Chess</a>
      <Board />
    </div>
  )
}

export default App
