///<reference path='../node/node.d.ts' />

var latency:number = 80;

var express = require('express');
var app = express();
app.configure(function () {
    app.use(express.static(__dirname + '/'));
});
var server = app.listen(8080);

var socket = require('socket.io');
var io = socket.listen(server);
io.set('log level', 2);

var playerState = {
    position: 0,
    jump: 0
};

io.sockets.on('connection', function (socket) {
    socket.on('disconnect', function (socket) {
        console.log("disconnect");
    });

    socket.on('jump', function () {
        setTimeout(function () {
            socket.emit("state", playerState);
        }, latency);
    });

    socket.on('moveForward', function () {
        setTimeout(function () {
            socket.emit("state", playerState);
        }, latency);
    });

    socket.on('moveBackward', function () {
        setTimeout(function () {
            socket.emit("state", playerState);
        }, latency);
    });

    socket.on('stop', function () {
        setTimeout(function () {
            socket.emit("state", playerState);
        }, latency);
    });

    socket.on('pong', function (t) {
        console.log("current latency: " + (Date.now() - t));
    });

    setInterval(function() {
        socket.emit("ping", Date.now());
    }, 5000);

    socket.emit("state", playerState);
});
