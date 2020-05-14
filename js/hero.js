class Hero extends Firing {
    constructor(heroType, x, y) {
        super(heroType, false, x, y, 45, heroType.touchDamage,
            false, 'hero');
    }

    // get new position. if hero can move to the new position move else do nothing
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