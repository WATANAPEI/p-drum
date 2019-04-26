const express = require('express');
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
});

app.get('/audio/', (req, res) => {
    var file = require('./audio/test.mp3');
    console.log(`id:${req.params.id}`);
    console.log('./audio/' + req.params.id);
    res.sendFile(file)
});

app.listen(PORT, () => console.log(`LISTEN: ${PORT}`));
