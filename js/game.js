/*
variables from other files
hero from hero.js
map  from map.js
*/

// used variables
var game = document.getElementById("game")
var loopIntervalId;
var gameWidth;
var gameHeight;
var keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false };
var bullets;
var gameHero;
var enemies;
var gameWidthRatio;
var gameHeightRatio;

function initGamePage() {
    // images to preload
    var images = [];
    images.push(map.src);
    images.push(heroType.src);
    images.push(heroType.bulletType.src);
    for (var type in map.enemies) {
        images.push('assets/enemies/' + type + '/src.png');
    }

    var preloadDone = function() {
        showGame();
        gameInit();
        removeLoadingScreen();
        resume();
    };

    preloadImages(images, preloadDone);
}

function showGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("prev").style.display = "block";
    document.getElementById("prev").onclick = function() {
        changePage("room");
    };
}

function hideGame() {
    document.getElementById("game").style.display = "none";
    pause();
}

/* backbone */
function gameInit() {
    // reset variables
    gameWidth = game.offsetWidth;
    gameHeight = game.offsetHeight;
    gameWidthRatio = gameWidth / gameInitialWidth;
    gameHeightRatio = gameHeight / gameInitialHeight;

    // map
    game.innerHTML = "";
    game.style.backgroundImage = "url('" + map.src + "')";

    // hero
    gameHero = new Hero(heroType);
    gameHero.x = map.startX;
    gameHero.y = map.startY;
    addImg(gameHero);

    // enemies
    bullets = [];
    enemies = [];
    addEnemies();
}

function resume() {
    game.focus();
    loopIntervalId = setInterval(loop, loopInterval);
}

function pause() {
    keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false, 32: false, 13: false };
    gameHero.moving = false;
    clearInterval(loopIntervalId);
}

/* loop */

function loop() {
    gameWidth = game.offsetWidth;
    gameHeight = game.offsetHeight;
    gameWidthRatio = gameWidth / gameInitialWidth;
    gameHeightRatio = gameHeight / gameInitialHeight;
    render();
    move();
    collisionDetection();
    remove();
    fire();
    updateGameStatus();
}

function remove() {
    if (gameHero.removed) {
        removeImg(gameHero.id);
    }
    for (var i = 0; i < enemies.length; i++)
        if (enemies[i].removed) {
            removeImg(enemies[i].id);
            enemies.splice(i, 1);
            i--;
            continue;
        }
    for (var i = 0; i < bullets.length; i++)
        if (bullets[i].removed) {
            removeImg(bullets[i].id);
            bullets.splice(i, 1);
            i--;
            continue;
        }
}

function move() {
    gameHero.move();
    for (var i = 0; i < enemies.length; i++)
        enemies[i].move();
    for (var i = 0; i < bullets.length; i++)
        bullets[i].move();
}

function render() {
    renderImg(gameHero);
    for (var i = 0; i < enemies.length; i++)
        renderImg(enemies[i]);
    for (var i = 0; i < bullets.length; i++)
        renderImg(bullets[i]);
}

function collisionDetection() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        if (bullet.fireSrc == "enemy1" && checkCollision(bullet, gameHero)) {
            collisionDetected(bullet, gameHero);
            continue;
        } else if (bullet.fireSrc == "hero") {
            for (var j = 0; j < enemies.length; j++) {
                var enemy = enemies[j];
                if (checkCollision(bullet, enemy)) {
                    collisionDetected(bullet, enemy);
                    break;
                }
            }
        }
    }
}

function updateGameStatus() {
    if (gameHero.health <= 0)
        gameLost();
    if (enemies.length == 0)
        gameWon();
}

function fire() {
    gameHero.fire();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].fire();
    }
}

/* helping functions */

function addEnemies() {
    for (var type in map.enemies) {
        for (var j = 0; j < map.enemies[type]; j++) {
            var x = Math.floor(Math.random() * (gameInitialWidth - enemyWidth));
            var y = Math.floor(Math.random() * (gameInitialHeight - enemyHeight));
            var enemy = new Enemy(enemiesTypes[type], x, y);
            enemies.push(enemy);
            addImg(enemy);
        }
    }
}

function addImg(object) {
    var img = document.createElement('img');
    img.id = object.id;
    img.src = object.src;
    img.style.position = "absolute";
    img.style.left = object.x * gameWidthRatio + 'px';
    img.style.top = object.y * gameHeightRatio + 'px';
    img.width = object.width * gameWidthRatio + 'px';
    img.height = object.height * gameHeightRatio + 'px';
    game.appendChild(img);
}

function removeImg(id) {
    var img = document.getElementById(id);
    img.parentNode.removeChild(img);
}

function renderImg(object) {
    var img = document.getElementById(object.id);
    img.style.left = object.x * gameWidthRatio + 'px';
    img.style.top = object.y * gameHeightRatio + 'px';
    img.width = object.width * gameWidthRatio;
    img.height = object.height * gameHeightRatio;
}

function getBgUrl(el) {
    var bg = "";
    if (el.currentStyle) { // IE
        bg = el.currentStyle.backgroundImage;
    } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
        bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
    } else { // try and get inline style
        bg = el.style.backgroundImage;
    }
    return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}

