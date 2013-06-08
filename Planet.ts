///<reference path='Thing.ts'/>

class Planet extends Thing {
    gravity:number;

    constructor(size:number, x:number, y:number, gravity:number) {
        super(size, x, y);
        this.color = "#ffff00";
        this.gravity = gravity
    }

    update(ctx, dt) {
        super.update(ctx, dt);
    }
}
