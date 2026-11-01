# about

I love [Chess.com's Solo Chess game](https://www.chess.com/solo-chess)
and thought it'd be fun to make a more customizable version,
especially since I've been meaning to get more practice with TypeScript and React.

# tasks

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

## todo

- [ ] Gamify!
  - [x] Generate multiple copies of the same type of piece.
  - [ ] Enforce piece move rules.
  - [ ] Generate valid puzzle starting positions.
  - [x] Implement captures.
    - [ ] Prevent pieces from coming "unstacked."
  - [ ] Enforce two-move limit with piece color change.
  - [ ] Count number of solved puzzles (and/or display boxes with green check marks? for bonus dopamine).
  - [ ] Add basic endscreen (as simple as https://www.chess.com/solo-chess's "VICTORY"?)
- [ ] Improve UI/UX.
  - [ ] Debug weird piece glitches if not resolved by later refactoring.
  - [ ] Add instructions (with customization built in?).
  - [ ] Add mobile friendliness/responsiveness.
  - [ ] Show valid moves on board?
  - [ ] Add confetti animation upon end/win like Chess.com?
  - [ ] Display remaining move count for pieces if greater than two?
  - [x] Add automatic dark/light mode.
  - [ ] Customize which and how many starting pieces to use.
  - [ ] Customize how many moves are possible per piece?
  - [ ] Customize goal vs. infinite mode?
- [ ] Finalize.
  - [ ] Clean up codebase (e.g., documentation, explicit semicolons, standardized tab size).
  - [ ] Add licensing information somewhere (separate info tab with MIT license as well? alt text over each piece?):
  ```
  <a href="https://commons.wikimedia.org/wiki/File:Chess_bdt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_blt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_kdt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_klt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_ndt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_nlt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_pdt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_plt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_qdt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_qlt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_rdt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  <a href="https://commons.wikimedia.org/wiki/File:Chess_rlt60.png">en:User:Cburnett</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
  ```
