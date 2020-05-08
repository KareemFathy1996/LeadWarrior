var heroMaxId = 0;
var heroesFreeIds = [];

function getHeroId() {
    if (heroesFreeIds.length == 0) {
        return heroMaxId++;
    } else {
        return heroesFreeIds.pop();
    }
}

class Hero {
    constructor(room, src, backgroundImage, name, health, attackSpeed, movementSpeed, numOfBullets) {
        // init
        this.moving = false;
        this.angle = 45;

        this.id = 'hero' + getHeroId();
        this.room = room;
        this.src = src;
        this.backgroundImage = backgroundImage;
        this.name = name;
        this.maxHealth = health;
        this.health = this.maxHealth;
        this.attackSpeed = attackSpeed;
        this.movementSpeed = movementSpeed;
        this.numOfBullets = numOfBullets;
        this.firing = false;
        this.lastFire = 0;

        // configurations
        this.width = heroWidth;
        this.height = heroHeight;
    }
}

var heroes = [
    // room, src, backgroundImage, name, health, attackSpeed, movementSpeed, numOfBullets
    new Hero("assets/heroes/Eevee/room.gif", "assets/heroes/Eevee/src.png", "assets/heroes/Eevee/background.jpg", "Eevee", 500, 500, 4.5, 3),
    new Hero("assets/heroes/Charizard/room.gif", "assets/heroes/Charizard/src.png", "assets/heroes/Charizard/background.jpg", "Charizard", 50, 750, 3.5, 5),
    new Hero("assets/heroes/Gengar/room.gif", "assets/heroes/Gengar/src.png", "assets/heroes/Gengar/background.jpg", "Gengar", 1000, 1000, 4, 2),
]

var hero;