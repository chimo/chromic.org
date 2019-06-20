(function ( window, $ ) {
    "use strict";

    var init,
        checkAuth,
        pad,
        makeRequest,
        handleAuthResult,
        listUpcomingEvents,
        clientId = "646138894866-23spg3epl1vbfdjvhv80r2o1eo4b2k91.apps.googleusercontent.com",
        apiKey = "AIzaSyCCvlCriceMnn7aX32hxt3qh27SMnhjacU",
        clientSecret = "Da9bBmGjIDy99bb78YNP5ol3",
        scopes = "https://www.googleapis.com/auth/calendar";

    pad = function( minutes ) {
        if ( minutes < 10 ) {
            minutes = "0" + minutes;
        }

        return minutes;
    };

    makeRequest = function() {
/*        var request = gapi.client.calendar.colors.get();

        request.execute( function( resp ) {
            console.log( resp );
        } ); */

        listUpcomingEvents();
    };

    listUpcomingEvents = function() {
        var $row,
            $cell,
            days = [
                "sun",
                "mon",
                "tue",
                "wed",
                "thu"
            ],
            request = gapi.client.calendar.events.list( {
                'calendarId': 'n6j5n8j4oj7der4eu9ff5j5k34@group.calendar.google.com',
                'timeMin': ( new Date( "2016-06-19" ) ).toISOString(),
                'timeMax': ( new Date( "2016-06-25" ) ).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'orderBy': 'startTime'
            } );

        request.execute( function( resp ) {
            var events = resp.items,
                i,
                len = events.length,
                event,
                hours,
                start,
                end,
                classType,
                $schedule = $( ".schedule" );

            console.log( events );

            if ( events.length > 0 ) {
                for ( i = 0; i < len; i += 1 ) {
                    event = events[ i ];

                    start = new Date( event.start.dateTime );
                    end = new Date( event.end.dateTime );

                    hours = start.getHours() + ":" + pad( start.getMinutes() ) + "-" +
                            end.getHours() + ":" + pad( end.getMinutes() );

                    $row = $schedule.find( "._" + start.getHours() + "00" );
                    $cell = $row.find( "." + days[ start.getDay() ] );
                    $cell.text( event.summary + " " + hours );

                    classType = event.summary.split( " " )[ 0 ];

                    if ( classType === "Intermediate+" ) {
                        classType = "Intermediate";
                    }

                    $cell.addClass( classType );
                }
            }

            $schedule.show();
        } );
    }

/*    handleAuthResult = function( authResult ) {
        var authorizeButton = document.getElementById( "authorize-button" );

        if (authResult && !authResult.error) {
            makeRequest();
        } else {
alert( "auth" );
            gapi.auth.authorize( {
                client_id: clientId,
                scope: scopes,
                immediate: false
            }, handleAuthResult );
        }
    };

    checkAuth = function() {
        gapi.auth.authorize( {
            client_id: clientId,
            scope: scopes,
            immediate: true
        }, handleAuthResult );
    }; */

    init = function () {
        gapi.client.setApiKey( apiKey );
//        window.setTimeout( checkAuth, 1 );

        gapi.client.load('calendar', 'v3').then( makeRequest );
    };

    window.init = init;

}( window, jQuery ));

