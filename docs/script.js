// Get the header
var header = document.getElementById("myHeader");
var mainContent = document.getElementById("mainContents");
var sidebar = document.getElementById("mySidenav");
var sidebarHeader = document.getElementById("sidebarHeader");
var mainGrid = document.getElementById("mainGrid");
var closeBtn = document.getElementById("closeButton");
var sidebarOpen = true;
// Get the offset position of the navbar

window.onresize = reportWindowSize;

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
if (width <= 720) {
    switchSmallerScreen()
}
else {
    switchBiggerScreen()
}

function switchSmallerScreen() {
    sidebar.classList.add("smaller-screen");
    sidebarHeader.classList.add("smaller-screen");
    mainGrid.classList.add("smaller-screen");
    header.classList.add("smaller-screen");
    // closeBtn.classList.add("smaller-screen");

    sidebarOpen = false;
}

function switchBiggerScreen() {
    sidebar.classList.remove("smaller-screen");
    sidebarHeader.classList.remove("smaller-screen");
    mainGrid.classList.remove("smaller-screen");
    header.classList.remove("smaller-screen");
    // closeBtn.classList.remove("smaller-screen");

    sidebarOpen = true;
}

function reportWindowSize() {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (width <= 720) {
        switchSmallerScreen()
    }
    else {
        switchBiggerScreen()
    }
}

function switchSidebar() {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (width <= 720) {
        if (!sidebarOpen) {
            switchBiggerScreen()
        }
        else {
            switchSmallerScreen()
        }
    }
}