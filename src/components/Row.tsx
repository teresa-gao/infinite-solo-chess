import Square from './Square.tsx'
import Piece from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

import { FILES } from '../constants.tsx'

interface RowProps {
  rank: number;
  boardLayout: Record<string, PieceData>;
}

export default function Row({ rank, boardLayout }: RowProps) {
  return (
    <div className="row">
      {FILES.map((file, index) => {
        const squareId = `${file}-${rank}`;
        const piece = boardLayout[squareId];
        const squareContents = piece ? (
          <Piece
            key={piece.id}
            type={piece.type}
            isWhite={piece.isWhite}
            dragId={piece.id}
          />
        ) : null;

        return (
          <Square
            key={squareId}
            id={squareId}
            isDark={index % 2 !== rank % 2}>
            {squareContents}
          </Square>
        );
      })}
    </div>
  )
}
