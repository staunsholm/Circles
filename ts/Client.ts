///<reference path='../node/socket.io-client.d.ts'/>
///<reference path='State.ts'/>
///<reference path='circles.ts'/>

class Client {
    static socket:Socket;
    static artificialLatency:number = 100;

    constructor() {
        Client.socket = io.connect('127.0.0.1:8080');
        Client.socket.on('player', function (data) {
            console.log(data);
        });

        Client.socket.on('ping', function (state) {
            setTimeout(function() {
                Client.socket.emit('pong', state);
            }, Client.artificialLatency);
        });

        Client.socket.on('state', function (state) {
            console.timeEnd('latency');

            if (Main.person.position !== state.position) {
//                console.log("position off by: ", Main.person.position - state.position);
            }
            if (Main.person.jumpInfo.startTime !== state.jump) {
//                console.log("jump off by: ", Main.person.jumpInfo.startTime - state.jump);
            }
        });

        State.preJump.add(this.jump.bind(this));
        State.preMoveForward.add(this.moveForward.bind(this));
        State.preMoveBackward.add(this.moveBackward.bind(this));
        State.preStop.add(this.stop.bind(this));
    }

    jump() {
        console.time('latency');
        Client.socket.emit('jump');
        setTimeout(State.jump.dispatch, Client.artificialLatency);
    }

    moveForward() {
        console.time('latency');
        Client.socket.emit('moveForward');
        setTimeout(State.moveForward.dispatch, Client.artificialLatency);
    }

    moveBackward() {
        console.time('latency');
        Client.socket.emit('moveBackward');
        setTimeout(State.moveBackward.dispatch, Client.artificialLatency);
    }

    stop() {
        console.time('latency');
        Client.socket.emit('stop');
        setTimeout(State.stop.dispatch, Client.artificialLatency);
    }
}

