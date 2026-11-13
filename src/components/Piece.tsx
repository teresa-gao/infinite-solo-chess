import { useDraggable } from '@dnd-kit/react'

import type { PieceType } from '../utils/constants'

export interface PieceData {
    id: string;
    type: PieceType;
    numMoves: number;
    isFrozen: boolean;
}

export default function Piece({id, type, numMoves, isFrozen}: PieceData) {
    const canMove = numMoves < 2;
    const imgUrl: string = new URL(`../assets/${type}_${canMove ? 'white' : 'black'}.png`, import.meta.url).href;

    const { ref } = useDraggable({
        id: id,
        disabled: isFrozen || !canMove,
    });

    return (
        <img id={id} src={imgUrl} className={`${isFrozen ? "" : "cursor-grab"} w-full h-full`} draggable="false" ref={ref}/>
    )
}
