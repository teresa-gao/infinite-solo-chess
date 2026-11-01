import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

import Square from './Square.tsx'
import { getPieces, RenderPiece } from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

interface RowProps {
  rank: number;
  squares: (string | number)[];
  pieces: PieceData[];
}

function Row({ rank, squares, pieces }: RowProps) {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return (
    <div className="row">
      {files.map((file, index) => {
        const squareId = `${file}${rank}`;
        const pieceIndex = squares.indexOf(squareId);
        return (
          <Square
            key={squareId}
            id={squareId}
            isDark={index % 2 !== rank % 2}>
            {pieceIndex >= 0 ? (
              <RenderPiece
                abbreviation={pieces[pieceIndex].abbreviation}
                isWhite={pieces[pieceIndex].isWhite}
                dragId={pieces[pieceIndex].id}
              />
            ) : squareId}
          </Square>
        );
      })}
    </div>
  )
}

export default function Board() {
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const pieces = getPieces();
  const [squares, setSquares] = useState<(string | number)[]>(Array(pieces.length).fill(null));

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const newSquare = event.operation.target?.id;
        const pieceId = event.operation.source?.data?.id
        if (!newSquare || !pieceId) return;

        const newSquares = [...squares];
        const pieceIndex = pieces.findIndex((p) => p.id === pieceId);
        newSquares[pieceIndex] = newSquare;
        setSquares(newSquares);
      }}
    >
      {pieces.map((piece, index) => (
        <div key={piece.id} id={String(index)}>
          {squares[index] ? null : (
            <RenderPiece
              abbreviation={piece.abbreviation}
              isWhite={piece.isWhite}
              dragId={piece.id}
            />
          )}
        </div>
      ))}

      <div id="board">
        {ranks.map((rank) => (
          <Row key={rank} rank={rank} squares={squares} pieces={pieces} />
        ))}
      </div>
    </DragDropProvider>
  )
}
