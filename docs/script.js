// Get the header
var header = document.getElementById("myHeader");
var mainContent = document.getElementById("mainContents");
var sidebar = document.getElementById("mySidenav");
var sidebarHeader = document.getElementById("sidebarHeader");
var mainGrid = document.getElementById("mainGrid");
var sidebarOpen = true;
// Get the offset position of the navbar
var sticky = header.offsetTop;

mainContent.onscroll = function () { myFunction() };
window.onresize = reportWindowSize;


function switchSmallerScreen() {
    sidebar.style.display = "none";
    sidebarHeader.style.display = "none";
    mainGrid.style.gridTemplateColumns = "minmax(400px, 800px)";
    mainGrid.style.gridTemplateRows = "100vh"
    mainGrid.style.gridTemplateAreas = '"Main-Screen"';
    sidebarOpen = false;
}

function switchBiggerScreen() {
    sidebar.style.display = "block";
    sidebarHeader.style.display = "block";
    mainGrid.style.gridTemplateColumns = "300px minmax(100px, 800px)";
    mainGrid.style.gridTemplateRows = "0.7fr 2.2fr 20px"
    mainGrid.style.gridTemplateAreas =
        '"Sidebar-Header Main-Screen" "Footer Main-Screen" "Main-footer Main-footer"';
    sidebarOpen = true;
}

function reportWindowSize() {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (width <= 800) {
        switchSmallerScreen()
    }
    else {
        switchBiggerScreen()
    }

    header.style.width = String(mainContent.offsetWidth - 75) + "px";
}

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    header.style.width = String(mainContent.offsetWidth - 75) + "px";

    if (mainContent.scrollTop > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function switchSidebar() {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (width <= 800) {
        if (!sidebarOpen) {
            switchBiggerScreen()
        }
        else {
            switchSmallerScreen()
        }
    }

    header.style.width = String(mainContent.offsetWidth - 75) + "px";
}