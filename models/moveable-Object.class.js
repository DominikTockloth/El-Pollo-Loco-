/**
 * Represents a moveable object that extends the DrawableObject class.
 */
class moveableObject extends DrawableObject {

    x;
    y;
    level;
    world;
    endboss;
    character;
    energy = 100;
    speed = 10;
    speedY;
    speedX;
    acceleration = 2.0;
    otherDirection = false;
    lastHit = 0;
    imageCache = {};

    /**
     * Offset values for collision detection.
     * @type {object}
     */
    offset = {
        right: 10,
        left: 10,
        top: 10,
        bottom: 10,
    };

    /**
   * Checks if the moveable object is colliding with another moveable object.
   * @param {moveableObject} mo - The other moveable object to check collision with.
   * @returns {boolean} True if colliding, false otherwise.
   */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
  * Plays animation for the moveable object using the provided images.
  * @param {string[]} images - Array of image paths for animation.
  */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
 * Moves the object to the left by its speed.
 */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Applies gravity to the object's vertical position.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 30);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Decreases the object's energy when hit.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Decreases the object's energy when hit by the end boss.
     */
    hitEndboss() {
        this.energy -= 3;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;  // Difference in milliseconds
        timePassed = timePassed / 1000; // Difference in seconds
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Throws the object.
     */
    throwObject() {
        this.applyGravity();
        setInterval(() => {
            this.x += 7.5;
        }, 25);
    }

    /**
     * Clears all intervals up to a certain limit.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}  