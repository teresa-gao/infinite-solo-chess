import { useDroppable } from '@dnd-kit/react'

import Piece from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

export default function Square({id, isDark, pieceData} : {id: string, isDark: boolean, pieceData: PieceData}) {
  const {ref} = useDroppable({id});
  const contents = pieceData ? (
    <Piece
      key={pieceData.id}
      id={pieceData.id}
      type={pieceData.type}
      numMoves={pieceData.numMoves}
    />
  ) : null;
  const colorClass = isDark ? " bg-[burlywood] dark:bg-[darkgoldenrod] " : "bg-[antiquewhite] dark:bg-[burlywood]";

  return (
    <div ref={ref} className={`${colorClass} flex flex-col items-center justify-center text-center aspect-square box-border text-[saddlebrown] h-[60px] w-[60px]`}>
      {contents}
    </div>
  );
}
