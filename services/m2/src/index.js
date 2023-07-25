const client = require('rabbitmq-client');
const config = require('./config.js');

const rabbit = new client.Connection(`amqp://${config.rmq_login}:${config.rmq_password}@${config.rmq_hostname}:${config.rmq_port}`);

rabbit.on('error', (err) => {
    console.log('RabbitMQ connection error', err);
});

rabbit.on('connection', () => {
    console.log('RabbitMQ connection successfully established');
});

async function addHandler(body, reply) {
    if (!'first' in body) {
        await reply('');
        return;
    }

    if (!'second' in body) {
        await reply('');
        return;
    }

    let first = 0;
    let second = 0;

    try {
        first = parseInt(body.first);
        second = parseInt(body.second);
    } catch (error) {
        console.error(error);
        await reply('');
        return;
    }

    await reply(first + second);
}

const server = rabbit.createConsumer({
    queue: 'tasks',
}, async (request, reply) => {
    console.log('Request:', request);

    let body = request.body

    if (body.type === 'addtwonumbers') {
        await addHandler(body, reply);
    } else {
        await reply('');
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
