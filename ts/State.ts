class State {
    static public jump = new signals.Signal();
    static public moveForward = new signals.Signal();
    static public moveBackward = new signals.Signal();
    static public stop = new signals.Signal();
    static public pause = new signals.Signal();
    static public play = new signals.Signal();

    static public isPaused:bool = false;
    static public pauseTime:number = 0;

    static public init() {
        var tempPauseTime:number = 0;

        // control via keyboard
        addEventListener('keydown', function (e:KeyboardEvent) {
            if (e.keyCode === 32) {
                e.preventDefault();
                jump.dispatch(Date.now());
            }
            else if (e.keyCode === 37) {
                e.preventDefault();
                moveForward.dispatch();
            }
            else if (e.keyCode === 39) {
                e.preventDefault();
                moveBackward.dispatch();
            }
        });

        addEventListener('keyup', function (e:KeyboardEvent) {
            e.preventDefault();

            if (e.keyCode !== 32) {
                stop.dispatch();
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

        // pause game when window looses focus
        addEventListener('blur', function () {
            stop.dispatch();
            pause.dispatch();
            State.isPaused = true;
            tempPauseTime = Date.now();
        });

        addEventListener('focus', function () {
            play.dispatch();
            State.isPaused = false;
            if (tempPauseTime > 0) {
                State.pauseTime += Date.now() - tempPauseTime;
            }
        });
    }
}
