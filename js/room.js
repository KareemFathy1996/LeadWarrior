function next() {
    selectedHeroIndex++
    if (selectedHeroIndex >= heroes.length) selectedHeroIndex = 0;
    updateHero()
}

function pre() {
    selectedHeroIndex--
    if (selectedHeroIndex < 0) selectedHeroIndex = heroes.length - 1
    updateHero()
}

function updateHero() {
    hero = heroes[selectedHeroIndex];
    map = maps[selectedHeroIndex]; // till add option to change map
    document.getElementById("choose-hero-img").src = hero.room;
    document.getElementById("choose-hero-name").innerHTML = hero.name;
    document.getElementById("health").innerHTML = hero.health;
    document.getElementById("attackSpeed").innerHTML = hero.attackSpeed;
    document.getElementById("movementSpeed").innerHTML = hero.movementSpeed;
    document.getElementById("numberOfBullets").innerHTML = hero.numOfBullets;
    document.getElementById("choose-hero-img").style.backgroundImage = "url('" + hero.backgroundImage + "')";
}

var selectedHeroIndex = 0;
updateHero()