"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("make-promises-safe");
const fastify = require("fastify");
const helmet = require("fastify-helmet");
const levelup = require("levelup");
const memdown = require("memdown");
const encoder = require("encoding-down");
// import createOrder from './create_order'
const check_order_1 = require("./check_order");
// import cancelOrder from './cancel_order'
const model_1 = require("./model");
const db = levelup(encoder(memdown(), { valueEncoding: 'json' }));
const server = fastify();
server.register(helmet);
server.get('/order', { schema: { response: model_1.responseSchema } }, check_order_1.default(db));
// createOrder(db, server)
// checkOrder(db, server)
// cancelOrder(db, server)
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