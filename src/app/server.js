"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express application instance
var app = express();
var port = 3000;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/proxies', function (req, res) {
    res.send({ vasya: 'petya' });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
