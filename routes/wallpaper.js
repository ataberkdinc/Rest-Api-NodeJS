const express = require('express')
const mysql = require('mysql')
const router = express.Router()

router.get("/wallpapers", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM wallpapers"
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

router.get('/wallpapers/:id', (req, res) => {

    const connection = getConnection()
    const wallpaperId = req.params.id
    const queryString = "SELECT * FROM wallpapers WHERE id = ?"

    connection.query(queryString, [wallpaperId], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500)
            return
            //throw err
        }
        const wallpapers = rows.map((row) => {
            return { name: row.name, link: row.link }
        })
        res.json(wallpapers)
    })
})

router.post('/created', (req, res) => {

    const NAME = req.body.create_name
    const URL = req.body.create_link
    const queryString = "INSERT INTO wallpapers (name, link) VALUES (?, ?)"

    getConnection().query(queryString, [NAME, URL], (err, results, fields) => {
        if (err) {
            res.sendStatus(500)
            return
        }
        res.send("Wallpaper Oluşturuldu!")
    })
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'atamysql',
    database: 'restapi'
})

function getConnection() {
    return pool
}

module.exports = router