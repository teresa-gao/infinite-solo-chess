import { RANKS, FILES, PIECE_TYPE_TO_DELTAS } from './constants'

import type { PieceData } from '../components/Piece.tsx'

function getRandomizedCopy(array: number[][]) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = [...shuffled[i]]
        shuffled[i] = [...shuffled[j]]
        shuffled[j] = temp
    }
    return shuffled;
}

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

        const goalRankIndex = Math.floor(Math.random() * RANKS.length);
        const goalFileIndex = Math.floor(Math.random() * FILES.length);
        const squaresToPieceTypes = new Map<string, string>();
        let boardLayoutIsValid = true;

        let pieceTypeIndex = 0;
        while (pieceTypeIndex < pieceTypes.length - 1) {
            const pieceType = pieceTypes[pieceTypeIndex];
            const deltas = PIECE_TYPE_TO_DELTAS[pieceType];
            if (!deltas) {
                boardLayoutIsValid = false;
                break;
            }

            const validFirstMoveSquares: string[] = [];
            const validSecondMoveSquares: string[][] = [];
            for (const firstMoveDelta of getRandomizedCopy(deltas)) {
                if (!firstMoveDelta) continue;
                const [firstMoveDeltaFile, firstMoveDeltaRank, numRepeats] = firstMoveDelta;

                for (let factor = 1; factor <= numRepeats; factor++) {
                    const firstMoveFileIndex = goalFileIndex - firstMoveDeltaFile * factor;
                    const firstMoveRankIndex = goalRankIndex - firstMoveDeltaRank * factor;

                    const firstMoveFileOutOfBounds = (firstMoveFileIndex < 0) || (firstMoveFileIndex >= FILES.length);
                    const firstMoveRankOutOfBounds = (firstMoveRankIndex < 0) || (firstMoveRankIndex >= RANKS.length);
                    if (firstMoveFileOutOfBounds || firstMoveRankOutOfBounds) break;

                    const firstMoveSquare = convertIndicesToSquare(firstMoveRankIndex, firstMoveFileIndex);
                    if (squaresToPieceTypes.has(firstMoveSquare)) break;

                    validFirstMoveSquares.push(firstMoveSquare);
                    validSecondMoveSquares.push([]);
                    for (const secondMoveDelta of getRandomizedCopy(deltas)) {
                        if (!secondMoveDelta) continue;
                        const [secondMoveDeltaFile, secondMoveDeltaRank, numRepeats] = secondMoveDelta;

                        for (let factor = 1; factor <= numRepeats; factor++) {
                            const secondMoveFileIndex = goalFileIndex - secondMoveDeltaFile * factor;
                            const secondMoveRankIndex = goalRankIndex - secondMoveDeltaRank * factor;

                            const secondMoveFileOutOfBounds = (secondMoveFileIndex < 0) || (secondMoveFileIndex >= FILES.length);
                            const secondMoveRankOutOfBounds = (secondMoveRankIndex < 0) || (secondMoveRankIndex >= RANKS.length);
                            if (secondMoveFileOutOfBounds || secondMoveRankOutOfBounds) break;

                            const secondMoveSquare = convertIndicesToSquare(secondMoveRankIndex, secondMoveFileIndex);
                            if (squaresToPieceTypes.has(secondMoveSquare)) break;

                            validSecondMoveSquares[validFirstMoveSquares.length - 1].push(secondMoveSquare);
                        }
                    }
                }
            }

            if (validFirstMoveSquares.length == 0) {
                boardLayoutIsValid = false;
                break;
            }

            const moveIndex = Math.floor(Math.random() * validFirstMoveSquares.length);
            const firstMoveSquare = validFirstMoveSquares[moveIndex];

            const secondMoveSquares = validSecondMoveSquares[moveIndex];
            if (secondMoveSquares.length == 0) {
                squaresToPieceTypes.set(firstMoveSquare, pieceType);
                pieceTypeIndex += 1;
            } else {
                const secondMoveSquare = secondMoveSquares[Math.floor(Math.random() * secondMoveSquares.length)];
                squaresToPieceTypes.set(secondMoveSquare, pieceType);
                squaresToPieceTypes.set(firstMoveSquare, pieceTypes[pieceTypeIndex + 1]);
                pieceTypeIndex += 2;
            }
        }

        if (boardLayoutIsValid) {
            const newSquaresToPieceTypes = new Map<string, string>(squaresToPieceTypes);
            newSquaresToPieceTypes.set(convertIndicesToSquare(goalRankIndex, goalFileIndex), pieceTypes.at(-1)!);

            let pieceNum = 0;
            const boardLayout: Record<string, PieceData> = {};
            for (let [square, type] of newSquaresToPieceTypes) {
                boardLayout[square] = { id: `${type}${pieceNum++}`, type: type, numMoves: 0 };
            }
            return boardLayout;
        }
    }
}

export function evaluateEndSquare(piece: PieceData, startSquare: string, endSquare: string, boardLayout: Record<string, PieceData>) {
    if ((!(endSquare in boardLayout)) || (boardLayout[endSquare].type === 'k')) return false;

    const pieceType = piece.type;
    const [goalRankIndex, goalFileIndex] = convertSquareToIndices(startSquare);
    const [endRankIndex, endFileIndex] = convertSquareToIndices(endSquare);

    const deltas = PIECE_TYPE_TO_DELTAS[pieceType];
    if (deltas) {
        for (const [deltaFile, deltaRank, numRepeats] of deltas) {
            for (let factor = 1; factor <= numRepeats; factor++) {
                const newFileIndex = goalFileIndex + deltaFile * factor;
                const newRankIndex = goalRankIndex + deltaRank * factor;
                if ((newFileIndex < 0) || (newFileIndex >= FILES.length) || (newRankIndex < 0) || (newRankIndex >= RANKS.length)) break;
                if ((newRankIndex === endRankIndex) && (newFileIndex === endFileIndex)) return true;
                if (convertIndicesToSquare(newRankIndex, newFileIndex) in boardLayout) break;
            }
        }
    }

    return false;
}
