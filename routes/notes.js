const express = require('express');
const nt = express.Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//GET route
nt.get('/', (req, res) => {
    console.log(`successful ${req.method} call`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => 
        err ? console.error(err) : res.json(JSON.parse(data)));
})

//POST route
nt.post('/', (req, res) => {
    console.log(`successful ${req.method} call`);

    const {title, text} = req.body;
    //record request and add unique id
    if(title && text) {
        const noteEntry = {
            title,
            text,
            id: uuidv4(),
        };
    
        const response = {
            status: 'success',
            body: noteEntry,
        };
        
        let tempDb = [];
        fs.readFile('./db/db.json','utf8', (err,data) => {
            if(err) {
                console.error(err);
            } else {
                tempDb = JSON.parse(data);
                console.log(tempDb);
                //console.log(req.body);
                tempDb.push(noteEntry);
                console.log(tempDb);
                fs.writeFile('./db/db.json', JSON.stringify(tempDb, null, " "), err =>
                    err ? res.json(err) : res.json(response)
                )
            }
            
        })    
    } else res.json('incomplete entries')
    

    //fs.appendFile('./db/db.json',, err => 
    //    err ? console.error(err) : console.log('recorded'));
})

module.exports = nt;

