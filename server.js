// server.js
const { parse } = require('url');
const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
// When using iisnode, the PORT environment variable is used
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    // Correctly parse the URL and pass it to the Next.js handler
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });
  
  server.listen(port, (err) => {
    if (err) throw err;
    // This will be logged in the iisnode logs
    console.log(`> Ready on port ${port}`);
  });
});
