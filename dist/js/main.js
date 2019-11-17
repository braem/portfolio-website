
window.onload = function() {
    $(".se-pre-con").fadeOut("slow");
};

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
    if(selectedNavItem == null) return;
    selectedNavItem += "NavItem";
    document.getElementById(selectedNavItem).className += " active";
}

var mapsGitRepo = "https://github.com/braem/TF2JumpMaps/";
function createMapContent(mapName, releaseDate, numImgs, videoLink, jumptfLink, tempusLink) {
    var mapGitRepo = mapsGitRepo + "raw/master/" + mapName + "/release/jump_" + mapName + ".bsp";
    $("#"+mapName+"-content").html('<h2><center>jump_' + mapName + '</center></h2>' +
    '<h5><center>Released ' + releaseDate + '</center></h5>' +
    '<h6><center id="link-wrapper"><a href="' + jumptfLink + '">JumpTF Post</a> | <a href="' + mapGitRepo + '"><i class="fas fa-download fa-1x"></i> Download</a> | <a href="' + tempusLink + '">Tempus Times</a></center></h6>' +
    '<div class="container-fluid showcase"><center><h3>Screenshots:</h3></center><div id="' + mapName + '-carousel" class="carousel slide" data-ride="carousel"></div></div><br>' +
    '<div class="container-fluid showcase"><center><h3>Showcase:</h3></center><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + videoLink + '" allowfullscreen></iframe></div></div>');

    $("#"+mapName+"-carousel").html('<ul class="carousel-indicators" id="' + mapName + '-carousel-indicators"></ul>' + 
    '<div class="carousel-inner" id="' + mapName + '-carousel-inner"></div>' +
    '<a class="carousel-control-prev" href="#' + mapName + '-carousel"" data-slide="prev"><span class="carousel-control-prev-icon"></span></a>' +
    '<a class="carousel-control-next" href="#' + mapName + '-carousel" data-slide="next"><span class="carousel-control-next-icon"></span></a>');

    /* Filling Carousel */
    var imgSrcMain = 'img/maps/'+mapName+'/'+mapName;
    //add carousel indicators
    $("#"+mapName+"-carousel-indicators")
    .html('<li data-target="#' + mapName + '-carousel" data-slide-to="0" class="active"></li>');
    for(var i=0; i<numImgs-1; i++) {
        $("#"+mapName+"-carousel-indicators")
        .append('<li data-target="#' + mapName + '-carousel" data-slide-to="' + (i+1) + '"></li>');
    }
    //add  carousel slides
    $("#"+mapName+"-carousel-inner")
    .html('<div class="carousel-item active"><div class="img"><img src="'+imgSrcMain+' (1).jpg" class="img-fluid" alt="Responsive image"></div></div>');
    for(var i=0; i<numImgs-1; i++) {
        $("#"+mapName+"-carousel-inner")
        .append('<div class="carousel-item"><div class="img"><img src="'+imgSrcMain+' (' + (i+2) + ').jpg" class="img-fluid" alt="Responsive image"></div></div>');
    }
}

function createMapDownloadContent(mapName, imgSrc) {
    var mapGitRepo = mapsGitRepo + "raw/master/" + mapName + "/release/jump_" + mapName + ".bsp";
    $("#"+mapName+"-dl-content")
    //inline css here because nothing else works
    .html('<style type="text/css"> #'+mapName+'-dl-jumbo { background-image: url(\'' +imgSrc+ '\'); }</style>' + 
    '<div class="container download-showcase-container">' + 
    '<div id="' + mapName + '-dl-jumbo" class="jumbotron jumbotron-fluid bg-cover">' +
    '<div class="container nopadding d-flex flex-column">' +
    '<div class="p-2">&nbsp;</div>' +
    '<a class="download-icon" href="' + mapGitRepo + '"><i class="fas fa-file-download fa-4x"></i></a>' + 
    '<div class="download-showcase-img-caption">' + mapName + '</div>' + 
    '</div></div>' + //jumbotron div end
    '</div>');
}

function loadPage(page) {
    this.document.location.href = page;
}


function execCopy(text) {
    const el = document.createElement('textarea');  // Create a <textarea> element
    el.value = text;                                // Set its value to the string that you want copied
    el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
    el.style.position = 'absolute';                 
    el.style.left = '-9999px';                      // Move outside the screen to make it invisible
    document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
    const selected =            
        document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0)     // Store selection if found
        : false;                                    // Mark as false to know no selection existed before
    el.select();                                    // Select the <textarea> content
    document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el);                  // Remove the <textarea> element
    if (selected) {                                 // If a selection existed before copying
        document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        document.getSelection().addRange(selected);   // Restore the original selection
    }
    $('.toast').toast('show');    
}