# Conway's Game of Life

An implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) with the game logic written in Rust and compiled to WebAssembly, and a React + TypeScript frontend.

[Live demo](https://rvhonorato.me/game-of-life)

## What it does

The game runs on a 64×64 toroidal grid (wraps around at the edges) with standard Conway rules. The universe starts with a random configuration, and you can play/pause the simulation or step through it one generation at a time. The rendering is done with Unicode characters (⬜/⬛).

## Architecture

The project is split into two parts:

- `wasm/` - Rust code that implements the game logic (Universe struct, Cell enum, Conway's rules). This gets compiled to WebAssembly using wasm-pack.
- `demo/` - React frontend that loads the WASM module, manages the game state, and handles the UI controls.

The Rust code exposes a `Universe` class to JavaScript via wasm-bindgen. The React component initializes it asynchronously, then calls `tick()` to advance generations and `render()` to get the string representation.

## Getting started

You'll need Rust (latest stable), [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/), and Node.js (v20+).

```bash
git clone https://github.com/rvhonorato/game-of-life
cd game-of-life/demo
npm install
npm run dev
```

This will build the WASM module and start the dev server at `http://localhost:5173`.

## Development

```bash
npm run dev          # Start dev server (rebuilds WASM automatically)
npm run build        # Production build
npm run build:wasm   # Rebuild just the WASM module
npm run lint         # Run ESLint
```

For Rust development:

```bash
cd wasm
cargo test      # Run tests
cargo clippy    # Lint
```

## How it works

Conway's Game of Life follows three simple rules:

1. Live cells with 2-3 neighbors survive
2. Dead cells with exactly 3 neighbors become alive
3. Everything else dies or stays dead

The Rust code maintains a `Vec<Cell>` representing the universe and computes each generation. The React component calls `tick()` to advance the simulation and `render()` to get the current state as a string.

## Background

This started as a way to learn Rust and WebAssembly following the [Rust WASM tutorial](https://rustwasm.github.io/docs/book/game-of-life/introduction.html). I added some improvements and a React frontend to make it more interactive. See [TODO.md](./TODO.md) for ideas on where to take it next (direct memory access, bit packing, SIMD, etc.).

## License

Public domain (Unlicense). Do whatever you want with it.
