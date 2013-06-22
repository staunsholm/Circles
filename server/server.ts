///<reference path='../node/node.d.ts' />

var latency:number = 0;

var express = require('express');
var app = express();
var socket = require('socket.io');
app.configure(function () {
    app.use(express.static(__dirname + '/'));
});
var server = app.listen(8080);
var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });

    socket.emit("pong", {txt: "Hello there!"});

    socket.on('jump', function () {
        setTimeout(function () {
            socket.emit("jump");
        }, latency);
    });
});
