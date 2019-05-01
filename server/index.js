const express = require('express');
const audioList = require('./audio/audioList.json')
const app = express();
const PORT =3000;

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/audio', express.static('audio'));

app.get('/audio/', (req, res) => {
    res.sendFile(file)
});

app.listen(PORT, () => console.log(`LISTEN: ${PORT}`));
