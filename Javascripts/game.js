
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bullet', 'assets/games/invaders/bullet.png');
    game.load.image('ship', 'assets/games/invaders/player.png');
    game.load.spritesheet('kaboom', 'assets/games/invaders/explode.png', 128, 128);
    game.load.image('starfield', 'assets/games/invaders/caturn.jpg');
    game.load.image('ufo', 'assets/games/invaders/ufo.png');
    game.load.image('invader', 'assets/games/invaders/michael.jpg');
    game.load.audio('sound', ['assets/games/invaders/Zelda.mp3']);

}

var player;
var bullets;
var bulletTime = 0;
var cursors;
var fireButton;
var explosions;
var starfield;
var score = 0;
var highscore = 0;
var scoreString = '';
var scoreText;
var lives;
var waveTimer = 0;
var stateText;
var livingEnemies = [];
var enemies;
var level = 0;
var counter = 0;
var minEnemyVelocity = 10;
var maxEnemyVelocity = 60;
var playerSpeed = 200;
var numberOfLives = 3;
var bossHealth = 50;
var lifescore = 1000;


function create() {


    game.physics.startSystem(Phaser.Physics.ARCADE);
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;

    enemies = game.add.group();
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;

    boss = game.add.sprite(400, 0, 'invader');
    boss.exists = false;
    boss.scale.x = 0.6;
    boss.scale.y = 0.6;
    game.physics.enable(boss, Phaser.Physics.ARCADE);
    boss.body.maxVelocity.setTo(100, 80);

    music = game.add.audio('sound');

    music.play();


    createEnemies();
    highscoreString = 'High Score : ';
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
    highscoreText = game.add.text(10, 50, highscoreString + highscore, { font: '34px Arial', fill: '#fff' });

    lives = game.add.group();
    liveText = game.add.text(game.world.width - 150, 10, 'Lives : 3', { font: '34px Arial', fill: '#fff' });

    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) {
        var ship = lives.create(game.world.width - 15 - (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }

    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setUpBlam, this);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();
    // create a button for the space bar
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // create a button for the up key
    upButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upButton1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
    // create a button for the down key
    downButton = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downButton1 = game.input.keyboard.addKey(Phaser.Keyboard.S);
    // create a button for the left key
    leftButton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftButton1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
    // create a button for the right key
    rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightButton1 = game.input.keyboard.addKey(Phaser.Keyboard.D);


}


function setUpBlam(boom) {

    boom.anchor.x = 0.5;
    boom.anchor.y = 0.5;
    boom.animations.add('kaboom');

}


function launchBoss() {

    bossHealth = (counter / 5 + 1) * 5;
    boss.body.x = game.rnd.integerInRange(10, game.world.width - 100);

    boss.exists = true;
    boss.body.moves = true;

    boss.body.velocity.y = (counter / 5 + 1) * 5;

}

function update() {


    liveText.text = "Lives: " + numberOfLives;

    starfield.tilePosition.y += 2;

    if (player.alive) {

        player.body.velocity.setTo(0, 0);




        if (downButton.isDown || downButton1.isDown) {
            player.body.velocity.y = +playerSpeed;
        }

        if (rightButton.isDown || rightButton1.isDown) {
            player.body.velocity.x = +playerSpeed;
        }
        if (leftButton.isDown || leftButton1.isDown) {
            player.body.velocity.x = -playerSpeed;
        }
        if (upButton.isDown || upButton1.isDown) {
            player.body.velocity.y = -playerSpeed;
        }

        if (fireButton.isDown) {
            fireBullet();
        }



        if (game.time.now > waveTimer) {
            createNextWave();
            counter++;
            if (counter % 5 == 0) {

                minEnemyVelocity += 10;
                playerSpeed += 10;

            }

        }
        if (score > lifescore) {
            
            numberOfLives += 1;
           lifescore += 1000;
            lives.callAll('kill');
            for (var i = 0; i < numberOfLives; i++) {
                var ship = lives.create(game.world.width - 15 - (30 * i), 60, 'ship');
                ship.anchor.setTo(0.5, 0.5);
                ship.angle = 90;
                ship.alpha = 0.4;
            }
            liveText.destroy();
            liveText = game.add.text(game.world.width - 150, 10, 'Lives : ' + numberOfLives, { font: '34px Arial', fill: '#fff' });

            //liveText.text = "Lives: " + numberOfLives;




        }


        checkEnemiesOutOfBounds();

        game.physics.arcade.overlap(bullets, boss, bossCollision, null, this);
        game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
        game.physics.arcade.overlap(enemies, player, enemyHitsPlayer, null, this);
        game.physics.arcade.overlap(boss, player, bossHitsPlayer, null, this);


    }

}


