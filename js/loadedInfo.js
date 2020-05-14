var bulletsTypes = { // name, width, height, maxHealth, movementSpeed
    'Eevee': new BulletType("Eevee", 15, 15, 0, 3),
    'meow': new BulletType("meow", 15, 15, 0, 3),
    'zubat': new BulletType("zubat", 15, 15, 0, 3),
    'Gengar': new BulletType("Gengar", 15, 15, 0, 3),
    'Charizard': new BulletType("Charizard", 15, 15, 0, 3),
};

var enemiesTypes = { // name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    'meow': new EnemyType('meow', 30, 30, 50, 2, 700, 1, bulletsTypes['meow'], 20, 0),
    'zubat': new EnemyType('zubat', 30, 30, 30, 2, 700, 1, bulletsTypes['zubat'], 10, 0),
};

var heroesTypes = [ //name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    new HeroType("Eevee", 40, 40, 50, 4.5, 500, 1, bulletsTypes['Eevee'], 10, 0),
    new HeroType("Gengar", 45, 45, 70, 3.5, 700, 1, bulletsTypes['Gengar'], 15, 0),
    new HeroType("Charizard", 50, 50, 60, 4.0, 600, 1, bulletsTypes['Charizard'], 20, 0),
];

var maps = [ // src, startX, startY, enemies
    new Map("assets/maps/1.jpg", "survival", 1, 10, 10, [{
        'type': enemiesTypes['zubat'],
        'number': '1'
    }, {
        'type': enemiesTypes['meow'],
        'number': '3'
    }]),
    new Map("assets/maps/2.jpg", "survival", 1, 10, 10, [{
        'type': enemiesTypes['zubat'],
        'number': '2'
    }, {
        'type': enemiesTypes['meow'],
        'number': '2'
    }]),
    new Map("assets/maps/3.jpg", "static", 1, 10, 10, [{
        'type': enemiesTypes['zubat'],
        'number': '3'
    }, {
        'type': enemiesTypes['meow'],
        'number': '1'
    }]),
];
var heroType = heroesTypes[0];