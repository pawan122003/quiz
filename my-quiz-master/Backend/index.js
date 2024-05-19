const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors')


connectToMongo();

const app = express()
app.use(express.json()) 
app.use(cors())

app.get('/',  (req, res) => {
  res.send('Hello Welcome to My-Quiz')
})

app.get('/about',  (req, res) => {
  res.send('this app is all about practise ')
})

app.use('/api/admin', require('./routes/admin'))
app.use('/api/question',require('./routes/quiz'))

app.listen(5010)