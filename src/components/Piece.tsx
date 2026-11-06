import { useDraggable } from '@dnd-kit/react'
import { RANKS, FILES, PLURAL_TYPES_TO_DELTAS, SINGLETON_TYPES_TO_DELTAS } from '../constants.tsx'

export interface PieceData {
    id: string;
    type: string;
    isWhite: boolean;
}

// TODO: implement actual logic!
export function getStartingLayout(numPieces: number) {
    const boardLayout: Record<string, PieceData> = {};

    let n = 0;
    for (const type of SINGLETON_TYPES_TO_DELTAS.keys()) {
        if (Math.random() > 0.5) {
            const fileIndex = Math.floor(Math.random() * FILES.length);
            const rankIndex = Math.floor(Math.random() * RANKS.length);
            boardLayout[`${FILES[fileIndex]}-${RANKS[rankIndex]}`] = { id: `${type}${n}`, type: type, isWhite: true};
            n++;
        }
    }

    const pluralTypes = [...PLURAL_TYPES_TO_DELTAS.keys()];
    for (; n < numPieces; n++) {
        const typeIndex = Math.floor(Math.random() * pluralTypes.length);
        const type = pluralTypes[typeIndex];
        const fileIndex = Math.floor(Math.random() * FILES.length);
        const rankIndex = Math.floor(Math.random() * RANKS.length);
        boardLayout[`${FILES[fileIndex]}-${RANKS[rankIndex]}`] = { id: `${type}${n}`, type: type, isWhite: true};
    }

    return boardLayout;
}

// TODO: implement more efficient and correct logic!
export function evaluateNewSquare(pieceType: string, startSquare: string, endSquare: string) {
    const splitCoord = startSquare.split('-');
    const startFileIndex = FILES.indexOf(splitCoord[0]);
    const startRankIndex = RANKS.indexOf(parseInt(splitCoord[1]));

    const deltasDictionary = SINGLETON_TYPES_TO_DELTAS.has(pieceType) ? SINGLETON_TYPES_TO_DELTAS : PLURAL_TYPES_TO_DELTAS
    const deltas = deltasDictionary.get(pieceType);
    if (deltas) {
        for (const delta of deltas) {
            const newFileIndex = startFileIndex + delta[0];
            const newRankIndex = startRankIndex + delta[1];
            if ((newFileIndex >= 0) && (newFileIndex < FILES.length) && (newRankIndex >= 0) && (newRankIndex < RANKS.length)) {
                if (`${FILES[newFileIndex]}-${RANKS[newRankIndex]}` === endSquare) return true;
            }
        }
    }

    return false;
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
