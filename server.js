
// server.js
const { parse } = require('url');
const next = require('next');
const express = require('express');

// Explicitly set dev to false for production on IIS. This is critical.
const dev = false; 
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });
  
  server.listen(port, (err) => {
    if (err) throw err;
    // This log will appear in the iisnode logs on the server
    console.log(`> Next.js App Ready on http://localhost:${port}`);
  });
});
