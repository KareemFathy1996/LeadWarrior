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
var enemies;
var enemiesMoving = false;
var bullets;

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

    // map
    game.innerHTML = "";
    game.style.backgroundImage = "url('" + map.src + "')";

    // hero
    hero.x = map.startX;
    hero.y = map.startY;
    hero.health = hero.maxHealth;
    addImg(hero.id, hero.src, hero.x, hero.y, hero.width, hero.height);

    // enemies
    enemies = [];
    for (var type in map.enemies) {
        for (var j = 0; j < map.enemies[type]; j++) {
            var x = Math.floor(Math.random() * (gameWidth - enemyWidth));
            var y = Math.floor(Math.random() * (gameHeight - enemyHeight));
            enemies.push(new Enemy(type, x, y, enemyWidth, enemyHeight));
            var last = enemies[enemies.length - 1];
            addImg(last.id, last.src, last.x, last.y, last.width, last.height);
        }
    }

    bullets = [];
}

function startGame() {
    game.focus();
    renderIntervalId = setInterval(render, renderInterval);
    moveIntervalId = setInterval(move, moveInterval);
    fireIntervalId = setInterval(fire, fireInterval);
    enemiesMoving = true;
}

function stopGame() {
    keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false, 32: false, 13: false };
    hero.moving = false;
    clearInterval(renderIntervalId);
    clearInterval(moveIntervalId);
    clearInterval(fireIntervalId);
}

/* loop */

function render() {
    // hero
    renderImg(hero.id, hero.x, hero.y);

    // enemies
    for (var i = 0; i < enemies.length; i++)
        renderImg(enemies[i].id, enemies[i].x, enemies[i].y);

    for (var i = 0; i < bullets.length; i++)
        renderImg(bullets[i].id, bullets[i].x, bullets[i].y)
}

