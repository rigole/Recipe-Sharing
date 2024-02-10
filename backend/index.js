const express = require('express')
const bodyParser = require("body-parser")
//const db = require('./db')
const cors = require("cors")
const app = express()

const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/recipe'


const client =  new MongoClient(url);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors())

const testUser = {
    name: "32",
    age:32,
    employer: "Nextflix"
}

async function insertion(){
    
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('recipe') 

        const result = await collection.insertOne(testUser);
        console.log(`Inserted document with id: ${result.insertedId}`);
    
    } catch (error) {
        console.log(error)
    } 
    
}

async function getData(){
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('recipe') 

        const result = collection.find();

        const documents = await result.toArray()
        console.log('Retrieved documents:', documents);
        //return documents;
    
    } catch (error) {
        console.log(error)
    } 
}


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port)
})

//insertion()
getData()