/**
 * Represents a status bar for bottles that extends the functionality of a status bar.
 * This class provides properties to define the position, images, and current percentage of the bar.
 *
 * @extends StatusBar
 */
class BottleBar extends StatusBar {
    x = 5;
    y = 100;
    imageCache = {};
    percentage = 0;

    /**
     * An array of image paths for the bottle bar corresponding to different percentage levels.
     * @type {string[]}
     */
    BottleBar_Images = [
        'img/bottle_bar/0.png',
        'img/bottle_bar/20.png',
        'img/bottle_bar/40.png',
        'img/bottle_bar/60.png',
        'img/bottle_bar/80.png',
        'img/bottle_bar/100.png',
    ];

    /**
     * Creates a new BottleBar instance.
     * Initializes the bar with a default image and percentage value.
     */
    constructor() {
        super().loadImage('img/bottle_bar/0.png');
        this.loadImages(this.BottleBar_Images);
        this.setPercentage(0);
    }

    /**
     * Sets the percentage value of the bottle bar and updates the displayed image.
     *
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.BottleBar_Images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}


/*class BottleBar extends StatusBar {
    x = 5;
    y = 100;
    imageCache = {};
    percentage = 0;

    BottleBar_Images = [
        'img/bottle_bar/0.png',
        'img/bottle_bar/20.png',
        'img/bottle_bar/40.png',
        'img/bottle_bar/60.png',
        'img/bottle_bar/80.png',
        'img/bottle_bar/100.png',
    ];

    constructor() {
        super().loadImage('img/bottle_bar/0.png');
        this.loadImages(this.BottleBar_Images);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.BottleBar_Images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}*/