///<reference path='circles.ts'/>

interface IThing {
    size:number;
    x:number;
    y:number;
    color:string;
    texture:HTMLImageElement;

    update(ctx:CanvasRenderingContext2D, dt:number);
}

class Thing implements IThing {
    size:number;
    x:number;
    y:number;
    color:string;
    texture:HTMLImageElement;

    update(ctx, dt) {
        ctx.fillStyle = this.color;

/*        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 6.283185307179586, false);
        ctx.closePath();
        ctx.fill();*/

        ctx.drawImage(this.texture, this.x - this.size, this.y - this.size, this.size*2, this.size*2);
    }

    static things:Thing[] = [];

    constructor(size:number, x?:number, y?:number, texture?:HTMLImageElement, color?:string) {
        this.size = size;
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.color = color;

        Thing.things.push(this);
    }
}