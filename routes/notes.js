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
    //const {title, text} = req.body;
    //console.log(title, text);
    console.log(`successful POST call`);
    let tempDb = {};
    fs.readFile('./db/db.json','utf8', (err,data) => {
        if(err) {
            console.error(err);
        } else {
            tempDb = JSON.parse(data);
            console.log(tempDb);
            console.log(req.body);
            //tempdb.push(JSON.parse(req.body));
            //console.log(data);
        }
        
    })


    //fs.appendFile('./db/db.json',, err => 
    //    err ? console.error(err) : console.log('recorded'));
})

module.exports = nt;

