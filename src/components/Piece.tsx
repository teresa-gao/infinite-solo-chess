import { useDraggable } from '@dnd-kit/react'
import { RANKS, FILES, PLURAL_TYPES_TO_DELTAS, SINGLETON_TYPES_TO_DELTAS } from '../constants.tsx'

export interface PieceData {
    id: string;
    type: string;
    isWhite: boolean;
}

export function getPieces(numPieces: number): PieceData[] {
    const pieces = [];
    let n = 0;
    for (const type of SINGLETON_TYPES_TO_DELTAS.keys()) {
        if (Math.random() > 0.5) {
            pieces.push({ id: `${type}${n}`, type: type, isWhite: true});
            n++;
        }
    }
    const pluralTypes = [...PLURAL_TYPES_TO_DELTAS.keys()];
    for (; n < numPieces; n++) {
        const typeIndex = Math.floor(Math.random() * pluralTypes.length);
        const type = pluralTypes[typeIndex];
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

    const deltasDictionary = SINGLETON_TYPES_TO_DELTAS.has(type) ? SINGLETON_TYPES_TO_DELTAS : PLURAL_TYPES_TO_DELTAS
    const deltas = deltasDictionary.get(type);
    if (deltas) {
        for (const delta of deltas) {
            const newFileIndex = startFileIndex + delta[0];
            const newRankIndex = startRankIndex + delta[1];
            if ((newFileIndex >= 0) && (newFileIndex < FILES.length) && (newRankIndex >= 0) && (newRankIndex < RANKS.length)) {
                validNewSquares.add(`${FILES[newFileIndex]}-${RANKS[newRankIndex]}`);
            }
        }
    }

    return validNewSquares;
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
