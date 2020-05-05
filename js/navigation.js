function showRoom() {
    // hide
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game").style.display = "none";
    // changes
    document.getElementById("room").style.display = "block";
    document.getElementById("prev").style.display = "block";
    currentPage = "room";
}

function showGame() {
    // hide
    document.getElementById("room").style.display = "none";
    // changes
    document.getElementById("game").style.display = "block";
    currentPage = "game";
    gameInit();
}

function showMainMenu() {
    // hide
    document.getElementById("room").style.display = "none";
    document.getElementById("prev").style.display = "none";
    // changes
    document.getElementById("main-menu").style.display = "block";
    currentPage = "main-menu";
}

function prevPage() {
    if (currentPage == undefined || currentPage == "room") {
        showMainMenu();
    } else if (currentPage == "game") {
        showRoom();
        stopGame();
    }
}

var currentPage = "main-menu";