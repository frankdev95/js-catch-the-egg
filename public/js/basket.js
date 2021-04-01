import Entity from "./entity.js";
import StaticData from "./staticdata.js";

export default class Basket extends Entity {
    constructor(xPos, yPos, width, height) {
        super({tag: "img", className: "basket", imageSrc: "../assets/images/basket.png"});
        this.setX(xPos);
        this.setY(yPos);
        this.setWidth(width);
        this.setHeight(height);
        this.getElement().style.transition = "opacity .5s ease";
    }

    move(mouseX) {
        if(mouseX + this.getWidth() / 2 > StaticData.game.width) return this.setX(StaticData.game.width - this.getWidth());
        if(mouseX - this.getWidth() / 2 < 0) return this.setX(0);
        this.setX(mouseX - this.width / 2);
    }

    show() {
        this.getElement().style.opacity = "1";
    }

    hide() {
        this.getElement().style.opacity = "0";
    }
}