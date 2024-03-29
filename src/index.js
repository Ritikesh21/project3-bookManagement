const express = require('express')
const app = express()
const { port, mongoDb} = require('./config')

app.use(express.json())
app.use(express.urlencoded())

const route = require('./routes/route')
app.use('/', route)

const mongoose = require('mongoose')
mongoose.connect(mongoDb)
.then(console.log("MongoDb is Connected"))
.catch(error => console.log(error))

app.listen(port || 4000, () => {
    console.log("Connected to PORT ", port || 4000)
})