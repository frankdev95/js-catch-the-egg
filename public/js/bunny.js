import Entity from './entity.js';
import StaticData from "./staticdata.js";

export default class Bunny extends Entity{
    constructor(xPos, yPos, width, height, speed) {
        super({tag: "img", className: "bunny", imageSrc: "../assets/images/bunny.png"});
        this.setX(xPos);
        this.setY(yPos);
        this.setWidth(width);
        this.setHeight(height);
        this.setSpeed(speed);
    }

    moveX() {
        this.setX(this.getX() + this.getSpeed());
    }

    getSpeed() {
        return this.speed;
    }

    hitSides() {
        if(this.getX() >= (StaticData.game.width - this.getWidth()) || this.getX() <= 0) {
            this.setSpeed(this.getSpeed() * -1);
        }
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setFireInterval() {

    }
}