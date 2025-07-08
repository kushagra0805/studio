
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Ensure the app is running in production mode.
const dev = false;
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js App Ready on http://localhost:${port}`);
  });
});
