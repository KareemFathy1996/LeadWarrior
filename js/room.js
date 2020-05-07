function showRoom() {
    // objects to render


    document.getElementById("room").style.display = "block";
    document.getElementById("prev").style.display = "block";
    document.getElementById("prev").onclick = function() {
        changePage("main-menu");
    }
    updateHero();


    // preload images
    var images = [];
    for (var i = 0; i < heroes.length; i++) {
        images.push(heroes[i].room);
        images.push(heroes[i].backgroundImage);
    }

    var callback = function() {
        console.log('OHHAI!');
    };

    preloadImages(images, callback);
}

function hideRoom() {
    document.getElementById("room").style.display = "none";
    document.getElementById("prev").style.display = "none";
}

function nextHero() {
    selectedHeroIndex++;
    if (selectedHeroIndex >= heroes.length) selectedHeroIndex = 0;
    updateHero()
}

function preHero() {
    selectedHeroIndex--;
    if (selectedHeroIndex < 0) selectedHeroIndex = heroes.length - 1
    updateHero()
}

function updateHero() {
    hero = heroes[selectedHeroIndex];
    document.getElementById("choose-hero-img").src = hero.room;
    document.getElementById("choose-hero-name").innerHTML = hero.name;
    document.getElementById("health").innerHTML = hero.health;
    document.getElementById("attackSpeed").innerHTML = hero.attackSpeed;
    document.getElementById("movementSpeed").innerHTML = hero.movementSpeed;
    document.getElementById("numberOfBullets").innerHTML = hero.numOfBullets;
    document.getElementById("choose-hero-img").style.backgroundImage = "url('" + hero.backgroundImage + "')";
}

var selectedHeroIndex = 0;