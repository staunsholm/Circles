var State = (function () {
    function State() { }
    State.jumping = 0;
    State.init = function init() {
        document.addEventListener('keydown', function (e) {
            if(e.keyCode === 32 && State.jumping === 0) {
                State.jumping = Date.now();
                e.preventDefault();
            } else if(e.keyCode === 37) {
                State.movingForward = true;
                e.preventDefault();
            } else if(e.keyCode === 39) {
                State.movingBackward = true;
                e.preventDefault();
            }
        });
        document.addEventListener('keyup', function (e) {
            e.preventDefault();
            if(e.keyCode !== 32) {
                State.movingForward = false;
                State.movingBackward = false;
            }
        });
        window.onblur = function (e) {
            State.movingForward = false;
            State.movingBackward = false;
        };
    };
    return State;
})();
//@ sourceMappingURL=State.js.map
