$(document).ready(function(){
    $('#jumbo').load("jumbotron.html");
    $('#navi').load("navi.html");
    $('#brae-footer').load("footer.html");
});

var selectedNavItem;

function setSelectedNavItem(itemNum) {
    selectedNavItem = itemNum;
}

function updateSelectedNavItem() {
    selectedNavItem += "NavItem";
    var d = document.getElementById(selectedNavItem);
    d.className += " active";
}
