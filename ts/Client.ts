///<reference path='../node/socket.io-client.d.ts'/>
///<reference path='State.ts'/>

class Client {
    socket:Socket;

    constructor() {
        this.socket = io.connect('http://localhost:8080');
        this.socket.on('player', function (data) {
            console.log(data);
        });

        this.socket.on('jump', function () {
            console.timeEnd('jump');
        });

        State.jump.add(this.jump.bind(this));
        State.moveForward.add(this.moveForward.bind(this));
        State.moveBackward.add(this.moveBackward.bind(this));
        State.stop.add(this.stop.bind(this));
    }

    jump() {
        console.time('jump');
        this.socket.emit('jump');
    }

    moveForward() {
        console.time('moveForward');
        this.socket.emit('moveForward');
    }

    moveBackward() {
        console.time('moveBackward');
        this.socket.emit('moveBackward');
    }

    stop() {
        console.time('stop');
        this.socket.emit('stop');
    }
}

