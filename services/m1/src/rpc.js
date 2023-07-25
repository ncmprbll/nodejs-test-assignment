const client = require('rabbitmq-client');
const config = require('./config.js');

const rabbit = new client.Connection(`amqp://${config.rmq_login}:${config.rmq_password}@${config.rmq_hostname}:${config.rmq_port}`);

rabbit.on('error', (err) => {
    console.error('RabbitMQ connection error', err);
});

rabbit.on('connection', () => {
    console.log('RabbitMQ connection successfully established');
});

const rpc = rabbit.createRPCClient({
    confirm: true,
})

process.on('SIGINT', async () => {
    await rpc.close();
    await rabbit.close();

    process.exit();
});

module.exports = rpc;
