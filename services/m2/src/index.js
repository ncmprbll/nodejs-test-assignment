const client = require('rabbitmq-client');
const config = require('./config.js');
const handlers = require('./handlers.js');

const rabbit = new client.Connection(`amqp://${config.rmq_login}:${config.rmq_password}@${config.rmq_hostname}:${config.rmq_port}`);

rabbit.on('error', (err) => {
    console.log('RabbitMQ connection error', err);
});

rabbit.on('connection', () => {
    console.log('RabbitMQ connection successfully established');
});

const server = rabbit.createConsumer({
    queue: 'tasks',
}, async (request, reply) => {
    console.log('Request:', request);

    let body = request.body

    if (body.type in handlers) {
        await handlers[body.type](body, reply);
    } else {
        await reply();
    }
});

server.on('error', (err) => {
    console.log('RabbitMQ server error', err);
});

process.on('SIGINT', async () => {
    await server.close();
    await rabbit.close();

    process.exit();
});
