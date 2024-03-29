const tap = require('tap')
const buildFastify = require('../dist').buildFastifyTest

tap.test('Test order not found', t => {
    t.plan(4)

    const fastify = buildFastify()

    // At the end of your tests it is highly recommended to call `.close()`
    // to ensure that all connections to external services get closed.
    t.tearDown(() => fastify.close())

    fastify.inject({
        method: 'GET',
        url: '/order/9999'
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 403)
        t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
        t.deepEqual(response.json(), {
            error: 'Order does not exist',
            success: false,
        })
    })
})

tap.test('No request on POST endpoint', t => {
    t.plan(4)

    const fastify = buildFastify()

    // At the end of your tests it is highly recommended to call `.close()`
    // to ensure that all connections to external services get closed.
    t.tearDown(() => fastify.close())

    fastify.inject({
        method: 'POST',
        url: '/order',
        payload: undefined,
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 400)
        t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
        t.deepEqual(response.json(), {
            error: 'Bad Request',
            message: 'body should be object',
            statusCode: 400,
        })
    })
})

tap.test('Invalid request for POST endpoint', t => {
    t.plan(4)

    const fastify = buildFastify()

    // At the end of your tests it is highly recommended to call `.close()`
    // to ensure that all connections to external services get closed.
    t.tearDown(() => fastify.close())

    fastify.inject({
        method: 'POST',
        url: '/order',
        payload: {},
    }, (err, response) => {
        t.error(err)
        t.strictEqual(response.statusCode, 400)
        t.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8')
        t.deepEqual(response.json(), {
            error: 'Bad Request',
            message: 'body should have required property \'id\'',
            statusCode: 400,
        })
    })
})