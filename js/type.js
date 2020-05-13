class MovingType {
    constructor(name, width, height, maxHealth, movementSpeed) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.movementSpeed = movementSpeed;
    }
}

class FiringType extends MovingType {
    constructor(name, width, height, maxHealth, movementSpeed,
        attackSpeed, numOfBullets, bulletType, bulletDamage) {
        super(name, width, height, maxHealth, movementSpeed);

        this.attackSpeed = attackSpeed;
        this.numOfBullets = numOfBullets;
        this.bulletType = bulletType;
        this.bulletDamage = bulletDamage;
    }
}

class BulletType extends MovingType {
    constructor(name, width, height, maxHealth, movementSpeed) {
        super(name, width, height, maxHealth, movementSpeed);

        this.src = 'assets/bullets/' + name + '.png';
    }
}

class HeroType extends FiringType {
    constructor(name, width, height, maxHealth, movementSpeed,
        attackSpeed, numOfBullets, bulletType, bulletDamage,
        touchDamage) {
        super(name, width, height, maxHealth, movementSpeed,
            attackSpeed, numOfBullets, bulletType, bulletDamage);

        this.touchDamage = touchDamage;
        this.room = 'assets/heroes/' + name + '/room.gif';
        this.src = 'assets/heroes/' + name + '/src.png';
        this.backgroundImage = 'assets/heroes/' + name + '/background.jpg';
    }
}

class EnemyType extends FiringType {
    constructor(name, width, height, maxHealth, movementSpeed,
        attackSpeed, numOfBullets, bulletType, bulletDamage,
        touchDamage) {
        super(name, width, height, maxHealth, movementSpeed,
            attackSpeed, numOfBullets, bulletType, bulletDamage);

        this.touchDamage = touchDamage;
        this.src = 'assets/enemies/' + name + '/src.png';
    }
}