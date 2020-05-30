"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response = {
    200: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            order: {
                type: 'object',
                properties: {
                    'id': { type: 'string' },
                }
            }
        }
    }
};
function createOrder(route, server) {
    server.get(route, { schema: { response } }, async (request, response) => {
        return response.code(200).send({ success: true, order: { id: 1 } });
    });
    return server;
}
exports.default = createOrder;
//# sourceMappingURL=create_order.js.map