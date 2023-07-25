// HTTP
const http_hostname = '0.0.0.0';
const http_port = 3000;

// RabbitMQ
const rmq_login = 'guest';
const rmq_password = 'guest';
const rmq_hostname = 'rabbit';
const rmq_port = 5672;

// Status codes
const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_METHOD_NOT_ALLOWED = 405;

module.exports = {
    http_hostname,
    http_port,

    rmq_login,
    rmq_password,
    rmq_hostname,
    rmq_port,

    STATUS_OK,
    STATUS_BAD_REQUEST,
    STATUS_METHOD_NOT_ALLOWED
}
