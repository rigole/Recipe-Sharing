const express = require('express')
const bodyParser = require("body-parser")
const { MongoClient } = require('mongodb')
const cors = require("cors")
const app = express()

const url = 'mongodb://localhost:27017/recipe'

const client =  new MongoClient(url);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors())


async function databaseConnexion(){
    try {
        await client.connect()
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }finally{
        await client.close()
    }
}

databaseConnexion().catch(console.error)


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port)
})
