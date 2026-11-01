import { useDraggable } from '@dnd-kit/react'

import Bishop from './Bishop.tsx'
import King from './King.tsx'
import Knight from './Knight.tsx'
import Pawn from './Pawn.tsx'
import Queen from './Queen.tsx'
import Rook from './Rook.tsx'

export interface PieceData {
    id: string;
    abbreviation: string;
    isWhite: boolean;
}

export function getPieces(): PieceData[] {
    return [
        { id: 'blackBishop', abbreviation: 'b', isWhite: false },
        { id: 'whiteBishop', abbreviation: 'b', isWhite: true },
        { id: 'blackKing', abbreviation: 'k', isWhite: false },
        { id: 'whiteKing', abbreviation: 'k', isWhite: true },
        { id: 'blackKnight', abbreviation: 'n', isWhite: false },
        { id: 'whiteKnight', abbreviation: 'n', isWhite: true },
        { id: 'blackPawn', abbreviation: 'p', isWhite: false },
        { id: 'whitePawn', abbreviation: 'p', isWhite: true },
        { id: 'blackQueen', abbreviation: 'q', isWhite: false },
        { id: 'whiteQueen', abbreviation: 'q', isWhite: true },
        { id: 'blackRook', abbreviation: 'r', isWhite: false },
        { id: 'whiteRook', abbreviation: 'r', isWhite: true },
    ]
}

export function RenderPiece({ abbreviation, isWhite, dragId }: { abbreviation: string; isWhite: boolean; dragId: string }) {
    switch (abbreviation) {
        case 'b': return <Bishop isWhite={isWhite} dragId={dragId} />;
        case 'k': return <King isWhite={isWhite} dragId={dragId} />;
        case 'n': return <Knight isWhite={isWhite} dragId={dragId} />;
        case 'p': return <Pawn isWhite={isWhite} dragId={dragId} />;
        case 'q': return <Queen isWhite={isWhite} dragId={dragId} />;
        case 'r': return <Rook isWhite={isWhite} dragId={dragId} />;
    }
}

interface PieceProps {
    abbreviation: string;
    isWhite: boolean;
    dragId: string;
}

export default function Piece({ abbreviation, isWhite, dragId }: PieceProps) {
    const color: string = isWhite ? "l" : "d";
    const imgUrl: string = new URL(`../assets/Chess_${abbreviation}${color}t60.png`, import.meta.url).href;

    const { ref } = useDraggable({
        id: dragId,
    });

    return (
        <img src={imgUrl} className="piece" ref={ref}/>
    )
}
