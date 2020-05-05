function next() {
    selectedHero++
    if (selectedHero >= heroes.length) selectedHero = 0;
    updateHero(heroes[selectedHero])
}

function pre() {
    selectedHero--
    if (selectedHero < 0) selectedHero = heroes.length - 1
    updateHero(heroes[selectedHero])
}

function updateHero(hero) {
    document.getElementById("choose-hero-img").src = hero.room;
    document.getElementById("choose-hero-name").innerHTML = hero.name;
    document.getElementById("health").innerHTML = hero.health;
    document.getElementById("attackSpeed").innerHTML = hero.attackSpeed;
    document.getElementById("movementSpeed").innerHTML = hero.movementSpeed;
    document.getElementById("numberOfBullets").innerHTML = hero.numOfBullets;
    document.getElementById("choose-hero-img").style.backgroundImage = "url('" + hero.backgroundImage + "')";
}

var selectedHero = 0;
updateHero(heroes[selectedHero])