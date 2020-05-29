var g_MapData;

$(document).ready(function(){
    $.getJSON("data/maps.json", function(mapData) {
        console.log("Map JSON Load Success");
        g_MapData = mapData;

        var startingIndex = 0;
        
        var tabInnerHTML = ""; // for the tabs/pills
        var contentInnerHTML = ""; // for the actual displayed content
        for(i in mapData) {
            tabInnerHTML += '<a class="nav-link' + (i==startingIndex ? ' active' : '') + '" id="' + mapData[i].name + 
            '-tab" data-toggle="pill" href="#' + mapData[i].name + '" role="tab" aria-controls="' + mapData[i].name + 
            '" aria-selected="' + (i==0 ? 'true' : 'false') + '" onclick="mapTabClicked(' + i + ')">' + mapData[i].name + '</a>';
    
            contentInnerHTML += '<div class="tab-pane fade' + (i==startingIndex ? ' show active' : '') + '" id="' + mapData[i].name +
            '" role="tabpanel" aria-labelledby="' + mapData[i].name + '-tab">' + 
            // meat n' potatos of content
            '<h2><center>' + mapData[i].name + '</center></h2>' + // title
            '<h4><center>by ' + mapData[i].authors + '</center></h4>' + // authors/event
            '<h5><center>Released ' + mapData[i]["creation-date"] + '</center></h5>' + // release date
            '<h6><center id="link-wrapper"><a href="' + mapData[i]["jumptf-link"] + '">JumpTF Post</a> | ' + // jumptf post
            '<a href="' + mapData[i]["download-link"] + '"><i class="fas fa-download fa-1x"></i>Download</a> | ' + // map download link
            '<a href="' + mapData[i]["tempus-link"] + '">Tempus Times</a>' + // tempus leaderboard
            '</center></h6>' + 
            "</div>";
        }

        /* screenies
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
        */
    
        $('#maps-tab').html(tabInnerHTML);
        $('#maps-tabContent').html(contentInnerHTML);
        mapTabClicked(startingIndex);
    })
});

// load new videos
function mapTabClicked(i) {
    console.log(i);
    $('#showcase-vid').html('<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + 
                            g_MapData[i]["showcase-vid-id"] + '" allowfullscreen></iframe>');

    $('#main-wr-vid').html('<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + 
                            g_MapData[i]["mainclass-wr-vid-id"] + '" allowfullscreen></iframe>');
    $('#main-classname').html('<center><h3>' + g_MapData[i].class + ' WR:</h3></center>');

    $('#offclass-wr-vid').html('<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + 
                            g_MapData[i]["offclass-wr-vid-id"] + '" allowfullscreen></iframe>');
    $('#offclass-classname').html('<center><h3>' + (g_MapData[i].class=='Soldier' ? "Demo" : "Soldier") + ' WR:</h3></center>');
}
