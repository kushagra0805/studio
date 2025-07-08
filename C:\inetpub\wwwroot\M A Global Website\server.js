
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// This ensures the app runs in production mode.
const dev = false;
const port = process.env.PORT || 3000;

console.log(`[INFO] Starting Next.js server in production mode.`);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    console.log(`[REQUEST] Handling: ${req.method} ${req.url}`);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) {
      console.error('[ERROR] Failed to start server:', err);
      throw err;
    }
    console.log(`> Next.js App Ready on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('[ERROR] An error occurred during app preparation:', err);
  process.exit(1);
});
