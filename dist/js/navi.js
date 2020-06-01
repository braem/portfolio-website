$(document).ready(function() {
    $('#navi').load("navi.html", function() {
        var currentPage = window.location.pathname.split("/").pop();
        $.getJSON("data/navi.json", function(navbarData) {
            var innerHTML = '';
    
            for (i in navbarData) {
                innerHTML += '<li class="nav-item' + (currentPage == navbarData[i].link ? ' active' : '') + 
                '" id="' + navbarData[i].title.toLowerCase() + '">' +
                '<a class="nav-link" href="' + navbarData[i].link + '"><div class="nav-link-text">' +
                navbarData[i].title + '</div></a></li>';
            }
    
            $('#navbar-list').html(innerHTML);
        })
    });
})