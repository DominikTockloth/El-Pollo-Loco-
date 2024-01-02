/**
 * Represents a Coinbar object that extends the StatusBar class.
 */
class Coinbar extends StatusBar {
  x = 5;
  y = 50;
  percentage = 0;
  imageCache = {};

  /**
   * Array of paths to coin bar images representing different percentages.
   * @type {string[]}
   */
  CoinBar_Images = [
    'img/coin_bar/0.png',
    'img/coin_bar/20.png',
    'img/coin_bar/40.png',
    'img/coin_bar/60.png',
    'img/coin_bar/80.png',
    'img/coin_bar/100.png'
  ];

  /**
   * Constructor for the Coinbar class.
   */
  constructor() {
    super();
    this.loadImages(this.CoinBar_Images);
    this.setPercentage(0);
  }

  /**
   * Sets the percentage value for the Coinbar and updates the displayed image.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.CoinBar_Images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}


