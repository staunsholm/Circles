///<reference path='Thing.ts'/>
///<reference path='State.ts'/>
///<reference path='Planet.ts'/>

interface JumpInfo {
    startTime:number;
    startPlanet:Planet;
    endPlanet:Planet;
    jumpHeight:number;
}


class Person extends Thing {
    planet:Planet;

    position:number;
    maxJumpHeight:number = 75;

    jumpInfo:JumpInfo = {
        startTime: 0,
        startPlanet: null,
        endPlanet: null,
        jumpHeight: 0
    };

    movingForward:bool;
    movingBackward:bool;
    swapDirection:number = 1;

    static persons:Person[] = [];

    constructor(size:number, position:number, planet:Planet, texture:HTMLImageElement) {
        super(size, 0, 0, texture, "#ff0000");

        var person:Person = this;

        person.planet = planet;
        person.position = position;

        Person.persons.push(person);

        State.jump.add(function () {
            var jumpInfo = person.jumpInfo;
            if (jumpInfo.startTime) return;

            jumpInfo.startTime = Date.now();
            jumpInfo.startPlanet = person.planet;
            jumpInfo.jumpHeight = person.maxJumpHeight;

            var closestPlanet:Planet = person.planet;
            var dist:number;
            var closestDist:number = Infinity;
            for (var i = 0, l = Planet.planets.length; i < l; i++) {
                planet = Planet.planets[i];

                if (planet === person.planet) continue;

                var dist = Math.sqrt((planet.x - person.x) * (planet.x - person.x) +
                    (planet.y - person.y) * (planet.y - person.y)) - planet.size;
                if (dist < closestDist &&
                    dist < person.maxJumpHeight / 2 + person.planet.size) {
                    closestPlanet = planet;
                    closestDist = dist;
                    jumpInfo.jumpHeight = (dist - person.size) / 2;
                }
            }

            jumpInfo.endPlanet = closestPlanet;
        });

        State.moveForward.add(function () {
            person.movingForward = true;
        });

        State.moveBackward.add(function () {
            person.movingBackward = true;
        });

        State.stop.add(function () {
            person.movingForward = false;
            person.movingBackward = false;
        });
    }

    update(ctx, dt) {
        var jumpHeight:number = 0;

        if (this.movingForward) {
            this.position += dt / 1000 * this.swapDirection;
        }

        if (this.movingBackward) {
            this.position -= dt / 1000 * this.swapDirection;
        }

        if (this.jumpInfo.startTime !== 0) {
            var deltaJump = Date.now() - this.jumpInfo.startTime;
            var jumpTime = this.jumpInfo.jumpHeight * 10;
            jumpHeight = Math.sin(deltaJump / jumpTime * Math.PI) * this.jumpInfo.jumpHeight;

            if (deltaJump < jumpTime/2) {
            }
            else if (deltaJump < jumpTime) {
                // handle jump to other planet
                if (this.planet !== this.jumpInfo.endPlanet) {
                    this.planet = this.jumpInfo.endPlanet;

                    var vx = this.planet.x - this.x;
                    var vy = this.planet.y - this.y;
                    this.position = Math.atan2(vy, vx) + Math.PI;

                    this.swapDirection = -this.swapDirection;
                }
            }
            else {
                this.jumpInfo.startTime = 0;
                this.jumpInfo.jumpHeight = this.maxJumpHeight;
            }
        }

        var r = this.planet.size + this.size + jumpHeight;
        this.x = Math.cos(this.position) * r + this.planet.x;
        this.y = Math.sin(this.position) * r + this.planet.y;

        super.update(ctx, dt);
    }
}
