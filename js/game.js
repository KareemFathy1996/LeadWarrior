/*
variables from other files
hero from hero.js
map  from map.js
*/

// used variables
var game = document.getElementById("game")
var renderIntervalId;
var moveIntervalId;
var fireIntervalId;
var gameWidth;
var gameHeight;
var keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false };
var enemiesMoving = false;
var movingObjects;

function initGamePage() {
    // images to preload
    var images = [];
    images.push(map.src);
    images.push(hero.src);
    for (var type in map.enemies) {
        images.push('assets/enemies/' + type + '/src.png');
    }

    var preloadDone = function() {
        showGame();
        gameInit();
        removeLoadingScreen();
        startGame();
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
    stopGame();
}

/* init */
function gameInit() {
    // reset variables
    gameWidth = game.offsetWidth;
    gameHeight = game.offsetHeight;
    movingObjects = [];

    // map
    game.innerHTML = "";
    game.style.backgroundImage = "url('" + map.src + "')";

    // hero
    hero.x = map.startX;
    hero.y = map.startY;
    hero.health = hero.maxHealth;
    hero.removed = false;
    addMovingOjbect(hero);
    addImg(hero.id, hero.src, hero.x, hero.y, hero.width, hero.height);

    // enemies
    for (var type in map.enemies) {
        for (var j = 0; j < map.enemies[type]; j++) {
            var x = Math.floor(Math.random() * (gameWidth - enemyWidth));
            var y = Math.floor(Math.random() * (gameHeight - enemyHeight));
            addMovingOjbect(new Enemy(type, x, y, enemyWidth, enemyHeight));
            var last = movingObjects[movingObjects.length - 1];
            addImg(last.id, last.src, last.x, last.y, last.width, last.height);
        }
    }
}

function startGame() {
    game.focus();
    renderIntervalId = setInterval(render, renderInterval);
    moveIntervalId = setInterval(move, moveInterval);
    fireIntervalId = setInterval(fire, fireInterval);
    collisionDetectionId = setInterval(collisionDetection, collisionDetectionInterval);
    updateGameStatusId = setInterval(updateGameStatus, updateGameStatusInterval);
}

function stopGame() {
    keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false, 32: false, 13: false };
    hero.moving = false;
    clearInterval(renderIntervalId);
    clearInterval(moveIntervalId);
    clearInterval(fireIntervalId);
    clearInterval(collisionDetectionId);
    clearInterval(updateGameStatusId);
}

/* loop */

function render() {
    for (var i = 0; i < movingObjects.length; i++) {
        if (movingObjects[i].removed) {
            removeImg(movingObjects[i].id);
            if (movingObjects[i] instanceof Enemy)
                Enemy.numberOfEnemies--;
            movingObjects.splice(i, 1);
            i--;
            continue;
        }
        renderImg(movingObjects[i].id, movingObjects[i].x, movingObjects[i].y);
    }
}

function move() {
    for (var i = 0; i < movingObjects.length; i++) {
        if (movingObjects[i].removed) {
            removeImg(movingObjects[i].id);
            if (movingObjects[i] instanceof Enemy)
                Enemy.numberOfEnemies--;
            movingObjects.splice(i, 1);
            i--;
            continue;
        }
        movingObjects[i].move();
    }
}

function fire() {
    for (var i = 0; i < movingObjects.length; i++) {
        if (movingObjects[i] instanceof Firing)
            movingObjects[i].fire();
    }
}

function collisionDetection() {
    for (var i = 0; i < movingObjects.length; i++) {
        var object1 = movingObjects[i];
        for (var j = i + 1; j < movingObjects.length; j++) {
            var object2 = movingObjects[j];
            if ((object1.x > object2.x && object1.x < object2.x + object2.width && object1.y > object2.y && object1.y < object2.y + object2.height) ||
                (object1.x + object1.width > object2.x && object1.x + object1.width < object2.x + object2.width && object1.y + object1.height > object2.y && object1.y + object1.height < object2.y + object2.height) ||
                (object1.x > object2.x && object1.x < object2.x + object2.width && object1.y + object1.height > object2.y && object1.y + object1.height < object2.y + object2.height) ||
                (object1.x + object1.width > object2.x && object1.x + object1.width < object2.x + object2.width && object1.y > object2.y && object1.y < object2.y + object2.height)) {
                collisionDetected(object1, object2);
            }
        }
    }
}

function updateGameStatus() {
    if (hero.removed) {
        console.log('game lost');
        stopGame();
    }
    if (Enemy.numberOfEnemies == 0) {
        console.log('game won');
        stopGame();
    }
}

/* helping functions */

function addMovingOjbect(movingObject) {
    movingObjects.push(movingObject);
}

function addImg(id, src, x, y, width, height) {
    var img = document.createElement('img');
    img.id = id;
    img.src = src;
    img.style.position = "absolute";
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.width = width + 'px';
    img.style.height = height + 'px';
    game.appendChild(img);
}

function renderImg(id, x, y) {
    var img = document.getElementById(id);
    img.style.left = x + 'px';
    img.style.top = y + 'px';
}

function removeImg(id) {
    var img = document.getElementById(id);
    img.parentNode.removeChild(img);
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

function collisionDetected(object1, object2) {
    if (object1 instanceof Enemy && object2 instanceof Enemy)
        return;
    if (object1 instanceof Bullet && object2 instanceof Bullet && object1.fireType == object2.fireType)
        return;
    if ((object1 instanceof Bullet && object2 instanceof Hero && object1.fireType == "Hero") || (object2 instanceof Bullet && object1 instanceof Hero && object2.fireType == "Hero"))
        return;
    if ((object1 instanceof Bullet && object2 instanceof Enemy && object1.fireType == "Enemy") || (object2 instanceof Bullet && object1 instanceof Enemy && object2.fireType == "Enemy"))
        return;
    var touchDamage1 = object1.touchDamage;
    var touchDamage2 = object2.touchDamage;
    object1.hitBy(touchDamage2);
    object2.hitBy(touchDamage1);
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
        hero.firing = true;
    else
        hero.firing = false;
    if (right && up) hero.angle = 315;
    else if (right && down) hero.angle = 45;
    else if (left && down) hero.angle = 135;
    else if (left && up) hero.angle = 225;
    else if (right == true) hero.angle = 0;
    else if (down == true) hero.angle = 90;
    else if (left == true) hero.angle = 180;
    else if (up == true) hero.angle = 270;
    else {
        hero.moving = false;
        return;
    }
    hero.moving = true;
}

game.addEventListener('keydown', keyEventHandler);
game.addEventListener('keyup', keyEventHandler);