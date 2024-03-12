const express = require('express')
const app = express()

app.use(express.json())
const item = []

app.get('/', (request, response) => {
    response.send('Hello World')
})

app.get('/item', (request, response) => {
    response.json(item)
})

app.post('/item', (request, response) => {
    const { name, price, quantity } = request.body

    const newItem = { name, price, quantity }
    item.push(newItem)

    response.status(201).json(newItem)
})

app.put('/item/:nome', (request, response) => {
    const { nome } = request.params
    const { name, price, quantity } = request.body
    // [0,1,2,3,4,5,6,7,8,9......]
    // [{ name: 'item1' }, { name: 'item2' }, { name: 'item3' }]
    // const nome = 'item2'
    // const itemIndex = 1
    const itemIndex = item.findIndex(i => i.name === nome)

    if (itemIndex === -1) {
        response.status(404).json({ error: 'Item not found' })
        return
    }

    item[itemIndex] = { name, price, quantity }

    response.status(200).json(item[itemIndex])
    return
})

app.delete('/item/:nome', (request, response) => {
    const { nome } = request.params
    const itemIndex = item.findIndex(i => i.name === nome)

    if (itemIndex === -1) {
        response.status(404).json({ error: 'Item not found' })
        return
    }

    item.splice(itemIndex, 1)

    response.status(204).send()
})

app.listen(2432, () => {
    console.log('Server is running on port 2432')
})