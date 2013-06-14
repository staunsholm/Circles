class State {
    static public jump = new signals.Signal();
    static public moveForward = new signals.Signal();
    static public moveBackward = new signals.Signal();
    static public stop = new signals.Signal();

    static public init() {
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

        window.onblur = function () {
            stop.dispatch();
        };
    }
}
