export default async (request, response) => {
    const { id } = request.body
    const randomNumber = Math.floor(Math.random() * Math.floor(2)) // expected output: 0, 1
    const success = (randomNumber == 0)

    return response.code(200).send({ success, order: { id } })
}
