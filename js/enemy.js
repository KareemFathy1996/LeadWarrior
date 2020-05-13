class EnemyType {
    constructor(type, name, width, height, numOfBullets, movementSpeed, attackSpeed, bulletDamage, bulletType, health) {
        this.type = type;
        this.name = name;
        this.width = width;
        this.height = height;
        this.numOfBullets = numOfBullets;
        this.movementSpeed = movementSpeed;
        this.attackSpeed = attackSpeed;
        this.bulletDamage = bulletDamage;
        this.bulletType = bulletType;
        this.health = health;

        this.src = 'assets/enemies/' + type + '/src.png';
    }
}

class Enemy extends Firing {

    constructor(enemyType, x, y) {
        super(true, Math.floor(Math.random() * 360), enemyMovementSpeed, enemyType.src, x, y, enemyType.width, enemyType.height, 0.1, enemyType.health,
            enemyType.attackSpeed, enemyType.numOfBullets, true, enemyType.name, enemyType.bulletDamage, enemyType.bulletType);

        this.lastAngleTime = new Date();
        this.nextAngleTime = minNewAngleTime + Math.floor(Math.random() * maxNewAngleTime);
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