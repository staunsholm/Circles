class State {
    static public movingForward:bool;
    static public movingBackward:bool;
    static public jumping:number = 0;

    static public init() {
        document.addEventListener('keydown', function (e:KeyboardEvent) {
            if (e.keyCode === 32 && State.jumping === 0) {
                State.jumping = Date.now();
                e.preventDefault();
            }
            else if (e.keyCode === 37) {
                State.movingForward = true;
                e.preventDefault();
            }
            else if (e.keyCode === 39) {
                State.movingBackward = true;
                e.preventDefault();
            }
        });
        document.addEventListener('keyup', function (e:KeyboardEvent) {
            e.preventDefault();

            if (e.keyCode !== 32) {
                State.movingForward = false;
                State.movingBackward = false;
            }
        });
        window.onblur = function (e) {
            State.movingForward = false;
            State.movingBackward = false;
        };
    }
}

