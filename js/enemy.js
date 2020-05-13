class Enemy extends Firing {

    constructor(enemyType, x, y) {
        super(enemyType, true, x, y, 0, enemyType.touchDamage,
            true);

        this.newAngle();
    }

    // get new angle after min~max new angle time
    // keep getting new position till enemy can move to it.
    move() {
        if (!this.moving) return;
        if (new Date() - this.lastAngleTime >= this.nextAngleTime) {
            this.newAngle();
        }
        var newX = this.newX();
        var newY = this.newY();
        while (!canMoveTo(newX, newY, this.width, this.height)) {
            this.newAngle();
            newX = this.newX();
            newY = this.newY();
        }
        this.x = newX;
        this.y = newY;
    }

    newAngle() {
        this.lastAngleTime = new Date();
        this.nextAngleTime = minNewAngleTime + Math.floor(Math.random() * maxNewAngleTime);
        this.angle = Math.floor(Math.random() * 360);
    }

}