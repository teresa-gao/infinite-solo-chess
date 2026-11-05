import Square from './Square.tsx'
import Piece from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

import { FILES } from '../constants.tsx'

interface RowProps {
  rank: number;
  squares: string[];
  pieces: PieceData[];
}

export default function Row({ rank, squares, pieces }: RowProps) {
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
              <Piece
                key={pieces[pieceIndex].id}
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
