class Hero extends Firing {
    constructor(room, src, backgroundImage, name, maxHealth, attackSpeed, movementSpeed, numOfBullets) {
        super(false, 45, movementSpeed, src, 0, 0, heroWidth, heroHeight, 5, maxHealth,
            attackSpeed, numOfBullets, false, name, bulletDamage);

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