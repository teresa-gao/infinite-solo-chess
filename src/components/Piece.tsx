import { useDraggable } from '@dnd-kit/react'

interface PieceProps {
    abbreviation: string;
    isWhite: boolean;
}

export default function Piece({ abbreviation, isWhite }: PieceProps) {
    const color: string = isWhite ? "l" : "d";
    const imgUrl: string = new URL(`../assets/Chess_${abbreviation}${color}t60.png`, import.meta.url).href;
    const { ref } = useDraggable({
        id: `${abbreviation}${color}`,
    });

    return (
        <img src={imgUrl} className="piece" ref={ref} />
    )
}
