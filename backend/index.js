const express = require('express')
const bodyParser = require("body-parser")
//const db = require('./db')
const cors = require("cors")
const app = express()

const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost:27017/recipe'


const client =  new MongoClient(url);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors())



app.post('/api/signup/', async (req, res) => {

    const { name, email, password } =  req.body
    user = {
        name: name,
        email: email,
        password: password
    }
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('users') 
        const result = await collection.insertOne(user);
        res.json({success: true, message: 'Resgistration Successfull', user: result.insertedId})
        console.log(`Inserted document with id: ${result.insertedId}`);
    } catch (error) {
        console.log('Error of registration ', error)
        res.status(500).json({ success: false, message: 'Internal error server'})
    }
})


app.post('/api/signin/', async(req, res) => {
    const { email, password } = req.body

    const userInfo = {
        email: email,
        password: password
    }

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('users') 
        const user = await collection.findOne(userInfo)
        res.json({success: true, message: 'Login Successfull', user: user._id})
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})


app.post('/api/comment/', async (req, res) => {
    const date = new Date().toLocaleDateString();
    const { commentText, userId } = req.body
    
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('comments') 
        const insertedComment = await collection.insertOne({
            userId: userId,
            commentText: commentText,
            commentDate: date

        })
        console.log(insertedComment)
        res.json({success: true, message: ' Successfull'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

})


























const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port)
})

//insertion()
//getData()