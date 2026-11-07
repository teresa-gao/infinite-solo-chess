import { RANKS, FILES, PIECE_TYPE_TO_DELTAS } from './constants'

import type { PieceData } from '../components/Piece.tsx'

export function convertIndicesToSquare(rankIndex: number, fileIndex: number) {
  return `${FILES[fileIndex]}-${RANKS[rankIndex]}`;
}

export function convertSquareToIndices(squareId: string) {
    const [fileString, rankString] = squareId.split('-');
    return [RANKS.indexOf(rankString), FILES.indexOf(fileString)];
}

export function getStartingLayout(numPieces: number) {
    while (true) {
        const pieceTypes: string[] = new Array(numPieces).fill('');
        const nonKingTypes = Object.keys(PIECE_TYPE_TO_DELTAS).filter(type => type !== 'k');
        const containsKing = Math.random() >= 0.5;
        let i = 0;
        if (containsKing) {
            pieceTypes[i++] = 'k';
        }
        while (i < numPieces) {
            const pieceType = nonKingTypes[Math.floor(Math.random() * nonKingTypes.length)];
            pieceTypes[i++] = pieceType;
        }

        const startRankIndex = Math.floor(Math.random() * RANKS.length);
        const startFileIndex = Math.floor(Math.random() * FILES.length);
        const squaresToPieceTypes = new Map<string, string>();
        let boardLayoutIsValid = true;

        for (let pieceTypeIndex = 0; pieceTypeIndex < pieceTypes.length - 1; pieceTypeIndex++) {
            const pieceType = pieceTypes[pieceTypeIndex];
            let placedPiece = false;

            const deltas = PIECE_TYPE_TO_DELTAS[pieceType];
            if (deltas) {
                for (const [deltaFile, deltaRank, numRepeats] of deltas) {
                    for (let factor = 1; factor <= numRepeats; factor++) {
                        const newFileIndex = startFileIndex - deltaFile * factor;
                        const newRankIndex = startRankIndex - deltaRank * factor;
                        if ((newFileIndex < 0) || (newFileIndex >= FILES.length) || (newRankIndex < 0) || (newRankIndex >= RANKS.length)) break;

                        const newSquare = convertIndicesToSquare(newRankIndex, newFileIndex);
                        if (squaresToPieceTypes.has(newSquare)) break;

                        squaresToPieceTypes.set(newSquare, pieceType);
                        placedPiece = true;
                        break;
                    }

                    if (placedPiece) break;
                }
            }

            if (!placedPiece) {
                boardLayoutIsValid = false;
                break;
            }
        }

        if (boardLayoutIsValid) {
            const newSquaresToPieceTypes = new Map<string, string>(squaresToPieceTypes);
            newSquaresToPieceTypes.set(convertIndicesToSquare(startRankIndex, startFileIndex), pieceTypes.at(-1)!);

            let pieceNum = 0;
            const boardLayout: Record<string, PieceData> = {};
            for (let [square, type] of newSquaresToPieceTypes) {
                boardLayout[square] = { id: `${type}${pieceNum++}`, type: type, isWhite: true };
            }
            return boardLayout;
        }
    }
}

export function evaluateEndSquare(piece: PieceData, startSquare: string, endSquare: string, boardLayout: Record<string, PieceData>) {
    if ((!(endSquare in boardLayout)) || (boardLayout[endSquare].type === 'k')) return false;

    const pieceType = piece.type;
    const [startRankIndex, startFileIndex] = convertSquareToIndices(startSquare);
    const [endRankIndex, endFileIndex] = convertSquareToIndices(endSquare);

    const deltas = PIECE_TYPE_TO_DELTAS[pieceType];
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
