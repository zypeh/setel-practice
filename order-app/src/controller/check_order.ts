import * as repo from '../repository'

export default (db) => async (request, response) => {
    const { order_id } = request.params
    const order = await repo.get(db, order_id)

    if (!order) {
        return response.code(403).send({ success: false, error: 'Order does not exist' })
    } else {
        return response.code(200).send({ success: true, order })
    }
}
