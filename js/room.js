function initRoomPage() {
    // images to preload
    var images = [];
    for (var i = 0; i < heroesTypes.length; i++) {
        images.push(heroesTypes[i].room);
        images.push(heroesTypes[i].backgroundImage);
    }

    var preloadDone = function() {
        showRoom();
        removeLoadingScreen();
    };

    preloadImages(images, preloadDone);
}

function showRoom() {
    updateHero();
    document.getElementById("room").style.display = "block";
    document.getElementById("prev").style.display = "inline-block";
    document.getElementById("prev").onclick = function() {
        changePage("main-menu");
    }
}

function hideRoom() {
    document.getElementById("room").style.display = "none";
    document.getElementById("prev").style.display = "none";
}

function nextHero() {
    selectedHeroIndex++;
    if (selectedHeroIndex >= heroesTypes.length) selectedHeroIndex = 0;
    updateHero()
}

function preHero() {
    selectedHeroIndex--;
    if (selectedHeroIndex < 0) selectedHeroIndex = heroesTypes.length - 1
    updateHero()
}

function updateHero() {
    map = maps[selectedHeroIndex]; // delete this later
    heroType = heroesTypes[selectedHeroIndex];
    document.getElementById("choose-hero-img").src = heroType.room;
    document.getElementById("choose-hero-name").innerHTML = heroType.name;
    document.getElementById("health").innerHTML = heroType.maxHealth;
    document.getElementById("attackSpeed").innerHTML = heroType.attackSpeed;
    document.getElementById("movementSpeed").innerHTML = heroType.movementSpeed;
    document.getElementById("numberOfBullets").innerHTML = heroType.numOfBullets;
    document.getElementById("choose-hero-img").style.backgroundImage = "url('" + heroType.backgroundImage + "')";
}

var selectedHeroIndex = 0;