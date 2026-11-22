# Infinite Solo Chess

I love [Chess.com's Solo Chess game](https://www.chess.com/solo-chess)
and thought it'd be fun to make my own, infinite version,
especially as I've been meaning to get more practice with React, TypeScript, and Tailwind CSS.

## how to play

**Play here: https://teresa-gao.github.io/infinite-solo-chess.**

The website includes the game as well as instructions.

## how to develop

Install npm and set up a local development server (http://localhost:5173):

```
npm install
npm run dev
```

(Optional) helpful Git pre-commit hooks (contents of `.git/hooks/pre-commit`)
for TypeScript syntax-checking and Prettier formatting:

```
#!/bin/sh
npx tsc -b
npx prettier --write .
```

The main entrypoint for the app is `App.tsx`,
which links to various assets and components that are also in the `src/` subdirectory.

### task list

Curious how I planned and implemented this project?
Check out [TASKS.md](./TASKS.md).

Despite the name of the file, my task list was created and used by a human (yours truly):
beyond occasional help with debugging from Google AI Mode, **this project was created by hand, without AI.**
