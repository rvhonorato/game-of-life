# Conway's Game of Life

This repository is an implementation of the game of life as a React web-app
that uses Rust (+ WebAssembly) as the game engine.

To see it in action: [rvhonorato.me/game-of-life](https://rvhonorato.me/game-of-life)

To run it locally, you'll need Rust, [`wasm-pack`](https://github.com/rustwasm/wasm-pack)
and [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```bash
git clone https://github.com/rvhonorato/game-of-life
cd game-of-life/demo
npm run dev
```

---

Based on
[`rustwasm` tutorial](https://rustwasm.github.io/docs/book/game-of-life/introduction.html)
with some modifications.
