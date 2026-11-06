import { useDroppable } from '@dnd-kit/react'

interface SquareProps {
  id: string;
  isDark: boolean;
  children?: React.ReactNode;
}

export default function Square({ id, isDark, children }: SquareProps) {
  const {ref, isDropTarget} = useDroppable({id});
  const colorClass = isDark ? " bg-[burlywood] dark:bg-[darkgoldenrod] " : "bg-[antiquewhite] dark:bg-[burlywood]";

  return (
    <div ref={ref} className={`${colorClass} flex flex-col items-center justify-center text-center aspect-square box-border text-[saddlebrown] h-[60px] w-[60px]`}>
      {children}
    </div>
  );
}
