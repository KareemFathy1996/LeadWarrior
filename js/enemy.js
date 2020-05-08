var enemyMaxId = 0;
var enemiesFreeIds = [];

function getEnemyId() {
    if (enemiesFreeIds.length == 0) {
        return enemyMaxId++;
    } else {
        return enemiesFreeIds.pop();
    }
}

class Enemy {
    constructor(type, x, y, width, height) {
        // init
        this.moving = false;
        this.angle = Math.floor(Math.random() * 360);
        this.movementSpeed = enemyMovementSpeed;
        this.lastAngleTime = new Date();
        this.nextAngleTime = minNewAngleTime + Math.floor(Math.random() * maxNewAngleTime);

        this.id = 'enemy' + getEnemyId();
        this.src = 'assets/enemies/' + type + '/src.png';
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        // configurations
        this.width = heroWidth;
        this.height = heroHeight;
    }
}