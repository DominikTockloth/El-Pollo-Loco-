/**
 * Represents a throwable object that extends the moveableObject class.
 */
class ThrowableObject extends moveableObject {

    x;
    y;
    height = 65;
    width = 75;
    speedY = 27;
    bottleIsBroken = false;
    otherDirection = false;

    /**
     * Array of paths to bottle rotation images.
     * @type {string[]}
     */
    Bottle_Rotation_Images = [
        'img/items/bottle/bottle-rotation/1_bottle_rotation.png',
        'img/items/bottle/bottle-rotation/2_bottle_rotation.png',
        'img/items/bottle/bottle-rotation/3_bottle_rotation.png',
        'img/items/bottle/bottle-rotation/4_bottle_rotation.png',
    ];

    /**
     * Array of paths to bottle splash images.
     * @type {string[]}
     */
    Bottle_Splash_Images = [
        'img/items/bottle/bottle-splash/1_bottle_splash.png',
        'img/items/bottle/bottle-splash/2_bottle_splash.png',
        'img/items/bottle/bottle-splash/3_bottle_splash.png',
        'img/items/bottle/bottle-splash/4_bottle_splash.png',
        'img/items/bottle/bottle-splash/5_bottle_splash.png',
        'img/items/bottle/bottle-splash/6_bottle_splash.png',
    ];

    /**
     * Constructor for the ThrowableObject class.
     * @param {number} x - The x-coordinate to start the throwable object.
     * @param {number} y - The y-coordinate to start the throwable object.
     */
    constructor(x, y) {
        super();
        this.loadImages(this.Bottle_Rotation_Images);
        this.loadImages(this.Bottle_Splash_Images);
        this.throw();
        this.x = x;
        this.y = y;
    }

    /**
  * Throws the throwable object and initiates animations.
  */
    throw() {
        this.animateBottle();
        this.applyGravity();
        this.throwBottleLeft = world.character.otherDirection;
        setInterval(() => {
            if (this.throwBottleLeft) {
                this.x -= 17;
            }
            else {
                this.x += 17;
            }
        }, 35);
    }

    /**
   * Animates the rotation of the bottle.
   */
    animateBottle() {
        this.bottleInterval = setInterval(() => {
            if (this.y < 345) {
                this.bottleRotation();
            } else {
                this.bottleSplashing();
                setTimeout(() => {
                    clearInterval(this.bottleInterval);
                }, 100);
            }
        }, 1000 / 20);
    }

    /**
    * Animates the bottle rotation.
    */
    bottleRotation() {
        this.playAnimation(this.Bottle_Rotation_Images);
    }

    /**
    * Animates the bottle splashing.
    */
    bottleSplashing() {
        bottle_splash_sound.pause();
        this.bottleIsBroken = true;
        this.playAnimation(this.Bottle_Splash_Images);
        bottle_splash_sound.play();
    }
}