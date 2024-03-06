;var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
};
var player;
var stars;
var game = new Phaser.Game(config);
var platforms;
var cursors;
var score = 0;
var scoreText;

function preload ()
{
        this.load.image('tree', 'assets/tree.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('bbb', 'assets/bbb.png');
        this.load.image('rock','assets/rock.png')
        this.load.image('wood','assets/wood.png')
        this.load.spritesheet('witch', 'assets/B_witch_run2.png',{ frameWidth: 32, frameHeight: 48 }
        );
    
}

function create ()
{
    this.add.image(0,0, 'wood').setOrigin(0,0).setScale(2)
    this.add.image(0,636, 'tree').setOrigin(0,0).setScale(2)
    this.add.image(305,506, 'tree').setOrigin(0,0).setScale(3)
    this.add.image(755,576, 'tree').setOrigin(0,0).setScale(2.5)
    this.add.image(1409,436, 'tree').setOrigin(0,0).setScale(3.6)

    this.add.image(200,731, 'rock').setOrigin(0,0).setScale(2)
    this.add.image(550,802, 'rock').setOrigin(0,0).setScale(1)
    this.add.image(790,749, 'rock').setOrigin(0,0).setScale(1.7)



    platforms = this.physics.add.staticGroup();
    platforms.create(200, 900, 'ground');
    platforms.create(600, 900, 'ground');
    platforms.create(1000, 900, 'ground');
    platforms.create(1400, 900, 'ground');
    platforms.create(1722, 900, 'ground');
    
    player = this.physics.add.sprite(100, 400, 'witch').setScale(2);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('witch', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'witch', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('witch', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    stars = this.physics.add.group({
        key: 'bbb',
        repeat: 150,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 1000);
  // Встановлення меж фізичного світу
  this.cameras.main.setBounds(0, 0, WORLD_WIDTH, 1080); // Set the bounds of the camera to match the width of the game world
    this.cameras.main.startFollow(player);

  // Слідкування камери за гравцем
  this.cameras.main.startFollow(player);
  trees = this.physics.add.staticGroup();

}


function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 1;
    scoreText.setText('Score: ' + score);
}
// Константа, щоб визначити ширину фону
const WORLD_WIDTH = 5000; // Змінено ширину світу для відображення додаткової платформи