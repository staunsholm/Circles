///<reference path='Thing.ts'/>

class Planet extends Thing {
    origx:number;
    origy:number;
    origsize:number;

    static planets:Planet[] = [];

    constructor(size:number, x:number, y:number, texture:HTMLImageElement) {
        super(size, x, y, texture, "#ffff00");

        this.origx = x;
        this.origy = y;
        this.origsize = size;

        Planet.planets.push(this);
    }

    update(ctx, dt) {
        //var time = Date.now() - State.pauseTime;

        //this.x = this.origx + Math.cos(time / 2000000 * this.origx) * 20;
        //this.y = this.origy + Math.sin(time / 1000000 * this.origx) * 20;
        //this.size = Math.sin(time / 500000 * this.origy) * 10 + this.origsize;

        super.update(ctx, dt);
    }
}
