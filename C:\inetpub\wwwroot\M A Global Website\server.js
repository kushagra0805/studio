
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
    // Log headers to help diagnose IIS rewrite issues.
    // 'x-original-url' is added by iisnode and shows the URL before any rewrites.
    console.log(`[${new Date().toISOString()}] Request received. Original URL (x-original-url): ${req.headers['x-original-url']}. Rewritten URL: ${req.url}`);
    
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });
  
  server.listen(port, (err) => {
    if (err) {
      console.error('> Next.js server error:', err);
      throw err;
    }
    // This log will appear in the iisnode logs on the server
    console.log(`> Next.js App Ready on http://localhost:${port}`);
  });
}).catch(err => {
    console.error('> Error during app.prepare():', err.stack);
    process.exit(1);
});