function checkEnemiesOutOfBounds() {
    livingEnemies.length = 0;

    enemies.forEachAlive(function (bad) {


        livingEnemies.push(bad);
    });

    for (var i = 0; i < livingEnemies.length; i++) {
        if (livingEnemies[i].body.y > game.world.height) {
            livingEnemies[i].kill();
            killPlayer();
        }

    }
}
function render() {

}

/*
    Check to see if the bullet killed a bad guy
*/
function collisionHandler(bullet, bad) {

    bullet.kill();
    bad.kill();

    var explosion = explosions.getFirstExists(false);
    explosion.reset(bad.body.x, bad.body.y);
    explosion.play('kaboom', 30, false, true);

    score = score + 10;

    scoreText.text = scoreString + score;

    if (score > 1000) {
        lives = lives + 1;
        liveText.text = "Lives: " + numberOfLives;
    }



}

function bossCollision(bullet, boss) {

    bossHealth -= 1;
    boss.kill();


    if (bossHealth == 0) {
        score += 500;
        bullet.kill();
        var explosion = explosions.getFirstExists(false);
        explosion.reset(boss.body.x, boss.body.y);
        explosion.play('kaboom', 30, false, true);

    }

}
function enemyHitsPlayer(player, bad) {

    bad.kill();
    killPlayer();

}

function bossHitsPlayer(player, boss) {


    killPlayer();
    boss.body.x = 400;
    boss.body.y = 500;
}



function killPlayer() {
    numberOfLives -= 1;
    liveText.text = "Lives: " + numberOfLives;
    live = lives.getFirstExists();
    if (live) {
        live.kill();
    }
    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    if (lives.countLiving() < 1) {
        player.kill();
        stateText.text = " GAME OVER \n Click to restart";
        stateText.visible = true;
        game.input.onTap.addOnce(restart, this);


    }
}


function createNextWave() {

    if (counter != 0 && counter % 5 == 0) {
        boss.body.y = 10;
        launchBoss();

    }

    createEnemies();
    waveTimer = game.time.now + 5000;

}

function createEnemies() {

    for (var i = 0; i < 5; i++) {

        var bad = enemies.create(game.rnd.integerInRange(10, game.world.width - 100), 50, 'ufo');

        bad.body.moves =true;

        bad.body.velocity.y = game.rnd.integerInRange(minEnemyVelocity, maxEnemyVelocity);

    }
}




function fireBullet() {
    if (game.time.now > bulletTime) {

        bullet = bullets.getFirstExists(false);

        if (bullet) {
            if (score > 0)
                score -= 1;
            scoreText.text = scoreString + score;
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}
function resetBullet(bullet) {
    bullet.kill();
}
function restart() {
    if (score > highscore) {
        highscore = score;
        highscoreText.text = highscoreString + highscore;
    }
    score = 0;
    lifescore = 1000;
    numberOfLives = 3;
    liveText.text = "Lives: " + numberOfLives;
    scoreText.text = scoreString + score;

    playerSpeed = 200;
    minEnemyVelocity = 10;
    maxEnemyVelocity = 60;
    counter = 0;
    lives.removeAll();
    lives = game.add.group();


    for (var i = 0; i < 3; i++) {
        var ship = lives.create(game.world.width - 15 - (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }
    enemies.removeAll();
    createEnemies();
    player.revive();
    stateText.visible = false;

    /*
      Ways to enhance
      1. After a certain score, you get an extra life
      2. Speed up the enemies after a certain timeline
      3. Add music
      4. Change the background
      5. Add a boss
      6. Add a high score
      
    */
}