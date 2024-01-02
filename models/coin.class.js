/**
 * Represents a Coin object that extends the moveableObject class.
 */
class Coin extends moveableObject {

  height = 105;
  width = 105;
  imageCache = {};

  /**
   * Offset values for the coin's position.
   * @type {object}
   */
  offset = {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10,
  };

  /**
   * Array of paths to coin images.
   * @type {string[]}
   */
  Images_Coin = [
    'img/items/coin/coin_1.png',
    'img/items/coin/coin_2.png',
  ];

  /**
   * Constructor for the Coin class.
   */
  constructor() {
    super().loadImage('img/items/coin/coin_1.png');
    this.loadImages(this.Images_Coin);
    this.x = 200 + Math.random() * 3050;
    this.y = 280 - Math.random() * 200;
    this.animate();
  }

  /**
   * Plays the animation using the provided images.
   * @param {string[]} images - Array of image paths.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Initiates the animation loop for the coin.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.Images_Coin);
    }, 12000 / 60);
  }
}

