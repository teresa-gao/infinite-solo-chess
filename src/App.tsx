import Bishop from './components/Bishop.tsx'
import King from './components/King.tsx'
import Knight from './components/Knight.tsx'
import Pawn from './components/Pawn.tsx'
import Queen from './components/Queen.tsx'
import Rook from './components/Rook.tsx'
import './App.css'

function App() {
  return (
    <>
      <Bishop isWhite={false} />
      <Bishop isWhite={true} />
      <King isWhite={false} />
      <King isWhite={true} />
      <Knight isWhite={false} />
      <Knight isWhite={true} />
      <Pawn isWhite={false} />
      <Pawn isWhite={true} />
      <Queen isWhite={false} />
      <Queen isWhite={true} />
      <Rook isWhite={false} />
      <Rook isWhite={true} />
    </>
  )
}

export default App
