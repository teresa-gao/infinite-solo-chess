import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

import Row from './Row.tsx'
import { getStartingLayout, evaluateNewSquare } from './Piece.tsx'
import type { PieceData } from './Piece.tsx'
import { RANKS } from '../constants.tsx'

export default function Board() {
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(getStartingLayout(22));  // TODO: un-hardcode

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const newSquare = String(event.operation.target?.id);
        if (newSquare == String(undefined)) return;

        const pieceId = event.operation.source?.id;
        if (!pieceId) return;

        const oldSquare = Object.keys(boardLayout).find(key => boardLayout[key].id === pieceId);
        if (!oldSquare) return;

        const piece = boardLayout[oldSquare];
        const isValidNewSquare = evaluateNewSquare(piece.type, oldSquare, newSquare);
        if (!isValidNewSquare) return;

        const { [oldSquare]: _, ...newBoardLayout } = boardLayout;
        newBoardLayout[newSquare] = piece;
        setBoardLayout(newBoardLayout);
      }}
    >

      <div id="board" className="rounded-lg overflow-hidden flex flex-col items-center h-fit shadow">
        {RANKS.map((rank) => (
          <Row key={`rank-${rank}`} rank={rank} boardLayout={boardLayout} />
        ))}
      </div>
    </DragDropProvider>
  )
}
