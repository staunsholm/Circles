///<reference path='Thing.ts'/>
///<reference path='State.ts'/>
///<reference path='Planet.ts'/>

class Person extends Thing {
    planet:Planet;
    position:number = 0;

    constructor(size:number, x:number, y:number, planet:Planet) {
        super(size, x, y);
        this.color = "#ff0000";
        this.planet = planet;
    }

    update(ctx, dt) {
        var jumpHeight = 0;

        if (State.movingForward) {
            this.position += dt/1000;
        }
        if (State.movingBackward) {
            this.position -= dt/1000;
        }

        if (State.jumping) {
            var deltaJump = Date.now() - State.jumping;
            if (deltaJump < 800) {
                jumpHeight = Math.sin(deltaJump / 800 * Math.PI) * 150;
            }
            else {
                State.jumping = 0;
            }
        }

        if (this.planet) {
            var r = this.planet.size + this.size + jumpHeight;
            this.x = Math.cos(this.position)*r + this.planet.x;
            this.y = Math.sin(this.position)*r + this.planet.y;
        }

        super.update(ctx, dt);
    }
}
