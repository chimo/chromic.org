(function () {
    "use strict";

    var geoContainer = document.getElementById( "geo-container" ),
        geoLink = document.getElementById( "geo" ),
        timestampContainer = document.getElementById( "geo-timestamp" ),
        doRefresh;

    // Bail if the container doesn't exist
    if ( geoContainer === null ) {
        return;
    }

    doRefresh = function() {
        var xhr;
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            xhr = false;
        }

        xhr.onreadystatechange  = function() {
            if (xhr.readyState  === 4) {
                if (xhr.status  === 200) {
                    var json = JSON.parse( xhr.responseText ),
                        lat = json.latitude,
                        lon = json.longitude,
                        dte = json.time;


                    geoLink.setAttribute(
                            "href",
                            "http://www.openstreetmap.org/?mlat=" +
                                lat + "&mlon=" + lon + "#map=17/" +
                                lat + "/" + lon
                        );

                    geoLink.innerText = lat + "," + lon;
                    geoContainer.style.display = "block";

                    if (dte && lat && lon) {
                        timestampContainer.innerText = dte + " (EDT)";
                        timestampContainer.setAttribute( "datetime", dte.replace( " ", "T" ) );
                        $( timestampContainer ).timeago();
                    }
                }
            }
        };
        xhr.open("GET", "/php/read_location.php?" + Math.random(),  true);
        xhr.send(null);
    };

    doRefresh();
    window.setInterval( doRefresh, 30000 );
}());

