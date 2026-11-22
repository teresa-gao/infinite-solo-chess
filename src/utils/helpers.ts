import {
  type PieceType,
  RANKS,
  FILES,
  PIECE_TYPE_TO_DELTAS,
  NUM_SUBLEVELS_PER_LEVEL,
} from "./constants";

import type { PieceData } from "../components/Piece.tsx";

function getRandomizedCopy(array: number[][]) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = [...shuffled[i]];
    shuffled[i] = [...shuffled[j]];
    shuffled[j] = temp;
  }
  return shuffled;
}

export function convertSublevelToLevel(sublevel: number) {
  return Math.trunc(sublevel / NUM_SUBLEVELS_PER_LEVEL) + 1;
}

function convertSquareToIndices(squareId: string) {
  const [fileString, rankString] = squareId.split("-");
  return [RANKS.indexOf(rankString), FILES.indexOf(fileString)];
}

export function convertIndicesToSquare(rankIndex: number, fileIndex: number) {
  return `${FILES[fileIndex]}-${RANKS[rankIndex]}`;
}

function getPieceTypes(numPieces: number) {
  const pieceTypes: PieceType[] = [];
  const nonKingTypes: PieceType[] = Object.keys(PIECE_TYPE_TO_DELTAS).filter(
    (type): type is PieceType => type !== "king",
  );

  if (Math.random() >= 0.5) {
    pieceTypes.push("king");
    numPieces--;
  }

  while (numPieces > 0) {
    const pieceType =
      nonKingTypes[Math.floor(Math.random() * nonKingTypes.length)];
    pieceTypes.push(pieceType);
    numPieces--;
  }

  return pieceTypes;
}

function getSquareIndicesAfterMove(
  goalRankIndex: number,
  goalFileIndex: number,
  deltaRank: number,
  deltaFile: number,
  moveFactor: number,
) {
  const fileIndex = goalFileIndex - deltaFile * moveFactor;
  const rankIndex = goalRankIndex - deltaRank * moveFactor;

  const isFileOutOfBounds = fileIndex < 0 || fileIndex >= FILES.length;
  const isRankOutOfBounds = rankIndex < 0 || rankIndex >= RANKS.length;
  if (isFileOutOfBounds || isRankOutOfBounds) {
    return [null, null];
  }

  return [rankIndex, fileIndex];
}

function getValidMoveSquares(
  goalRankIndex: number,
  goalFileIndex: number,
  deltas: number[][],
  pieceTypesBySquare: Map<string, PieceType>,
  canCalculateSecondMove: boolean,
): [string[], string[][]] {
  const validFirstMoveSquares: string[] = [];
  const validSecondMoveSquares: string[][] = [];

  for (const firstMoveDelta of getRandomizedCopy(deltas)) {
    if (!firstMoveDelta) continue;
    const [firstMoveDeltaFile, firstMoveDeltaRank, firstMoveNumRepeats] =
      firstMoveDelta;

    for (
      let firstMoveFactor = 1;
      firstMoveFactor <= firstMoveNumRepeats;
      firstMoveFactor++
    ) {
      const [firstMoveRankIndex, firstMoveFileIndex] =
        getSquareIndicesAfterMove(
          goalRankIndex,
          goalFileIndex,
          firstMoveDeltaRank,
          firstMoveDeltaFile,
          firstMoveFactor,
        );
      if (firstMoveRankIndex === null || firstMoveFileIndex === null) break;

      const firstMoveSquare = convertIndicesToSquare(
        firstMoveRankIndex,
        firstMoveFileIndex,
      );
      if (pieceTypesBySquare.has(firstMoveSquare)) break;

      validFirstMoveSquares.push(firstMoveSquare);
      validSecondMoveSquares.push([]);
      if (!canCalculateSecondMove) continue;

      for (const secondMoveDelta of getRandomizedCopy(deltas)) {
        if (!secondMoveDelta) continue;
        const [secondMoveDeltaFile, secondMoveDeltaRank, secondMoveNumRepeats] =
          secondMoveDelta;

        for (
          let secondMoveFactor = 1;
          secondMoveFactor <= secondMoveNumRepeats;
          secondMoveFactor++
        ) {
          const [secondMoveRankIndex, secondMoveFileIndex] =
            getSquareIndicesAfterMove(
              firstMoveRankIndex,
              firstMoveFileIndex,
              secondMoveDeltaRank,
              secondMoveDeltaFile,
              secondMoveFactor,
            );
          if (secondMoveRankIndex === null || secondMoveFileIndex === null)
            break;
          if (
            secondMoveFileIndex === goalFileIndex &&
            secondMoveRankIndex === goalRankIndex
          )
            break;

          const secondMoveSquare = convertIndicesToSquare(
            secondMoveRankIndex,
            secondMoveFileIndex,
          );
          if (pieceTypesBySquare.has(secondMoveSquare)) break;

          validSecondMoveSquares[validSecondMoveSquares.length - 1].push(
            secondMoveSquare,
          );
        }
      }
    }
  }

  return [validFirstMoveSquares, validSecondMoveSquares];
}

