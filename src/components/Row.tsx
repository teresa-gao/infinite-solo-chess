import Square from './Square.tsx'
import type { PieceData } from './Piece.tsx'

import { FILES } from '../constants.tsx'

interface RowProps {
  rank: number;
  boardLayout: Record<string, PieceData>;
}

export default function Row({ rank, boardLayout }: RowProps) {
  return (
    <div className="inline-flex">
      {FILES.map((file, index) => {
        const squareId = `${file}-${rank}`;
        const isDark = index % 2 !== rank % 2;
        const piece = boardLayout[squareId];
        return (
          <Square
            key={squareId}
            id={squareId}
            isDark={isDark}
            piece={piece}>
          </Square>
        );
      })}
    </div>
  )
}