function move() {
    // hero
    if (hero.moving) {
        hero.x = Math.max(Math.min(hero.x + hero.movementSpeed * Math.cos(Math.PI * hero.angle / 180), gameWidth - hero.width), 0);
        hero.y = Math.max(Math.min(hero.y + hero.movementSpeed * Math.sin(Math.PI * hero.angle / 180), gameHeight - hero.height), 0);
    }

    // enemies
    for (var i = 0; i < enemies.length; i++) {
        // calculate new angle periodic
        if (new Date() - enemies[i].lastAngleTime >= enemies[i].nextAngleTime) {
            enemies[i].angle = Math.floor(Math.random() * 360);
            enemies[i].lastAngleTime = new Date();
            enemies[i].nextAngleTime = minNewAngleTime + Math.floor(Math.random() * maxNewAngleTime);
        }
        // Calculate The New Position of the Enemy
        var newX = enemies[i].x + enemies[i].movementSpeed * Math.cos(Math.PI * enemies[i].angle / 180);
        var newY = enemies[i].y + enemies[i].movementSpeed * Math.sin(Math.PI * enemies[i].angle / 180);
        // While the Angle Led to a Position Outside Play Area the Rechange Angle
        while (newX < 0 || newY < 0 || newX + enemies[i].width > gameWidth || newY + enemies[i].height > gameHeight) {
            enemies[i].angle = Math.floor(Math.random() * 360);
            enemies[i].lastAngleTime = new Date();
            enemies[i].nextAngleTime = minNewAngleTime + Math.floor(Math.random() * maxNewAngleTime);
            var newX = enemies[i].x + enemies[i].movementSpeed * Math.cos(Math.PI * enemies[i].angle / 180);
            var newY = enemies[i].y + enemies[i].movementSpeed * Math.sin(Math.PI * enemies[i].angle / 180);
        }
        // Set New Position of Enemy 
        enemies[i].x = newX;
        enemies[i].y = newY;
    }

    // bullets 
    for (var i = 0; i < bullets.length; i++) {
        // Calculate The New Position of the Enemy
        var newX = bullets[i].x + bullets[i].movementSpeed * Math.cos(Math.PI * bullets[i].angle / 180);
        var newY = bullets[i].y + bullets[i].movementSpeed * Math.sin(Math.PI * bullets[i].angle / 180);

        var removed = false;
        if (bullets[i].fireType == 'Hero') {
            for (var j = 0; j < enemies.length; j++) {
                if ((bullets[i].x > enemies[j].x && bullets[i].x < enemies[j].x + enemies[j].width && bullets[i].y > enemies[j].y && bullets[i].y < enemies[j].y + enemies[j].height) ||
                    (bullets[i].x + bullets[i].width > enemies[j].x && bullets[i].x + bullets[i].width < enemies[j].x + enemies[j].width && bullets[i].y + bullets[i].height > enemies[j].y && bullets[i].y + bullets[i].height < enemies[j].y + enemies[j].height) ||
                    (bullets[i].x > enemies[j].x && bullets[i].x < enemies[j].x + enemies[j].width && bullets[i].y + bullets[i].height > enemies[j].y && bullets[i].y + bullets[i].height < enemies[j].y + enemies[j].height) ||
                    (bullets[i].x + bullets[i].width > enemies[j].x && bullets[i].x + bullets[i].width < enemies[j].x + enemies[j].width && bullets[i].y > enemies[j].y && bullets[i].y < enemies[j].y + enemies[j].height)) {
                    enemies[j].health -= bullets[i].damage;
                    if (enemies[j].health <= 0) {
                        var img = document.getElementById(enemies[j].id);
                        img.parentNode.removeChild(img);
                        enemies.splice(j, 1);
                        j--;
                        if (enemies.length == 0) {
                            console.log('game won');
                            stopGame();
                        }
                        continue;
                    }
                    removed = true;
                    break;
                }
            }
        } else {
            if ((bullets[i].x > hero.x && bullets[i].x < hero.x + hero.width && bullets[i].y > hero.y && bullets[i].y < hero.y + hero.height) ||
                (bullets[i].x + bullets[i].width > hero.x && bullets[i].x + bullets[i].width < hero.x + hero.width && bullets[i].y + bullets[i].height > hero.y && bullets[i].y + bullets[i].height < hero.y + hero.height) ||
                (bullets[i].x > hero.x && bullets[i].x < hero.x + hero.width && bullets[i].y + bullets[i].height > hero.y && bullets[i].y + bullets[i].height < hero.y + hero.height) ||
                (bullets[i].x + bullets[i].width > hero.x && bullets[i].x + bullets[i].width < hero.x + hero.width && bullets[i].y > hero.y && bullets[i].y < hero.y + hero.height)) {
                hero.health -= bullets[i].damage;
                if (hero.health <= 0) {
                    stopGame();
                    console.log('game lost');
                    return;
                }
                removed = true;
            }
        }

        if (removed || newX < 0 || newY < 0 || newX + bullets[i].width > gameWidth || newY + bullets[i].height > gameHeight) {
            var img = document.getElementById(bullets[i].id);
            img.parentNode.removeChild(img);
            bullets.splice(i, 1);
            i--;
            continue;
        }
        // Set New Position of Enemy 
        bullets[i].x = newX;
        bullets[i].y = newY;
    }
}

function fire() {
    // hero
    if (hero.firing && new Date() - hero.lastFire > hero.attackSpeed) {
        bullets.push(new Bullet('Hero', 'assets/enemies/bullet1.png', hero.x + hero.width / 2 - bulletWidth / 2, hero.y + hero.height / 2 - bulletHeight / 2, hero.angle));
        var temp = bullets[bullets.length - 1];
        addImg(temp.id, temp.src, temp.x, temp.y, temp.width, temp.height);
        hero.lastFire = new Date();
    }
    // enemies
    for (var i = 0; i < enemies.length; i++) {
        if (new Date() - enemies[i].lastFire > enemies[i].attackSpeed) {
            bullets.push(new Bullet('Enemy', 'assets/enemies/bullet2.png', enemies[i].x + enemies[i].width / 2 - bulletWidth / 2, enemies[i].y + enemies[i].height / 2 - bulletHeight / 2, enemies[i].angle));
            var temp = bullets[bullets.length - 1];
            addImg(temp.id, temp.src, temp.x, temp.y, temp.width, temp.height);
            enemies[i].lastFire = new Date();
        }
    }
}

/* helping functions */

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