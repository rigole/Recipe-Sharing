const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/recipe'


const client =  new MongoClient(url);

const database = async function databaseConnexion(){
    try {
        await client.connect()
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

module.exports = database
