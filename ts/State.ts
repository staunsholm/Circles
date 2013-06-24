class State {
    static preJump = new signals.Signal();
    static jump = new signals.Signal();
    static preMoveForward = new signals.Signal();
    static moveForward = new signals.Signal();
    static preMoveBackward = new signals.Signal();
    static moveBackward = new signals.Signal();
    static preStop = new signals.Signal();
    static stop = new signals.Signal();

    static pause = new signals.Signal();
    static play = new signals.Signal();

    static isPaused:bool = false;
    static pauseTime:number = 0;

    static init() {
        var tempPauseTime:number = 0;

        // control via keyboard
        addEventListener('keydown', function (e:KeyboardEvent) {
            if (e.keyCode === 32) {
                e.preventDefault();
                State.preJump.dispatch();
            }
            else if (e.keyCode === 37) {
                e.preventDefault();
                State.preMoveForward.dispatch();
            }
            else if (e.keyCode === 39) {
                e.preventDefault();
                State.preMoveBackward.dispatch();
            }
        });

        addEventListener('keyup', function (e:KeyboardEvent) {
            e.preventDefault();

            if (e.keyCode !== 32) {
                State.preStop.dispatch();
            }
        });

        // touch handling in IE
        if (window["navigator"].msPointerEnabled) {
            addEventListener("MSPointerDown", function (e:MSPointerEvent) {
                if (!e.isPrimary) {
                    State.jump.dispatch();
                }
                State.moveForward.dispatch();
            });

            addEventListener("MSPointerUp", function (e:MSPointerEvent) {
                if (e.isPrimary) {
                    State.stop.dispatch();
                }
            });
        }

        // touch handling in iOS
        else {
            addEventListener("touchstart", function (e) {
                if (e.touches.length > 1) {
                    State.jump.dispatch();
                }
                State.moveForward.dispatch();
            });

            addEventListener("touchend", function (e) {
                if (e.touches.length === 0) {
                    State.stop.dispatch();
                }
            });
        }

        // pause game when window loses focus
        addEventListener('blur', function () {
            State.stop.dispatch();
            State.pause.dispatch();
            State.isPaused = true;
            tempPauseTime = Date.now();
        });

        addEventListener('focus', function () {
            State.play.dispatch();
            State.isPaused = false;
            if (tempPauseTime > 0) {
                State.pauseTime += Date.now() - tempPauseTime;
            }
        });
    }
}
