class Firing extends Moving {
    constructor(moving, angle, movementSpeed, src, x, y, width, height, touchDamage, maxHealth,
        attackSpeed, numOfBullets, firing, name, bulletDamage, fireSrc, bulletSrc) {

        super(moving, angle, movementSpeed, src, x, y, width, height, touchDamage, maxHealth);

        this.fireSrc = fireSrc;
        this.attackSpeed = attackSpeed;
        this.numOfBullets = numOfBullets;
        this.firing = firing;
        this.name = name;
        this.bulletDamage = bulletDamage;
        this.bulletSrc = bulletSrc;

        this.lastFire = 0;
    }

    fire() {
        if (this.firing && new Date() - this.lastFire > this.attackSpeed) {
            bullets.push(new Bullet(this.fireSrc, this.bulletSrc, this.x + this.width / 2 - bulletWidth / 2, this.y + this.height / 2 - bulletHeight / 2, this.angle));
            var temp = bullets[bullets.length - 1];
            addImg(temp.id, temp.src, temp.x, temp.y, temp.width, temp.height);
            this.lastFire = new Date();
        }
    }
}