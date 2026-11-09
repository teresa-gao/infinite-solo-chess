# about

I love [Chess.com's Solo Chess game](https://www.chess.com/solo-chess)
and thought it'd be fun to make my own, infinite version,
especially since I've been meaning to get more practice with React, TypeScript, and Tailwind CSS.

This is a work in progress!

# tasks

## todo

- [ ] Add basic UI/UX for gameplay.
  - [x] Add reset, help (instructions), and info buttons.
    - [x] Implement reset.
    - [x] Add help and info dialogs ~~(or just tooltips?)~~.
    - [x] Add piece source image credits.
  - [x] Add levels.
    - [x] Add sublevels.
    - [x] Save and show high score.
  - [ ] Pause before moving to next puzzle.
- [ ] Debug, round 2!
  - [ ] Fix all impossible puzzles.
  - [ ] Debug pieces gliding "between" puzzles.
- [ ] Improve UI/UX.
  - [x] Add automatic dark/light mode.
  - [x] Highlight square on hover.
  - [ ] Add sound effects and/or other puzzle-success feedback?
  - [ ] Add mobile friendliness/responsiveness.
    - [ ] Resize board and buttons to fit on various screen sizes.
    - [x] Enable dragging and dropping on mobile within normal amount of delay.
  - [ ] Show valid moves on board?
  - [ ] Customize which and how many starting pieces to use.
  - [ ] Customize how many moves are possible per piece?
    - [ ] Display remaining move count for pieces if greater than two?
  - [ ] Customize goal vs. infinite mode? (and/or puzzles per level?)
  - [ ] Add game timer (saved with high score?).
- [ ] Finalize.
  - [ ] Optimize puzzle generation to be as minimal/efficient as possible.
    - [ ] Calculate next puzzle in background? (if it seems likely that someone could make it past level ~35?)
  - [ ] Clean up codebase (e.g., documentation, explicit semicolons, standardized tab size).

## done

- [x] Create hello world project.
  - [x] Set up TypeScript and React.
    - [x] Upgrade node, npm, and nvm versions.
    - [x] Install React/Vite and TypeScript, *whose installation automatically comes with the below (struck through)*.
      - [x] ~~Set up minimum project with standard structure.~~
      - [x] ~~Figure out how to deploy locally in dev.~~
  - [x] Figure out how to deploy to GitHub pages.
- [x] Find chess PNGs (from https://commons.wikimedia.org/wiki/Category:PNG_chess_pieces/Standard_transparent?).
  - [x] Consider using fontawesome chess pieces instead? https://fontawesome.com/v5/icons/categories/classic/solid/chess
  - [x] Display pieces on page.
    - [x] Implement component(s) for pieces.
  - [x] Enable clicking and dragging of pieces (anywhere for now? see https://dndkit.com/react).
- [x] Create chessboard.
  - [x] Initialize chessboard squares as droppable (snap to chess grid when pieces are clicked and dragged).
    - [x] Add back all pieces.
  - [x] Color chessboard as standard grid.
  - [x] Initialize pieces on chessboard.
- [x] Add basic move mechanics.
  - [x] Generate multiple copies of the same type of piece.
  - [x] Enforce piece move rules.
  - [x] Implement captures.
    - [x] Prevent pieces from coming "unstacked."
- [x] Debug first bugs.
  - [x] Fix the weird flyaway animation(??).
  - [x] Fix the random piece changing/regeneration.
- [x] Add more complicated game mechanics.
  - [x] Prevent non-knights from jumping over other pieces.
    - [x] Only allow capturing, not moving to blank squares.
  - [x] Generate valid puzzle starting positions.
    - [x] Require pieces to move twice when possible.
  - [x] Enforce two-move limit with piece color change.
    - [x] Hide "ghost" when dragging black piece.
