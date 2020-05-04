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

var heros = [
    new Hero("assets/Eevee.gif", "assets/Eevee-background.jpg", "Eevee", 500, 0.5, 7, 3),
    new Hero("assets/Charizard.gif", "assets/Charizard-background.jpg", "Charizard", 50, 0.75, 10, 5),
    new Hero("assets/Gengar.gif", "assets/Gengar-background.jpg", "Gengar", 1000, 0.2, 5, 2),
]

function next() {
    i++
    if (i >= heros.length) i = 0;
    updateHero(heros[i])
}

function pre() {
    i--
    if (i < 0) i = heros.length - 1
    updateHero(heros[i])
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
updateHero(heros[i])