class Bullet extends Moving {
    constructor(fireType, src, x, y, angle) {
        super(true, angle, bulletMovementSpeed, src, x, y, bulletWidth, bulletHeight, bulletDamage, 0);

        this.fireType = fireType;
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