const express = require('express');
const app = express();
var path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8000, () => {
    console.log("Listening to localhost:8000!")
})