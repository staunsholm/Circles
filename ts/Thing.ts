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
        /*ctx.fillStyle = this.color;

         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, 6.283185307179586, false);
         ctx.closePath();
         ctx.fill();*/

        // calculate position relative to player (person)

        var scrx, scry:number;

        if (Main.person !== this) {
            var vx = this.x - Main.person.x;
            var vy = this.y - Main.person.y;

            var r = Date.now()/10000;
            var cs = Math.cos(r);
            var sn = Math.sin(r);
            scrx = vx * cs - vy * sn + Main.person.x;
            scry = vx * sn + vy * cs + Main.person.y;
        }
        else if (Main.person.planet !== this) {
            scrx = this.x;
            scry = this.y;
        }

        // draw thing, if on screen
        if (scrx + this.size > 0 && scrx - this.size < main.w &&
            scry + this.size > 0 && scry - this.size < main.h) {
            ctx.drawImage(this.texture, scrx - this.size, scry - this.size, this.size * 2, this.size * 2);
        }
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