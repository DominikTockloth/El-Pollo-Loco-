/**
 * Represents a health bar object that extends the StatusBar class.
 */
class HealthBar extends StatusBar {

  percentage = 100;
  camera = 0;
  imageCache = {};

  /**
   * Array of paths to health bar images representing different percentages.
   * @type {string[]}
   */
  HealthBar_Images = [
    'img/health_bar/0.png',
    'img/health_bar/20.png',
    'img/health_bar/40.png',
    'img/health_bar/60.png',
    'img/health_bar/80.png',
    'img/health_bar/100.png',
  ];

  /**
   * Constructor for the HealthBar class.
   */
  constructor() {
    super();
    this.loadImages(this.HealthBar_Images);
    this.setPercentage(100);
    this.x = 5;
    this.y = 0;
  }

  /**
   * Sets the percentage value for the health bar and updates the displayed image.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.HealthBar_Images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
