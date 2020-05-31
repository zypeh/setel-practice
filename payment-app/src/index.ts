import 'make-promises-safe'
import * as fastify from 'fastify'
import * as helmet from 'fastify-helmet'

import createPayment from './payment'
import { responseSchema as response, postBodySchema as body } from './model'

const server = fastify()

server.register(helmet)
server.post('/payment', { schema: { response, body } }, createPayment)

const start = async () => {
    try {
        const PORT = parseInt(process.env.PORT, 10) || 4000
        await server.listen(PORT)
    } catch (err) {
        console.log(err)
        server.log.error(err)
        process.exit(1)
    }
}

start()
