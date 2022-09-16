const express = require('express');
const PORT = process.env.port || 3001;
const app = express();


//middleware to serve the web pages
app.use(express.static('public'));




app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});