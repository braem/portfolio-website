$(document).ready(function() {
    $.getJSON("data/projects-links.json", function(linkData) {
        var innerHTML = ""
        for(i in linkData) {
            innerHTML += '<li class="nav-item"><a class="nav-link" href="' +
            linkData[i].link + '">' + linkData[i].text + '</a></li>';
        }
        $('#projects-links').html(innerHTML);
    })
});
