import Bunny from "./bunny.js";
import StaticData from "./staticdata.js";
import Basket from "./basket.js";
import Egg from "./egg.js";
import KeyListener from "./keylistener.js";
import Score from './score.js';
import Lives from './lives.js';
import Tooltip from './tooltip.js';

const FPS = 1000 / 60;
const basketWidth = 125, basketHeight = 100;
const STARTING_BUNNIES = 3, STARTING_BUNNY_SPEED = 4, STARTING_EGG_SPEED = 4;
const STARTING_FIRE_INTERVAL = 1000, STARTING_INTERVAL_OFFSET = 1000;
let fireInterval = STARTING_FIRE_INTERVAL;
let isGameOver = false, isGameStarted = false, isPaused = false;
let intervalOffset = STARTING_INTERVAL_OFFSET;
let randomInterval, updateInterval, fireEggInterval;
let currentBunnies = STARTING_BUNNIES;
let bunnyWidth = 70, bunnyHeight = 90, bunnyYPos = 110, bunnySpeed = STARTING_BUNNY_SPEED;
let eggSpeed = STARTING_EGG_SPEED;
let wave = 1;

const eggImages = [];
let eggs = [], bunnies = [];

// ELEMENTS

const welcomeMenu = document.querySelector('.game__welcome');
const welcomeMenuShow = welcomeMenu.getAttribute('show');
const pauseMenu = document.querySelector('.game__paused');
const gameOverMenu = document.querySelector('.game__over');
const finalScore = document.querySelector('.final-score');
const livesEl = document.querySelector('.lives');
const scoreEl = document.querySelector('.score');
const message = document.querySelector('.message');
const messageContent = message.querySelector('p');

if(welcomeMenuShow === "false") {
    welcomeMenu.classList.remove('show');
}
// EVENT LISTENERS

document.addEventListener('mousemove', e => basket.move(e.screenX));
document.addEventListener('keydown', e => {
    if((e.key === "p" || e.key === "Escape") && isGameStarted) {
        isPaused = !isPaused;
        pauseGame();
    }
});

document.querySelector('.game__paused-btn').addEventListener('click', () => {
    isPaused = !isPaused;
    pauseGame();
});

document.querySelector('.game__over-btn').addEventListener('click', () => {
    gameOverMenu.classList.toggle('show');
    startGame();
});

document.querySelector('.game__welcome-btn').addEventListener('click', () => {
    isGameStarted = true
    startGame();
});
document.querySelector('.tooltip__close').addEventListener('click', () => hideTooltip());

// MESSAGE

if(messageContent.textContent.length > 0) {
    message.style.display = "initial"
} else {
    message.style.display = "none";
}

// FUNCTIONS

// GETTERS & SETTERS
const setRandomInterval = (interval, offset = intervalOffset) => {
    randomInterval = Math.floor((Math.random() * interval) + offset);
}

const getRandomInterval = () => {
    return randomInterval;
}

const setFireInterval = (interval) => {
    fireInterval = interval;
}

const getFireInterval = () => {
    return fireInterval
}

const setIntervalOffset = (offset) => {
    intervalOffset = offset;
}

const getIntervalOffset = () => {
    return intervalOffset;
}

const setBunnyAmount = (amount) => {
   currentBunnies = amount;
}

const getBunnyAmount = () => {
    return currentBunnies;
}

const setEggSpeed = (speed) => {
    eggSpeed = speed;
}

const getEggSpeed = () => {
    return eggSpeed;
}

const setBunnySpeed = (speed) => {
    bunnySpeed = speed;
}

const getBunnySpeed = () => {
    return bunnySpeed;
}

const resetEntities = () => {
    setFireInterval(STARTING_FIRE_INTERVAL);
    setIntervalOffset(STARTING_INTERVAL_OFFSET);
    setBunnyAmount(STARTING_BUNNIES);
    setBunnySpeed(STARTING_BUNNY_SPEED);
    setEggSpeed(STARTING_EGG_SPEED);
}

const getWave = () => {
    return wave;
}

const createGame = (width, height) => {
    let game = document.querySelector('.game');
    game.style.width = `${width}px`;
    game.style.height = `${height}px`;

    return {
        el: game,
        width: parseInt(game.style.width),
        height: parseInt(game.style.height)
    }
}

