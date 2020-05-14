class Firing extends Moving {
    constructor(type, moving, x, y, angle, touchDamage,
        firing, fireSrc) {
        super(type, moving, x, y, angle, touchDamage);

        this.attackSpeed = type.attackSpeed;
        this.numOfBullets = type.numOfBullets;
        this.bulletType = type.bulletType;
        this.damage = type.bulletDamage;
        this.firing = firing;

        this.lastFire = new Date(Date.now() + peaceTime);
        this.fireSrc = fireSrc;
    }

    // if fire source is firing -> fire a bullet from same position as the firing source
    fire() {
        if (this.firing && new Date() - this.lastFire > this.attackSpeed) {
            this.lastFire = new Date();

            var tempNumOfBullets = this.numOfBullets;
            if (tempNumOfBullets % 2 != 0) {
                var bullet = new Bullet(this.bulletType, this.x + this.width / 2 - this.bulletType.width / 2, this.y + this.height / 2 - this.bulletType.height / 2, this.angle, this.damage, this.fireSrc);
                addBullet(bullet);
                tempNumOfBullets--;
            }
            if (tempNumOfBullets == 0) return;
            for (var i = this.angle - 30; i <= this.angle + 30; i += 60 / (tempNumOfBullets - 1)) {
                var bullet = new Bullet(this.bulletType, this.x + this.width / 2 - this.bulletType.width / 2, this.y + this.height / 2 - this.bulletType.height / 2, i, this.damage, this.fireSrc);
                addBullet(bullet);
            }
        }
    }
}