/**
 * Represents a background object that extends the functionality of a moveable object.
 * This class provides properties to define the size, position, and image of the object.
 *
 * @extends moveableObject
 */
class BackgroundObject extends moveableObject {
   
    height = 480;
    width = 720;
    x = 0;
    y = 0;
    imageCache = {};

    /**
     * Creates a new BackgroundObject instance.
     *
     * @param {string} imagePath - The path to the image for the background object.
     * @param {number} x - The initial X-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}

