class Firing extends Moving {
    constructor(type, moving, x, y, angle, touchDamage,
        firing) {
        super(type, moving, x, y, angle, touchDamage);

        this.attackSpeed = type.attackSpeed;
        this.numOfBullets = type.numOfBullets;
        this.bulletType = type.bulletType;
        this.damage = type.bulletDamage;
        this.firing = firing;

        this.lastFire = 0;
    }

    // if fire source is firing -> fire a bullet from same position as the firing source
    fire() {
        if (this.firing && new Date() - this.lastFire > this.attackSpeed) {
            var bullet = new Bullet(this.bulletType, this.x + this.width / 2 - this.bulletType.width / 2, this.y + this.height / 2 - this.bulletType.height / 2, this.angle, this.damage);
            addBullet(bullet);
            this.lastFire = new Date();
        }
    }
}