class Hero extends Firing {
    constructor(room, src, backgroundImage, name, maxHealth, attackSpeed, movementSpeed, numOfBullets) {
        super(false, 45, movementSpeed, src, 0, 0, heroWidth, heroHeight, 0.1, maxHealth,
            attackSpeed, numOfBullets, false, name, bulletDamage, 'Hero', 'assets/enemies/bullet1.png');

        this.room = room;
        this.backgroundImage = backgroundImage;
    }
    move() {
        if (this.moving) {
            this.x = Math.max(Math.min(this.newX(), gameWidth - this.width), 0);
            this.y = Math.max(Math.min(this.newY(), gameHeight - this.height), 0);
        }
    }
}