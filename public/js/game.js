import MainScene from "./mainScene.js";

const config = {
    width: 320,
    height: 320,
    type: Phaser.AUTO,
    parent: 'phaser-game',
    scene: [MainScene]
};

new Phaser.Game(config);

const config2 = {
    width: 320,
    height: 320,
    type: Phaser.AUTO,
    parent: 'phaser-game2',
    scene: [MainScene]
};

new Phaser.Game(config2);