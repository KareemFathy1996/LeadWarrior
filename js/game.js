/*
variables from other files
hero from hero.js
map  from map.js
*/

// used variables
var game = document.getElementById("game");
var loopIntervalId;

var gameWidth;
var gameHeight;
var gameWidthRatio;
var gameHeightRatio;

var gameHero;
var enemies;
var bullets;

var lastEnemiesSpawn;
var nextEnemiesSpawn;
var numOfNewEnemies;

var enemiesKilled;
var timePassed;
var mins;

var keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false };

// preload images then initiate game
function initGamePage() {
    var images = [];
    images.push(map.src);
    images.push(heroType.src);
    images.push(heroType.bulletType.src);
    for (var i = 0; i < map.enemies.length; i++) {
        images.push(map.enemies[i].type.src);
        images.push(map.enemies[i].type.bulletType.src);
    }

    var preloadDone = function() {
        showGame();
        gameInit();
        removeLoadingScreen();
        resume();
    };

    preloadImages(images, preloadDone);
}

// make game div visible
function showGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("prev").style.display = "inline-block";
    document.getElementById("game-menu-stats").style.display = "inline-block";
    document.getElementById("game-menu-statistics").style.display = "inline-block";
    document.getElementById("pause").style.display = "inline-block";
    document.getElementById("prev").onclick = function() {
        changePage("room");
    };
}

// make game div hidden and stop the game
function hideGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("prev").style.display = "none";
    document.getElementById("game-menu-stats").style.display = "none";
    document.getElementById("game-menu-statistics").style.display = "none";
    document.getElementById("pause").style.display = "none";
    pause();
    document.getElementById("pause-menu").style.display = "none";
    document.getElementById("game-won").style.display = "none";
    document.getElementById("game-lost").style.display = "none";
}

/* backbone */
function gameInit() {
    // reset variables
    gameWidth = game.offsetWidth;
    gameHeight = game.offsetHeight;
    gameWidthRatio = gameWidth / gameInitialWidth;
    gameHeightRatio = gameHeight / gameInitialHeight;
    enemiesKilled = 0;
    mins = 0;
    document.getElementById('menu-statistics-map-mode').innerHTML = map.mode;

    // map
    game.innerHTML = "";
    game.style.backgroundImage = "url('" + map.src + "')";

    // hero
    gameHero = new Hero(heroType, map.startX, map.startY);
    addImg(gameHero);

    // enemies
    lastEnemiesSpawn = -1;
    timePassed = 0;
    bullets = [];
    enemies = [];
}

function resume() {
    game.focus();
    loopIntervalId = setInterval(loop, loopInterval);
}

function showPause() {
    document.getElementById("pause-menu").style.display = "inline-block";
    pause();
}

function hidePause() {
    document.getElementById("pause-menu").style.display = "none";
    resume();
}

function pause() {
    keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false, 32: false, 13: false };
    gameHero.moving = false;
    clearInterval(loopIntervalId);
}

/* loop */

function loop() {
    // check if game size changed
    gameWidth = game.offsetWidth;
    gameHeight = game.offsetHeight;
    gameWidthRatio = gameWidth / gameInitialWidth;
    gameHeightRatio = gameHeight / gameInitialHeight;

    // game logic
    addEnemies();
    render();
    move();
    collisionDetection();
    remove();
    fire();
    updateGameStatus();
}

// remove all objects that are marked to remove
function remove() {
    if (gameHero.removed) {
        removeImg(gameHero.id);
    }
    for (var i = 0; i < enemies.length; i++)
        if (enemies[i].removed) {
            document.getElementById('menu-statistics-enemies-killed').innerHTML = ++enemiesKilled;
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

// check if enmies' bullets hit hero or vice versa
function collisionDetection() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];
        if (bullet.fireSrc == "enemy" && checkCollision(bullet, gameHero)) {
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

// change status in menu & check if game won/lost
function updateGameStatus() {
    document.getElementById('menu-stats-name').innerHTML = gameHero.name;
    document.getElementById('menu-stats-health').innerHTML = gameHero.health + '/' + gameHero.maxHealth;
    document.getElementById('menu-stats-attackSpeed').innerHTML = gameHero.attackSpeed;
    document.getElementById('menu-stats-movementSpeed').innerHTML = gameHero.movementSpeed;
    document.getElementById('time-passed').innerHTML = Math.floor(timePassed / (60 * 60 * 1000)) + ':' + Math.floor(timePassed / (60 * 1000)) % 60 + ':' + Math.floor(timePassed / 1000) % 60;
    if (Math.floor(timePassed / (60 * 1000)) % 60 > mins) {
        mins = Math.floor(timePassed / (60 * 1000)) % 60;
        minNewEnemies++;
        maxNewEnemies++;
    }
    timePassed += loopInterval;

    if (map.mode != "Survival") {
        if (enemies.length == 0)
            gameWon();
    }
    if (gameHero.health <= 0)
        gameLost();
}

function fire() {
    gameHero.fire();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].fire();
    }
}

