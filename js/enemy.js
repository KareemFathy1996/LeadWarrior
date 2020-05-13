class Enemy extends Firing {

    constructor(enemyType, x, y) {
        super(true, 0, enemyType.movementSpeed, enemyType.src, x, y, enemyType.width, enemyType.height, enemyType.touchDamage, enemyType.maxHealth, enemyType.name,
            enemyType.attackSpeed, enemyType.numOfBullets, true, enemyType.bulletDamage, enemyType.bulletType);

        this.newAngle();
    }

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