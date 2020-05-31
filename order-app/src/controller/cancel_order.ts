import * as repo from '../repository'

export default (db) => async (request, response) => {
    const order_id = '1'
    const order = await repo.get(db, order_id)

    if (!order) {
        return response.code(403).send({ success: false, error: 'Order does not exist' })
    }

    if (order.state != 'DELIVERED') {
        return response.code(403).send({ success: false, error: 'Order had delivered' })
    } else {
        let new_order = order
        new_order.state = 'CANCELLED'
        await repo.upsert(db, new_order.id, new_order)
        return response.code(200).send({ success: true, order: new_order })
    }
}
