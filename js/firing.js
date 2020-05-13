class Firing extends Moving {
    constructor(moving, angle, movementSpeed, src, x, y, width, height, touchDamage, maxHealth, name,
        attackSpeed, numOfBullets, firing, damage, bulletType) {

        super(moving, angle, movementSpeed, src, x, y, width, height, touchDamage, maxHealth, name);

        this.attackSpeed = attackSpeed;
        this.numOfBullets = numOfBullets;
        this.firing = firing;
        this.bulletType = bulletType;
        this.damage = damage;

        this.lastFire = 0;
    }

    fire() {
        if (this.firing && new Date() - this.lastFire > this.attackSpeed) {
            var bullet = new Bullet(this.bulletType, this.angle, this.x + this.width / 2 - this.bulletType.width / 2, this.y + this.height / 2 - this.bulletType.height / 2, this.damage)
            bullets.push(bullet);
            addImg(bullet);
            this.lastFire = new Date();
        }
    }
}