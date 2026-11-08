import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'

import { RANKS } from '../utils/constants'
import Row from './Row.tsx'
import type { PieceData } from './Piece.tsx'

export default function Board({boardLayout, onPieceMove}: {boardLayout: Record<string, PieceData>, onPieceMove: (event: DragEndEvent) => void}) {
  return (
    <DragDropProvider onDragEnd={onPieceMove}>
      <div id="board" className="rounded overflow-hidden flex flex-col items-center h-fit shadow">
        {RANKS.map((_, rankIndex) => (
          <Row key={rankIndex} rankIndex={rankIndex} boardLayout={boardLayout}/>
        ))}
      </div>
    </DragDropProvider>
  )
}
