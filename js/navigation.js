var currentPage = "main-menu";

function showMainMenuPage() {
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("game-menu-title").style.display = "block";
    removeLoadingScreen();
}

function hideMainMenu() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-menu-title").style.display = "none";
}

function changePage(next) {
    // show loading
    showLoadingScreen();

    // hide current
    if (currentPage == "room")
        hideRoom();
    else if (currentPage == "game")
        hideGame();
    else
        hideMainMenu();

    // go next
    var nextFunction;
    currentPage = next;
    if (next == 'room')
        nextFunction = initRoomPage;
    else if (next == 'game')
        nextFunction = initGamePage;
    else
        nextFunction = showMainMenuPage;

    setTimeout(() => {
        nextFunction();
    }, loadingScreenTime);
}

function showLoadingScreen() {
    startedLoading = new Date();
    document.getElementById("loading-screen").style.zIndex = "1";
}

function removeLoadingScreen() {
    document.getElementById("loading-screen").style.zIndex = "-1";
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