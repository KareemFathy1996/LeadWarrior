class Hero {
    constructor(src, backgroundImage, name, health, attackSpeed, movementSpeed, numOfBullets) {
        this.src = src;
        this.backgroundImage = backgroundImage;
        this.name = name;
        this.health = health;
        this.attackSpeed = attackSpeed;
        this.movementSpeed = movementSpeed;
        this.numOfBullets = numOfBullets;
    }
}

var heroes = [
    new Hero("assets/heroes/Eevee/room.gif", "assets/heroes/Eevee/background.jpg", "Eevee", 500, 0.5, 7, 3),
    new Hero("assets/heroes/Charizard/room.gif", "assets/heroes/Charizard/background.jpg", "Charizard", 50, 0.75, 10, 5),
    new Hero("assets/heroes/Gengar/room.gif", "assets/heroes/Gengar/background.jpg", "Gengar", 1000, 0.2, 5, 2),
]

function next() {
    i++
    if (i >= heroes.length) i = 0;
    updateHero(heroes[i])
}

function pre() {
    i--
    if (i < 0) i = heroes.length - 1
    updateHero(heroes[i])
}

function updateHero(hero) {
    document.getElementById("choose-hero-img").src = hero.src;
    document.getElementById("choose-hero-name").innerHTML = hero.name;
    document.getElementById("health").innerHTML = hero.health;
    document.getElementById("attackSpeed").innerHTML = hero.attackSpeed;
    document.getElementById("movementSpeed").innerHTML = hero.movementSpeed;
    document.getElementById("numberOfBullets").innerHTML = hero.numOfBullets;
    document.getElementById("choose-hero-img").style.backgroundImage = "url('" + hero.backgroundImage + "')";
}

var i = 0;
updateHero(heroes[i])