export default class Entity {
    constructor({tag = 'div', className = '', imageSrc = ''} = {}) {
        this.el = document.createElement(tag);
        if(tag === 'img') this.el.src = imageSrc;
        this.el.className = `entity ${className}`;
        document.querySelector('.game').appendChild(this.el);
    }

    remove() {
        this.el.parentElement.removeChild(this.el);
    }

    setX(x) {
        this.x = x;
        this.el.style.left = `${this.x}px`;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
        this.el.style.top = `${this.y}px`;
    }

    getY() {
        return this.y;
    }

    setWidth(width) {
        this.width = width;
        this.el.style.width = `${this.width}px`;

    }

    getWidth() {
        return this.width;
    }

    setHeight(height) {
        this.height = height;
        this.el.style.height = `${this.height}px`;
    }

    getHeight() {
        return this.height;
    }

    getElement() {
        return this.el;
    }


}