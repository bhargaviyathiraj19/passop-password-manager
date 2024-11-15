const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')

dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json())
app.use(cors())

// Connect to MongoDB once and handle errors if they occur
client.connect()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

// GET all passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult);
    } catch (err) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});

// Save a password (POST request)
app.post('/', async (req, res) => {
    try {
        const password=req.body
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult=await collection.insertOne(password);
        res.send({success:true , })
    } catch (err) {
        res.status(500).json({ error: "Failed to save data" });
    }
});

// delete a password (DEL request)
app.delete('/', async (req, res) => {
    
        const password=req.body
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult=await collection.deleteOne(password);
        res.send({success:true , result: findResult})
    
});


// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
