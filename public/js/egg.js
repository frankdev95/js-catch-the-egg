import Entity from "./entity.js";
import StaticData from "./staticdata.js";

export default class Egg extends Entity {
    constructor(xPos, yPos, width, height, speed, imageSrc) {
        super({tag: "img", className: "egg", imageSrc: imageSrc});

        this.setX(xPos);
        this.setY(yPos);
        this.setWidth(width);
        this.setHeight(height);
        this.setSpeed(speed);
    }

    isOutsideBounds() {
        return this.getY() > StaticData.game.height - this.getHeight();
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    move() {
        this.setY(this.getY() + this.getSpeed());
    }

    getSpeed() {
        return this.speed;
    }
}