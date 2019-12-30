window.onload = function() {
    $(".se-pre-con").fadeOut("slow");
};

$(document).ready(function(){
    $('#jumbo').load("jumbotron.html");
    $('#navi').load("navi.html");
    $('#brae-footer').load("footer.html");
});

var selectedNavItem;

//NAVBAR stuffs
function setSelectedNavItem(itemNum) {
    selectedNavItem = itemNum;
}
function updateSelectedNavItem() {
    if(selectedNavItem == null) return;
    selectedNavItem += "NavItem";
    document.getElementById(selectedNavItem).className += " active";
}

//map stuffs
var mapsGitRepo = "https://github.com/braem/TF2JumpMaps/";
var lastLoadedMap = "";
function createMapContent(mapName, mainClass, releaseDate, numImgs, showcaseVideoID, jumpTFthreadID, tempusMapName, 
    mainSpeedRunVideoID, offclassSpeedRunVideoID) {
    if(lastLoadedMap == "") lastLoadedMap = mapName; //first loaded map
    $("#"+lastLoadedMap+"-content").html(''); //unload previous loaded map content
    lastLoadedMap = mapName; //this one loading now

    //html div code
    var jumptfDiv = '<a href="https://jump.tf/forum/index.php/topic,' + jumpTFthreadID + '.html">JumpTF Post</a>';
    var mapDownloadDiv = ' | <a href="' + mapsGitRepo + "raw/master/" + mapName + "/release/jump_" + mapName + '.bsp"><i class="fas fa-download fa-1x"></i> Download</a>';
    var tempusDiv = (tempusMapName == "") ? "" : (' | <a href="https://tempus.xyz/maps/' + tempusMapName + '">Tempus Times</a>');
    var screenshotsDiv = '<div class="container-fluid showcase"><center><h3>Screenshots:</h3></center><div id="' + mapName + '-carousel" class="carousel slide" data-ride="carousel"></div></div><br>';
    var showcaseDiv =  '<div class="container-fluid showcase"><center><h3>Showcase:</h3></center><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + showcaseVideoID + '" allowfullscreen></iframe></div></div>';
    var otherClass = (mainClass == "Soldier") ? "Demo" : "Soldier";
    var mainSpeedRunDiv = (mainSpeedRunVideoID == "novid") ? '' : ('<div class="container-fluid showcase"><center><h3>' + mainClass + ' WR:</h3></center><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + mainSpeedRunVideoID + '" allowfullscreen></iframe></div></div>');
    var offclassSpeedRunDiv = (offclassSpeedRunVideoID == "novid") ? '' : ('<div class="container-fluid showcase"><center><h3>' + otherClass + ' WR:</h3></center><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + offclassSpeedRunVideoID + '" allowfullscreen></iframe></div></div>');

    $("#"+mapName+"-content").html('<h2><center>jump_' + mapName + '</center></h2>' +
    '<h5><center>Released ' + releaseDate + '</center></h5><h6><center id="link-wrapper">' +
    jumptfDiv + mapDownloadDiv + tempusDiv + '</center></h6>' + screenshotsDiv + showcaseDiv +
    '<br>' + mainSpeedRunDiv + '<br>' + offclassSpeedRunDiv);

    /* Carousel */
    $("#"+mapName+"-carousel").html('<ul class="carousel-indicators" id="' + mapName + '-carousel-indicators"></ul>' + 
    '<div class="carousel-inner" id="' + mapName + '-carousel-inner"></div>' +
    '<a class="carousel-control-prev" href="#' + mapName + '-carousel"" data-slide="prev"><span class="carousel-control-prev-icon"></span></a>' +
    '<a class="carousel-control-next" href="#' + mapName + '-carousel" data-slide="next"><span class="carousel-control-next-icon"></span></a>');
    //Filling Carousel
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

//mupsyc stuffs
function createMuPsycContent(compLength, chordProg, numMP3s, instrument, key) {
    $("#"+compLength+"bars_"+chordProg).html('');
    for(var i=1; i<=numMP3s; i++) {
        $("#"+compLength+"bars_"+chordProg+"_"+key)
        .append('<div class="col-md-6"><audio controls style="width:100%">' + 
        '<source src="mupsyc/mp3/' + compLength + 'bars/' + key + "/" +  instrument + '/' + chordProg + '/' + chordProg + ' (' + i + ').mp3" ' +
        'type="audio/mp3"> Your browser does not support the audio tag.' +
        '</audio></div>'
        );
    }
}

//copy text button
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