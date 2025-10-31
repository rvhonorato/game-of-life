# 🎮 Conway's Game of Life

A modern implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) built with **Rust + WebAssembly** for high-performance computation and **React + TypeScript** for the interactive UI.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://rvhonorato.me/game-of-life)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

**[🚀 Live Demo](https://rvhonorato.me/game-of-life)**

---

## 🌟 Features

- **High Performance**: Game logic implemented in Rust, compiled to WebAssembly
- **Interactive Controls**: Play, pause, and step through generations
- **Randomized Start**: Each simulation begins with a unique random configuration
- **Toroidal Grid**: Universe wraps around edges (64×64 cells)
- **Modern Stack**: React 19, TypeScript, Vite, Tailwind CSS

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  React + TypeScript (Frontend)     │
│  • UI Controls (play/pause/tick)   │
│  • State management                 │
│  • Rendering                        │
└──────────────┬──────────────────────┘
               │ wasm-bindgen
┌──────────────▼──────────────────────┐
│  Rust + WASM (Game Engine)         │
│  • Universe struct                  │
│  • Conway's rules implementation    │
│  • Cell state management            │
└─────────────────────────────────────┘
```

### Project Structure

```
game-of-life/
├── wasm/              # Rust/WASM game engine
│   ├── src/
│   │   ├── lib.rs     # Core game logic
│   │   └── utils.rs   # Utilities
│   └── Cargo.toml
├── demo/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── .github/workflows/ # CI/CD for deployment
```

---

## 🚀 Quick Start

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/) (v20+) and npm

### Installation & Running

```bash
# Clone the repository
git clone https://github.com/rvhonorato/game-of-life
cd game-of-life/demo

# Install dependencies and start dev server
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Build both WASM and React app
npm run build

# Preview production build
npm run preview
```

---

## 🎯 How It Works

### Conway's Rules

1. Any live cell with 2-3 live neighbors survives
2. Any dead cell with exactly 3 live neighbors becomes alive
3. All other cells die or stay dead

### Implementation Details

The Rust engine:

- Maintains a `Vec<Cell>` representing the universe state
- Computes next generation using Conway's rules
- Exposes methods to JavaScript via `wasm-bindgen`

The React frontend:

- Initializes the WASM module asynchronously
- Calls `tick()` to advance generations
- Renders the universe using Unicode characters (⬜/⬛)

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:wasm   # Build only WASM module
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Testing Rust Code

```bash
cd wasm
cargo test
cargo clippy  # Run linter
```

---

## 📚 Learning Resources

This project is based on the excellent [Rust and WebAssembly Tutorial](https://rustwasm.github.io/docs/book/game-of-life/introduction.html) with additional enhancements.

**Key concepts demonstrated:**

- Rust ↔ JavaScript interop via wasm-bindgen
- WebAssembly memory management
- Performance optimization with Rust
- Modern React patterns (hooks, TypeScript)

For further improvements and learning paths, see [TODO.md](./TODO.md).

---

## 🤝 Contributing

Contributions are welcome! This is primarily a learning project, so feel free to:

- Report bugs or suggest features via [Issues](https://github.com/rvhonorato/game-of-life/issues)
- Submit pull requests with improvements
- Share your own implementations or variations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Rust and WebAssembly Working Group](https://rustwasm.github.io/) for the excellent tutorial
- [John Conway](https://en.wikipedia.org/wiki/John_Horton_Conway) for creating the Game of Life

---

**Made with 🦀 Rust and ⚛️ React**
