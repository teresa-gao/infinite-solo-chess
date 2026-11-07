import Square from './Square.tsx'
import type { PieceData } from './Piece.tsx'

import { FILES } from '../utils/constants'
import { convertIndicesToSquare } from '../utils/helpers'

interface RowProps {
  rankIndex: number;
  boardLayout: Record<string, PieceData>;
}

export default function Row({ rankIndex, boardLayout }: RowProps) {
  return (
    <div className="inline-flex">
      {FILES.map((_, fileIndex) => {
        return (
          <Square
            id={convertIndicesToSquare(rankIndex, fileIndex)}
            key={fileIndex}
            isDark={fileIndex % 2 !== rankIndex % 2}
            boardLayout={boardLayout}>
          </Square>
        );
      })}
    </div>
  )
}
