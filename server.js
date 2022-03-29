const express = require("express");

const server = express();

server.get('/', (req, res) => {
    res.end('ok')
})

server.listen(3000, (err) => {
    console.log('started');
})