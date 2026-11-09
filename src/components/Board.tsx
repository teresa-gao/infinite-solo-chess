import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom';

import { RANKS } from '../utils/constants'
import Row from './Row.tsx'
import type { PieceData } from './Piece.tsx'

export default function Board({boardLayout, onPieceMove}: {boardLayout: Record<string, PieceData>, onPieceMove: (event: DragEndEvent) => void}) {
  return (
    <DragDropProvider
      onDragEnd={onPieceMove}
      sensors={(defaults) => [
        ...defaults.filter((sensor) => sensor !== PointerSensor),
        PointerSensor.configure({
          activationConstraints: [
            new PointerActivationConstraints.Delay({
              value: 100,
              tolerance: 10,
            }),
          ],
        }),
      ]}
    >
      <div id="board" className="rounded overflow-hidden flex flex-col items-center h-fit shadow">
        {RANKS.map((_, rankIndex) => (
          <Row key={rankIndex} rankIndex={rankIndex} boardLayout={boardLayout}/>
        ))}
      </div>
    </DragDropProvider>
  )
}
