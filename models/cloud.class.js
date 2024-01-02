/**
 * Represents a cloud object that extends the functionality of a moveable object.
 * This class provides properties to define the size, position, and images of the cloud.
 *
 * @extends moveableObject
 */
class Cloud extends moveableObject {

    width = 600;
    height = 350;
    imageCache = {};

    /**
     * Array of image paths for the cloud.
     * @type {string[]}
     */
    Cloud_Images = [
        'img/clouds/cloud1.png',
        'img/clouds/cloud2.png',
    ];

    /**
     * Creates a new Cloud instance.
     * Initializes the cloud's animations and position.
     */
    constructor() {
        super().loadImage('img/clouds/cloud1.png');
        this.loadImages(this.Cloud_Images);
        this.y = 35;
        this.x = 5 + Math.random() * 3800;
        this.animate();
    }

    /**
     * Initiates the cloud's animation loop.
     * Moves the cloud to the left.
     */
    animate() {
        this.moveLeft();
    }
}
