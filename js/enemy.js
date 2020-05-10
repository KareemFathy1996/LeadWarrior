class Enemy extends Firing {
    static numberOfEnemies = 0;
    constructor(type, x, y, width, height, numOfBullets) {
        super(false, Math.floor(Math.random() * 360), enemyMovementSpeed, 'assets/enemies/' + type + '/src.png', x, y, width, height, 0.1, enemyHealth,
            enemyAttackSpeed, numOfBullets, true, name, bulletDamage, 'Enemy', 'assets/enemies/bullet2.png');

        this.lastAngleTime = new Date();
        this.nextAngleTime = minNewAngleTime + Math.floor(Math.random() * maxNewAngleTime);
        Enemy.numberOfEnemies++;
    }

    move() {
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

    remove() {
        Enemy.numberOfEnemies--;
        super.remove();
    }
}