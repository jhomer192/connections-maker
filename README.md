# Connections Maker

Build your own [NYT Connections](https://www.nytimes.com/games/connections)-style word puzzle and send it to a friend as a link. Sixteen words, four hidden groups of four, four mistakes allowed. There is no account and no server holding your puzzle — the entire thing is encoded into the share URL.

[**Play it at jackhomer.com/connections-maker**](https://jackhomer.com/connections-maker/)

![A Connections puzzle in progress: the yellow group "Citrus fruits" is solved and twelve word tiles remain](https://jackhomer.com/screenshots/connections-maker.webp)

## Making a puzzle

Open the app, hit **Create**, and fill in four groups. Each group needs a category name and exactly four words, plus a difficulty colour — yellow is the easiest group, then green, blue, and purple for the trickiest. A puzzle title and author line are optional.

The form checks as you type and won't let you generate a link until it holds together: all sixteen words filled, no word repeated anywhere in the puzzle, and all four colours distinct.

Two shortcuts if you get stuck. Each group has a dice button that pulls a ready-made category from a bundle of 393 templates, matched to that group's colour and skipping words already used elsewhere. You can also paste a puzzle in as JSON, or copy one out.

Drafts autosave to `localStorage` as you work, up to ten of them, so closing the tab doesn't lose anything.

## How the link works

Hit **Generate share link** and the puzzle is serialised to JSON, encoded as base64url, and hung off the URL as `?p=…`. That link is the puzzle. Nothing is written to a database, nothing expires, and the app never sees your puzzle server-side.

A full puzzle URL runs long, so the app asks TinyURL to shorten it and shows you the short version to copy. If TinyURL is unreachable the label changes to *"shortener unavailable"* and you copy the full link instead, which works exactly the same.

Links made before the query-string format still open — the app reads the old `#p=…` hash form too.

## Playing

Pick four tiles you think belong together and submit. Four mistakes and you're out. Guess three of four correctly and it tells you **one away**; guess wrong and the tiles shake. Solved groups collapse into a coloured banner.

There's a shuffle button, a deselect-all button, and keyboard shortcuts — `Enter` submits a full selection, `Escape` clears it. Win or lose, the results screen reveals all four groups and gives you an emoji recap grid to copy and paste, the way the real thing does.

Four themes ship with it (Tokyo Night, Miami, Matcha, Gruvbox), picked from the dots in the corner and remembered between visits. All four are dark.

If you just want to see it work, the home screen has a **Play an example** button that loads one of three built-in puzzles at random.

## Running it locally

```bash
npm install
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run lint
```

## Stack

React 19, TypeScript, Vite 8, Tailwind v4, and `canvas-confetti` for the win animation. No router and no state library; navigation is `history.pushState`. Deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`.

## What leaves your browser

Puzzle contents are never posted to a backend of mine. Two things do reach third parties, worth saying plainly: the share link is sent to TinyURL when it shortens it, and the page loads Umami for anonymous visit counts.

## More

Background and build notes: [jackhomer.com/projects/connections-maker](https://jackhomer.com/projects/connections-maker/)
