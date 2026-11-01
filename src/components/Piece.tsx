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

interface getPiecesArgs {
    numBishops: number;
    numKings: number;
    numKnights: number;
    numPawns: number;
    numQueens: number;
    numRooks: number;
}

export function getPieces({ numBishops, numKings, numKnights, numPawns, numQueens, numRooks } : getPiecesArgs): PieceData[] {
    const pieces = [];
    for (let n = 0; n < numBishops; n++) {
        pieces.push({ id: `bishop${n}`, abbreviation: 'b', isWhite: true });
    }
    for (let n = 0; n < numKings; n++) {
        pieces.push({ id: `king${n}`, abbreviation: 'k', isWhite: true });
    }
    for (let n = 0; n < numKnights; n++) {
        pieces.push({ id: `knight${n}`, abbreviation: 'n', isWhite: true });
    }
    for (let n = 0; n < numPawns; n++) {
        pieces.push({ id: `pawn${n}`, abbreviation: 'p', isWhite: true });
    }
    for (let n = 0; n < numQueens; n++) {
        pieces.push({ id: `queen${n}`, abbreviation: 'q', isWhite: true });
    }
    for (let n = 0; n < numRooks; n++) {
        pieces.push({ id: `rook${n}`, abbreviation: 'r', isWhite: true });
    }

    return pieces;
}

interface RenderPieceProps {
    abbreviation: string;
    isWhite: boolean;
    dragId: string;
}

export function RenderPiece({ abbreviation, isWhite, dragId }: RenderPieceProps) {
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
