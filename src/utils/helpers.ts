import { RANKS, FILES, PLURAL_TYPES_TO_DELTAS, SINGLETON_TYPES_TO_DELTAS } from './constants'

import type { PieceData } from '../components/Piece.tsx'

export function convertIndicesToSquare(rankIndex: number, fileIndex: number) {
  return `${FILES[fileIndex]}-${RANKS[rankIndex]}`;
}

export function convertSquareToIndices(squareId: string) {
    const [fileString, rankString] = squareId.split('-');
    return [RANKS.indexOf(rankString), FILES.indexOf(fileString)];
}

// TODO: implement actual logic!
export function getStartingLayout(numPieces: number) {
    const boardLayout: Record<string, PieceData> = {};

    let n = 0;
    for (const type of SINGLETON_TYPES_TO_DELTAS.keys()) {
        if (Math.random() > 0.5) {
            const fileIndex = Math.floor(Math.random() * FILES.length);
            const rankIndex = Math.floor(Math.random() * RANKS.length);
            boardLayout[convertIndicesToSquare(rankIndex, fileIndex)] = { id: `${type}${n}`, type: type, isWhite: true};
            n++;
        }
    }

    const pluralTypes = [...PLURAL_TYPES_TO_DELTAS.keys()];
    for (; n < numPieces; n++) {
        const typeIndex = Math.floor(Math.random() * pluralTypes.length);
        const type = pluralTypes[typeIndex];
        const fileIndex = Math.floor(Math.random() * FILES.length);
        const rankIndex = Math.floor(Math.random() * RANKS.length);
        boardLayout[convertIndicesToSquare(rankIndex, fileIndex)] = { id: `${type}${n}`, type: type, isWhite: true};
    }

    return boardLayout;
}

export function evaluateEndSquare(piece: PieceData, startSquare: string, endSquare: string, boardLayout: Record<string, PieceData>) {
    if (!(endSquare in boardLayout)) return false;
    if (boardLayout[endSquare].type === 'k') return false;

    const pieceType = piece.type;
    const [startRankIndex, startFileIndex] = convertSquareToIndices(startSquare);
    const [endRankIndex, endFileIndex] = convertSquareToIndices(endSquare);

    const deltasDictionary = SINGLETON_TYPES_TO_DELTAS.has(pieceType) ? SINGLETON_TYPES_TO_DELTAS : PLURAL_TYPES_TO_DELTAS
    const deltas = deltasDictionary.get(pieceType);
    if (deltas) {
        for (const [deltaFile, deltaRank, numRepeats] of deltas) {
            for (let factor = 1; factor <= numRepeats; factor++) {
                const newFileIndex = startFileIndex + deltaFile * factor;
                const newRankIndex = startRankIndex + deltaRank * factor;
                if ((newFileIndex < 0) || (newFileIndex >= FILES.length) || (newRankIndex < 0) || (newRankIndex >= RANKS.length)) break;
                if ((newRankIndex === endRankIndex) && (newFileIndex === endFileIndex)) return true;
                if (convertIndicesToSquare(newRankIndex, newFileIndex) in boardLayout) break;
            }
        }
    }

    return false;
}
