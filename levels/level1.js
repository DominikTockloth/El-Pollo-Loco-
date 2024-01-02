/** sets all elements for the level1 ,
 *  which starts by starting the game
 */

let level1;

function initLevel() {
    level1 = new Level(

        [
            new BackgroundObject('img/backgrounds/air.png', -719),
            new BackgroundObject('img/backgrounds/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/backgrounds/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/backgrounds/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/backgrounds/air.png', 0),
            new BackgroundObject('img/backgrounds/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/backgrounds/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/backgrounds/layers/1_first_layer/1.png', 0),


            new BackgroundObject('img/backgrounds/air.png', 719),
            new BackgroundObject('img/backgrounds/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/backgrounds/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/backgrounds/layers/1_first_layer/2.png', 719),


            new BackgroundObject('img/backgrounds/air.png', 719 * 2),
            new BackgroundObject('img/backgrounds/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/backgrounds/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/backgrounds/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/backgrounds/air.png', 719 * 3),
            new BackgroundObject('img/backgrounds/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/backgrounds/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/backgrounds/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/backgrounds/air.png', 719 * 4),
            new BackgroundObject('img/backgrounds/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/backgrounds/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/backgrounds/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObject('img/backgrounds/air.png', 719 * 5),
            new BackgroundObject('img/backgrounds/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/backgrounds/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/backgrounds/layers/1_first_layer/2.png', 719 * 5),
        ],

        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],

        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ],

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
        ],

        [
            new Endboss(),
        ],
    )
}