
export type order_state
    = 'CREATED'
    | 'CONFIRMED'
    | 'CANCELLED'
    | 'DELIVERED'

export type order_t = {
    id: string,
    state: order_state,
}

export const responseSchema = {
    200: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            order: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    state: { type: 'string' },
                }
            }
        }
    }
}

export const postBodySchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string' },
    }
}
