export default async (request, response) => {
    const order = {
        id: '1'
    }
    // expected output: 0, 1
    const randomNumber = Math.floor(Math.random() * Math.floor(2))
    const success = (randomNumber == 0)

    return response.code(200).send({ success, order })
}
