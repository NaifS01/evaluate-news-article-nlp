const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')

// Start up an instance of app
const app = express()

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');
app.use(cors());

//Middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('dist'))


console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = [] // const does not work

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// api setup
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
let projectData = []
// POST Route
app.post('/add', async function (req, res) {
    projectData = req.body;
    const response = await fetch(`${baseURL}key=${apiKey}&url=${projectData.data}&lang=en`);
    const resJson = await response.json();
    res.send(resJson)
    console.log(resJson);
})

// designates what port the app will listen to for incoming requests
app.listen(8084, function () {
    console.log('Example app listening on port 8084!')
})