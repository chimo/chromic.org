( function() {
    "use strict";

    var urls = [],
        base;

    /**
     * Webmentions
     */

    // Collect urls
    $( "[data-webmention-count]" ).each( function( i, e ) {
        var parser = document.createElement( "a" );

        parser.href = $( e ).data( "url" );
        base = parser.protocol + "//" + parser.hostname;
        urls.push( parser.pathname + parser.search );
    } );

    // Get data, update containers
    $.getJSON( "//webmention.chromic.org/api/count?jsonp=?", {
      base: base,
      targets: urls.join( "," )
    }, function( data ) {
        $( "[data-webmention-count]" ).each( function( i, e ) {
            var $container = $( e ),
                $mentions = $container.find( ".comments .num" ),
                $likes = $container.find( ".likes .num" ),
                $repeats = $container.find( ".repeats .num" ),
                nbMentions = Number( $mentions.text() ),
                nbLikes = Number( $likes.text() ),
                nbRepeats = Number( $repeats.text() ),
                url = $container.data( "url" ),
                counts = data.count[ url ];

            if ( counts === undefined ) {
                return;
            }

            $mentions.text( nbMentions + counts.other );
            $likes.text( nbLikes + counts.likes );
            $repeats.text( nbRepeats + counts.repeats );
        } );
    } );

}() );

