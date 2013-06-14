///<reference path='Thing.ts'/>

class Planet extends Thing {
    gravity:number;

    static planets:Planet[] = [];

    constructor(size:number, x:number, y:number, gravity:number) {
        super(size, x, y);
        this.color = "#ffff00";
        this.gravity = gravity;

        Planet.planets.push(this);
    }

    update(ctx, dt) {
        super.update(ctx, dt);
    }

    getPull(x:number, y:number) {
        var pull = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
        return pull;
    }
}
