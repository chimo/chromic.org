( function() {
    "use strict";

    window.utils = {
        formatDate: function( date ) {
            var d = new Date( date );

            // Fallback to "now" if date is invalid
            if ( isNaN( d.getTime() ) ) {
                d = new Date();
            }

            return d.toISOString().slice( 0, -5 ).replace( "T", " " );
        }
    };
}() );
