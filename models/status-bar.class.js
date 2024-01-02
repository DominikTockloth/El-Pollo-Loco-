/**
 * Represents a status bar object that extends the DrawableObject class.
 */
class StatusBar extends DrawableObject {

  img;
  width = 180;
  height = 60;

  /**
   * Resolves the index of the image based on the current percentage.
   * @returns {number} The resolved image index.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
