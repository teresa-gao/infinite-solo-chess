import { RANKS, FILES, PIECE_TYPE_TO_DELTAS, NUM_SUBLEVELS_PER_LEVEL } from './constants'

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

export function convertSublevelToLevel(sublevel: number) {
    return Math.trunc(sublevel / NUM_SUBLEVELS_PER_LEVEL) + 1
}

export function convertIndicesToSquare(rankIndex: number, fileIndex: number) {
  return `${FILES[fileIndex]}-${RANKS[rankIndex]}`;
}

export function convertSquareToIndices(squareId: string) {
    const [fileString, rankString] = squareId.split('-');
    return [RANKS.indexOf(rankString), FILES.indexOf(fileString)];
}

function getPieceTypes(numPieces: number) {
    const pieceTypes: string[] = [];
    const nonKingTypes = Object.keys(PIECE_TYPE_TO_DELTAS).filter(type => type !== 'k');

    if (Math.random() >= 0.5) {
        pieceTypes.push('k');
        numPieces--;
    }

    while (numPieces > 0) {
        const pieceType = nonKingTypes[Math.floor(Math.random() * nonKingTypes.length)];
        pieceTypes.push(pieceType);
        numPieces--;
    }

    return pieceTypes;
}

export function getBoardLayout(sublevel: number) {
    const level = convertSublevelToLevel(sublevel);
    while (true) {
        const pieceTypes = getPieceTypes(level + 1);

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
                const [firstMoveDeltaFile, firstMoveDeltaRank, firstMoveNumRepeats] = firstMoveDelta;

                for (let firstMoveFactor = 1; firstMoveFactor <= firstMoveNumRepeats; firstMoveFactor++) {
                    const firstMoveFileIndex = goalFileIndex - firstMoveDeltaFile * firstMoveFactor;
                    const firstMoveRankIndex = goalRankIndex - firstMoveDeltaRank * firstMoveFactor;

                    const firstMoveFileOutOfBounds = (firstMoveFileIndex < 0) || (firstMoveFileIndex >= FILES.length);
                    const firstMoveRankOutOfBounds = (firstMoveRankIndex < 0) || (firstMoveRankIndex >= RANKS.length);
                    if (firstMoveFileOutOfBounds || firstMoveRankOutOfBounds) break;

                    const firstMoveSquare = convertIndicesToSquare(firstMoveRankIndex, firstMoveFileIndex);
                    if (squaresToPieceTypes.has(firstMoveSquare)) break;

                    validFirstMoveSquares.push(firstMoveSquare);
                    validSecondMoveSquares.push([]);
                    if (pieceTypeIndex > pieceTypes.length - 3) continue;
                    for (const secondMoveDelta of getRandomizedCopy(deltas)) {
                        if (!secondMoveDelta) continue;
                        const [secondMoveDeltaFile, secondMoveDeltaRank, secondMoveNumRepeats] = secondMoveDelta;

                        for (let secondMoveFactor = 1; secondMoveFactor <= secondMoveNumRepeats; secondMoveFactor++) {
                            const secondMoveFileIndex = firstMoveFileIndex - secondMoveDeltaFile * secondMoveFactor;
                            const secondMoveRankIndex = firstMoveRankIndex - secondMoveDeltaRank * secondMoveFactor;

                            if ((secondMoveFileIndex === goalFileIndex) && (secondMoveRankIndex === goalRankIndex)) break;

                            const secondMoveFileOutOfBounds = (secondMoveFileIndex < 0) || (secondMoveFileIndex >= FILES.length);
                            const secondMoveRankOutOfBounds = (secondMoveRankIndex < 0) || (secondMoveRankIndex >= RANKS.length);
                            if (secondMoveFileOutOfBounds || secondMoveRankOutOfBounds) break;

                            const secondMoveSquare = convertIndicesToSquare(secondMoveRankIndex, secondMoveFileIndex);
                            if (squaresToPieceTypes.has(secondMoveSquare)) break;

                            validSecondMoveSquares[validSecondMoveSquares.length - 1].push(secondMoveSquare);
                        }
                    }
                }
            }

            if (validFirstMoveSquares.length === 0) {
                boardLayoutIsValid = false;
                break;
            }

            const moveIndex = Math.floor(Math.random() * validFirstMoveSquares.length);
            const firstMoveSquare = validFirstMoveSquares[moveIndex];

            const secondMoveSquares = validSecondMoveSquares[moveIndex];
            if (secondMoveSquares.length === 0) {
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
            squaresToPieceTypes.set(convertIndicesToSquare(goalRankIndex, goalFileIndex), pieceTypes.at(-1)!);
            let pieceNum = 0;
            const boardLayout: Record<string, PieceData> = {};
            for (let [square, type] of squaresToPieceTypes) {
                boardLayout[square] = { id: `${sublevel}-${type}${pieceNum++}`, type: type, numMoves: 0, isFrozen: false };
            }
            return boardLayout;
        }
    }
}

export function getSquaresOfInterest(pieceType: string, startSquare: string, boardLayout: Record<string, PieceData>) {
    const capturableSquares = new Set<string>();
    const inBetweenSquares = new Set<string>();

    const [startRankIndex, startFileIndex] = convertSquareToIndices(startSquare);
    const deltas = PIECE_TYPE_TO_DELTAS[pieceType];

    if (deltas) {
        for (const [deltaFile, deltaRank, numRepeats] of deltas) {
            const possibleInBetweenSquares: string[] = [];
            for (let factor = 1; factor <= numRepeats; factor++) {
                const newFileIndex = startFileIndex + deltaFile * factor;
                const newRankIndex = startRankIndex + deltaRank * factor;
                if ((newFileIndex < 0) || (newFileIndex >= FILES.length) || (newRankIndex < 0) || (newRankIndex >= RANKS.length)) break;

                const newSquare = convertIndicesToSquare(newRankIndex, newFileIndex)
                if (newSquare in boardLayout) {
                    if (boardLayout[newSquare].type === 'k') break;
                    capturableSquares.add(newSquare);
                    possibleInBetweenSquares.forEach((square) => inBetweenSquares.add(square));
                    break
                } else {
                    possibleInBetweenSquares.push(newSquare);
                }
            }
        }
    }

    return [capturableSquares, inBetweenSquares];
}
