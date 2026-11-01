import { useDroppable } from '@dnd-kit/react'

interface SquareProps {
  id: string;
  children?: React.ReactNode;
}

export default function Square({ id, children }: SquareProps) {
  const {ref, isDropTarget} = useDroppable({id});

  return (
    <div ref={ref} className={isDropTarget ? "square active" : "square"}>
      {children}
    </div>
  );
}
