class Bullet extends Moving {
    constructor(bulletType, angle, x, y, touchDamage) {
        super(true, angle, bulletType.movementSpeed, bulletType.src, x, y, bulletType.width, bulletType.height, touchDamage, bulletType.maxHealth, bulletType.name);
    }

    move() {
        var newX = this.newX();
        var newY = this.newY();

        if (!canMoveTo(newX, newY, this.width, this.height)) {
            this.remove();
        } else {
            this.x = newX;
            this.y = newY;
        }
    }
}