import 'make-promises-safe'
import * as fastify from 'fastify'
import * as helmet from 'fastify-helmet'
import * as levelup from 'levelup'
import * as memdown from 'memdown'
import * as encoder from 'encoding-down'

import createOrder from './controller/create_order'
import checkOrder from './controller/check_order'
import cancelOrder from './controller/cancel_order'

import { responseSchema as response, postBodySchema as body } from './model'

const db = levelup(encoder(memdown(), { valueEncoding: 'json' }))
const server = fastify()

server.register(helmet)
server.get('/order/:order_id', { schema: { response } }, checkOrder(db))
server.post('/order', { schema: { response, body } }, createOrder(db))
server.put('/order', { schema: { response, body } }, cancelOrder(db))

const start = async () => {
    try {
        const PORT = parseInt(process.env.PORT, 10) || 3000
        await server.listen(PORT)
    } catch (err) {
        console.log(err)
        server.log.error(err)
        process.exit(1)
    }
}

export const buildFastifyTest = () => {
    return server
}

start()

