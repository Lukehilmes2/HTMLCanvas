

$(document).ready(function ($) {
    var canvas = document.getElementById("interactive");
    ctx = canvas.getContext("2d");
    var startGame = false;
    var isFiring = false;
    var fired = false;
    
    var w = 50, h = 50, x = 200, y = canvas.height - h;
    var bulletX = x + (0.5 * w), bulletY = y - 10;
    var score;
    var lives;
    
    var lose = true;
    var fallSpeed = 0;
    var start;
    var fall;




    $('#btnCheck').on('click', function () {
        if (lose) {
            startGame = true;
            enemyX = 100;
            enemyY = 0;

            start = setInterval(draw, 1000/60);
            fall = setInterval(fallingEnemy, 1000 / 60);
            score = 0;
            lives = 3;
            lose = false;
            
        }

    });

    $('body').on('keypress', function (e) {
        var actualKeyCode = e.keyCode;
        var actualCharacter = String.fromCharCode(actualKeyCode);
        var movespeed = 17;
        if (actualCharacter == "w") {

            if (startGame) {
                if (y - movespeed >= 0) {
                    y -= movespeed;
                    
                    if (!isFiring) {
                        bulletY = bulletY - movespeed;
                    }
                }
            }
        }
        else if (actualCharacter == "a") {
            if (startGame) {
                if (x - movespeed >= 0) {
                    x -= movespeed;
                    
                    if (!isFiring) {
                        bulletX = bulletX - movespeed;
                    }
                }
            }

        }
        else if (actualCharacter == "s") {
            if (startGame) {
                if (y + movespeed + h <= canvas.height) {
                    y += movespeed;
                    
                    if (!isFiring) {
                        bulletY = bulletY + movespeed;
                    }
                }
            }
        }
        else if (actualCharacter == "d") {
            if (startGame) {
                if (x + movespeed + w <= canvas.width) {
                    x += movespeed;
                    
                    if (!isFiring) {
                        bulletX = bulletX + movespeed;
                    }
                }
            }
        }

        else if (actualKeyCode == 32) {

            if (startGame) {

                if (!isFiring) {
                    isFiring = true;
                    if (!fired) {

                        fired = true;
                        setInterval(fire, 1000 / 60);
                    }


                }
            }
        }
    });


    function draw() {

        if (startGame) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillRect(x, y, w, h);
            ctx.font = "20px Arial";
            ctx.fillText("Lives: " + lives, canvas.width - 100, 20);
            ctx.fillText("Score: " + score, canvas.width - 100, 40);
            
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(enemyX, enemyY, 20, 20);
            ctx.fillStyle = "black";
            ctx.fillRect(bulletX, bulletY, 5, 5);
        }
        else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "20px Arial";
            ctx.fillText("Lives: " + lives, canvas.width - 100, 20);
            ctx.fillText("Score: " + score, canvas.width - 100, 40);
            ctx.fillRect(x, y, w, h);
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(enemyX, enemyY, 20, 20);
            ctx.fillStyle = "black";
            ctx.fillRect(bulletX, bulletY, 5, 5);
            lose = true;
            clearInterval(start);
            clearInterval(fall);
            
            ctx.font = "60px Arial";
            ctx.fillText("You lose!", canvas.width * 0.2, canvas.height * 0.5);
            var name = window.prompt("Enter your name");
            window.localStorage.setItem("Name",name);
            window.localStorage.setItem("Score",score);
            
        }
        if (score%5 == 0){
            fallSpeed = score/5 + 0.5;
            
        }

    }

    function drawText() {
        ctx.font = "30px Arial";
        ctx.fillText("A - Move left", 100, 100);
        ctx.fillText("D - Move right", 100, 130);
        ctx.fillText("S - Move down", 100, 160);
        ctx.fillText("W - Move up", 100, 190);
        ctx.fillText("Space - Shoot", 100, 220);
        ctx.fillText("Push start game to play!", 50, 250);

    }

    function fallingEnemy() {

        if (startGame) {
            

            if (enemyY + fallSpeed <= canvas.height) {
                enemyY += fallSpeed;
            }
            else {
                if (lives -1 == 0) {
                    lives = 0;
                    draw();
                    startGame = false;
                    
                    
                    
                }
                else {
                    lives -= 1;
                    enemyX = Math.floor(Math.random() * (361 - 38)) + 38;
                    enemyY = 0;
                }
            }

        }

    }

    function fire() {

        if (isFiring) {

            bulletY -= 5;
            if (bulletY < 0) {
                isFiring = false;
                bulletX = x + (0.5 * w);
                bulletY = y - 10;
            }
            if (checkCollision(bulletX, bulletY, 5, 5, enemyX, enemyY, 20, 20)) {


                score += 1;
                enemyX = Math.floor(Math.random() * (361 - 38)) + 38;
                enemyY = 0;
                bulletX = x + (0.5 * w);
                bulletY = y - 10;
                ctx.fillRect(enemyX, enemyY, 20, 20);
                startGame = true;
                isFiring = false;

            }

        }

    }



    drawText();

    // This performs simple rectangular collision detection

    function checkCollision(x1, y1, h1, w1, x2, y2, h2, w2) {

        if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
            return true;
        }
        else {
            return false;
        }
    }

});






