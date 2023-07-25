const handlers = {
    "addtwonumbers": async function(body, reply) {
        if (!'first' in body) {
            await reply();
            return;
        }
    
        if (!'second' in body) {
            await reply();
            return;
        }
    
        let first = 0;
        let second = 0;
    
        try {
            first = parseInt(body.first);
            second = parseInt(body.second);
        } catch (error) {
            console.error(error);
            await reply();
            return;
        }
    
        await reply(first + second);
    }
}

module.exports = handlers;
