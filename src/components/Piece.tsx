import { useDraggable } from '@dnd-kit/react'

import Bishop from './Bishop.tsx'
import King from './King.tsx'
import Knight from './Knight.tsx'
import Pawn from './Pawn.tsx'
import Queen from './Queen.tsx'
import Rook from './Rook.tsx'

import { RANKS, FILES } from '../constants'

export interface PieceData {
    id: string;
    type: string;
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
        pieces.push({ id: `bishop${n}`, type: 'b', isWhite: true });
    }
    for (let n = 0; n < numKings; n++) {
        pieces.push({ id: `king${n}`, type: 'k', isWhite: true });
    }
    for (let n = 0; n < numKnights; n++) {
        pieces.push({ id: `knight${n}`, type: 'n', isWhite: true });
    }
    for (let n = 0; n < numPawns; n++) {
        pieces.push({ id: `pawn${n}`, type: 'p', isWhite: true });
    }
    for (let n = 0; n < numQueens; n++) {
        pieces.push({ id: `queen${n}`, type: 'q', isWhite: true });
    }
    for (let n = 0; n < numRooks; n++) {
        pieces.push({ id: `rook${n}`, type: 'r', isWhite: true });
    }

    return pieces;
}

export function getStartPositions(pieces: PieceData[]) {
  const startPositions = [];
  for (let i = 0; i < pieces.length; i++) {
    const fileIndex = Math.floor(Math.random() * FILES.length);
    const rankIndex = Math.floor(Math.random() * RANKS.length);
    startPositions.push(`${FILES[fileIndex]}-${RANKS[rankIndex]}`);
  }
  return startPositions;
}

export function getValidNewSquares(type: string, start: string) {
    const validNewSquares = new Set();

    const splitCoord = start.split('-');
    const startFileIndex = FILES.indexOf(splitCoord[0]);
    const startRankIndex = RANKS.indexOf(parseInt(splitCoord[1]));

    switch (type) {
        case 'b':
            break;
        case 'k':
            for (let fileIndex = Math.max(0, startFileIndex - 1); fileIndex <= Math.min(FILES.length - 1, startFileIndex + 1); fileIndex++) {
                for (let rankIndex = Math.max(0, startRankIndex - 1); rankIndex <= Math.min(RANKS.length - 1, startRankIndex + 1); rankIndex++) {
                    validNewSquares.add(`${FILES[fileIndex]}-${RANKS[rankIndex]}`);
                }
            }
            break;
        case 'n':
            break;
        case 'p':
            break;
        case 'q':
            break;
        case 'r':
            break;
    }

    return validNewSquares;
}

interface RenderPieceProps {
    type: string;
    isWhite: boolean;
    dragId: string;
}

export function RenderPiece({ type, isWhite, dragId }: RenderPieceProps) {
    switch (type) {
        case 'b': return <Bishop isWhite={isWhite} dragId={dragId} />;
        case 'k': return <King isWhite={isWhite} dragId={dragId} />;
        case 'n': return <Knight isWhite={isWhite} dragId={dragId} />;
        case 'p': return <Pawn isWhite={isWhite} dragId={dragId} />;
        case 'q': return <Queen isWhite={isWhite} dragId={dragId} />;
        case 'r': return <Rook isWhite={isWhite} dragId={dragId} />;
    }
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
        <img src={imgUrl} className="piece" ref={ref}/>
    )
}
