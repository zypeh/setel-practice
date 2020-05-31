"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("make-promises-safe");
const fastify = require("fastify");
const helmet = require("fastify-helmet");
const levelup = require("levelup");
const memdown = require("memdown");
const encoder = require("encoding-down");
const create_order_1 = require("./controller/create_order");
const check_order_1 = require("./controller/check_order");
const cancel_order_1 = require("./controller/cancel_order");
const model_1 = require("./model");
const db = levelup(encoder(memdown(), { valueEncoding: 'json' }));
const server = fastify();
server.register(helmet);
server.get('/order/:order_id', { schema: { response: model_1.responseSchema } }, check_order_1.default(db));
server.post('/order', { schema: { response: model_1.responseSchema, body: model_1.postBodySchema } }, create_order_1.default(db));
server.put('/order', { schema: { response: model_1.responseSchema, body: model_1.postBodySchema } }, cancel_order_1.default(db));
const start = async () => {
    try {
        const PORT = parseInt(process.env.PORT, 10) || 3000;
        await server.listen(PORT);
    }
    catch (err) {
        console.log(err);
        server.log.error(err);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=index.js.map