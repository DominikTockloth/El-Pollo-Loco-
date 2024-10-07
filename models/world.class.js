
/**
 * Represents the game world that manages game objects and rendering.
 */
class World {

    level = level1;
    enemies = level1.enemies;
    endboss = level1.endboss;
    character = new Character();
    backgroundObjects = level1.backgroundObjects;
    clouds = level1.clouds;
    coins = level1.coins;
    bottles = level1.bottles;
    throwableObjects = level1.throwableObjects;
    bottlebar = new BottleBar();
    coinbar = new Coinbar();
    healthbar = new HealthBar();
    endbossHealthbar = new EndbossHealthbar();

    throwableObjects = [];
    collectedBottles = [];
    collectedCoins = [];
    percentage;
    ctx;
    canvas;
    offset;
    keyboard;
    energy;
    camera = 0;
    world;

    firstContact = false;
    bottleIsBroken = false;
    youWon = false;

    intervals = [];
    i = 1;

    /**
  * Initializes the world with the canvas and keyboard input.
  * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
  * @param {Keyboard} keyboard - The keyboard input handler.
  */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runCheckCollision();

    }

    /**
   * Sets up the relationships between world and game objects.
   */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
  * Draws the game world and its objects.
  */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.ctx.translate(-this.camera, 0); // camera back
        this.addToMap(this.bottlebar);
        this.addToMap(this.coinbar);
        this.addToMap(this.healthbar);
        if (this.character.x > 2900 || this.firstContact) {
            this.addToMap(this.endbossHealthbar);
            this.firstContact = true;
        }
        this.ctx.translate(this.camera, 0); // camera forwards

        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.endboss);
        this.addToMap(this.character);

        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera, 0);

        let self = this;               // Funktion draw() wird mehrmals hintereinander ausgeführt .
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
 * Adds an array of objects to the map by invoking the `addToMap` method for each object.
 * @param {DrawableObject[]} objects - An array of objects to be added to the map.
 */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a drawable object to the map, handling flipping if necessary.
     * @param {DrawableObject} mo - The drawable object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of a drawable object horizontally for drawing.
     * @param {DrawableObject} mo - The drawable object to flip the image for.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverts the flipped image of a drawable object back to its original state.
     * @param {DrawableObject} mo - The drawable object to revert the flipped image for.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Plays animation frames from the provided images array.
     * @param {string[]} images - An array of image paths for the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Runs the main game loop, checking collisions and interactions at a set interval.
     */
    run() {
        setInterval(() => {
            this.checkTrow();
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
            this.checkCollisionEndboss();
            this.checkCollisionOfBottleWithEnemy();

        }, 200);
    }

    runCheckCollision() {
        setInterval(() => {
            this.checkCollisionsEnemies();
            this.checkCollisionOfBottleWithEndboss();
        }, 30);
    }

    /**
     * Clears all intervals used in the game.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Checks collisions between the character and enemies, handling interactions accordingly.
     */
    checkCollisionsEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && enemy.energy > 0 && this.character.speedY < 0) {
                enemy.energy--;
                if (enemy.energy === 0) {
                    this.clearEnemyFromCanvas(enemy);
                }
            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround() && this.character.energy > 0 && enemy.energy > 0) {
                this.character.hit(true);
                this.healthbar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks collision between the character and end boss, handling interactions accordingly.
     */
    checkCollisionEndboss() {
        this.level.endboss.forEach(endboss => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.healthbar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks if the character should throw a throwable object and manages the throwable objects.
     */
    checkTrow() {
        if (this.keyboard.D && this.character.amountCollectedBottles > 0) {
            this.character.amountCollectedBottles -= 10;
            this.bottle = new ThrowableObject(this.character.x + 40, this.character.y + 130);
            this.throwableObjects.push(this.bottle);
            this.bottlebar.setPercentage(this.character.amountCollectedBottles);
        }
    }

    /**
     * Checks collision between throwable objects and enemies, managing interactions.
     */
    checkCollisionOfBottleWithEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    this.bottleIsBroken = true;
                    this.clearBottleFromCanvas(bottle);
                    enemy.hit(true);
                }
            });
        });
    }

    /**
     * Checks collision between throwable objects and end boss, managing interactions.
     */
    checkCollisionOfBottleWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !endboss.isDead()) {
                    this.bottleIsBroken = true;
                    this.endbossHealthbar.setPercentage(endboss.energy);
                    endboss.hitEndboss(true);
                }
            });
        });
    }


    /**
 * Checks collisions between the character and coins, managing coin collection.
 */
    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                collect_coin_sound.pause();
                this.character.collectCoin();
                collect_coin_sound.play();
                this.coinbar.setPercentage(this.character.amountCollectedCoins);
                this.clearCoinFromCanvas(coin);
            }
        });
    }

    /**
     * Checks collisions between the character and bottles, managing bottle collection.
     */
    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.clearBottleFromCanvas(bottle);
                this.character.collectBottle(bottle);
                collect_bottle_sound.play();
                this.character.collectedBottles.push(bottle);
                this.bottlebar.setPercentage(this.character.amountCollectedBottles);
            }
        });
    }

    /**
     * Clears an enemy from the canvas after defeat.
     * @param {Enemy} enemy - The enemy object to be cleared.
     */
    clearEnemyFromCanvas(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            this.y -= 50;
            this.x = this.x;
        }, 1000);
    }

    /**
     * Clears a bottle from the canvas after being used or collected.
     * @param {ThrowableObject} bottles - The bottle object to be cleared.
     */
    clearBottleFromCanvas(bottles) {
        setTimeout(() => {
            this.level.bottles.splice(this.level.bottles.indexOf(bottles), 1);
            this.speed = 0;
            this.speedY = 0;
            this.acceleration = 0;
        }, 50);
    }

    /**
     * Clears a coin from the canvas after being collected.
     * @param {Coin} coins - The coin object to be cleared.
     */
    clearCoinFromCanvas(coins) {
        setTimeout(() => {
            this.level.coins.splice(this.level.coins.indexOf(coins), 1);
        }, 50);
    }

    /**
     * Decreases the character's energy upon being hit by the end boss.
     */
    hitEndboss() {
        this.energy -= 8;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the character is dead.
     * @returns {boolean} - True if the character's energy is zero, otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }
}






