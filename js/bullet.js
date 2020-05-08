var bulletsMaxId = 0;
var bulletsFreeIds = [];

function getBulletId() {
    if (bulletsFreeIds.length == 0) {
        return bulletsMaxId++;
    } else {
        return bulletsFreeIds.pop();
    }
}

class Bullet {
    constructor(fireType, src, x, y, angle) {
        // init
        this.angle = angle;
        this.id = 'bullet' + getBulletId();
        this.fireType = fireType;
        this.src = src;
        this.x = x;
        this.y = y;
        this.damage = bulletDamage;

        // configurations
        this.width = bulletWidth;
        this.height = bulletHeight;
        this.movementSpeed = bulletMovementSpeed;
    }
}