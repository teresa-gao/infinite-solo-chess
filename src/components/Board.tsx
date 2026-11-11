import { DragDropProvider, type DragStartEvent, type DragEndEvent } from '@dnd-kit/react'
import { PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom';

import { RANKS, FILES } from '../utils/constants'
import { convertIndicesToSquare } from '../utils/helpers'
import Square from './Square.tsx'
import type { PieceData } from './Piece.tsx'

export default function Board({boardLayout, capturableSquares, inBetweenSquares, onDragStart, onDragEnd, isBoardFrozen}: {boardLayout: Record<string, PieceData>, capturableSquares: Set<string>, inBetweenSquares: Set<string>, onDragStart: (event: DragStartEvent) => void, onDragEnd: (event: DragEndEvent) => void, isBoardFrozen: boolean}) {
  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
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
          return (
            <Square
              id={square}
              key={square}
              isDark={fileIndex % 2 !== rankIndex % 2}
              isInBetweenSquare={inBetweenSquares.has(square)}
              isCapturable={capturableSquares.has(square)}
              pieceData={boardLayout[square]}
              isBoardFrozen={isBoardFrozen}>
            </Square>
          );
        })))}
      </div>
    </DragDropProvider>
  )
}
