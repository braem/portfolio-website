var g_MapData;

$(document).ready(function(){

    // load sidebar link data
    $.getJSON("data/mapping-links.json", function(linkData) {
        var innerHTML = ""
        for(i in linkData) {
            innerHTML += '<li class="nav-item"><a class="nav-link" href="' +
            linkData[i].link + '">' + linkData[i].text + '</a></li>';
        }
        $('#mapping-links').html(innerHTML);
    })

    // load map data
    $.getJSON("data/maps.json", function(mapData) {
        console.log("Map JSON Load Success");
        g_MapData = mapData;

        var startingIndex = 0;
        
        var tabInnerHTML = ""; // for the tabs/pills
        var contentInnerHTML = ""; // for the actual displayed content
        for (i in mapData) {
            tabInnerHTML += '<a class="nav-link' + (i==startingIndex ? ' active' : '') + '" id="' + mapData[i].name + 
            '-tab" data-toggle="pill" href="#' + mapData[i].name + '" role="tab" aria-controls="' + mapData[i].name + 
            '" aria-selected="' + (i==0 ? 'true' : 'false') + '" onclick="mapTabClicked(' + i + ')">' + mapData[i].name + '</a>';
    
            contentInnerHTML += '<div class="tab-pane fade' + (i==startingIndex ? ' show active' : '') + '" id="' + mapData[i].name +
            '" role="tabpanel" aria-labelledby="' + mapData[i].name + '-tab">' + 
            // meat n' potatos of content
            '<h2><center>' + mapData[i].name + '</center></h2>' + // title
            '<h4><center>by ' + mapData[i].authors + (typeof mapData[i].event == 'undefined' ? '' : (' for ' + mapData[i].event)) + '</center></h4>' + // authors/event
            '<h5><center>Released ' + mapData[i]["creation-date"] + '</center></h5>'; // release date
            
            // inline links
            contentInnerHTML += '<h6><center id="link-wrapper">' + 
            ((typeof mapData[i]["jumptf-link"] == 'undefined') ? '' : '<a href="' + (mapData[i]["jumptf-link"] + '">JumpTF Post</a> | ')) + // jumptf post
            '<a href="' + mapData[i]["download-link"] + '"><i class="fas fa-download fa-1x"></i> Download</a>' + // map download link
            ((typeof mapData[i]["tempus-link"] == 'undefined') ? '' : (' | <a href="' + mapData[i]["tempus-link"] + '">Tempus Times</a>')) + // tempus leaderboard
            '</center></h6>' + 
            "</div>";
        }
    
        $('#maps-tab').html(tabInnerHTML);
        $('#maps-tabContent').html(contentInnerHTML);
        mapTabClicked(startingIndex);
    })
});

// load new videos
function mapTabClicked(tabIndex) {
    $(".se-pre-con").fadeIn(1);

    // screenshots carousel
    var carouselStartingIndex = 0;
    var carouselIndicators = '<ol class="carousel-indicators">';
    var carouselInner = '<div class="carousel-inner">';
    for (i in g_MapData[tabIndex].screenshots) {
        carouselIndicators += '<li data-target="#maps-carousel" data-slide-to="' + i + '"' +
        (i==carouselStartingIndex ? ' class="active"' : '') + '></li>';

        carouselInner += '<div class="carousel-item' + (i==carouselStartingIndex ? ' active' : '') + '">' +
        '<img class="img-fluid" alt="Responsive image" src="' + g_MapData[tabIndex].screenshots[i] + '">' +
        '</div>';
    }
    carouselIndicators += '</ol>';
    carouselInner += '</div>';
    
    var carouselControl = '<a class="carousel-control-prev" href="#maps-carousel" data-slide="prev">' +
    '<span class="carousel-control-prev-icon"></span></a>' +
    '<a class="carousel-control-next" href="#maps-carousel" data-slide="next">' +
    '<span class="carousel-control-next-icon"></span></a>';

    $('#maps-carousel').html(carouselInner + carouselControl);
    $('#showcase-vid').html('<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + 
                            g_MapData[tabIndex]["showcase-vid-id"] + '" allowfullscreen></iframe>');

    $('#main-wr-vid').html('<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + 
                            g_MapData[tabIndex]["mainclass-wr-vid-id"] + '" allowfullscreen></iframe>');
    $('#main-classname').html('<center><h3>' + g_MapData[tabIndex].class + ' WR:</h3></center>');

    $('#offclass-wr-vid').html('<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + 
                            g_MapData[tabIndex]["offclass-wr-vid-id"] + '" allowfullscreen></iframe>');
    $('#offclass-classname').html('<center><h3>' + (g_MapData[tabIndex].class=='Soldier' ? "Demo" : "Soldier") + ' WR:</h3></center>');
    
    $(".se-pre-con").fadeOut(800);
}
