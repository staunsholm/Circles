///<reference path='Person.ts'/>
///<reference path='Planet.ts'/>
///<reference path='State.ts'/>

class Main {
    w:number;
    h:number;

    ctx:CanvasRenderingContext2D;
    window:Window;
    oldt:number = 0;

    constructor(ctx:CanvasRenderingContext2D, window:Window) {

        this.ctx = ctx;
        this.window = window;

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        var planet = new Planet(200, 400, 400, 1);
        var planet = new Planet(150, 900, 500, 1);
        new Person(25, 300, 300, planet);

        State.init();
    }

    update(t) {
        var dt = t - this.oldt;
        this.oldt = t;

        var w = this.w;
        var h = this.h;

        var ctx = this.ctx;

        ctx.clearRect(0, 0, w, h);

        for (var i = 0, l = Thing.things.length; i < l; i++) {
            Thing.things[i].update(ctx, dt);
        }

        requestAnimationFrame(this.update.bind(this));
    }

}

(function () {
    var c = <HTMLCanvasElement>document.getElementById("canvas");
    c.width = window["innerWidth"];
    c.height = window["innerHeight"];

    var main = new Main(c.getContext("2d"), <Window>window);
    main.update(0);
})();
