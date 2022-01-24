const path = require('path')
const express = require('express')
const personRouter = require('./routes/person.routes')
const app = express()
const PORT = 80

app.use(express.static(path.join(__dirname, 'src')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.use('/api', personRouter)

app.listen(PORT, () => {
    console.log(`Application listening on port http://localhost:${PORT}`)
})
