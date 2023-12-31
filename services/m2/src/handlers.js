function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const PROCESSING_TIME = 5000

const handlers = {
    'double': async function(body, reply) {
        let number = 0;

        await sleep(PROCESSING_TIME)
    
        try {
            number = parseInt(body.number);
        } catch (error) {
            console.error(error);
            await reply();
            return;
        };
    
        await reply(number * 2);
    }
};

module.exports = handlers;
