import { useDraggable } from '@dnd-kit/react'

export interface PieceData {
    id: string;
    type: string;
    numMoves: number;
    isFrozen: boolean;
}

export default function Piece({id, type, numMoves, isFrozen}: PieceData) {
    const canMove = numMoves < 2;
    const color: string = canMove ? "l" : "d";
    const imgUrl: string = new URL(`../assets/Chess_${type}${color}t60.png`, import.meta.url).href;

    const { ref } = useDraggable({
        id: id,
        disabled: isFrozen || !canMove,
    });

    return (
        <img id={id} src={imgUrl} className={`${isFrozen ? "" : "cursor-grab"} max-w-full`} draggable="false" ref={ref}/>
    )
}
