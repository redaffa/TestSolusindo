const express = require('express')
const router = require('./Routes')
const app = express()
const port = 3000
const cors = require("cors")

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})