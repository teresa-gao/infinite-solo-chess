import { useDroppable } from '@dnd-kit/react'

import Piece from './Piece.tsx'
import type { PieceData } from './Piece.tsx'

interface SquareProps {
  id: string;
  isDark: boolean;
  boardLayout: Record<string, PieceData>;
}

export default function Square({ id, isDark, boardLayout }: SquareProps) {
  const {ref} = useDroppable({id});
  const piece = boardLayout[id];
  const contents = piece ? (
    <Piece
      key={piece.id}
      type={piece.type}
      isWhite={piece.isWhite}
      dragId={piece.id}
    />
  ) : null;
  const colorClass = isDark ? " bg-[burlywood] dark:bg-[darkgoldenrod] " : "bg-[antiquewhite] dark:bg-[burlywood]";

  return (
    <div ref={ref} className={`${colorClass} flex flex-col items-center justify-center text-center aspect-square box-border text-[saddlebrown] h-[60px] w-[60px]`}>
      {contents}
    </div>
  );
}
