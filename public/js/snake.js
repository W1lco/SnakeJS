export default class Snake {
    constructor(scene) {
        this.scene = scene;
        this.lastMoveTime = 0;
        this.moveInterval = 200;
        this.tileSize = 16;
        
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.body = [];
        this.body.push(this.scene.add.sprite(this.tileSize, this.tileSize, 'headRight').setOrigin(0));
        this.apple = this.scene.add.sprite(this.tileSize, this.tileSize, 'apple').setOrigin(0);
        this.positionApple();
        scene.input.keyboard.on('keydown', e => {this.keyDown(e)})
    }

    update(time) {
        if (time >= this.lastMoveTime + this.moveInterval) {
            this.lastMoveTime = time;
            this.move();
        }
    }

    positionApple() {
        let newAppleX = Math.floor(Math.random() * this.scene.game.config.width / this.tileSize) * this.tileSize;
        let newAppleY = Math.floor(Math.random() * this.scene.game.config.width / this.tileSize) * this.tileSize;
        if (this.body.some(part => part.x === newAppleX && part.y === newAppleY)) {
            this.positionApple();
            return;
        }
        this.apple.x = newAppleX;
        this.apple.y = newAppleY;
    }

    move() {

        let x = this.body[0].x + this.direction.x * this.tileSize;
        let y = this.body[0].y + this.direction.y * this.tileSize;
        if (this.apple.x === x && this.apple.y === y) {
            this.body.push(this.scene.add.sprite(this.tileSize, this.tileSize, 'body').setOrigin(0));
            this.positionApple();
        }

        for (let i = this.body.length - 1; i > 0; i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        this.body[0].x = x;
        this.body[0].y = y;

        if (x < 0 || x >= this.scene.game.config.width ||
            y < 0 || y >= this.scene.game.config.width) {
            this.scene.scene.restart();
        }

        let tail = this.body.slice(1);

        if (tail.some(part => part.x === x && part.y === y)) {
            this.scene.scene.restart();
        }

    }

    keyDown(event) {
        switch(event.keyCode) {
            case 37: //Left
                if (this.direction !== Phaser.Math.Vector2.RIGHT){
                    this.body[0].setTexture('headLeft');
                    this.direction = Phaser.Math.Vector2.LEFT;
                }
                   
                break;
            case 38: //Up
                if (this.direction !== Phaser.Math.Vector2.DOWN){
                    this.body[0].setTexture('headUp');
                    this.direction = Phaser.Math.Vector2.UP;
                }
                    
                break;
            case 39: //Right
                if (this.direction !== Phaser.Math.Vector2.LEFT){
                    this.body[0].setTexture('headRight');
                    this.direction = Phaser.Math.Vector2.RIGHT;
                }
                break;
            case 40: //Down
                if (this.direction !== Phaser.Math.Vector2.UP){
                    this.body[0].setTexture('headDown');
                    this.direction = Phaser.Math.Vector2.DOWN;
                }
                break;
            default:
                break;
        }
    }
}