"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
function createOrder(route, server) {
    server.post(route, { schema: { response: model_1.responseSchema } }, async (request, response) => {
        const order = {
            id: '1',
            state: 'CREATED'
        };
        return response.code(200).send({ success: true, order });
    });
    return server;
}
exports.default = createOrder;
//# sourceMappingURL=create_order.js.map