import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

import { RANKS } from '../utils/constants'
import { getStartingLayout, evaluateEndSquare } from '../utils/helpers'

import Row from './Row.tsx'
import type { PieceData } from './Piece.tsx'

export default function Board() {
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(() => getStartingLayout(10));  // TODO: un-hardcode piece number

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const endSquare = String(event.operation.target?.id);
        if (endSquare == String(undefined)) return;

        const pieceId = event.operation.source?.id;
        if (!pieceId) return;

        const startSquare = Object.keys(boardLayout).find(key => boardLayout[key].id === pieceId);
        if (!startSquare) return false;

        const piece = boardLayout[startSquare];

        const isValidEndSquare = evaluateEndSquare(piece, startSquare, endSquare, boardLayout);
        if (!isValidEndSquare) return;

        const { [startSquare]: _, ...newBoardLayout } = boardLayout;
        newBoardLayout[endSquare] = {id: piece.id + 'x', type: piece.type, numMoves: piece.numMoves + 1};
        setBoardLayout(newBoardLayout);
      }}
    >

      <div id="board" className="rounded-lg overflow-hidden flex flex-col items-center h-fit shadow">
        {RANKS.map((_, rankIndex) => (
          <Row key={rankIndex} rankIndex={rankIndex} boardLayout={boardLayout} />
        ))}
      </div>
    </DragDropProvider>
  )
}
