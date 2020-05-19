var bulletsTypes = { // name, width, height, maxHealth, movementSpeed
    'Ninja': new BulletType("Ninja", 10, 10, 0, 3),
    'meow': new BulletType("meow", 10, 10, 0, 3),
    'bullet': new BulletType("bullet", 10, 10, 0, 3),
    'Mage': new BulletType("Mage", 10, 10, 0, 3),
    'Dragon': new BulletType("Dragon", 10, 10, 0, 3),
};

var enemiesTypes = { // name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    'monster1': new EnemyType('monster1', 30, 30, 20, 2, 700, 1, bulletsTypes['bullet'], 10, 0),
    'monster2': new EnemyType('monster2', 30, 30, 20, 2, 700, 1, bulletsTypes['bullet'], 10, 0),
    'monster3': new EnemyType('monster3', 30, 30, 20, 2, 700, 1, bulletsTypes['bullet'], 10, 0),
    'monster4': new EnemyType('monster4', 30, 30, 20, 2, 700, 1, bulletsTypes['bullet'], 10, 0),
    'reaper': new EnemyType('reaper', 30, 30, 20, 2, 700, 1, bulletsTypes['bullet'], 10, 0),
};

var heroesTypes = [ //name, width, height, maxHealth, movementSpeed, attackSpeed, numOfBullets, bulletType, bulletDamage, touchDamage
    new HeroType("Ninja", 30, 30, 100, 2.5, 500, 1, bulletsTypes['Ninja'], 10, 0),
    new HeroType("Mage", 30, 30, 100, 2.5, 500, 1, bulletsTypes['Mage'], 10, 0),
    new HeroType("Dragon", 30, 30, 100, 2.5, 500, 1, bulletsTypes['Dragon'], 10, 0),
];

var maps = [ // src, mode, numOfNewEnemies, startX, startY, enemies
    new Map("assets/maps/1.jpg", "Survival", 1, 100, 100, [{
        'type': enemiesTypes['reaper'],
        'number': '1'
    }, {
        'type': enemiesTypes['monster1'],
        'number': '3'
    }]),
    new Map("assets/maps/2.jpg", "static", 1, 100, 100, [{
        'type': enemiesTypes['monster2'],
        'number': '2'
    }, {
        'type': enemiesTypes['monster3'],
        'number': '2'
    }]),
    new Map("assets/maps/3.jpg", "Survival", 1, 100, 100, [{
        'type': enemiesTypes['monster4'],
        'number': '3'
    }, {
        'type': enemiesTypes['reaper'],
        'number': '1'
    }]),
];
var heroType = heroesTypes[0];