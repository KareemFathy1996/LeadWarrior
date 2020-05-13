var bulletsTypes = { // name, width, height, maxHealth, movementSpeed
    'hero': new BulletType("hero", bulletWidth, bulletHeight, 0, bulletMovementSpeed),
    'enemy1': new BulletType("enemy1", bulletWidth, bulletHeight, 0, bulletMovementSpeed),
};

var enemiesTypes = { // name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    'meow': new EnemyType('Meow', enemyWidth, enemyHeight, enemyHealth, enemyMovementSpeed, enemyAttackSpeed, 1, bulletsTypes['enemy1'], bulletDamage, 0.1),
    'zubat': new EnemyType('Zubat', enemyWidth, enemyHeight, enemyHealth, enemyMovementSpeed, enemyAttackSpeed, 1, bulletsTypes['enemy1'], bulletDamage, 0.1),
};

var heroesTypes = [ //name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    new HeroType("Eevee", heroWidth, heroHeight, 50, 4.5, 500, 1, bulletsTypes['hero'], bulletDamage, 0.1),
    new HeroType("Charizard", heroWidth, heroHeight, 60, 4.0, 600, 1, bulletsTypes['hero'], bulletDamage, 0.1),
    new HeroType("Gengar", heroWidth, heroHeight, 70, 3.5, 700, 1, bulletsTypes['hero'], bulletDamage, 0.1),
];

var maps = [ // src, startX, startY, enemies
    new Map("assets/maps/1.jpg", 10, 10, [{
        'type': enemiesTypes['zubat'],
        'number': '1'
    }, {
        'type': enemiesTypes['meow'],
        'number': '3'
    }]),
    new Map("assets/maps/2.jpg", 10, 10, [{
        'type': enemiesTypes['zubat'],
        'number': '2'
    }, {
        'type': enemiesTypes['meow'],
        'number': '2'
    }]),
    new Map("assets/maps/3.jpg", 10, 10, [{
        'type': enemiesTypes['zubat'],
        'number': '3'
    }, {
        'type': enemiesTypes['meow'],
        'number': '1'
    }]),
];
var heroType = heroesTypes[0];