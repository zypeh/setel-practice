import 'make-promises-safe'
import * as fastify from 'fastify'
import * as helmet from 'fastify-helmet'

import createOrder from './create_order'

const server = fastify()

server.register(helmet)

createOrder('/order', server)



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
