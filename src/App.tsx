import { useState, useRef, useEffect } from "react";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faCircleQuestion,
  faCircleHalfStroke,
  faCircle as faCircleSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";

import useSound from "use-sound";
import resetSound from "./assets/sounds/reset.mp3";
import captureSound from "./assets/sounds/capture.mp3";
import newSublevelSound from "./assets/sounds/new-sublevel.mp3";
import newLevelSound from "./assets/sounds/new-level.mp3";

import { NUM_SUBLEVELS_PER_LEVEL } from "./utils/constants";
import {
  getBoardLayout,
  getSquaresOfInterest,
  convertSublevelToLevel,
} from "./utils/helpers";
import Board from "./components/Board.tsx";
import type { PieceData } from "./components/Piece.tsx";
import IconButton from "./components/IconButton.tsx";
import Dialog from "./components/Dialog.tsx";

export default function App() {
  const [playResetSound] = useSound(resetSound);
  const [playCaptureSound] = useSound(captureSound);
  const [playNewSublevelSound] = useSound(newSublevelSound);
  const [playNewLevelSound] = useSound(newLevelSound);

  const [sublevel, setSublevel] = useState<number>(
    Number(localStorage.getItem("sublevel")) || 0,
  );
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(
    () => {
      try {
        const savedBoardLayout = localStorage.getItem("boardLayout");
        if (savedBoardLayout) {
          return JSON.parse(savedBoardLayout) as Record<string, PieceData>;
        } else {
        }
      } catch (error) {
        console.log("Error loading saved board layout:");
        console.log(error);
      }
      return getBoardLayout(sublevel);
    },
  );

  const [inBetweenSquares, setInBetweenSquares] = useState<Set<string>>(
    () => new Set(),
  );
  const [capturableSquares, setCapturableSquares] = useState<Set<string>>(
    () => new Set(),
  );
  const [isInfoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [isBoardFrozen, setBoardFrozen] = useState<boolean>(false);

  const delayTimerRef = useRef<number>(null);
  const savedHighScoreRef = useRef<number>(
    Number(localStorage.getItem("highScore")) || 1,
  );

  const isNewSublevel = delayTimerRef.current !== null;
  const level = convertSublevelToLevel(sublevel);
  const isNewLevel =
    isNewSublevel &&
    (level != convertSublevelToLevel(sublevel - 1) || sublevel === 0);

  const isNewHighScore = isNewLevel && level > savedHighScoreRef.current;
  const highScore = Math.max(level, savedHighScoreRef.current);

  useEffect(() => {
    if (!isBoardFrozen) {
      localStorage.setItem("boardLayout", JSON.stringify(boardLayout));
    }
  }, [boardLayout]);

  useEffect(() => {
    if (sublevel === 0) {
      playResetSound();
    } else if (isNewLevel) {
      playNewLevelSound();
    } else {
      playNewSublevelSound();
    }
  }, [sublevel]);

  const resetGame = () => {
    savedHighScoreRef.current = highScore;
    setSublevel(0);
    localStorage.setItem("sublevel", String(0));
    setBoardLayout(getBoardLayout(0));
  };

  const levelUp = () => {
    const newSublevel = sublevel + 1;
    setSublevel(newSublevel);

    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
    }
    setBoardFrozen(true);
    delayTimerRef.current = setTimeout(() => {
      setBoardFrozen(false);
      setBoardLayout(getBoardLayout(newSublevel));

      localStorage.setItem("sublevel", String(newSublevel));
      localStorage.setItem("highScore", String(highScore));
    }, 1500);
  };

  const onDragStart = (event: DragStartEvent) => {
    const pieceId = event.operation.source?.id;
    if (!pieceId) return;

    const startSquare = Object.keys(boardLayout).find(
      (key) => boardLayout[key].id === pieceId,
    );
    if (!startSquare) return false;

    const pieceType = boardLayout[startSquare].type;
    const [capturableSquares, inBetweenSquares] = getSquaresOfInterest(
      pieceType,
      startSquare,
      boardLayout,
    );
    setCapturableSquares(capturableSquares);
    setInBetweenSquares(inBetweenSquares);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const oldCapturableSquares = capturableSquares;
    setCapturableSquares(new Set());
    setInBetweenSquares(new Set());

    if (event.canceled) return;

    const endSquare = String(event.operation.target?.id);
    if (endSquare == String(undefined)) return;

    const pieceId = event.operation.source?.id;
    if (!pieceId) return;

    const startSquare = Object.keys(boardLayout).find(
      (key) => boardLayout[key].id === pieceId,
    );
    if (!startSquare) return false;

    const piece = boardLayout[startSquare];

    const isCapturable =
      endSquare in boardLayout && oldCapturableSquares.has(endSquare);
    if (!isCapturable) return;

    const { [startSquare]: _, ...newBoardLayout } = boardLayout;
    newBoardLayout[endSquare] = {
      id: piece.id + "x",
      type: piece.type,
      isFrozen: false,
      numMoves: piece.numMoves + 1,
    };
    setBoardLayout(newBoardLayout);
    playCaptureSound();
    if (Object.keys(newBoardLayout).length === 1) {
      levelUp();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-7 mx-4 my-10 font-mono text-gray-950 dark:text-gray-200">
      <header className="grid grid-cols-[1fr_auto_1fr] w-full items-end">
        <div id="resetButtonContainer" className="flex flex-row">
          <IconButton
            onClick={resetGame}
            disabled={sublevel === 0 || isBoardFrozen}
            icon={faArrowRotateLeft}
          />
        </div>

        <h1 className="text-2xl text-center font-bold">
          Infinite
          <br />
          Solo Chess
        </h1>

        <div id="infoButtonContainer" className="flex flex-row-reverse">
          <IconButton
            onClick={() => setInfoDialogOpen(true)}
            icon={faCircleQuestion}
          />
          <Dialog
            isOpen={isInfoDialogOpen}
            onClose={() => {
              setInfoDialogOpen(false);
            }}
          />
        </div>
      </header>

      <main className="flex flex-col gap-7 w-full">
        <Board
          boardLayout={boardLayout}
          inBetweenSquares={inBetweenSquares}
          capturableSquares={capturableSquares}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isBoardFrozen={isBoardFrozen}
        />

        <div
          id="boardBottomContainer"
          className="w-full flex justify-between items-end"
        >
          <p id="level">
            <span id="levelIndicator" key={`${level}-${sublevel}`}>
              <FontAwesomeIcon
                className={`${isNewSublevel ? "animate-blinking" : ""}`}
                icon={
                  sublevel % NUM_SUBLEVELS_PER_LEVEL === 0
                    ? faCircleRegular
                    : sublevel % NUM_SUBLEVELS_PER_LEVEL <
                        NUM_SUBLEVELS_PER_LEVEL - 1
                      ? faCircleHalfStroke
                      : faCircleSolid
                }
              />
            </span>{" "}
            <span
              key={level}
              className={`${isNewLevel ? "animate-blinking" : ""}`}
            >
              Level {level}
            </span>
          </p>
          <div
            key={highScore}
            id="highScore"
            className={`${isNewHighScore ? "animate-blinking" : ""}`}
          >
            High Score: {highScore}
          </div>
        </div>
      </main>
    </div>
  );
}
