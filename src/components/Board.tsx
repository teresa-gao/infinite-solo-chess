import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

import Row from './Row.tsx'
import { getPieces, getStartPositions, getValidNewSquares } from './Piece.tsx'
import type { PieceData } from './Piece.tsx'
import { RANKS } from '../constants.tsx'

export default function Board() {
  const [pieces] = useState<PieceData[]>(getPieces(22));
  const [squares, setSquares] = useState<string[]>(getStartPositions(pieces));

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const newSquare = String(event.operation.target?.id);
        const pieceId = event.operation.source?.id;
        if (newSquare === String(null) || !pieceId) return;

        const pieceIndex = pieces.findIndex((p) => p.id === pieceId);
        const validNewSquares = getValidNewSquares(pieces[pieceIndex].type, squares[pieceIndex] as string);
        if (!validNewSquares.has(newSquare)) return;

        const newSquares = [...squares];
        const squareIndex = squares.indexOf(newSquare);
        if (squareIndex >= 0) {
          newSquares[squareIndex] = '';
        }
        newSquares[pieceIndex] = newSquare;
        setSquares(newSquares);
      }}
    >

      <div id="board">
        {RANKS.map((rank) => (
          <Row key={`rank-${rank}`} rank={rank} squares={squares} pieces={pieces} />
        ))}
      </div>
    </DragDropProvider>
  )
}
