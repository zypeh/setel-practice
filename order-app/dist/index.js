"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("make-promises-safe");
const fastify = require("fastify");
const helmet = require("fastify-helmet");
const create_order_1 = require("./create_order");
const server = fastify();
server.register(helmet);
create_order_1.default('/order', server);
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