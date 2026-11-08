import React, { useRef, useEffect } from 'react';

export default function Dialog({ title, headerText, isOpen, onClose, children }: {title: string, headerText: string, isOpen: boolean, onClose: () => void, children: React.ReactNode}) {
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
    <dialog id={title} title={title} ref={dialogRef} onKeyDown={handleKeyDown} onClick={handleBackdropClick} className="font-mono m-auto rounded-md p-5 open:flex flex-col items-center gap-4 backdrop:backdrop-brightness-75 dark:bg-zinc-900 dark:text-neutral-200 max-w-[33rem]">
      <header className="w-full flex">
        <h2 className="text-xl text-center grow">{headerText}</h2>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <button onClick={onClose} className="rounded outline-solid p-2 m-1 cursor-pointer hover:bg-zinc-950 hover:text-white hover:outline-zinc-950 dark:outline-neutral-300 dark:hover:text-black dark:hover:bg-neutral-100 dark:hover:outline-neutral-100">Close</button>
      </footer>
    </dialog>
  );
}
