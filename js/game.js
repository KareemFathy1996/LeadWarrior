/*
variables from other files
hero from hero.js
map  from map.js
*/

// used variables
var game = document.getElementById("game")
var renderIntervalId;
var moveIntervalId;
var gameWidth;
var gameHeight;
var keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false };

function showGame() {
    document.getElementById("game").style.display = "block";
    document.getElementById("prev").style.display = "block";
    document.getElementById("prev").onclick = function() {
        changePage("room");
    }
    gameInit();
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
    map = maps[selectedHeroIndex];
    game.innerHTML = "";
    game.style.backgroundImage = "url('" + map.src + "')";
    var image = document.createElement('img');
    image.src = getBgUrl(game);
    // image.onload = imgLoaded();

    // hero
    hero.x = gameWidth / 2 - hero.width / 2;
    hero.y = gameHeight / 2 - hero.height / 2;
    addImg(hero.id, hero.game, hero.x, hero.y, hero.width, hero.height);

    startGame();
}

function startGame() {
    game.focus();
    renderIntervalId = setInterval(render, renderInterval);
    moveIntervalId = setInterval(move, moveInterval);
}

function stopGame() {
    keyMap = { 37: false, 65: false, 38: false, 87: false, 39: false, 68: false, 40: false, 83: false, 32: false, 13: false };
    hero.moving = false;
    clearInterval(renderIntervalId);
    clearInterval(moveIntervalId);
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
        console.log('firing')
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

/* loop */

function render() {
    // hero
    renderImg(hero.id, hero.x, hero.y);
}

function move() {
    // hero
    if (hero.moving) {
        hero.x = Math.max(Math.min(hero.x + hero.movementSpeed * Math.cos(Math.PI * hero.angle / 180), gameWidth - hero.width), 0);
        hero.y = Math.max(Math.min(hero.y + hero.movementSpeed * Math.sin(Math.PI * hero.angle / 180), gameHeight - hero.height), 0);
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