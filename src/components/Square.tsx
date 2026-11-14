import { useDroppable } from '@dnd-kit/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

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
  ) : (isInBetweenSquare ? <FontAwesomeIcon icon={faCircle} /> : null);
  const colorClass = isDark ? "bg-[#d4975c] dark:bg-[sienna]" : "bg-[#fad7a8] dark:bg-[#ca9363]";
  const outlineClass = isDropTarget ? "z-10 ring-2 ring-inset ring-white" : ""

  return (
    <div key={id} ref={ref} className={`${colorClass} ${outlineClass} h-full w-full relative flex items-center justify-center text-center aspect-square box-border text-taupe-950/10 overflow-hidden`}>
      {contents}
      {isCapturable && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-15/16 w-15/16 rounded-full border-4 border-stone-950/10 bg-transparent" />
        </div>
      )}
    </div>
  );
}
