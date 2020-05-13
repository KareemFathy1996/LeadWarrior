class HeroType {
    constructor(room, src, backgroundImage, name, maxHealth, attackSpeed, movementSpeed, numOfBullets, bulletType, width, height, bulletDamage) {
        this.room = room;
        this.src = src;
        this.backgroundImage = backgroundImage;
        this.name = name;
        this.maxHealth = maxHealth;
        this.attackSpeed = attackSpeed;
        this.movementSpeed = movementSpeed;
        this.numOfBullets = numOfBullets;
        this.bulletType = bulletType;
        this.width = width;
        this.height = height;
        this.bulletDamage = bulletDamage;
    }
}

class Hero extends Firing {
    constructor(heroType) {
        super(false, 45, heroType.movementSpeed, heroType.src, 0, 0, heroType.width, heroType.height, 0.1, heroType.maxHealth,
            heroType.attackSpeed, heroType.numOfBullets, false, heroType.name, heroType.bulletDamage, heroType.bulletType)
    }

    move() {
        if (this.moving) {
            var newX = this.newX();
            var newY = this.newY();
            if (canMoveTo(newX, newY, this.width, this.height)) {
                this.x = newX;
                this.y = newY;
            } else if (canMoveTo(this.x, newY, this.width, this.height))
                this.y = newY;
            else if (canMoveTo(newX, this.y, this.width, this.height))
                this.x = newX;
        }
    }
}