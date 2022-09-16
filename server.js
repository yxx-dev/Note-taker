//import framworks
const express = require('express');
const path = require('path');

//import express modules
const api = require('./routes/api');

//setup server basics
const PORT = process.env.port || 3001;
const app = express();

//middleware to serve the web pages
app.use(express.static('public'));

//include JSON and urlencoded middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//define /api route
app.use('/api',api);


//serve the notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'));
})




app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});