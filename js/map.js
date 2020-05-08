class Map {
    constructor(src, startX, startY, enemies) {
        this.src = src;
        this.startX = startX;
        this.startY = startY;
        this.enemies = enemies;
    }
}

var maps = [
    // src, enemies
    new Map("assets/maps/1.jpg", 10, 10, { 'zubat': 1, 'meow': 3 }),
    new Map("assets/maps/2.jpg", 50, 50, { 'zubat': 2, 'meow': 2 }),
    new Map("assets/maps/3.jpg", 60, 60, { 'zubat': 3, 'meow': 1 }),
    new Map("assets/maps/4.jpg", 80, 80, { 'zubat': 3, 'meow': 2 }),
    new Map("assets/maps/5.jpg", 150, 150, { 'zubat': 2, 'meow': 3 }),
]

var map;