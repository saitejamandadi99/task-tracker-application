const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

//connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    console.log('Connected to mongoDB');
})
.catch(error=>{
    console.error('Error connecting to MongoDB:', error);
})

app.get('/', (req, res)=>{
    res.send('Task Tracker API is running in the background');
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
})