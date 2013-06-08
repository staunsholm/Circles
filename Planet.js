var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Planet = (function (_super) {
    __extends(Planet, _super);
    function Planet(size, x, y, gravity) {
        _super.call(this, size, x, y);
        this.color = "#ffff00";
        this.gravity = gravity;
    }
    Planet.prototype.update = function (ctx, dt) {
        _super.prototype.update.call(this, ctx, dt);
    };
    return Planet;
})(Thing);
//@ sourceMappingURL=Planet.js.map
