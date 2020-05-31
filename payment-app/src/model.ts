
export const responseSchema = {
    200: {
        type: 'object',
        properties: {
            success: { type: 'boolean' },
            order: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
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
