import { useDroppable } from '@dnd-kit/react'

interface SquareProps {
  id: string;
  isDark: boolean;
  children?: React.ReactNode;
}

export default function Square({ id, isDark, children }: SquareProps) {
  const {ref, isDropTarget} = useDroppable({id});

  return (
    <div ref={ref} className={"square" + (isDark ? " darkSquare" : " lightSquare") + (isDropTarget ? " active" : "")}>
      {children}
    </div>
  );
}
