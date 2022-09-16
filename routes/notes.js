const express = require('express');
const nt = express.Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//GET route
nt.get('/', (req, res) => {
    console.log(`successful ${req.method} call`);
    fs.readFile('./db/db.json', 'utf8', (err, data) => 
        err ? res.json(err) : res.json(JSON.parse(data)));
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
})

//DELETE route
nt.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`successful ${req.method} call with id:${id}`);
    if (id) {
        let currentDb = [];
        fs.readFile('./db/db.json','utf8', (err,data) => {
            if(err) {
                console.error(err);
            } else {
                currentDb = JSON.parse(data);
                console.log(currentDb);
                //console.log(req.body);
                let deletePosition = null //postion of obj to delete
                for (let i=0; i<currentDb.length; i++) {
                    if (currentDb[i].id === id) {
                        deletePosition = i;
                        break;
                    }
                }
                if (deletePosition) {
                    let deletedNotes = currentDb[deletePosition];
                    currentDb.splice(deletePosition,1);
                    console.log(currentDb);
                    fs.writeFile('./db/db.json', JSON.stringify(currentDb, null, " "), err =>
                        err ? res.json(err) : res.json(deletedNotes)
                    )
                } else res.json('no matching record to delete');
            }
            
        })    
    } else res.json('missing id');
})

module.exports = nt;

