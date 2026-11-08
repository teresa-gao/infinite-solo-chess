import { useRef, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpDialog({ isOpen, onClose }: ModalProps) {
  const helpDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const helpDialog = helpDialogRef.current;
    if (!helpDialog) return;
    isOpen && !helpDialog.open ? helpDialog.showModal() : helpDialog.close();
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === helpDialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog ref={helpDialogRef} onKeyDown={handleKeyDown} onClick={handleBackdropClick} className="font-mono m-auto rounded-md p-5 open:flex flex-col items-center gap-4 backdrop:backdrop-brightness-75 dark:bg-zinc-900 dark:text-neutral-200">
      <header className="w-full flex">
        <h2 className="text-xl text-center grow">How to Play</h2>
      </header>

      <main id="instructions" className="space-y-1">
        <p>Goal: Capture the pieces so that only one remains.</p>
        <ul className="list-decimal list-disc space-y-1 ml-6">
          <li>Each piece moves as in a standard chess game.</li>
          <li>Each piece can capture up to two other pieces.</li>
          <li>A king cannot be captured by any other piece.</li>
          <li>If you reset the game, you return to Level 1.</li>
        </ul>
      </main>

      <footer>
        <button onClick={onClose} className="rounded outline-solid p-2 m-1 cursor-pointer hover:bg-zinc-950 hover:text-white hover:outline-zinc-950 dark:outline-neutral-300 dark:hover:text-black dark:hover:bg-neutral-100 dark:hover:outline-neutral-100">Close</button>
      </footer>
    </dialog>
  );
}
