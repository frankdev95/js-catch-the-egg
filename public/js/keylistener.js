export default class KeyListener {
    constructor() {
        this.keys = {};
        document.addEventListener('keydown', this.keydown.bind(this));
        document.addEventListener('keyup', this.keyup.bind(this));
    }

    keydown(e) {
        this.keys[e.key] = true;
    }

    keyup(e) {
        this.keys[e.key] = false;
    }

    getKeys() {
        return this.keys;
    }
}