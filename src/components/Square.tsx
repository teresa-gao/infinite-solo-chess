import { useDroppable } from '@dnd-kit/react'

import Piece from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

interface SquareProps {
  id: string;
  isDark: boolean;
  piece: PieceData | undefined;
}

export default function Square({ id, isDark, piece }: SquareProps) {
  const {ref} = useDroppable({id});
  const colorClass = isDark ? " bg-[burlywood] dark:bg-[darkgoldenrod] " : "bg-[antiquewhite] dark:bg-[burlywood]";
  const contents = piece ? (
    <Piece
      key={piece.id}
      type={piece.type}
      isWhite={piece.isWhite}
      dragId={piece.id}
    />
  ) : null;

  return (
    <div ref={ref} className={`${colorClass} flex flex-col items-center justify-center text-center aspect-square box-border text-[saddlebrown] h-[60px] w-[60px]`}>
      {contents}
    </div>
  );
}
