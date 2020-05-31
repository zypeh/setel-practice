import { order_t } from '../model'
import * as repo from '../repository'

export default (db) => async (request, response) => {
    const order: order_t = {
        id: '1',
        state: 'CREATED'
    }

    const isOrderExist = !!(await repo.get(db, order.id))
    if (isOrderExist) {
        return response.code(403).send({ success: false, error: 'Duplicate order id' })
    }

    try {
        await repo.upsert(db, order.id, order)
    } catch (err) {
        return response.code(500).send({ success: false, error: 'Internal service error' })
    }

    return response.code(200).send({ success: true, order })
}