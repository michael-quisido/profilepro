const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    
    handle(req, res, parsedUrl).then(() => {}).catch((err) => {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    });
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Port is already in use');
    } else {
      throw err;
    }
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}).listen(3001).on('error', (err) => {
  console.log('Main server error, continuing...');
});