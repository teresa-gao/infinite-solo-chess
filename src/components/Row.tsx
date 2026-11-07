import Square from './Square.tsx'
import type { PieceData } from './Piece.tsx'

import { FILES } from '../utils/constants'
import { convertIndicesToSquare } from '../utils/helpers'

export default function Row({rankIndex, boardLayout}: {rankIndex: number, boardLayout: Record<string, PieceData>}) {
  return (
    <div className="inline-flex">
      {FILES.map((_, fileIndex) => {
        const square = convertIndicesToSquare(rankIndex, fileIndex);
        const pieceData = boardLayout[square];
        return (
          <Square
            id={square}
            key={fileIndex}
            isDark={fileIndex % 2 !== rankIndex % 2}
            pieceData={pieceData}>
          </Square>
        );
      })}
    </div>
  )
}
