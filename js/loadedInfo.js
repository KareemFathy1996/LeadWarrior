var bulletsTypes = {
    'hero': new BulletType("hero", "assets/heroes/bullet1.png", bulletMovementSpeed, bulletWidth, bulletHeight),
    'enemy1': new BulletType("enemy1", "assets/enemies/bullet2.png", bulletMovementSpeed, bulletWidth, bulletHeight),
};

var enemiesTypes = {
    'meow': new EnemyType('meow', 'Meow', enemyWidth, enemyHeight, 1, enemyMovementSpeed, enemyAttackSpeed, bulletDamage, bulletsTypes['enemy1'], enemyHealth),
    'zubat': new EnemyType('zubat', 'Zubat', enemyWidth, enemyHeight, 1, enemyMovementSpeed, enemyAttackSpeed, bulletDamage, bulletsTypes['enemy1'], enemyHealth),
};

var heroes = [
    // room, src, backgroundImage, name, health, attackSpeed, movementSpeed, numOfBullets
    new Hero("assets/heroes/Eevee/room.gif", "assets/heroes/Eevee/src.png", "assets/heroes/Eevee/background.jpg", "Eevee", 50, 500, 4.5, 3, bulletsTypes['hero']),
    new Hero("assets/heroes/Charizard/room.gif", "assets/heroes/Charizard/src.png", "assets/heroes/Charizard/background.jpg", "Charizard", 60, 750, 3.5, 5, bulletsTypes['hero']),
    new Hero("assets/heroes/Gengar/room.gif", "assets/heroes/Gengar/src.png", "assets/heroes/Gengar/background.jpg", "Gengar", 70, 1000, 4, 2, bulletsTypes['hero']),
];

var maps = [
    // src, enemies
    new Map("assets/maps/1.jpg", 10, 10, { 'zubat': 1, 'meow': 3 }),
    new Map("assets/maps/2.jpg", 50, 50, { 'zubat': 2, 'meow': 2 }),
    new Map("assets/maps/3.jpg", 60, 60, { 'zubat': 3, 'meow': 1 }),
    new Map("assets/maps/4.jpg", 80, 80, { 'zubat': 3, 'meow': 2 }),
    new Map("assets/maps/5.jpg", 150, 150, { 'zubat': 2, 'meow': 3 }),
];

var hero = heroes[0];