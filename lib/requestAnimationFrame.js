(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var lastTime = 0;

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 33 - (currTime - lastTime));
            setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
        };
    }
})();
