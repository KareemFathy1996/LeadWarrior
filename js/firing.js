class Firing extends Moving {
    constructor(moving, angle, movementSpeed, src, x, y, width, height, touchDamage, maxHealth,
        attackSpeed, numOfBullets, firing, name, bulletDamage) {

        super(moving, angle, movementSpeed, src, x, y, width, height, touchDamage, maxHealth);

        this.attackSpeed = attackSpeed;
        this.numOfBullets = numOfBullets;
        this.firing = firing;
        this.name = name;
        this.bulletDamage = bulletDamage;

        this.lastFire = 0;
    }
}