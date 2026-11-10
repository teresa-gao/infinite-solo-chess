import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react'
import { PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom';

import { RANKS, FILES } from '../utils/constants'
import { convertIndicesToSquare } from '../utils/helpers'
import Square from './Square.tsx'
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
              value: 0,
              tolerance: 0,
            }),
          ],
        }),
      ]}
    >
      <div id="board" className="grid grid-cols-8 rounded overflow-hidden shadow touch-none">
        {RANKS.map((_, rankIndex) => (
          FILES.map((_, fileIndex) => {
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
        })))}
      </div>
    </DragDropProvider>
  )
}
