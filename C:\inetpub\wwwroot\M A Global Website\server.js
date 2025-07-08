// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// This ensures the app runs in production mode.
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

// iisnode provides the port in an environment variable
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    console.log(`[REQUEST] Handling in Next.js: ${req.method} ${req.url}`);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Next.js App Ready on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('[ERROR] An error occurred during app preparation:', err);
  process.exit(1);
});
