///<reference path='Thing.ts'/>

class Planet extends Thing {
    origx:number;
    origy:number;

    static planets:Planet[] = [];

    constructor(size:number, x:number, y:number, texture:HTMLImageElement) {
        super(size, x, y, texture, "#ffff00");

        this.origx = x;
        this.origy = y;

        Planet.planets.push(this);
    }

    update(ctx, dt) {
        this.x = this.origx + Math.cos(Date.now() / 2000000 * this.origx) * 20;
        this.y = this.origy + Math.sin(Date.now() / 1000000 * this.origx) * 20;
        this.size = Math.sin(Date.now() / 500000 * this.origy) * 100 + 200;

        super.update(ctx, dt);
    }
}
