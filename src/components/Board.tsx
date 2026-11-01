import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

import Square from './Square.tsx'
import { getPieces, RenderPiece } from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function getStartPositions(pieces: PieceData[]) {
  const startPositions = [];
  for (let i = 0; i < pieces.length; i++) {
    const fileIndex = Math.floor(Math.random() * FILES.length);
    const rankIndex = Math.floor(Math.random() * RANKS.length);
    startPositions.push(`${FILES[fileIndex]}${RANKS[rankIndex]}`);
  }
  return startPositions;
}

interface RowProps {
  rank: number;
  squares: (string | number | null)[];
  pieces: PieceData[];
}

function Row({ rank, squares, pieces }: RowProps) {
  return (
    <div className="row">
      {FILES.map((file, index) => {
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
  const pieces = getPieces({
    numBishops: 3,
    numKings: 1,
    numKnights: 3,
    numPawns: 3,
    numQueens: 3,
    numRooks: 3,
  });
  const [squares, setSquares] = useState<(string | number | null)[]>(getStartPositions(pieces));

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const newSquare = event.operation.target?.id;
        const pieceId = event.operation.source?.id;
        if (!newSquare || !pieceId) return;

        const newSquares = [...squares];
        const squareIndex = squares.indexOf(newSquare);
        if (squareIndex >= 0) {
          newSquares[squareIndex] = null;
        }
        newSquares[pieces.findIndex((p) => p.id === pieceId)] = newSquare;
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
