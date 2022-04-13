var currentFile = document.location.href.replace(document.baseURI, "")
var sidebar = document.getElementById("mySidenav");

var links = []
var searchElements = sidebar.children;
for (var i = 0; i < searchElements.length; i++) {
    var element = searchElements.item(i);
    if (element.tagName == "A") {
        var href = element.href;
        var fileUrl = href.replace(document.baseURI, "")

        if (fileUrl === currentFile) {
            element.classList.add("active")
        }
    }
}