//Rest Api for Wallpaper App by Ataberk Dinç
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes/wallpaper.js')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(morgan('short'))
app.use(router)

app.get("/", (req, res) => {
    res.send("Bu bir REST API'dir - Ataberk Dinç tarafından oluşturuldu.")
})

const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    
})