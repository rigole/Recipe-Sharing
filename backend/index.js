const express = require('express')
const bodyParser = require("body-parser")

const cors = require("cors")
const app = express()

const { MongoClient} = require('mongodb')

const url = 'mongodb://localhost:27017/recipe'


const client =  new MongoClient(url);


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors())



// Signin Up a user
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
        res.json({success: true, message: 'Registration Successfull', user_token:  result.insertedId, user: user.name})
       
    } catch (error) {
        console.log('Error of registration ', error)
        res.status(500).json({ success: false, message: 'Internal error server'})
    }
})


// Sign in a user
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
        res.json({success: true, message: 'Login Successfull',user_token:user._id, user_name: user.name})
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})



//get the list comment of a same user
app.get('/api/comments/:userId', async (req, res) => {
    const userId = req.params.userId

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('comments') 

        const condition = { userId: { $eq: userId } }
        const results = await collection.find(condition).toArray();
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})



// adding new recipe
app.post('/api/recipe/:userId', async (req, res) => {
    const userId = req.params.userId
    const { 
        title, 
        description,
        ingredients_1,
        ingredients_2,
        ingredients_3,
        ingredients_4,
        ingredients_5, 
        ingredients_6,
        steps_1,
        steps_2,
        steps_3,
        steps_4,
        steps_5,
        steps_6,
    } = req.body

    const recipeData = {
        title: title,
        description: description,
        ingredients: {
            ingredients_1:ingredients_1,
            ingredients_2:ingredients_2,
            ingredients_3:ingredients_3,
            ingredients_4:ingredients_4,
            ingredients_5:ingredients_5,
            ingredients_6:ingredients_6,
        },
        steps:{
            steps_1:steps_1,
            steps_2:steps_2,
            steps_3:steps_3,
            steps_4:steps_4,
            steps_5:steps_5,
            steps_6:steps_6
        },
        userId:userId

    }

    try {
        await client.connect();
        console.log('Connected to MongoBD');
        const dbName = client.db('recipe');
        const collection = dbName.collection('recipe')
        const result = await collection.insertOne(recipeData);
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }


})


//post a comment on a recipe
app.post('/api/comment/', async (req, res) => {
    const date = new Date().toLocaleDateString();
    const { commentText, userId, recipeId } = req.body
    
    
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('comments') 
        const insertedComment = await collection.insertOne({
            userId: userId,
            recipeId: recipeId,
            commentText: commentText,
            commentDate: date

        })
        
        res.json( insertedComment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

})


//get the list comment of a recipe
app.get('/api/recipe/comments/:recipeId', async (req, res) => {
    const recipeId = req.params.recipeId
    

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        console.log(recipeId)
        const collection = dbName.collection('comments') 
        
        const conditions = { recipeId: { $eq: recipeId } }
        const result = await collection.find(conditions).toArray();
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})



app.get('/api/recipe', async(req, res) => {

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const dbName = client.db('recipe')
        const collection = dbName.collection('recipe')
        const results = await collection.find().toArray();
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})






















const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port)
})

