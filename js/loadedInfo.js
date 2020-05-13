var bulletsTypes = {
    'hero': new BulletType("hero", bulletWidth, bulletHeight, 0, bulletMovementSpeed),
    'enemy1': new BulletType("enemy1", bulletWidth, bulletHeight, 0, bulletMovementSpeed),
};

var enemiesTypes = {
    'meow': new EnemyType('meow', enemyWidth, enemyHeight, enemyHealth, enemyMovementSpeed, enemyAttackSpeed, 1, bulletsTypes['enemy1'], bulletDamage, 0.1),
    'zubat': new EnemyType('zubat', enemyWidth, enemyHeight, enemyHealth, enemyMovementSpeed, enemyAttackSpeed, 1, bulletsTypes['enemy1'], bulletDamage, 0.1),
};

var heroesTypes = [
    new HeroType("Eevee", heroWidth, heroHeight, 50, 4.5, 500, 1, bulletsTypes['hero'], bulletDamage, 0.1),
    new HeroType("Charizard", heroWidth, heroHeight, 60, 4.0, 600, 1, bulletsTypes['hero'], bulletDamage, 0.1),
    new HeroType("Gengar", heroWidth, heroHeight, 70, 3.5, 700, 1, bulletsTypes['hero'], bulletDamage, 0.1),
];

var maps = [
    new Map("assets/maps/1.jpg", 10, 10, { 'zubat': 1, 'meow': 3 }),
    new Map("assets/maps/2.jpg", 50, 50, { 'zubat': 2, 'meow': 2 }),
    new Map("assets/maps/3.jpg", 60, 60, { 'zubat': 3, 'meow': 1 }),
    new Map("assets/maps/4.jpg", 80, 80, { 'zubat': 3, 'meow': 2 }),
    new Map("assets/maps/5.jpg", 150, 150, { 'zubat': 2, 'meow': 3 }),
];

var heroType = heroesTypes[0];