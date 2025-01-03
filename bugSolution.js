const http = require('http');
const maxBodySize = 1024 * 1024; // 1MB limit

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end();
    return;
  }

  let body = '';
  let bodyLength = 0;

  req.on('data', chunk => {
    bodyLength += chunk.length;
    if (bodyLength > maxBodySize) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Request body too large' }));
      req.destroy(); // Important to prevent further data from being processed
      return;
    }
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Success' }));
    } catch (error) {
      console.error(error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
}).listen(3000);