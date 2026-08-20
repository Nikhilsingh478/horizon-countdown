/**
 * Capacitor's WebView (and the offline PWA shell) needs a static entry
 * document. The app is a client-rendered single screen, so a minimal shell
 * that loads the built client entry is enough — the router mounts the
 * countdown immediately, with no server involved.
 */
import { readdir, writeFile } from "node:fs/promises";

const dir = "dist/client/assets";
const files = await readdir(dir);
const entry = files.find((f) => /^index-.*\.js$/.test(f));
const css = files.find((f) => f.endsWith(".css"));

if (!entry || !css) throw new Error("could not locate built client entry assets");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Day 052 — October 10, 2026</title>
    <meta name="description" content="A quiet countdown to October 10, 2026." />
    <meta name="theme-color" content="#08090B" />
    <meta name="color-scheme" content="dark" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <link rel="manifest" href="/manifest.webmanifest" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="stylesheet" href="/assets/${css}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600&family=Cormorant+Garamond:wght@400;500;600&display=swap"
    />
    <style>
      html,
      body {
        margin: 0;
        background: #08090b;
        color: #f2f2f0;
      }
    </style>
  </head>
  <body>
    <script type="module" src="/assets/${entry}"></script>
  </body>
</html>
`;

await writeFile("dist/client/index.html", html);
console.log(`wrote dist/client/index.html (entry: ${entry})`);
