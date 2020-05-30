import fastify = require("fastify")

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
}

export default function createOrder(route: string, server: fastify.FastifyInstance) {
    server.get(route, { schema: { response } }, async (request, response) => {
        return response.code(200).send({ success: true, order: { id: 1 } })
    })
    return server
}
