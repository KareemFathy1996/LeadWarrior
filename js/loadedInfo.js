var bulletsTypes = { // name, width, height, maxHealth, movementSpeed
    'Eevee': new BulletType("Eevee", 25, 25, 0, 3),
    'meow': new BulletType("meow", 25, 25, 0, 3),
    'zubat': new BulletType("zubat", 25, 25, 0, 3),
    'Gengar': new BulletType("Gengar", 25, 25, 0, 3),
    'Charizard': new BulletType("Charizard", 25, 25, 0, 3),
};

var enemiesTypes = { // name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    'meow': new EnemyType('meow', 30, 30, 50, 2, 700, 1, bulletsTypes['meow'], 20, 0),
    'zubat': new EnemyType('zubat', 30, 30, 30, 2, 700, 3, bulletsTypes['zubat'], 10, 0),
};

var heroesTypes = [ //name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    new HeroType("Eevee", 50, 50, 50, 4.5, 500, 1, bulletsTypes['Eevee'], 10, 0),
    new HeroType("Gengar", 70, 70, 70, 3.5, 700, 3, bulletsTypes['Gengar'], 15, 0),
    new HeroType("Charizard", 60, 60, 60, 4.0, 600, 5, bulletsTypes['Charizard'], 20, 0),
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