/**
 * Represents a chicken enemy that extends the functionality of a moveable object.
 * This class provides properties and methods to control chicken movement, animations, and actions.
 *
 * @extends moveableObject
 */
class Chicken extends moveableObject {
    /**
     * Offset values for collision boundaries of the chicken.
     * @type {{right: number, left: number, top: number, bottom: number}}
     */
    offset = {
        right: 5,
        left: 5,
        top: 5,
        bottom: -100,
    };

    y = 350;
    height = 70;
    width = 70;
    energy = 1;
    imageCache = {};

    /**
     * Array of image paths for chicken's walking animation.
     * @type {string[]}
     */
    Walking_Images_Enemies = [
        'img/chicken/1_walk/1_w.png',
        'img/chicken/1_walk/2_w.png',
        'img/chicken/1_walk/3_w.png',
    ];

    /**
     * Array of image paths for chicken's death animation.
     * @type {string[]}
     */
    Dead_Images_Enemies = [
        'img/chicken/2_dead/dead.png',
    ];

    /**
     * Creates a new Chicken instance.
     * Initializes the chicken's animations, movement speed, and position.
     */
    constructor() {
        super().loadImage('img/chicken/1_walk/1_w.png');
        this.loadImages(this.Walking_Images_Enemies);
        this.loadImages(this.Dead_Images_Enemies);
        this.x = 350 + Math.random() * 3000;
        this.speed = 4.25 + Math.random() * 0.7;
        this.animate();
    }

    /**
     * Initiates the chicken's animation loop.
     */
    animate() {
        let animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.chickenDeathInterval(animationInterval);
                setTimeout(() => {
                    clearInterval(animationInterval);
                }, 100);
            } if (!this.isDead()) {
                this.chickenMoving();
            }
        }, 5500 / 60);
    }

    /**
     * Handles chicken's moving animation.
     */
    chickenMoving() {
        this.moveLeft();
        this.playAnimation(this.Walking_Images_Enemies);
        this.otherDirection = false;
    }

    /**
     * Initiates the chicken's "killed to hell" animation.
     */
    killedChickenToHell() {
        setInterval(() => {
            this.y++;
        }, 50);
    }

    /**
     * Initiates the chicken's death animation.
     */
    chickenDeathInterval() {
        this.playAnimation(this.Dead_Images_Enemies);
        this.killedChickenToHell();
        chicken_dead_sound.play();
    }

    /**
     * Plays animation frames from the provided images array.
     *
     * @param {string[]} images - The array of image paths to play.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}


