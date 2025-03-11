const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3001;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Parse the URL and decode the pathname
    const parsedUrl = url.parse(req.url);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    // Handle the root URL
    let filePath = pathname === '/' 
        ? path.join(__dirname, 'index.html') 
        : path.join(__dirname, pathname);

    // Get the file extension
    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                console.error(`File not found: ${filePath}`);
                
                // Try to serve index.html for SPA routing
                if (!extname) {
                    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
                        if (err) {
                            res.writeHead(404);
                            res.end('404 Not Found');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        }
                    });
                    return;
                }
                
                fs.readFile(path.join(__dirname, '404.html'), (err, content) => {
                    if (err) {
                        // If 404 page doesn't exist, send a simple message
                        res.writeHead(404);
                        res.end('404 Not Found');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                console.error(`Server error: ${err.code}`);
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Set cache headers for static assets
            const headers = { 'Content-Type': contentType };
            if (extname && extname !== '.html') {
                headers['Cache-Control'] = 'public, max-age=86400'; // 1 day
            } else {
                headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
            }
            
            // Success
            res.writeHead(200, headers);
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 