function addEnemies() {
    if (lastEnemiesSpawn == -1) {
        for (var i = 0; i < map.enemies.length; i++) {
            var type = map.enemies[i].type;
            var num = map.enemies[i].number;
            for (var j = 0; j < num; j++) {
                var x = Math.floor(Math.random() * (gameInitialWidth - type.width));
                var y = Math.floor(Math.random() * (gameInitialHeight - type.height));
                addEnemy(type, x, y);
            }
        }
        lastEnemiesSpawn = new Date();
        nextEnemiesSpawn = minNewEnemyTime + Math.floor(Math.random() * maxNewEnemyTime);
        numOfNewEnemies = Math.round(Math.random() * 4) + 1;
    } else if (map.mode == "Survival" && new Date() - nextEnemiesSpawn >= lastEnemiesSpawn) {
        for (var i = 0; i < numOfNewEnemies; i++) {
            type = map.enemies[Math.round(Math.random() * (map.enemies.length - 1))].type;
            var x = Math.floor(Math.random() * (gameInitialWidth - type.width));
            var y = Math.floor(Math.random() * (gameInitialHeight - type.height));
            addEnemy(type, x, y);
            numOfNewEnemies = Math.round(Math.random() * maxNewEnemies) + minNewEnemies;
        }
        lastEnemiesSpawn = new Date();
        nextEnemiesSpawn = minNewEnemyTime + Math.floor(Math.random() * maxNewEnemyTime);
    }
}

function addEnemy(type, x, y) {
    var enemy = new Enemy(type, x, y);
    enemies.push(enemy);
    addImg(enemy);
}

/* helping functions */

// add img to game div
function addImg(object) {

    var div = document.createElement('div');
    div.id = object.id;
    div.style.position = "absolute";
    div.style.left = object.x * gameWidthRatio + 'px';
    div.style.top = object.y * gameHeightRatio + 'px';
    div.classList.add('object-div');

    if (!(object instanceof Bullet)) {
        var progress = document.createElement('progress');
        progress.classList.add('health-progress');
        progress.id = 'progress' + object.id;
        progress.max = object.maxHealth;
        progress.value = object.health;
        progress.style.width = object.width * gameWidthRatio + 'px';
        div.appendChild(progress);
    }

    var img = document.createElement('img');
    img.id = 'img' + object.id;
    img.src = object.src;
    img.style.width = object.width * gameWidthRatio + 'px';
    img.style.height = object.height * gameHeightRatio + 'px';
    div.appendChild(img);

    game.appendChild(div);
}

// remove img from game div
function removeImg(id) {
    var div = document.getElementById(id);
    div.parentNode.removeChild(div);
}

// change position of img in game div
function renderImg(object) {

    var div = document.getElementById(object.id);
    div.style.left = object.x * gameWidthRatio + 'px';
    div.style.top = object.y * gameHeightRatio + 'px';

    if (!(object instanceof Bullet)) {
        var progress = document.getElementById('progress' + object.id);
        progress.classList.add('health-progress');
        progress.id = 'progress' + object.id;
        progress.max = object.maxHealth;
        progress.value = object.health;
        progress.style.width = object.width * gameWidthRatio + 'px';
    }

    var img = document.getElementById('img' + object.id);
    img.style.width = object.width * gameWidthRatio + 'px';
    img.style.height = object.height * gameHeightRatio + 'px';

    img.style.transform = 'rotate(' + (object.angle - 90) + 'deg)';
}

// get background image src to preload
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

// check if overlap happened between two objects
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

// handle the collision of two objects
function collisionDetected(object1, object2) {
    var touchDamage1 = object1.touchDamage;
    var touchDamage2 = object2.touchDamage;
    object1.hitBy(touchDamage2);
    object2.hitBy(touchDamage1);
}

// show game won screen then stop game
function gameWon() {
    document.getElementById("game-won").style.display = "inline-block";
    pause();
}

// show game lost screen then stop game
function gameLost() {
    document.getElementById("game-lost").style.display = "inline-block";
    pause();
}

/* listener */
// listen for movement and fire keys (arrows, wasd, space & enter)
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

function addBullet(bullet) {
    bullets.push(bullet);
    addImg(bullet);
}