function checkCollision(o1, o2) {
    if ((o1.x * gameWidthRatio > o2.x * gameWidthRatio && o1.x * gameWidthRatio < o2.x * gameWidthRatio + o2.width * gameWidthRatio && o1.y * gameHeightRatio > o2.y * gameHeightRatio && o1.y * gameHeightRatio < o2.y * gameHeightRatio + o2.height * gameHeightRatio) ||
        (o1.x * gameWidthRatio + o1.width * gameWidthRatio > o2.x * gameWidthRatio && o1.x * gameWidthRatio + o1.width * gameWidthRatio < o2.x * gameWidthRatio + o2.width * gameWidthRatio && o1.y * gameHeightRatio + o1.height * gameHeightRatio > o2.y * gameHeightRatio && o1.y * gameHeightRatio + o1.height * gameHeightRatio < o2.y * gameHeightRatio + o2.height * gameHeightRatio) ||
        (o1.x * gameWidthRatio > o2.x * gameWidthRatio && o1.x * gameWidthRatio < o2.x * gameWidthRatio + o2.width * gameWidthRatio && o1.y * gameHeightRatio + o1.height * gameHeightRatio > o2.y * gameHeightRatio && o1.y * gameHeightRatio + o1.height * gameHeightRatio < o2.y * gameHeightRatio + o2.height * gameHeightRatio) ||
        (o1.x * gameWidthRatio + o1.width * gameWidthRatio > o2.x * gameWidthRatio && o1.x * gameWidthRatio + o1.width * gameWidthRatio < o2.x * gameWidthRatio + o2.width * gameWidthRatio && o1.y * gameHeightRatio > o2.y * gameHeightRatio && o1.y * gameHeightRatio < o2.y * gameHeightRatio + o2.height * gameHeightRatio)

        ||
        (o2.x * gameWidthRatio > o1.x * gameWidthRatio && o2.x * gameWidthRatio < o1.x * gameWidthRatio + o1.width * gameWidthRatio && o2.y * gameHeightRatio > o1.y * gameHeightRatio && o2.y * gameHeightRatio < o1.y * gameHeightRatio + o1.height * gameHeightRatio) ||
        (o2.x * gameWidthRatio + o2.width * gameWidthRatio > o1.x * gameWidthRatio && o2.x * gameWidthRatio + o2.width * gameWidthRatio < o1.x * gameWidthRatio + o1.width * gameWidthRatio && o2.y * gameHeightRatio + o2.height * gameHeightRatio > o1.y * gameHeightRatio && o2.y * gameHeightRatio + o2.height * gameHeightRatio < o1.y * gameHeightRatio + o1.height * gameHeightRatio) ||
        (o2.x * gameWidthRatio > o1.x * gameWidthRatio && o2.x * gameWidthRatio < o1.x * gameWidthRatio + o1.width * gameWidthRatio && o2.y * gameHeightRatio + o2.height * gameHeightRatio > o1.y * gameHeightRatio && o2.y * gameHeightRatio + o2.height * gameHeightRatio < o1.y * gameHeightRatio + o1.height * gameHeightRatio) ||
        (o2.x * gameWidthRatio + o2.width * gameWidthRatio > o1.x * gameWidthRatio && o2.x * gameWidthRatio + o2.width * gameWidthRatio < o1.x * gameWidthRatio + o1.width * gameWidthRatio && o2.y * gameHeightRatio > o1.y * gameHeightRatio && o2.y * gameHeightRatio < o1.y * gameHeightRatio + o1.height * gameHeightRatio)
    ) {
        return true;
    }
}

function collisionDetected(object1, object2) {
    var touchDamage1 = object1.touchDamage;
    var touchDamage2 = object2.touchDamage;
    object1.hitBy(touchDamage2);
    object2.hitBy(touchDamage1);
}

function gameWon() {
    pause();
    alert('game won');
}

function gameLost() {
    pause();
    alert('game lost');
}

/* listener */
function keyEventHandler(e) {
    e = e || event;
    keyMap[e.keyCode] = e.type == 'keydown';
    var left = (keyMap[37] || keyMap[65]);
    var up = (keyMap[38] || keyMap[87]);
    var right = (keyMap[39] || keyMap[68]);
    var down = (keyMap[40] || keyMap[83]);
    var firing = (keyMap[32] || keyMap[13]);
    if (firing)
        gameHero.firing = true;
    else
        gameHero.firing = false;
    if (right && up) gameHero.angle = 315;
    else if (right && down) gameHero.angle = 45;
    else if (left && down) gameHero.angle = 135;
    else if (left && up) gameHero.angle = 225;
    else if (right == true) gameHero.angle = 0;
    else if (down == true) gameHero.angle = 90;
    else if (left == true) gameHero.angle = 180;
    else if (up == true) gameHero.angle = 270;
    else {
        gameHero.moving = false;
        return;
    }
    gameHero.moving = true;
}

game.addEventListener('keydown', keyEventHandler);
game.addEventListener('keyup', keyEventHandler);

/* used outside */
function canMoveTo(x, y, width, height) {
    if (x < 0 || y < 0 || Math.ceil(x * gameWidthRatio) + Math.ceil(width * gameWidthRatio) > gameWidth || Math.ceil(y * gameHeightRatio) + Math.ceil(height * gameHeightRatio) > gameHeight)
        return false;
    return true;
}