/**
 * Represents an end boss health bar object that extends the StatusBar class.
 */
class EndbossHealthbar extends StatusBar {

  y = 0;
  x = 530;
  percentage = 100;
  imageCache = {};

  /**
   * Array of paths to end boss health bar images representing different percentages.
   * @type {string[]}
   */
  Endboss_Health_Bar_Images = [
    'img/endboss_healthbar/0.png',
    'img/endboss_healthbar/20.png',
    'img/endboss_healthbar/40.png',
    'img/endboss_healthbar/60.png',
    'img/endboss_healthbar/80.png',
    'img/endboss_healthbar/100.png',
  ];

  /**
   * Constructor for the EndbossHealthbar class.
   */
  constructor() {
    super().loadImage('img/endboss_healthbar/100.png');
    this.loadImages(this.Endboss_Health_Bar_Images);
    this.setPercentage(100);
  }

  /**
   * Sets the percentage value for the end boss health bar and updates the displayed image.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.Endboss_Health_Bar_Images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}
