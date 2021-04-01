export default class Lives {
    STARTING_LIVES = 3;

    constructor(gameOver, livesEl) {
        this.livesEl = livesEl;
        this.setLives(this.STARTING_LIVES);
        this.gameOver = gameOver;
        this.refreshLives();
    }

    refreshLives(score = undefined) {
        if(score) this.setLives(score);
        this.livesEl.innerText = new Array(score || this.getLives())
            .fill('❤')
            .join(" ");
    }

    removeLive() {
        this.setLives(this.getLives() -1);
        this.refreshLives();
        if(this.getLives() === 0) this.gameOver();
    }

    setLives(lives) {
        this.lives = lives;
    }

    getLives() {
        return this.lives;
    }
}