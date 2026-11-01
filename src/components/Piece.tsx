import { useDraggable } from '@dnd-kit/react'
import { RANKS, FILES, PLURAL_TYPES, SINGLETON_TYPES } from '../constants.tsx'

export interface PieceData {
    id: string;
    type: string;
    isWhite: boolean;
}

export function getPieces(numPieces: number): PieceData[] {
    const pieces = [];
    let n = 0;
    for (const type of SINGLETON_TYPES) {
        if (Math.random() > 0.5) {
            pieces.push({ id: `${type}${n}`, type: type, isWhite: true});
            n++;
        }
    }
    for (; n < numPieces; n++) {
        const type = PLURAL_TYPES[Math.floor(Math.random() * PLURAL_TYPES.length)];
        pieces.push({ id: `${type}${n}`, type: type, isWhite: true});
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
    return <Piece type={type} isWhite={isWhite} dragId={dragId} />;
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
