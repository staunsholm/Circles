interface IThing {
    size:number;
    x:number;
    y:number;
    color:string;

    update(ctx:CanvasRenderingContext2D, dt:number);
}

class Thing implements IThing {
    size:number;
    x:number;
    y:number;
    color:string;

    update(ctx, dt) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 6.283185307179586, false);
        ctx.closePath();
        ctx.fill();
    }

    static things:Thing[] = [];

    constructor(size:number, x:number, y:number, color?:string) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.color = color;

        Thing.things.push(this);
    }
}
