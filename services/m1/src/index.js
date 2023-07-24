const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // I guess Express would work better here
    if (req.url === "/task" && req.method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        res.end('Do a task...');

        return;
    }

    res.statusCode = 405;
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});