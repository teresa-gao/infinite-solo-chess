import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

import Square from './Square.tsx'
import { getPieces, getStartPositions, getValidNewSquares, RenderPiece } from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

import { RANKS, FILES } from '../constants.tsx'

interface RowProps {
  rank: number;
  squares: string[];
  pieces: PieceData[];
}

function Row({ rank, squares, pieces }: RowProps) {
  return (
    <div className="row">
      {FILES.map((file, index) => {
        const squareId = `${file}-${rank}`;
        const pieceIndex = squares.indexOf(squareId);
        return (
          <Square
            key={squareId}
            id={squareId}
            isDark={index % 2 !== rank % 2}>
            {pieceIndex >= 0 ? (
              <RenderPiece
                type={pieces[pieceIndex].type}
                isWhite={pieces[pieceIndex].isWhite}
                dragId={pieces[pieceIndex].id}
              />
            ) : ''}
          </Square>
        );
      })}
    </div>
  )
}

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
          <Row key={rank} rank={rank} squares={squares} pieces={pieces} />
        ))}
      </div>
    </DragDropProvider>
  )
}
