import { order_t } from '../model'
import * as repo from '../repository'
import axios from 'axios'

export default (db) => async (request, response) => {
    const order: order_t = {
        id: request.body.id,
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
            let new_order = order
            new_order.state = 'CONFIRMED'
            await repo.upsert(db, new_order.id, new_order)

            // After 10 seconds confirmed orders should automatically
            // be moved to the 'DELIVERED' state.
            deliverServiceRegister(db, new_order)

        } else {
            let new_order = order
            new_order.state = 'CANCELLED'
            await repo.upsert(db, new_order.id, new_order)
        }

    } catch (err) {
        console.log(err)
        return response.code(500).send({ success: false, error: 'Internal service error' })
    }

    return response.code(200).send({ success: true, order })
}

async function paymentRegister(order_id: string, _user_information: Object) {
    const result = await axios.post('http://localhost:4000/payment', {
        id: order_id
    })

    if (result.status == 200 && result.data.success) {
        return true
    } else {
        return false
    }
}

const deliverServiceRegister = (db, order) => {
    setTimeout(() => {
        let new_order = order
        new_order.state = 'DELIVERED'
        repo.upsert(db, new_order.id, new_order).catch((err) => {
            // do logging here
            console.log('error occurred when updating order state to delivered due to reason: ', err)
        })
    }, 10000); // 10 seconds
}
