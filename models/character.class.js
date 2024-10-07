/**
 * Represents a character object that extends the functionality of a moveable object.
 * This class provides properties and methods to control character movement, animations, and actions.
 * @extends moveableObject
 */

class Character extends moveableObject {
  y = 180;
  x = 100;
  height = 250;
  width = 160;
  speed = 13.5;
  energy = 100;
  acceleration = 6;
  imageCache = {};

  throwableObjects;
  amountCollectedCoins = 0;
  amountCollectedBottles = 0;
  collectedBottles = [];
  throwableObjects = [];

  endboss;
  character;
  level;
  world;
  lastMoveTime = 0;

  offset = {
    top: 120,
    bottom: 0,
    left: 25,
    right: 25,
  };

  Walking_Images = [
    'img/Pepe/2_walk/W-21.png',
    'img/Pepe/2_walk/W-22.png',
    'img/Pepe/2_walk/W-23.png',
    'img/Pepe/2_walk/W-24.png',
    'img/Pepe/2_walk/W-25.png',
    'img/Pepe/2_walk/W-26.png',
  ];

  Jumping_Images = [
    'img/Pepe/3_jump/J-31.png',
    'img/Pepe/3_jump/J-32.png',
    'img/Pepe/3_jump/J-33.png',
    'img/Pepe/3_jump/J-34.png',
    'img/Pepe/3_jump/J-35.png',
    'img/Pepe/3_jump/J-36.png',
    'img/Pepe/3_jump/J-37.png',
    'img/Pepe/3_jump/J-38.png',
    'img/Pepe/3_jump/J-39.png',
  ];

  Dead_Images = [
    'img/Pepe/5_dead/D-51.png',
    'img/Pepe/5_dead/D-52.png',
    'img/Pepe/5_dead/D-53.png',
    'img/Pepe/5_dead/D-54.png',
    'img/Pepe/5_dead/D-55.png',
    'img/Pepe/5_dead/D-56.png',
    'img/Pepe/5_dead/D-57.png',
  ];

  Hurt_Images = [
    'img/Pepe/4_hurt/H-41.png',
    'img/Pepe/4_hurt/H-42.png',
    'img/Pepe/4_hurt/H-43.png',
  ];

  Idle_Images = [
    'img/Pepe/idle/I-1.png',
    'img/Pepe/idle/I-2.png',
    'img/Pepe/idle/I-3.png',
    'img/Pepe/idle/I-4.png',
    'img/Pepe/idle/I-5.png',
    'img/Pepe/idle/I-6.png',
    'img/Pepe/idle/I-7.png',
    'img/Pepe/idle/I-8.png',
    'img/Pepe/idle/I-9.png',
    'img/Pepe/idle/I-10.png',
  ];

  Long_Idle_Images = [
    'img/Pepe/long_idle/I-11.png',
    'img/Pepe/long_idle/I-12.png',
    'img/Pepe/long_idle/I-13.png',
    'img/Pepe/long_idle/I-14.png',
    'img/Pepe/long_idle/I-15.png',
    'img/Pepe/long_idle/I-16.png',
    'img/Pepe/long_idle/I-17.png',
    'img/Pepe/long_idle/I-18.png',
    'img/Pepe/long_idle/I-19.png',
    'img/Pepe/long_idle/I-20.png',
  ];

  constructor() {
    super().loadImage('img/Pepe/idle/I-1.png');
    this.loadImages(this.Idle_Images);
    this.loadImages(this.Long_Idle_Images);
    this.loadImages(this.Walking_Images);
    this.loadImages(this.Jumping_Images);
    this.loadImages(this.Dead_Images);
    this.loadImages(this.Hurt_Images);
    this.animate();
    this.applyGravity();
  }

  animate() {
    this.moveInterval = setInterval(() => {
      this.playMovement();
    }, 2200 / 20);

    setInterval(() => {
      this.playImages();
    }, 70);
  }

