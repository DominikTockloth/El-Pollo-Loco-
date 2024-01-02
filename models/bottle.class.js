/**
 * Represents a bottle object that extends the functionality of a drawable object.
 * This class provides properties to define the size, position, images, and collision offset of the object.
 *
 * @extends DrawableObject
 */
class Bottle extends DrawableObject {
 
  height = 65;
  width = 75;
  imageCache = {};

  /**
   * An offset object to define collision boundaries of the bottle object.
   * @type {{left: number, right: number, top: number, bottom: number}}
   */
  offset = {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
  };

  /**
   * An array of image paths for the bottle object.
   * @type {string[]}
   */
  Bottle_Images = [
      'img/items/bottle/salsa_bottle.png',
  ];

  /**
   * Creates a new Bottle instance.
   * The bottle's position is set randomly within specified ranges.
   */
  constructor() {
      super();
      this.loadImage(this.Bottle_Images);
      this.x = 200 + Math.random() * 3000;
      this.y = 120 + Math.random() * 250;
  }
}


