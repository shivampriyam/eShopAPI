const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// routes
app.use('/api/books', booksRoute);

// create a logger

// conect to mongodb atlas
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(()=> {
    console.log("connected to MongoDB");
}).catch((err)=>{
    console.log("Can't connected to MongoDB",err.message);
});

// listen to the port
app.listen(PORT, ()=>{
    console.log(`server started at port: ${PORT}`);
})