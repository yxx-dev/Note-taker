const express = require('express');

//import modular route for /notes
const notesRouter = require('./notes');

const app = express();

//define /notes route
app.use('/notes',notesRouter);

module.exports = app;