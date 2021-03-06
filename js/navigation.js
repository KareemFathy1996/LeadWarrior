var currentPage = "main-menu";

/* main menu page */
function showMainMenuPage() {
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("game-menu-title").style.display = "block";
    removeLoadingScreen();
}

function hideMainMenu() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-menu-title").style.display = "none";
}

/* how to play page */
function initHowToPlay() {
    var images = [];
    images.push(document.getElementById("how-to-play-img").src);

    var preloadDone = function() {
        showHowToPlay();
        removeLoadingScreen();
    };

    preloadImages(images, preloadDone);
}

function showHowToPlay() {
    document.getElementById("how-to-play").style.display = "block";
    document.getElementById("prev").style.display = "block";
    document.getElementById("prev").onclick = function() {
        changePage("main-menu");
    }
}

function hideHowToPlay() {
    document.getElementById("how-to-play").style.display = "none";
    document.getElementById("prev").style.display = "none";
}

/* credits page */
function initCredits() {
    var images = [];
    images.push(document.getElementById("credits-img").src);

    var preloadDone = function() {
        showCredits();
        removeLoadingScreen();
    };

    preloadImages(images, preloadDone);
}

function showCredits() {
    document.getElementById("credits").style.display = "block";
    document.getElementById("prev").style.display = "block";
    document.getElementById("prev").onclick = function() {
        changePage("main-menu");
    }
}

function hideCredits() {
    document.getElementById("credits").style.display = "none";
    document.getElementById("prev").style.display = "none";
}

/* generic function */
function changePage(next) {
    // show loading
    showLoadingScreen();

    // hide current
    if (currentPage == "room")
        hideRoom();
    else if (currentPage == "game")
        hideGame();
    else if (currentPage == "how-to-play")
        hideHowToPlay();
    else if (currentPage == "credits")
        hideCredits();
    else
        hideMainMenu();

    // go next
    var nextFunction;
    currentPage = next;
    if (next == 'room')
        nextFunction = initRoomPage;
    else if (next == 'game')
        nextFunction = initGamePage;
    else if (next == "how-to-play")
        nextFunction = initHowToPlay;
    else if (next == "credits")
        nextFunction = initCredits;
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