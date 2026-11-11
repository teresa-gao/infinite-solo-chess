import React, { useRef, useEffect } from 'react';

export default function Dialog({ id, headerText, isOpen, onClose, children }: {id: string, headerText: string, isOpen: boolean, onClose: () => void, children: React.ReactNode}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    isOpen && !dialog.open ? dialog.showModal() : dialog.close();
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
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
    <dialog id={id} ref={dialogRef} onKeyDown={handleKeyDown} onClick={handleBackdropClick} className="m-auto rounded-lg p-6 open:flex flex-col items-center gap-4 backdrop:backdrop-brightness-75 dark:bg-zinc-900 dark:text-neutral-200 w-[90dvw] max-w-xl">
      <header className="w-full flex">
        <h2 className="text-lg font-bold text-center grow">{headerText}</h2>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <button onClick={onClose} className="rounded outline-solid outline p-2 m-2 cursor-pointer hover:bg-zinc-950 hover:text-white hover:outline-zinc-950 dark:outline-neutral-200 dark:hover:text-black dark:hover:bg-neutral-100 dark:hover:outline-neutral-100">Close</button>
      </footer>
    </dialog>
  );
}
