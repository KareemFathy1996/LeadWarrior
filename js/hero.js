class Hero {
    constructor(src, name, health, attackSpeed, movementSpeed, numOfBullets) {
        this.src = src;
        this.name = name;
        this.health = health;
        this.attackSpeed = attackSpeed;
        this.movementSpeed = movementSpeed;
        this.numOfBullets = numOfBullets;
    }
}

var heros = [
    new Hero("assets/pikachu.png", "Pikachu", 50, 0.75, 10, 5),
    new Hero("assets/snorlax.png", "Snorlax", 1000, 0.2, 5, 2),
    new Hero("assets/bullbasaur.png", "Bullbasaur", 500, 0.5, 7, 3),
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
}

var i = 0;
updateHero(heros[i])