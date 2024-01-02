/**
 * Represents an end boss object that extends the moveableObject class.
 */
class Endboss extends moveableObject {

    height = 350;
    width = 180;
    x = 3650;
    y = 100;
    speed = 8.5;
    level;
    world;
    character;
    energy = 100;
    imageCache = {};

    otherDirection = false;
    firstContact = false;
    isMoving = false;


    offset = {
        right: 30,
        left: 30,
        top: 70,
        bottom: 20,
    };

    /**
 * Array of paths to end boss alert animation images.
 * @type {string[]}
 */
    Alert_Images_Endboss = [
        'img/endboss/2_alert/G5.png',
        'img/endboss/2_alert/G6.png',
        'img/endboss/2_alert/G7.png',
        'img/endboss/2_alert/G8.png',
        'img/endboss/2_alert/G9.png',
        'img/endboss/2_alert/G10.png',
        'img/endboss/2_alert/G11.png',
        'img/endboss/2_alert/G12.png',
    ];

    /**
 * Array of paths to end boss walking animation images.
 * @type {string[]}
 */
    Walking_Images_Endboss = [
        'img/endboss/1_walk/G1.png',
        'img/endboss/1_walk/G2.png',
        'img/endboss/1_walk/G3.png',
        'img/endboss/1_walk/G4.png',
    ];

    /**
 * Array of paths to end boss hurt animation images.
 * @type {string[]}
 */
    Hurt_Images_Endboss = [
        'img/endboss/4_hurt/G21.png',
        'img/endboss/4_hurt/G22.png',
        'img/endboss/4_hurt/G23.png',
    ];

    /**
 * Array of paths to end boss dead animation images.
 * @type {string[]}
 */
    Dead_Images_Endboss = [

        'img/endboss/5_dead/G24.png',
        'img/endboss/5_dead/G25.png',
        'img/endboss/5_dead/G26.png',
    ];

    /**
     * Array of paths to end boss attack animation images.
     * @type {string[]}
     */
    Attack_Images_Endboss = [
        'img/endboss/3_attack/G13.png',
        'img/endboss/3_attack/G14.png',
        'img/endboss/3_attack/G15.png',
        'img/endboss/3_attack/G16.png',
        'img/endboss/3_attack/G17.png',
        'img/endboss/3_attack/G18.png',
        'img/endboss/3_attack/G19.png',
        'img/endboss/3_attack/G20.png',
    ];

    constructor() {
        super().loadImage('img/endboss/2_alert/G5.png');
        this.loadImages(this.Alert_Images_Endboss);
        this.loadImages(this.Walking_Images_Endboss);
        this.loadImages(this.Hurt_Images_Endboss);
        this.loadImages(this.Dead_Images_Endboss);
        this.loadImages(this.Attack_Images_Endboss);
        this.animate();
    }

    /**
   * Initiates animation sequences for the end boss.
   */
    animate() {
        this.moveInterval = setInterval(() => {
            this.playMovement();
        }, 4500 / 20);

        this.playImagesInterval = setInterval(() => {
            this.playImages();
        }, 150);
    }

    /**
     * Plays specific images based on end boss state.
     */
    playImages() {
        if (this.isDead()) {
            this.clearAllIntervals();
            game_music.muted = true;
            this.endbossIsDeadAnimation();
            setInterval(() => {
                this.y++; this.x = this.x;
            }, 30);
            this.showEndScreen();
        } if (this.isHurt()) {
            this.endbossIsHurtAnimation();
        }
    }

    /**
   * Determines end boss movement behavior.
   */
    playMovement() {
        if (world.character.x > 3100 && !this.firstContact) {
            game_music.pause();
            endboss_music.play();
            this.isMoving = true;
            this.firstContact = true;
            setTimeout(() => {
                this.endbossMovingLeft();
            }, 2000);
        }
        if (world.character.x < this.x && this.firstContact) {
            this.endbossMovingLeft();
        } else if (this.x < 2800 && this.firstContact) {
            this.endbossMovingRight();
        } else if (this.x > 3400 && world.character.x < this.x && this.firstContact) {
            this.endbossMovingLeft();
        } else {
            this.playAnimation(this.Alert_Images_Endboss);
        }
    }

    endbossIsDeadAnimation() {
        this.playAnimation(this.Dead_Images_Endboss);
        this.isMoving = false;
    }

    endbossMovingRight() {
        this.playAnimation(this.Walking_Images_Endboss);
        this.moveRight();
        this.otherDirection = true;
        this.isMoving = true;
        this.speed = 6, 0;
    }

    endbossMovingLeft() {
        this.playAnimation(this.Walking_Images_Endboss);
        this.moveLeft();
        this.otherDirection = false;
        this.isMoving = true;
        this.speed = 6, 0;
    }

    endbossIsHurtAnimation() {
        endboss_Sound.play();
        this.playAnimation(this.Hurt_Images_Endboss);
    }

    endbossIsAlert() {
        this.playAnimation(this.Alert_Images_Endboss);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    showEndScreen() {
        setTimeout(() => {
            endboss_music.pause();
            walkingSound.pause();
            game_music.pause();
            snoringSound.pause();
            winner_Music.play();
            document.getElementById('winner').style.display = 'flex';
            document.getElementById('restart-btn-win').style.display = 'flex';
        }, 500);
    }

    /**
   * Clears all intervals.
   */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}








