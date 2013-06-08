var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Person = (function (_super) {
    __extends(Person, _super);
    function Person(size, x, y, planet) {
        _super.call(this, size, x, y);
        this.position = 0;
        this.color = "#ff0000";
        this.planet = planet;
    }
    Person.prototype.update = function (ctx, dt) {
        var jumpHeight = 0;
        if(State.movingForward) {
            this.position += dt / 1000;
        }
        if(State.movingBackward) {
            this.position -= dt / 1000;
        }
        if(State.jumping) {
            var deltaJump = Date.now() - State.jumping;
            if(deltaJump < 800) {
                jumpHeight = Math.sin(deltaJump / 800 * Math.PI) * 150;
            } else {
                State.jumping = 0;
            }
        }
        if(this.planet) {
            var r = this.planet.size + this.size + jumpHeight;
            this.x = Math.cos(this.position) * r + this.planet.x;
            this.y = Math.sin(this.position) * r + this.planet.y;
        }
        _super.prototype.update.call(this, ctx, dt);
    };
    return Person;
})(Thing);
//@ sourceMappingURL=Person.js.map