const createBunnies = (width = bunnyWidth, height = bunnyHeight, yPos = bunnyYPos) => {
    for(let i = 0; i < getBunnyAmount(); i++) {
        let spaceBetween = game.width / (getBunnyAmount() + 1);
        let xPos = (spaceBetween * (i + 1)) - width / 2;
        bunnies.push(new Bunny(xPos, yPos, width, height, getBunnySpeed()))
    }
}

const getRandomBunny = () => {
    let index = Math.floor(Math.random() * bunnies.length);
    return bunnies[index];
}

const getRandomEggImage = () => {
    let index = Math.floor(Math.random() * eggImages.length);
    return eggImages[index];
}

const fireEgg = () => {
    const randomBunny = getRandomBunny();
    const randomEggImage = getRandomEggImage();
    const width = 40, height = 50;
    const xPos = (randomBunny.getX() + randomBunny.getWidth() / 2) - (width / 2);
    const yPos = randomBunny.getY() + randomBunny.getHeight();
    eggs.push(new Egg(xPos, yPos, width, height, getEggSpeed(), randomEggImage));
}

const loadEggImages = (length) => {
    for(let i = 0; i < length; i++) {
        eggImages[i] = `../assets/images/egg-${i + 1}.jpg`;
    }
}

const isCollision = (basket, egg) => {
    const e = basket.getBoundingClientRect();
    const b = egg.getBoundingClientRect();

    return !(
        e.right < b.left ||
        e.left > b.right ||
        e.bottom < b.top ||
        e.top > b.bottom
    );
}

const showTooltip = () => {
    clearCurrentState();
    basket.hide();
    tooltip.show();
}

const hideTooltip = () => {
    tooltip.hide();
    basket.show();
    nextWave();
}

const increaseSpeed = () => {
    if(!isPaused) {
        clearInterval(fireEggInterval);
        fireInterval *= 0.9;
        intervalOffset *=0.9;
        setRandomInterval(fireInterval, intervalOffset);
        fireEggInterval = setInterval(fireEgg, getRandomInterval());
    }
}


const removeEggs = () => {
    eggs.forEach(egg => egg.remove());
    eggs = [];
}

const removeBunnies = () => {
    bunnies.forEach(bunny => bunny.remove());
    bunnies = [];
}

const removeEgg = (egg, index) => {
    egg.remove();
    eggs.splice(index, 1);
}

const startGame = () => {
    isGameStarted = true;
    resetEntities();
    createBunnies();
    setRandomInterval(fireInterval, intervalOffset)
    startIntervals();
    score.refreshScore();
    lives.refreshLives(3);
}

const pauseGame = () => {
    pauseMenu.classList.toggle('show');
    if(isPaused) {
        stopIntervals();
    } else {
        startIntervals();
    }
}

const stopIntervals = () => {
    clearInterval(updateInterval);
    clearInterval(fireEggInterval);
}

const startIntervals = () => {
    updateInterval = setInterval(update, FPS);
    fireEggInterval = setInterval(fireEgg, getRandomInterval());
}

const clearCurrentState = () => {
    clearInterval(updateInterval);
    clearInterval(fireEggInterval);
    removeEggs();
    removeBunnies();
}

const nextWave = () => {
    currentBunnies++;
    score.increaseTipCounter();
    setBunnySpeed(getBunnySpeed() + 1);
    setEggSpeed(getEggSpeed() + 1);
    setBunnyAmount(getBunnyAmount() + 1);
    createBunnies();
    startIntervals();
}

const gameOver = () => {
    gameOverMenu.classList.toggle('show');
    finalScore.textContent = `${score.getScore()}`;
    clearCurrentState();
}

const update = () => {
    bunnies.forEach(bunny => {
        bunny.moveX();
        bunny.hitSides();
    });

    eggs.forEach((egg, index) => {
        egg.move();

        if(isCollision(basket.getElement(), egg.getElement())) {
            removeEgg(egg, index);
            score.addToScore();
        }
        if(egg.isOutsideBounds()) {
            removeEgg(egg, index);
            lives.removeLive();
        }
    });
}


// GAME
const game = createGame(window.innerWidth, window.innerHeight);
const basket = new Basket((game.width / 2) - basketWidth / 2, game.height - basketHeight, basketWidth, basketHeight);
const score = new Score(showTooltip, scoreEl, increaseSpeed);
const lives = new Lives(gameOver, livesEl);
const tooltip = new Tooltip();
const keyListener = new KeyListener();

StaticData.game = game;
startGame();
loadEggImages(3);
