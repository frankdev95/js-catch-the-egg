export default class Score {
    STARTING_SCORE = 100;

    constructor(showTooltip, scoreEl, increaseSpeed, addBunny) {
        this.score = this.STARTING_SCORE;
        this.scoreEl = scoreEl;
        this.increaseSpeed = increaseSpeed;
        this.showToolTip = showTooltip;
        this.tipCounter = 50;
        this.tipIncrease = 100;
        scoreEl.textContent = "100";
    }

    addToScore() {
        this.setScore(this.score += 10);
        if(this.getScore() % 100 === 0) this.increaseSpeed();
        if(this.getScore() % this.getTipCounter() === 0) this.showToolTip();
    }

    refreshScore() {
        this.setScore(0)
    }

    setScore(score) {
        this.score = score;
        this.scoreEl.textContent = `${this.score}`;
    }

    getScore() {
        return this.score;
    }

    increaseTipCounter() {
        this.setTipCounter(this.getTipCounter() + this.getTipIncrease());
        this.setTipIncrease(this.getTipIncrease() * 1.5);
    }

    setTipCounter(counter) {
        this.tipCounter = counter;
    }

    getTipCounter() {
        return this.tipCounter;
    }

    setTipIncrease(increase) {
        this.tipIncrease = increase;
    }

    getTipIncrease() {
        return this.tipIncrease;
    }
}