var g_InstrumentType; // defaults to piano
var g_MuPsycData;

$(document).ready(function(){
    $('#pianobtn')[0].addEventListener("click", function() {
        g_InstrumentType = 'piano'; 
        CreateMuPsycContent();
        document.getElementById('harpsichordbtn').classList.remove('active');
        document.getElementById('pianobtn').classList.add('active');
    });
    $('#harpsichordbtn')[0].addEventListener("click", function() {
        g_InstrumentType = 'harpsichord'; 
        CreateMuPsycContent();
        document.getElementById('harpsichordbtn').classList.add('active');
        document.getElementById('pianobtn').classList.remove('active');
    });

    $.getJSON("data/mupsyc-comps.json", function(muPsycData) {
        console.log("MuPsyc JSON Load Success");

        g_MuPsycData = muPsycData;
        g_InstrumentType = 'piano';

        CreateMuPsycContent();
    })

    $.getJSON("data/publications.json", function(publicationData) {
        var innerHTML = '<center><h3 class="sidebar-title">Publications</h3></center> <ul class="nav nav-tabs flex-column">';
        for (i in publicationData)
        {
            innerHTML += '<li class="nav-item">' +
            '<a class="nav-link" href="' + publicationData[i].link + '">' +
            '<center style="font-weight:bold">' + publicationData[i].title + '</center>' +
            '<center>Published in' + (publicationData[i].type == 'Conference' ? ' and presented at' : '') + ' the ' + 
            publicationData[i].year + ' ' + publicationData[i].in + 
            (publicationData[i].type == 'Conference' ? (', in ' + publicationData[i]['conf-location']) : '') +
            '</center></a></li>';
        }
        innerHTML += '</ul>'
        $('#publication-links').html(innerHTML);
    })
})

function CreateMuPsycContent() {
    var innerHTML = "";
    var maxColumnsPerRow = 2;
    var bootstrapWidth = 12 / maxColumnsPerRow;
    for (i in g_MuPsycData) {
        innerHTML += '<center><h5>' + g_MuPsycData[i]['bar-length'] + ' bar compositions in ' +
        g_MuPsycData[i]['key'] + ' with ' + g_MuPsycData[i]['chord-prog'] + ' chord progression</h5></center>' +
        '<div class="row row-no-gutters">';

        var mp3data = g_MuPsycData[i][g_InstrumentType + '-mp3s'];
        for (var j = 0; j < g_MuPsycData[i]["shown-comps"]; j++)
        {
            innerHTML += '<div class="col-md-' + bootstrapWidth + '"><audio controls style="width:100%">' +
            '<source src="' + mp3data[j] + '" type="audio/mp3"> Your browser does not support the audio tag.' + 
            '</audio></div>';
        }

        innerHTML += '</div>';
    }

    $('#mupsyc-content').html(innerHTML);
};