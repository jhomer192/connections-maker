# Connections Maker

Create, share, and play custom [NYT Connections](https://www.nytimes.com/games/connections)-style word puzzles — no account, no backend, no database.

**[Play it live →](https://jhomer192.github.io/connections-maker/)**

## What it is

Connections is a word-grouping puzzle: 16 words, 4 hidden groups of 4. Players guess which words belong together before running out of mistakes.

This app lets you build your own puzzles and share them via a link. Everything lives in the URL — no server involved.

## How to create a puzzle

1. Open the app and go to **Create**
2. Name your puzzle (optional)
3. Add 4 groups — each with a category label and exactly 4 words
4. Set a difficulty color for each group (yellow = easiest, purple = hardest)
5. Click **Generate share link** — the app shortens it via TinyURL and copies it to your clipboard

Send the link to anyone. They click it, the puzzle loads instantly.

## How sharing works

The puzzle data is encoded as a query string parameter on the URL. No database, no login, no expiry. If TinyURL is unavailable, the full URL is copied as a fallback (still works, just longer).

## Tech

React + TypeScript + Vite. Deployed to GitHub Pages.
