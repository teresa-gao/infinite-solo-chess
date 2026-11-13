import { useDroppable } from '@dnd-kit/react'

import Piece from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

export default function Square({id, isDark, isCapturable, isInBetweenSquare, pieceData, isBoardFrozen} : {id: string, isDark: boolean, isCapturable: boolean, isInBetweenSquare: boolean, pieceData: PieceData, isBoardFrozen: boolean}) {
  const {isDropTarget, ref} = useDroppable({id});
  const contents = pieceData ? (
    <Piece
      key={pieceData.id}
      id={pieceData.id}
      type={pieceData.type}
      numMoves={pieceData.numMoves}
      isFrozen={isBoardFrozen}
    />
  ) : (isInBetweenSquare ? <span><i className="fa-solid fa-circle"></i></span> : null);
  const colorClass = isDark ? "bg-[burlywood] dark:bg-[darkgoldenrod]" : "bg-[antiquewhite] dark:bg-[burlywood]";
  const outlineClass = isDropTarget ? "z-10 ring-2 ring-inset ring-white" : ""

  return (
    <div key={id} ref={ref} className={`${colorClass} ${outlineClass} h-full w-full relative flex items-center justify-center text-center aspect-square box-border text-stone-950/10 overflow-hidden`}>
      {contents}
      {isCapturable && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-14/15 w-14/15 rounded-full border-4 border-stone-950/10 bg-transparent" />
        </div>
      )}
    </div>
  );
}
