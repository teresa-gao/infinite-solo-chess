import { useRef, useEffect } from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

import useSound from "use-sound";
import dialogOpenSound from "../assets/sounds/dialog-open.mp3";
import dialogCloseSound from "../assets/sounds/dialog-close.mp3";

import IconButton from "../components/IconButton.tsx";
import Hyperlink from "../components/Hyperlink.tsx";

export default function Dialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [playDialogOpenSound] = useSound(dialogOpenSound);
  const [playDialogCloseSound] = useSound(dialogCloseSound);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      playDialogOpenSound();
      dialog.showModal();
    } else {
      playDialogCloseSound();
      dialog.close();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      className="m-auto rounded-lg px-6 pt-6 pb-8 open:flex flex-col items-center gap-4 backdrop:backdrop-brightness-75 dark:bg-zinc-900 text-gray-800 dark:text-gray-300 w-9/10 max-w-xl"
    >
      <main>
        <div id="instructions" className="space-y-3">
          <header className="w-full grid grid-cols-[1fr_max-content_1fr]">
            <h2 className="text-lg font-bold col-start-2">How to Play</h2>
            <div className="flex flex-row-reverse">
              <IconButton onClick={onClose} icon={faXmark} />
            </div>
          </header>
          <main>
            <div id="rules" className="space-y-3">
              <p>Goal: Capture the pieces so that only one remains.</p>
              <ul className="list-decimal list-disc space-y-2 ml-6">
                <li>Pieces can only move to capture other pieces.</li>
                <li>Each piece can capture up to two other pieces.</li>
                <li>No piece can capture a king.</li>
                <li>If you reset the game, you return to Level 1.</li>
              </ul>
            </div>
          </main>
        </div>

        <hr className="h-px my-5 border-0 bg-zinc-950 dark:bg-neutral-200" />

        <div id="about" className="space-y-4">
          <header>
            <h2 className="text-lg font-bold text-center">About This Game</h2>
          </header>
          <p>
            Infinite Solo Chess was created by Teresa Gao, a software engineer
            and a fan of the original (non-infinite) version of the game on{" "}
            <Hyperlink href="https://www.chess.com/solo-chess">
              Chess.com
            </Hyperlink>
            .
          </p>
          <p>
            The sound effects were composed using{" "}
            <Hyperlink href="https://musescore.org">MuseScore</Hyperlink>, and
            the pieces were designed by Pat Gao.
          </p>
          <p>
            Please feel free to say hi on{" "}
            <Hyperlink href="https://www.linkedin.com/in/teresa-gao/">
              LinkedIn
            </Hyperlink>{" "}
            or check out the source code on{" "}
            <Hyperlink href="https://github.com/teresa-gao/infinite-solo-chess">
              GitHub
            </Hyperlink>
            !
          </p>
        </div>
      </main>
    </dialog>
  );
}
