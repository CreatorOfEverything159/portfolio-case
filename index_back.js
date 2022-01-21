const path = require('path')
const express = require('express')
const app = express()
const PORT = 30000

app.use(express.static(path.join(__dirname, 'src')))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

// app.get('/images', (req, res) => {
//     res.status(200)
//     res.header("Content-Type", 'application/json')
//     res.sendFile(`${__dirname}/image-sets/image-set-${Math.floor(Math.random() * 100)}.json`)
// })

app.listen(PORT, () => {
    console.log(`Application listening on port http://localhost:${PORT}`)
})
