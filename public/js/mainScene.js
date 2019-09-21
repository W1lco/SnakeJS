import Snake from './snake.js'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('headUp', 'img/HeadUp.png');
        this.load.image('headRight', 'img/HeadRight.png');
        this.load.image('headDown', 'img/HeadDown.png');
        this.load.image('headLeft', 'img/HeadLeft.png');
        this.load.image('body', 'img/SnakeBody.png');
        this.load.image('apple', 'img/Apple.png');
    }

    create() {
        this.snake = new Snake(this);
    }

    update(time) {
        this.snake.update(time);
    }
}