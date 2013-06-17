///<reference path='Person.ts'/>
///<reference path='Planet.ts'/>
///<reference path='State.ts'/>
///<reference path='Thing.ts'/>

class Main {
    w:number;
    h:number;
    static images:Object = {};

    ctx:CanvasRenderingContext2D;
    window:Window;
    oldt:number = Date.now();

    constructor(ctx:CanvasRenderingContext2D, window:Window) {

        this.ctx = ctx;
        this.window = window;

        this.w = window.innerWidth;
        this.h = window.innerHeight;

        State.init();
    }

    update(t) {
        if (!State.isPaused) {

            var dt = t - this.oldt;
            if (dt > 500) dt = 500;
            if (dt < 16) dt = 16;
            this.oldt = t;

            document.getElementById('console').innerHTML = "fps: " + Math.round(1000 / dt) + "<br>";

            var ctx = this.ctx;

    //        ctx.clearRect(0, 0, this.w, this.h);
            var x = this.w / 2;
            var y = this.h / 2;
            ctx.translate(x, y);
            ctx.drawImage(Main.images["Love_is_in_the_air.jpg"], 100 + Math.cos(t / 1000) * 20, 100 + Math.sin(t / 2000) * 10, 100, 100, -x, -y, this.w, this.h);
            ctx.translate(-x, -y);

            for (var i = 0, l = Thing.things.length; i < l; i++) {
                Thing.things[i].update(ctx, dt);
            }
        }

        requestAnimationFrame(this.update.bind(this));
    }

    load() {
        var cntLoaded = 0;
        var main = this;

        function imageLoaded(e) {
            cntLoaded++;
            if (cntLoaded === 4) {
                main.init();
            }
        }

        function loadImage(src:string) {
            var img:HTMLImageElement = <HTMLImageElement>new Image();
            img.onload = imageLoaded;
            img.src = "img/" + src;

            Main.images[src] = img;
        }

        loadImage("2_bubble2.png");
        loadImage("bubble.png");
        loadImage("bubble-psd94380.png");
        loadImage("Bubble-3-psd90405.png");
        loadImage("stock_real_bubble_png_by_e_dina-d4uifi8.png");
        loadImage("Love_is_in_the_air.jpg");
    }

    init() {
        var planet1 = new Planet(100, 800, 200, Main.images["2_bubble2.png"]);
        var planet2 = new Planet(200, 400, 400, Main.images["Bubble-3-psd90405.png"]);
        var planet3 = new Planet(150, 900, 500, Main.images["bubble-psd94380.png"]);
        var planet4 = new Planet(50, 300, 200, Main.images["stock_real_bubble_png_by_e_dina-d4uifi8.png"]);
        new Person(25, -1.7, planet1, Main.images["bubble.png"]);

        this.update(0);
    }
}

//(function () {
document.addEventListener('touchmove', function (e) {
    e.preventDefault();
});

var Signal = window["signals"].Signal;

var c = <HTMLCanvasElement>document.getElementById("canvas");
c.width = window["innerWidth"];
c.height = window["innerHeight"];

var main = new Main(c.getContext("2d"), <Window>window);
main.load();
//})();
