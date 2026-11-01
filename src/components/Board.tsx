import { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'

import Square from './Square.tsx'

import Bishop from './Bishop.tsx'
// import King from './King.tsx'
// import Knight from './Knight.tsx'
// import Pawn from './Pawn.tsx'
// import Queen from './Queen.tsx'
// import Rook from './Rook.tsx'

const draggable = (
  <Bishop isWhite={false} />
);

interface RowProps {
  rank: number;
  target: string | number | undefined;
}

function Row({ rank, target }: RowProps) {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return (
    <div className="row">
      {files.map((file, index) => (
        <Square
          key={`${file}${rank}`}
          id={`${file}${rank}`}
          isDark={index % 2 != rank % 2}>
          {target === `${file}${rank}` ? draggable : `${file}${rank}`}
        </Square>
      ))}
    </div>
  )
}

export default function Board() {
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
  const [target, setTarget] = useState<string | number>();

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        setTarget(event.operation.target?.id);
      }}
    >
      {!target ? draggable : null}

      <div id="board">
        {ranks.map((rank) => (
          <Row rank={rank} target={target} />
        ))}
      </div>
    </DragDropProvider>
  )
}
