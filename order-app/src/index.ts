import 'make-promises-safe'
import * as fastify from 'fastify'
import * as helmet from 'fastify-helmet'
import * as levelup from 'levelup'
import * as memdown from 'memdown'
import * as encoder from 'encoding-down'

import createOrder from './controller/create_order'
import checkOrder from './controller/check_order'
import cancelOrder from './controller/cancel_order'

import { responseSchema as response } from './model'

const db = levelup(encoder(memdown(), { valueEncoding: 'json' }))
const server = fastify()

server.register(helmet)
server.get('/order', { schema: { response } }, checkOrder(db))
server.post('/order', { schema: { response } }, createOrder(db))
server.put('/order', { schema: { response } }, cancelOrder(db))

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

start()