function convertPieceTypesBySquareToBoardLayout(
  pieceTypesBySquare: Map<string, PieceType>,
  sublevel: number,
) {
  let pieceNum = 0;
  const boardLayout: Record<string, PieceData> = {};
  for (let [square, type] of pieceTypesBySquare) {
    boardLayout[square] = {
      id: `${sublevel}-${type}${pieceNum++}`,
      type: type,
      numMoves: 0,
      isFrozen: false,
    };
  }
  return boardLayout;
}

function setFirstAndSecondMoveSquares(
  pieceTypes: PieceType[],
  pieceTypeIndex: number,
  pieceTypesBySquare: Map<string, PieceType>,
  validFirstMoveSquares: string[],
  validSecondMoveSquares: string[][],
) {
  const moveIndex = Math.floor(Math.random() * validFirstMoveSquares.length);
  const firstMoveSquare = validFirstMoveSquares[moveIndex];

  const secondMoveSquares = validSecondMoveSquares[moveIndex];
  if (secondMoveSquares.length === 0) {
    pieceTypesBySquare.set(firstMoveSquare, pieceTypes[pieceTypeIndex]);
    return 1;
  } else {
    const secondMoveSquare =
      secondMoveSquares[Math.floor(Math.random() * secondMoveSquares.length)];
    pieceTypesBySquare.set(secondMoveSquare, pieceTypes[pieceTypeIndex]);
    pieceTypesBySquare.set(firstMoveSquare, pieceTypes[pieceTypeIndex + 1]);
    return 2;
  }
}

export function getBoardLayout(sublevel: number) {
  const level = convertSublevelToLevel(sublevel);
  while (true) {
    const pieceTypes = getPieceTypes(level + 1);

    const goalRankIndex = Math.floor(Math.random() * RANKS.length);
    const goalFileIndex = Math.floor(Math.random() * FILES.length);
    const pieceTypesBySquare = new Map<string, PieceType>();
    let boardLayoutIsValid = true;

    let pieceTypeIndex = 0;
    while (pieceTypeIndex < pieceTypes.length - 1) {
      const deltas = PIECE_TYPE_TO_DELTAS[pieceTypes[pieceTypeIndex]];
      if (!deltas) {
        boardLayoutIsValid = false;
        break;
      }

      const canCalculateSecondMove = pieceTypeIndex > pieceTypes.length - 3;
      const [validFirstMoveSquares, validSecondMoveSquares] =
        getValidMoveSquares(
          goalRankIndex,
          goalFileIndex,
          deltas,
          pieceTypesBySquare,
          canCalculateSecondMove,
        );

      if (validFirstMoveSquares.length === 0) {
        boardLayoutIsValid = false;
        break;
      }

      pieceTypeIndex += setFirstAndSecondMoveSquares(
        pieceTypes,
        pieceTypeIndex,
        pieceTypesBySquare,
        validFirstMoveSquares,
        validSecondMoveSquares,
      );
    }

    if (boardLayoutIsValid) {
      pieceTypesBySquare.set(
        convertIndicesToSquare(goalRankIndex, goalFileIndex),
        pieceTypes.at(-1)!,
      );
      return convertPieceTypesBySquareToBoardLayout(
        pieceTypesBySquare,
        sublevel,
      );
    }
  }
}

export function getSquaresOfInterest(
  pieceType: PieceType,
  startSquare: string,
  boardLayout: Record<string, PieceData>,
) {
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
        if (
          newFileIndex < 0 ||
          newFileIndex >= FILES.length ||
          newRankIndex < 0 ||
          newRankIndex >= RANKS.length
        )
          break;

        const newSquare = convertIndicesToSquare(newRankIndex, newFileIndex);
        if (newSquare in boardLayout) {
          if (boardLayout[newSquare].type === "king") break;
          capturableSquares.add(newSquare);
          possibleInBetweenSquares.forEach((square) =>
            inBetweenSquares.add(square),
          );
          break;
        } else {
          possibleInBetweenSquares.push(newSquare);
        }
      }
    }
  }

  return [capturableSquares, inBetweenSquares];
}
