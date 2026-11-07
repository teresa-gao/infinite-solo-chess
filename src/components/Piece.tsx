import { useDraggable } from '@dnd-kit/react'

export interface PieceData {
    id: string;
    type: string;
    isWhite: boolean;
    numMovesLeft: number;
}

interface PieceProps {
    type: string;
    isWhite: boolean;
    dragId: string;
}

export default function Piece({ type, isWhite, dragId }: PieceProps) {
    const color: string = isWhite ? "l" : "d";
    const imgUrl: string = new URL(`../assets/Chess_${type}${color}t60.png`, import.meta.url).href;

    const { ref } = useDraggable({
        id: dragId,
    });

    return (
        <img src={imgUrl} className="cursor-grab" ref={ref}/>
    )
}
