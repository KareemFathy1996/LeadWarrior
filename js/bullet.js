class Bullet extends Moving {
    constructor(fireType, src, x, y, angle) {
        super(true, angle, bulletMovementSpeed, src, x, y, bulletWidth, bulletHeight, bulletDamage, 0);

        this.fireType = fireType;
    }
    move() {
        var newX = this.newX();
        var newY = this.newY();

        if (newX < 0 || newY < 0 || newX + this.width > gameWidth || newY + this.height > gameHeight) {
            this.removed = true;
        } else {
            this.x = newX;
            this.y = newY;
        }
    }
}