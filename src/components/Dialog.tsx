import React, { useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import useSound from 'use-sound';
import dialogOpenSound from '../assets/sounds/dialog-open.mp3'
import dialogCloseSound from '../assets/sounds/dialog-close.mp3'

export default function Dialog({ id, headerText, isOpen, onClose, children }: {id: string, headerText: string, isOpen: boolean, onClose: () => void, children: React.ReactNode}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [playDialogOpenSound] = useSound(dialogOpenSound);
  const [playDialogCloseSound] = useSound(dialogCloseSound);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      playDialogOpenSound();
      dialog.showModal()
    } else {
      playDialogCloseSound();
      dialog.close();
    }
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
    <dialog id={id} ref={dialogRef} onKeyDown={handleKeyDown} onClick={handleBackdropClick} className="m-auto rounded-lg px-6 pt-6 pb-8 open:flex flex-col items-center gap-4 backdrop:backdrop-brightness-75 dark:bg-zinc-900 text-gray-800 dark:text-gray-300 w-9/10 max-w-md">
      <header className="w-full grid grid-cols-[1fr_max-content_1fr]">
        <h2 className="text-lg font-bold col-start-2">{headerText}</h2>
        <div className="flex flex-row-reverse">
          <button onClick={onClose} className="cursor-pointer hover:opacity-30 dark:hover:opacity-60">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </header>
      <main>
        {children}
      </main>
    </dialog>
  );
}
