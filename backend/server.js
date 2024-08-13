const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const connectDb = require('./config/dbConnection')
const app = express()
const dotenv = require('dotenv').config()
port = process.env.port || 5000
// here use is a middleware so basically it lets us use the function at the prescribed location in it
connectDb()
app.use(express.json()) // middleware for backend to recieve data from client
app.use('/api/contacts',require('./routes/contactroutes'))
app.use('/api/users',require('./routes/userroutes'))
//creating an errorhandler(miidleware) to end errors to client in a json format 
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`server running on ${port}`)
})

