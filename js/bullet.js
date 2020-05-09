class Bullet extends Moving {
    constructor(fireType, src, x, y, angle) {
        super(true, angle, bulletMovementSpeed, src, x, y, bulletWidth, bulletHeight, bulletDamage, 100);

        this.fireType = fireType;
        this.removed = false;
    }
    move() {
        var newX = this.newX();
        var newY = this.newY();

        if (this.fireType == 'Hero') {
            for (var j = 0; j < enemies.length; j++) {
                if ((this.x > enemies[j].x && this.x < enemies[j].x + enemies[j].width && this.y > enemies[j].y && this.y < enemies[j].y + enemies[j].height) ||
                    (this.x + this.width > enemies[j].x && this.x + this.width < enemies[j].x + enemies[j].width && this.y + this.height > enemies[j].y && this.y + this.height < enemies[j].y + enemies[j].height) ||
                    (this.x > enemies[j].x && this.x < enemies[j].x + enemies[j].width && this.y + this.height > enemies[j].y && this.y + this.height < enemies[j].y + enemies[j].height) ||
                    (this.x + this.width > enemies[j].x && this.x + this.width < enemies[j].x + enemies[j].width && this.y > enemies[j].y && this.y < enemies[j].y + enemies[j].height)) {
                    enemies[j].health -= this.touchDamage;
                    if (enemies[j].health <= 0) {
                        var img = document.getElementById(enemies[j].id);
                        img.parentNode.removeChild(img);
                        enemies.splice(j, 1);
                        j--;
                        if (enemies.length == 0) {
                            console.log('game won');
                            stopGame();
                        }
                    }
                    this.removed = true;
                    break;
                }
            }
        } else {
            if ((this.x > hero.x && this.x < hero.x + hero.width && this.y > hero.y && this.y < hero.y + hero.height) ||
                (this.x + this.width > hero.x && this.x + this.width < hero.x + hero.width && this.y + this.height > hero.y && this.y + this.height < hero.y + hero.height) ||
                (this.x > hero.x && this.x < hero.x + hero.width && this.y + this.height > hero.y && this.y + this.height < hero.y + hero.height) ||
                (this.x + this.width > hero.x && this.x + this.width < hero.x + hero.width && this.y > hero.y && this.y < hero.y + hero.height)) {
                hero.health -= this.touchDamage;
                if (hero.health <= 0) {
                    stopGame();
                    console.log('game lost');
                    return;
                }
                this.removed = true;
            }
        }

        if (this.removed || newX < 0 || newY < 0 || newX + this.width > gameWidth || newY + this.height > gameHeight) {
            var img = document.getElementById(this.id);
            img.parentNode.removeChild(img);
            this.removed = true;
        } else {
            this.x = newX;
            this.y = newY;
        }
    }
}