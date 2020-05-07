var currentPage = "main-menu";

function showMainMenu() {
    document.getElementById("main-menu").style.display = "block";
}

function hideMainMenu() {
    document.getElementById("main-menu").style.display = "none";
}

function changePage(next) {
    // show loading

    // hide current
    if (currentPage == "room")
        hideRoom();
    else if (currentPage == "game")
        hideGame();
    else
        hideMainMenu();

    // go next
    if (next == 'room')
        showRoom();
    else if (next == 'game')
        showGame();
    else
        showMainMenu();

    currentPage = next;
}

var preloadImages = function(imageSources, callback) {

    var images = [];

    var tryCallback = function() {
        var allImagesLoaded = (function() {
            for (var i = images.length; i--;) {
                if (!images[i].isLoaded) {
                    return false;
                }
            }
            return true;
        })();

        if (allImagesLoaded) {
            callback();
        }
    };

    for (var i = imageSources.length; i--;) {
        var imageSrc = imageSources[i];
        var image = document.createElement('img');
        images.push(image);
        image.onload = function() {
            this.isLoaded = true;
            tryCallback();
        };
        image.src = imageSrc;
    }
};