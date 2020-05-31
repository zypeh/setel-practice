import { order_t } from '../model'

export default (db) => async (request, response) => {
    const order: order_t = {
        id: '1',
        state: 'CREATED'
    }

    return response.code(200).send({ success: true, order })
}