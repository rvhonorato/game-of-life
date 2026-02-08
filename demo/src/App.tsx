import { Canvas } from "./components/Canvas";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 gap-6">
        <div className="text-center">
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Game of Life
          </h1>
          <p
            className="text-sm mt-1 max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            <a
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--link-color)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--link-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--link-color)")
              }
            >
              Conway's Game of Life
            </a>{" "}
            in Rust/WASM + React
          </p>
          <a
            href="https://github.com/rvhonorato/game-of-life"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-medium"
            style={{
              color: "var(--link-color)",
              transition: "color 250ms ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--link-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--link-color)")
            }
          >
            View on GitHub &rarr;
          </a>
        </div>
        <div
          className="max-w-md text-xs rounded-lg p-3"
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-secondary)",
            borderLeft: "3px solid var(--accent-color)",
          }}
        >
          All game logic runs via{" "}
          <a
            href="https://webassembly.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--link-color)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--link-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--link-color)")
            }
          >
            WebAssembly
          </a>
          &mdash;essentially Rust executing at near-native speed, right in your
          browser.
        </div>
        <Canvas />
      </main>
      <footer
        className="w-full py-2 text-center text-sm border-t"
        style={{
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-secondary)",
          borderColor: "var(--border-color)",
        }}
      >
        Built by{" "}
        <a
          href="https://rvhonorato.me"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--link-color)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--link-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--link-color)")
          }
        >
          Rodrigo V Honorato
        </a>
        . Public domain (Unlicense).
      </footer>
    </div>
  );
}

export default App;
