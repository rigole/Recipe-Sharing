const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors())

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Listening on port " + port)
})
