/**
 * Represents a drawable object that can be drawn on a canvas.
 */
class DrawableObject {

  y;
  x;
  height = 200;
  width = 250;
  img;
  currentImage = 0;
  imageCache = {};

  /**
   * Draws the drawable object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      // Handle drawing errors if necessary
    }
  }

  /**
   * Loads an image from the given path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads an array of images and caches them.
   * @param {string[]} arr - Array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Sets the percentage value for the drawable object.
   * @param {number} percentage - The percentage value to set.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.CoinBar_Images[this.resolveImageIndex()]; // This line needs to be adjusted as per your class structure.
    this.img = this.imageCache[path];
  }
}
