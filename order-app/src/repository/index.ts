import { order_t, order_state } from "../model";

export async function upsert(db: any, order_id: string, payload: order_t) {
    await db.put(order_id, payload)
    return order_id
}

export async function get(db: any, order_id: string) {
    try {
        return await db.get(order_id)
    } catch (err) {
        return null
    }
}
