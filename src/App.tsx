import { useState } from 'react'
import blackBishop from './assets/Chess_bdt60.png'
import whiteBishop from './assets/Chess_blt60.png'
import blackKing from './assets/Chess_kdt60.png'
import whiteKing from './assets/Chess_klt60.png'
import blackKnight from './assets/Chess_ndt60.png'
import whiteKnight from './assets/Chess_nlt60.png'
import blackPawn from './assets/Chess_pdt60.png'
import whitePawn from './assets/Chess_plt60.png'
import blackQueen from './assets/Chess_qdt60.png'
import whiteQueen from './assets/Chess_qlt60.png'
import blackRook from './assets/Chess_rdt60.png'
import whiteRook from './assets/Chess_rlt60.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={blackBishop} className="piece bishop" />
      <img src={whiteBishop} className="piece bishop" />
      <img src={blackKing} className="piece king" />
      <img src={whiteKing} className="piece king" />
      <img src={blackKnight} className="piece knight" />
      <img src={whiteKnight} className="piece knight" />
      <img src={blackPawn} className="piece pawn" />
      <img src={whitePawn} className="piece pawn" />
      <img src={blackQueen} className="piece queen" />
      <img src={whiteQueen} className="piece queen" />
      <img src={blackRook} className="piece rook" />
      <img src={whiteRook} className="piece rook" />
    </>
  )
}

export default App
