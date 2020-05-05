class Hero {
    constructor(room, game, backgroundImage, name, health, attackSpeed, movementSpeed, numOfBullets) {
        this.room = room;
        this.game = game;
        this.backgroundImage = backgroundImage;
        this.name = name;
        this.health = health;
        this.attackSpeed = attackSpeed;
        this.movementSpeed = movementSpeed;
        this.numOfBullets = numOfBullets;
    }
}

var heroes = [
    new Hero("assets/heroes/Eevee/room.gif", "assets/heroes/Eevee/game.png", "assets/heroes/Eevee/background.jpg", "Eevee", 500, 0.5, 7, 3),
    new Hero("assets/heroes/Charizard/room.gif", "assets/heroes/Charizard/game.png", "assets/heroes/Charizard/background.jpg", "Charizard", 50, 0.75, 10, 5),
    new Hero("assets/heroes/Gengar/room.gif", "assets/heroes/Eevee/game.png", "assets/heroes/Gengar/background.jpg", "Gengar", 1000, 0.2, 5, 2),
]