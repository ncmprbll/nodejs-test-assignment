const http = require('http');
const rpc = require('./rpc.js');
const config = require('./config.js');

const server = http.createServer((req, res) => {
    // I guess Express would work better here
    if (req.url === "/tasks/addtwonumbers" && req.method === 'POST') {
        let body = [];

        res.statusCode = config.STATUS_BAD_REQUEST;

        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', async () => {
            try {
                body = JSON.parse(Buffer.concat(body).toString());
            } catch (error) {
                console.error(error);
                res.end();
                return;
            }

            res.statusCode = config.STATUS_OK;
            res.setHeader('Content-Type', 'text/plain');

            const result = await rpc.send('tasks', body);

            res.end(result.body.toString());
        });

        return;
    }

    res.statusCode = config.STATUS_METHOD_NOT_ALLOWED;
    res.end();
});

server.listen(config.http_port, config.http_hostname, () => {
    console.log(`Server running at http://${config.http_hostname}:${config.http_port}/`);
});
