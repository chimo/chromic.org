( function() {
    /*global console: false, JSON: false, utils: false*/
    "use strict";

    var $htmlTemplate = $( "#tpl" ),
        $stream = $( "#ls" );

    if ( $htmlTemplate.length === 0 ) {
        return;
    }

    if ( "WebSocket" in window ) {
        var ws,
            port;

        if ( window.location.protocol === "https:" ) {
            port = window.ls.secure_port;
        } else {
            port = window.ls.port;
        }

        ws = new WebSocket( window.location.origin.replace( /^http/, "ws" ) + ":" + port );

        ws.onopen = function( /*event*/ ) {
            console.log( "connection established" );
        };

        ws.onerror = function( /*event*/ ) {
            console.log( "An error occured" );
        };

        ws.onclose = function( event ) {
            var closedDetails = ( event.wasClean ) ? " cleanly" : " unexpectedly",
                reason = event.reason;

            console.log( "WebSocket connection closed" + closedDetails );
            console.log( "Code: " + event.code + " ( see: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent )" );

            // Don't print reason if we don't have one
            if ( reason ) {
                console.log( "Reason: " + event.reason );
            }
        };

        ws.onmessage = function( e ) {
            var $time,
                data = JSON.parse( e.data ),
                updateUrl = "https://chromic.org/update/" + data.id,
                $newItem = $htmlTemplate
                            .children()
                            .first()
                            .clone();

            // Item type
            $newItem.addClass( data.type );

            // Title
            $newItem
                .find( ".p-name" )
                .first()
                .html( data.title );

            // @cite and content
            $newItem
                .find( ".e-content" )
                .first()
                .attr( "cite", data.source )
                .html( data.content );

            // Link to comments/likes/repeats
            $newItem
                .find( ".interactions-link" )
                .attr( "href", updateUrl + "#interactions" );

            // data-url attr used by webmention.chromic.org
            // to populate interaction data
            $newItem
                .find( ".interactions" )
                .attr( "data-url", updateUrl );

            // permalink
            $newItem
                .find( "footer .u-url" )
                .attr( "href", updateUrl );

            // Foreign url
            $newItem
                .find( ".foreign-url" )
                .first()
                .attr( "href", data.source );

            // Icon of the service this item came from
            $newItem
                .find( ".foreign-service" )
                .attr( "src", "/images/homepage/" + data.type + ".png" );

            // Published date
            $time = $newItem
                .find( ".dt-published" )
                .first()
                .attr( "datetime", data.published + "Z" )
                .html( utils.formatDate( data.published ) );

            // Insert new content at the top of the stream
            // Remove oldest item from the stream
            $stream
                .prepend( $newItem )
                .children( "li" )
                .last()
                .remove();

            $time.timeago();

            // Create map
            if ( data.type === "pullet" ) {
                $newItem.find( ".e-content" ).each( function() { // There should be only one, but we use each() to scope vars.
                    var $content = $( this ),
                        lon = $content.find( ".lon" ).text(),
                        lat = $content.find( ".lat" ).text();

                    window.createMap( $content.get( 0 ), [ { lat: lat, lon: lon } ] );
                } );
            }
        };
    }
}() );

