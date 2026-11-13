import { useState, useRef, useEffect } from 'react'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateLeft, faCircleInfo, faCircleHalfStroke, faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons'
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons'

import { NUM_SUBLEVELS_PER_LEVEL } from './utils/constants'
import { getBoardLayout, getSquaresOfInterest, convertSublevelToLevel } from './utils/helpers'
import Board from './components/Board.tsx'
import type { PieceData } from './components/Piece.tsx'
import Dialog from './components/Dialog.tsx'

import './App.css'

export default function App() {
  const [sublevel, setSublevel] = useState<number>(Number(localStorage.getItem('sublevel')) || 0);
  const [boardLayout, setBoardLayout] = useState<Record<string, PieceData>>(() => {
    try {
      const savedBoardLayout = localStorage.getItem('boardLayout');
      if (savedBoardLayout) {
        return JSON.parse(savedBoardLayout) as Record<string, PieceData>;
      } else {}
    } catch (error) {
      console.log('Error loading saved board layout:')
      console.log(error);
    }
    return getBoardLayout(sublevel);
  });

  const [inBetweenSquares, setInBetweenSquares] = useState<Set<string>>(() => new Set());
  const [capturableSquares, setCapturableSquares] = useState<Set<string>>(() => new Set());
  const [isInfoDialogOpen, setInfoDialogOpen] = useState<boolean>(false);
  const [isBoardFrozen, setBoardFrozen] = useState<boolean>(false);

  const delayTimerRef = useRef<number>(null);
  const savedHighScoreRef = useRef<number>(Number(localStorage.getItem('highScore')) || 1);

  const isNewSublevel = delayTimerRef.current !== null;
  const level = convertSublevelToLevel(sublevel);
  const isNewLevel = isNewSublevel && ((level != convertSublevelToLevel(sublevel - 1)) || (sublevel === 0));
  const isNewHighScore = isNewLevel && (level > savedHighScoreRef.current);
  const highScore = Math.max(level, savedHighScoreRef.current);

  useEffect(() => {
    if (!isBoardFrozen) {
      localStorage.setItem('boardLayout', JSON.stringify(boardLayout))
    }
  }, [boardLayout])

  const resetGame = () => {
    savedHighScoreRef.current = highScore;
    setSublevel(0);
    localStorage.setItem('sublevel', String(0));
    setBoardLayout(getBoardLayout(0));
  }

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

      localStorage.setItem('sublevel', String(newSublevel));
      localStorage.setItem('highScore', String(highScore));
    }, 1500);
  }

  const onDragStart = (event: DragStartEvent) => {
    const pieceId = event.operation.source?.id;
    if (!pieceId) return;

    const startSquare = Object.keys(boardLayout).find(key => boardLayout[key].id === pieceId);
    if (!startSquare) return false;

    const pieceType = boardLayout[startSquare].type;
    const [capturableSquares, inBetweenSquares] = getSquaresOfInterest(pieceType, startSquare, boardLayout);
    setCapturableSquares(capturableSquares);
    setInBetweenSquares(inBetweenSquares);
  }

  const onDragEnd = (event: DragEndEvent) => {
    const oldCapturableSquares = capturableSquares;
    setCapturableSquares(new Set());
    setInBetweenSquares(new Set());

    if (event.canceled) return;

    const endSquare = String(event.operation.target?.id);
    if (endSquare == String(undefined)) return;

    const pieceId = event.operation.source?.id;
    if (!pieceId) return;

    const startSquare = Object.keys(boardLayout).find(key => boardLayout[key].id === pieceId);
    if (!startSquare) return false;

    const piece = boardLayout[startSquare];

    const isCapturable = (endSquare in boardLayout) && (oldCapturableSquares.has(endSquare))
    if (!isCapturable) return;

    const { [startSquare]: _, ...newBoardLayout } = boardLayout;
    newBoardLayout[endSquare] = {id: piece.id + 'x', type: piece.type, isFrozen: false, numMoves: piece.numMoves + 1};
    setBoardLayout(newBoardLayout);
    if (Object.keys(newBoardLayout).length === 1) {
      levelUp()
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-7 mx-4 my-10 font-mono text-zinc-950 dark:text-neutral-200">
      <header className="grid grid-cols-[1fr_auto_1fr] w-full">
        <div id="resetButtonContainer" className="flex flex-row">
          <button id="resetButton" onClick={resetGame} disabled={isBoardFrozen} className="cursor-pointer enabled:hover:opacity-30 enabled:dark:hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-100"><FontAwesomeIcon icon={faArrowRotateLeft} /></button>
        </div>

        <h1 className="text-xl font-bold">
          Infinite Solo Chess
        </h1>

        <div id="infoButtonContainer" className="flex flex-row-reverse">
          <button id="infoButton" onClick={() => setInfoDialogOpen(true)} className="cursor-pointer hover:opacity-30 dark:hover:opacity-60 text-lg"><FontAwesomeIcon icon={faCircleInfo} /></button>
            <Dialog id="Info" headerText="About This Game" isOpen={isInfoDialogOpen} onClose={() => {setInfoDialogOpen(false)}}>
              <div className="space-y-4">
                <p>Infinite Solo Chess was created by Teresa Gao, a software engineer and a fan of the original (non-infinite) version of the game on <a href="https://www.chess.com/solo-chess" className="underline hover:opacity-30 dark:hover:opacity-60">Chess.com</a>.</p>
                <p>Please feel free to say hi on <a href="https://www.linkedin.com/in/teresa-gao/" className="underline hover:opacity-30 dark:hover:opacity-60">LinkedIn</a> or check out the source code on <a href="https://github.com/teresa-gao/infinite-solo-chess" className="underline hover:opacity-30 dark:hover:opacity-60">GitHub</a>!</p>
                <p>The pieces were designed by Pat Gao.</p>
              </div>
            </Dialog>
          </div>
        </header>

        <main className="flex flex-col gap-7">
          <Board boardLayout={boardLayout} inBetweenSquares={inBetweenSquares} capturableSquares={capturableSquares} onDragStart={onDragStart} onDragEnd={onDragEnd} isBoardFrozen={isBoardFrozen} />

          <div id="boardBottomContainer" className="w-full flex justify-between items-end">
            <p id="level">
              <span key={`${level}-${sublevel}`}><FontAwesomeIcon className={`${isNewSublevel ? "animate-blinking" : ""}`} icon={sublevel % NUM_SUBLEVELS_PER_LEVEL === 0 ? faCircleRegular : (sublevel % NUM_SUBLEVELS_PER_LEVEL < NUM_SUBLEVELS_PER_LEVEL - 1 ? faCircleHalfStroke : faCircleSolid)} />
              </span> <span key={level} className={`${isNewLevel ? "animate-blinking" : ""}`} >Level {level}</span>
            </p>
            <div key={highScore} id="highScore" className={`${isNewHighScore ? "animate-blinking" : ""}`}>High Score: {highScore}</div>
          </div>
        </main>

      <footer id="instructions" className="space-y-3">
        <hr className="h-px mt-1 mb-8 border-0 bg-zinc-950 dark:bg-neutral-200" />
        <h2 className="text-lg font-bold text-center">How to Play</h2>
        <div id="rules" className="space-y-3">
          <p>Goal: Capture the pieces so that only one remains.</p>
          <ul className="list-decimal list-disc space-y-2 ml-6">
            <li>Pieces can only move to capture other pieces.</li>
            <li>Each piece can capture up to two other pieces.</li>
            <li>No piece can capture a king.</li>
            <li>If you reset the game, you return to Level 1.</li>
          </ul>
          </div>
      </footer>
    </div>
  )
}