  /**
     * Plays animation frames from the provided images array.
     * Updates the displayed image and adjusts the camera.
     * @param {string[]} images - The array of image paths to play.
     */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    this.world.camera = -this.x + 80;
  }


  /**
     * Plays the animation corresponding to the character's state.
     * Chooses appropriate image frames based on character's actions and conditions.
     */
  playImages() {
    if (this.isDead()) {
      this.characterDeathAnimation();
      setTimeout(() => {
        this.showGameOverScreen();
      }, 1000);
    }
    if (this.isHurt()) {
      this.characterHurtAnimation();
      hurtSound.play();
    }
    if (this.isAboveGround()) {
      this.playAnimation(this.Jumping_Images);
    }
    if (!this.characterResting && !this.characterSleeping) {
      this.playAnimation(this.Walking_Images);
    }
  }

  /**
       * Handles character movement based on keyboard input.
       * Plays movement sounds and calls appropriate animation methods.
       */
  playMovement() {
    walkingSound.pause();
    if (this.world.keyboard.Right && this.x < this.world.level.level_end) {
      snoringSound.pause();
      this.characterMoveRight();
    }
    else if (this.world.keyboard.Left && this.x > - 719) {
      snoringSound.pause();
      this.characterMoveLeft();
    }
    else if (!this.world.keyboard.Left && !this.world.keyboard.Right && this.lastMoveTime <= 8000) {
      this.characterResting();
    }
    else if (!this.world.keyboard.Left && !this.world.keyboard.Right && this.lastMoveTime >= 8000) {
      this.characterSleeping();
      snoringSound.play();
    }
    if (this.world.keyboard.Space && !this.isAboveGround()) {
      this.characterIsJumping();
    }
  }

     /**
   * Makes the moveable object jump.
   */
     jump() {
      this.speedY = 45;
  }

  /**
 * Handles the character's resting state. Increments the last move time and plays the idle animation.
 */
  characterResting() {
    this.lastMoveTime += 40;
    this.playAnimation(this.Idle_Images);
  }

  /**
  * Handles the character's sleeping state. Plays the long idle animation.
  */
  characterSleeping() {
    this.playAnimation(this.Long_Idle_Images);
  }

  /**
  * Initiates the character's hurt animation. Pauses snoring sound, resets last move time, and plays hurt animation.
  */
  characterHurtAnimation() {
    snoringSound.pause();
    this.lastMoveTime = 0;
    this.playAnimation(this.Hurt_Images);
  }

  /**
  * Moves the character to the left. Resets the last move time, plays walking animation, and triggers walking sound.
  */
  characterMoveLeft() {
    this.lastMoveTime = 0;
    this.moveLeft();
    this.playAnimation(this.Walking_Images);
    this.otherDirection = true;
    walkingSound.play();
  }

  /**
  * Moves the character to the right. Resets the last move time, plays walking animation, and triggers walking sound.
  */
  characterMoveRight() {
    this.lastMoveTime = 0;
    this.moveRight();
    this.playAnimation(this.Walking_Images);
    this.otherDirection = false;
    walkingSound.play();
  }

  /**
  * Initiates the character's jumping action. Resets the last move time, pauses snoring and jumping sounds,
  * performs a jump, and plays the jumping sound.
  */
  characterIsJumping() {
    this.lastMoveTime = 0;
    snoringSound.pause();
    jumpingSound.pause();
    this.jump();
    jumpingSound.play();
  }

  /**
  * Initiates the character's death animation. Plays the death sound, pauses snoring sound, resets the last move time,
  * clears the move interval, plays the death animation, and triggers the "killed to hell" animation.
  */
  characterDeathAnimation() {
    deadSound.play();
    snoringSound.pause();
    this.lastMoveTime = 0;
    clearInterval(this.moveInterval);
    this.playAnimation(this.Dead_Images);
    this.killedPepeToHell();
    setTimeout(() => {
      deadSound.volume = 0;
    }, 1500);
  }

  /**
  * Triggers an animation where the character falls down to "hell".
  */
  killedPepeToHell() {
    setInterval(() => {
      this.y++;
    }, 80);
  }

  /**
  * Collects coins and updates the collected coins amount.
  */
  collectCoin() {
    if (this.amountCollectedCoins >= 100) {
      this.amountCollectedCoins = 100;
    } else {
      this.amountCollectedCoins += 10;
    }
  }

  /**
  * Collects bottles and updates the collected bottles amount.
  */
  collectBottle() {
    if (this.amountCollectedBottles >= 100) {
      this.amountCollectedBottles = 100;
    } else {
      this.amountCollectedBottles += 10;
    }
  }

  // displays game-over-screen if character died
  showGameOverScreen() {
    walkingSound.pause();
    document.getElementById('game-over').style.display = 'flex';
    document.getElementById('restart-btn').style.display = 'flex';
    game_music.pause();
    endboss_music.muted = true;
    game_music.muted = true;
    setTimeout(() => {
      gameOverVoice.play();
    }, 150);
    setTimeout(() => {
      this.clearAllIntervals();
    }, 1500);
    setTimeout(() => {
      gameOverMusic.play();
    }, 50);
  }

}









