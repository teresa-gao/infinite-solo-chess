# about

I love [Chess.com's Solo Chess game](https://www.chess.com/solo-chess)
and thought it'd be fun to make a more customizable version,
especially since I've been meaning to get more practice with TypeScript and React.

# tasks

- [x] Create hello world project.
  - [x] Set up TypeScript and React.
    - [x] Upgrade node, npm, and nvm versions.
    - [x] Install React/Vite and TypeScript, *whose installation automatically comes with the below (struck through)*.
      - [x] ~~Set up minimum project with standard structure.~~
      - [x] ~~Figure out how to deploy locally in dev.~~
  - [x] Figure out how to deploy to GitHub pages.
- [x] Find chess PNGs (from https://commons.wikimedia.org/wiki/Category:PNG_chess_pieces/Standard_transparent?).
  - [x] Display pieces on page.
    - [x] Implement component(s) for pieces.
  - [ ] Enable clicking and dragging of pieces (anywhere for now? see https://dndkit.com/react).
    - [x] Add dragging.
    - [ ] Add dropping.
- [ ] Create chessboard.
  - [ ] Snap to chess grid when pieces are clicked and dragged.
  - [ ] Initialize pieces on chess board.
- [ ] Add chess/puzzle basics.
  - [ ] Enforce piece move rules.
  - [ ] Generate puzzle starting positions.
- [ ] Gamify!
  - [ ] Enforce two-move limit with piece color change.
  - [ ] Count number of solved puzzles (and/or display boxes with green check marks? for bonus dopamine).
  - [ ] Add basic endscreen (as simple as https://www.chess.com/solo-chess's "VICTORY"?)
- [ ] Improve UI/UX.
  - [ ] Add instructions (with customization built in?).
  - [ ] Add confetti animation upon end/win like Chess.com?
  - [ ] Add automatic dark/light mode?
  - [ ] Customize which and how many starting pieces to use.
  - [ ] Customize how many moves are possible per piece?
  - [ ] Customize goal vs. infinite mode?
- [ ] Finalize.
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
