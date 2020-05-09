class Enemy extends Firing {
    constructor(type, x, y, width, height, numOfBullets) {
        super(false, Math.floor(Math.random() * 360), enemyMovementSpeed, 'assets/enemies/' + type + '/src.png', x, y, width, height, 5, enemyHealth,
            enemyAttackSpeed, numOfBullets, true, name, bulletDamage, 'Enemy', 'assets/enemies/bullet2.png');

        this.lastAngleTime = new Date();
        this.nextAngleTime = minNewAngleTime + Math.floor(Math.random() * maxNewAngleTime);
    }

    move() {
        if (new Date() - this.lastAngleTime >= this.nextAngleTime) {
            this.newAngle();
        }
        var newX = this.newX();
        var newY = this.newY();
        while (newX < 0 || newY < 0 || newX + this.width > gameWidth || newY + this.height > gameHeight) {
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