import Entity from "./entity.js";
import {tips} from './model.js';
import StaticData from './staticdata.js';

export default class Tooltip {
    constructor() {
        this.element = document.querySelector('.tooltip');
        this.setTooltip();
    }

    setTooltip() {
        let randomIndex = Math.floor(Math.random() * tips.data.length);
        this.tip = tips.get(randomIndex);
        this.getElement().querySelector('.tooltip__content').textContent = this.tip;
    }

    getTooltip() {
        return this.tip;
    }

    show() {
        this.getElement().style.display = "initial";
        this.getElement().style.pointerEvents = "initial";
        this.getElement().style.animation = "moveInTop .5s ease both";
    }

    hide() {
        this.getElement().style.animation = "moveOutTop .5s ease both";
        setTimeout(() => {
            this.getElement().style.display = "none";
        }, 500)
    }

    setWidth(width) {
       this.width = width;
    }

    getWidth() {
        return this.width;
    }

    setHeight(height) {
        this.height = height;
    }

    getHeight() {
        return this.height;
    }

    getElement() {
        return this.element;
    }
}