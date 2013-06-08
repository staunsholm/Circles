var Thing = (function () {
    function Thing(size, x, y, color) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.color = color;
        Thing.things.push(this);
    }
    Thing.prototype.update = function (ctx, dt) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 6.283185307179586, false);
        ctx.closePath();
        ctx.fill();
    };
    Thing.things = [];
    return Thing;
})();
//@ sourceMappingURL=Thing.js.map
