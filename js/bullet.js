class Bullet extends Moving {
    constructor(bulletType, x, y, angle, touchDamage, fireSrc) {
        super(bulletType, true, x, y, angle, touchDamage);

        this.fireSrc = fireSrc;
    }

    // get newX & newY. if bullet can't move to new position then delete it.
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