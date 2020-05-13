class Hero extends Firing {
    constructor(heroType, x, y) {
        super(false, 45, heroType.movementSpeed, heroType.src, x, y, heroType.width, heroType.height, heroType.touchDamage, heroType.maxHealth, heroType.name,
            heroType.attackSpeed, heroType.numOfBullets, false, heroType.bulletDamage, heroType.bulletType)
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