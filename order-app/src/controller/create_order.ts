import { order_t } from '../model'
import * as repo from '../repository'
import axios from 'axios'

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

        const paymentSuccess = await paymentRegister(order.id, {/* user information */ })
        if (paymentSuccess) {
            setTimeout(() => {
                let new_order = order
                new_order.state = 'DELIVERED'
                repo.upsert(db, new_order.id, new_order).catch((err) => {
                    // do logging here
                    console.log('error occurred when updating order state to delivered due to reason: ', err)
                })
            }, 10000); // 10 seconds
        } else {
            let new_order = order
            new_order.state = 'CANCELLED'
            await repo.upsert(db, new_order.id, new_order)
        }

    } catch (err) {
        return response.code(500).send({ success: false, error: 'Internal service error' })
    }

    return response.code(200).send({ success: true, order })
}

async function paymentRegister(order_id: string, user_information: Object) {
    const result = await axios.post('http://localhost:4000/payment', {
        id: order_id
    })

    if (result.status == 200 && result.data.success) {
        return true
    } else {
        return false
    }
}