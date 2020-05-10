class Hero extends Firing {
    constructor(room, src, backgroundImage, name, maxHealth, attackSpeed, movementSpeed, numOfBullets) {
        super(false, 45, movementSpeed, src, 0, 0, heroWidth, heroHeight, 0.1, maxHealth,
            attackSpeed, numOfBullets, false, name, bulletDamage, 'Hero', 'assets/enemies/bullet1.png');

        this.room = room;
        this.backgroundImage = backgroundImage;
    }
    move() {
        if (this.moving) {
            var newX = this.newX();
            var newY = this.newY();
            if (canMoveTo(newX, newY, this.width, this.height)) {
                this.x = newX;
                this.y = newY;
            } else if (canMoveTo(this.x, newY, this.width, this.height))
                this.y = newY;
            else if (canMoveTo(newX, this.y, this.width, this.height))
                this.x = newX;
        }
    }
}