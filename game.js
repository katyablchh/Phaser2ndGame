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
var life=5;
var lifeText;
var game = new Phaser.Game(config);
var platforms;
var cursors;
var score = 0;
var scoreText;

function preload ()
{
        this.load.image('tree', 'assets/tree.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('bbb', 'assets/bbb.png');
        this.load.image('rock','assets/rock.png')
        this.load.image('wood','assets/wood.png')
        this.load.image('ground','assets/groung.png')
        this.load.image('gr2','assets/gr2.png')
        this.load.spritesheet('mash', 'assets/mash.png',{ frameWidth: 32, frameHeight: 48 } );
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

    this.add.image(200,719, 'rock').setOrigin(0,0).setScale(2).setDepth(Phaser.Math.FloatBetween(1, 10));

    this.add.image(550,799, 'rock').setOrigin(0,0).setScale(1).setDepth(Phaser.Math.FloatBetween(1, 10));

    this.add.image(790,739, 'rock').setOrigin(0,0).setScale(1.7) .setDepth(Phaser.Math.FloatBetween(1, 10));
    this.add.image(1290,710, 'rock').setOrigin(0,0).setScale(2) .setDepth(Phaser.Math.FloatBetween(1, 10));


   



    platforms = this.physics.add.staticGroup();
    platforms.create(100, 900, 'ground').setScale(1)
    platforms.create(300, 900, 'ground').setScale(1)
    platforms.create(500, 900, 'ground').setScale(1)
    platforms.create(700, 900, 'ground').setScale(1)
    platforms.create(900, 900, 'ground').setScale(1)
    platforms.create(1100, 900, 'ground').setScale(1)
    platforms.create(1300, 900, 'ground').setScale(1)
    platforms.create(1500, 900, 'ground').setScale(1)
    platforms.create(1700, 900, 'ground').setScale(1)
    platforms.create(1900, 900, 'gr2').setScale(1)
    
    player = this.physics.add.sprite(100, 400, 'witch').setScale(2) .setDepth(5) ;
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
    lifeText = this.add.text(1500, 100, showLife(), { fontSize: '40px', fill: '#000' })
        .setOrigin(0, 0)
        .setScrollFactor(0)
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

  mash = this.physics.add.sprite(810, 400, 'dudeleft').setDepth(5).setScale(2);
  mash.setCollideWorldBounds(true);
  mash.setBounce(1);
  mash.setVelocityY(230);
  mash.setVelocityX(180);
  var direction = -1; // Починаємо з руху вліво
  mash.setVelocityX(180 * direction); // Встановлення початкової швидкості
  var direction = Phaser.Math.Between(0, 1) ? 1 : -1; // 1 - рух вправо, -1 - рух вліво
    mash.setVelocityX(180 * direction); // Встановлення швидкості залежно від напрямку

  // Зміна напрямку руху через певний інтервал часу
  setInterval(function() {
      // Зміна напрямку руху
      direction *= -1; // Змінюємо напрямок (з вліво на вправо або навпаки)
      mash.setVelocityX(180 * direction); // Встановлюємо нову швидкість залежно від напрямку
    }, Phaser.Math.Between(1000, 50000)); // Час зміни напрямку в мілісекундах (наприклад, 3000 мс = 3 с)

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

function showLife() {
    var lifeLine = ''

    for (var i = 0; i < life; i++) {
        lifeLine += '🎀'
        //console.log(life)
    }
    return lifeLine
}

function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 1;
    scoreText.setText('Score: ' + score);
}
// Константа, щоб визначити ширину фону
const WORLD_WIDTH = 5000; // Змінено ширину світу для відображення додаткової платформи
