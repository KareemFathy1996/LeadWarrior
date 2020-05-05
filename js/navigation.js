function showRoom() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("room").style.display = "block";
    document.getElementById("prev").style.display = "block";
    currentPage = "room";
}

function prevPage() {
    if (currentPage == undefined || currentPage == "room") {
        document.getElementById("room").style.display = "none";
        document.getElementById("main-menu").style.display = "block";
        document.getElementById("prev").style.display = "none";
        currentPage = "main-menu";
    } else if (currentPage == "game") {
        document.getElementById("game").style.display = "none";
        document.getElementById("room").style.display = "block";
        currentPage = "room";
    }
}

function showGame() {
    document.getElementById("room").style.display = "none";
    document.getElementById("game").style.display = "block";
    currentPage = "game";
}