require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(morgan('dev'))
app.use(express.json()); // Add this line to parse JSON in the request body


const userAuthRouter = require('./routes/UserAuthRouter')   
const userRouter = require('./routes/userRouter')
const userAddressRouter = require('./routes/UserAddressRouter')

app.use('/user/auth/', userAuthRouter)
app.use('/user/', userRouter)
app.use('/user/address/', userAddressRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT, () => {    
    console.log(`Server is up on port ${process.env.PORT}.`)
})