$(document).ready(function() {
    $('#brae-footer').load("footer.html", function() {
        $.getJSON("data/footer.json", function(footerData) {
            var innerHTML = '';
    
            for (i in footerData) {
                innerHTML += '<li class="nav-item" id="link-wrapper">' +
                '<a class="nav-link" href="' + footerData[i].link + '">' +
                '<i class="' + footerData[i].icon + '"></i>' +
                '</a></li>';
            }
    
            $('#footer-list').html(innerHTML);
        })
    });
})