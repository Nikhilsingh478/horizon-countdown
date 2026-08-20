/**
 * Capacitor needs a static entry document. This snapshots the rendered "/"
 * document from a local production preview server into dist/client/index.html
 * so the Android WebView (and the offline PWA shell) can boot the exact same
 * app without a server.
 */
import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const PORT = 4178;
const URL_ = `http://127.0.0.1:${PORT}/`;

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--host", "127.0.0.1"], {
  stdio: "ignore",
  detached: false,
});

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

let html = "";
try {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(URL_);
      if (res.ok) {
        html = await res.text();
        break;
      }
    } catch {
      /* not up yet */
    }
    await wait(500);
  }
  if (!html) throw new Error("preview server did not respond");
  await writeFile("dist/client/index.html", html);
  console.log("wrote dist/client/index.html");
} finally {
  server.kill("SIGKILL");
}
