var g_InstrumentType; // defaults to piano

$(document).ready(function(){
    $.getJSON("data/mupsyc-comps.json", function(muPsycData) {
        console.log("MuPsyc JSON Load Success");

        g_InstrumentType = 'piano';

        var innerHTML = "<center><h3>&mu;Psyc Compositions</h3></center>";
        var maxColumnsPerRow = 2;
        var bootstrapWidth = 12 / maxColumnsPerRow;
        for (i in muPsycData) {
            innerHTML += '<center><h5>' + muPsycData[i]['bar-length'] + ' bar compositions in ' +
            muPsycData[i]['key'] + ' with ' + muPsycData[i]['chord-prog'] + ' chord progression</h5></center>' +
            '<div class="row row-no-gutters">';

            var mp3data = muPsycData[i][g_InstrumentType + '-mp3s'];
            for (var j = 0; j < muPsycData[i]["shown-comps"]; j++)
            {
                innerHTML += '<div class="col-md-' + bootstrapWidth + '"><audio controls style="width:100%">' +
                '<source src="' + mp3data[j] + '" type="audio/mp3"> Your browser does not support the audio tag.' + 
                '</audio></div>';
            }

            innerHTML += '</div>';
        }

        $('#mupsyc-content').html(innerHTML);
    })

    $.getJSON("data/publications.json", function(publicationData) {
        var innerHTML = '<center><h3>Publications</h3></center> <ul class="nav nav-tabs flex-column">';
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
