const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config();

const AuthRoute = require('./routes/auth')


const mongoDBConnectionString = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(mongoDBConnectionString)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

console.log('hello world')
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})

app.use('/api',AuthRoute)