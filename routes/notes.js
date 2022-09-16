const express = require('express');
const nt = express.Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//GET route
nt.get('/', (req, res) => {
    console.log(`successful GET call`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => 
        err ? console.error(err) : res.json(JSON.parse(data)));
})

//POST route
nt.post('/', (req, res) => {
    console.log(`successful POST call`);
})

module.exports = nt;

