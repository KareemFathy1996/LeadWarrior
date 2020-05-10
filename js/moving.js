var id = 0;
var freeIds = [];

function getId() {
    if (freeIds.length == 0) {
        return id++;
    } else {
        return freeIds.pop();
    }
}

class Moving {
    constructor(moving, angle, movementSpeed, src, x, y, width, height, touchDamage, maxHealth) {
        this.id = getId();
        this.moving = moving;
        this.angle = angle;
        this.movementSpeed = movementSpeed;
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.touchDamage = touchDamage;
        this.maxHealth = maxHealth;

        this.health = this.maxHealth;
        this.removed = false;
    }

    newX() {
        return this.x + this.movementSpeed * Math.cos(Math.PI * this.angle / 180);
    }

    newY() {
        return this.y + this.movementSpeed * Math.sin(Math.PI * this.angle / 180);
    }

    move() {
        this.x = this.newX();
        this.y = this.newY();
    }

    hitBy(touchDamage) {
        this.health -= touchDamage;
        if (this.health <= 0)
            this.removed = true;
    }
}