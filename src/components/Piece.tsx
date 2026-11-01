import { useDraggable } from '@dnd-kit/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas);
library.add(far);

import Bishop from './Bishop.tsx'
import King from './King.tsx'
import Knight from './Knight.tsx'
import Pawn from './Pawn.tsx'
import Queen from './Queen.tsx'
import Rook from './Rook.tsx'

export interface PieceData {
    id: string;
    type: string;
    isWhite: boolean;
}

export function getPieces(): PieceData[] {
    return [
        { id: 'blackBishop', type: 'bishop', isWhite: false },
        { id: 'whiteBishop', type: 'bishop', isWhite: true },
        { id: 'blackKing', type: 'king', isWhite: false },
        { id: 'whiteKing', type: 'king', isWhite: true },
        { id: 'blackKnight', type: 'knight', isWhite: false },
        { id: 'whiteKnight', type: 'knight', isWhite: true },
        { id: 'blackPawn', type: 'pawn', isWhite: false },
        { id: 'whitePawn', type: 'pawn', isWhite: true },
        { id: 'blackQueen', type: 'queen', isWhite: false },
        { id: 'whiteQueen', type: 'queen', isWhite: true },
        { id: 'blackRook', type: 'rook', isWhite: false },
        { id: 'whiteRook', type: 'rook', isWhite: true },
    ]
}

export function RenderPiece({ type, isWhite, dragId }: { type: string; isWhite: boolean; dragId: string }) {
    switch (type) {
        case 'bishop': return <Bishop isWhite={isWhite} dragId={dragId} />;
        case 'king': return <King isWhite={isWhite} dragId={dragId} />;
        case 'knight': return <Knight isWhite={isWhite} dragId={dragId} />;
        case 'pawn': return <Pawn isWhite={isWhite} dragId={dragId} />;
        case 'queen': return <Queen isWhite={isWhite} dragId={dragId} />;
        case 'rook': return <Rook isWhite={isWhite} dragId={dragId} />;
    }
}

interface PieceProps {
    type: string;
    isWhite: boolean;
    dragId: string;
}

export default function Piece({ type, isWhite, dragId }: PieceProps) {
    const colorClass = isWhite ? "far" : "fas";
    const { ref } = useDraggable({
        id: dragId,
        data: { id: dragId }
    });

    return (
        <FontAwesomeIcon icon={[colorClass, `chess-${type}`]} className="piece" ref={ref} />
    )
}
