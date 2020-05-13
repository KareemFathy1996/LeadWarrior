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
    constructor(type, moving, x, y, angle, touchDamage) {
        this.id = getId();
        this.name = type.name;
        this.src = type.src;
        this.width = type.width;
        this.height = type.height;
        this.maxHealth = type.maxHealth;
        this.moving = moving;
        this.movementSpeed = type.movementSpeed;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.touchDamage = touchDamage;

        this.health = this.maxHealth;
        this.removed = false;
    }

    remove() {
        this.removed = true;
        freeIds.push(this.id);
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

    // apply damage from object
    hitBy(touchDamage) {
        this.health -= touchDamage;
        if (this.health <= 0)
            this.remove();
    }
}