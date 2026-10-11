/**
 * Servidor estático de desenvolvimento — sem dependências (Node puro).
 *
 * Uso:   npm run dev          -> http://localhost:8000
 *        $env:PORT=3000; npm run dev   (porta alternativa)
 *
 * Não é usado no deploy: lá o servidor é o Caddy (ver Dockerfile / DEPLOY.md).
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.PORT) || 8000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function send(res, status, body, type) {
  res.writeHead(status, { 'Content-Type': type || 'text/plain; charset=utf-8' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const rawPath = (req.url || '/').split('?')[0].split('#')[0];
  let decoded;
  try {
    decoded = decodeURIComponent(rawPath);
  } catch (e) {
    return send(res, 400, '400 Bad Request');
  }

  // Resolve dentro da raiz do projeto (bloqueia ../ e caminhos absolutos)
  const relative = path.normalize(decoded).replace(/^([/\\])+/, '');
  const filePath = path.resolve(ROOT, relative);
  const insideRoot = filePath === ROOT || filePath.startsWith(ROOT + path.sep);

  if (!insideRoot) {
    return send(res, 403, '403 Forbidden');
  }

  let target = filePath;
  try {
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, 'index.html');
    }
  } catch (e) {
    return send(res, 404, '404 Not Found');
  }

  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
    return send(res, 404, '404 Not Found — ' + relative);
  }

  const ext = path.extname(target).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
  });

  const stream = fs.createReadStream(target);
  stream.on('error', () => {
    if (!res.headersSent) send(res, 500, '500 Internal Server Error');
    else res.end();
  });
  stream.pipe(res);
});

server.listen(PORT, () => {
  console.log('');
  console.log('  Ê-Bot Clinical — servidor local de desenvolvimento');
  console.log('  http://localhost:' + PORT);
  console.log('');
  console.log('  Ctrl+C para parar.');
  console.log('');
});
