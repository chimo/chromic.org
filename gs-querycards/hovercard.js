( function( $ ) {
    /* private */
    function buildHTML( data, group ) {
        var at = "",
            desc = "Description",
            notices = "",
            latest = "",
            subs = "members",
            html,
            uid = new Date().getTime();

        // Redefine some things if we're dealing with @user
        if ( !group ) {
            at   = "@";
            desc = "Bio";
            subs = "subscribers";
            notices = "<span class='hc-notices'>" +
                    "<span class='hc-count'>" + data.statuses_count + "</span> notices," +
                    "</span>";
            latest = "<h3>Latest</h3>" +
                "<span class='hc-status'>" + data.status.text + "</span>";
        }

        html = "<div class='gs-hovercard'>" +
                  "<div class='hc-content'>" +
                    "<h2>" + ( data.name || data.fullname ) + "</h2>" +
                    "<a href='" + ( data.statusnet_profile_url || data.url ) + "'>" + at + ( data.screen_name || data.fullname ) +
                      "<img src='" + ( data.profile_image_url || data.stream_logo ) + "' />" +
                    "</a>" +
                    "<p class='hc-stats'>" + notices +
                      "<span class='hc-subs'>" +
                        "<span class='hc-count'>" + ( data.friends_count || data.member_count ) + "</span> " + subs +
                      "</span>" +
                    "</p>" +
                    "<h3>" + desc + "</h3>" +
                    "<span class='hc-bio'>" + ( data.description || "" ) + "</span>" + latest +
                  "</div>" +
                  "<div class='hc-actions'><a href='#' class='hc-follow'>subscribe</a>" +
                  "<div class='hc-follow-form'>" +
                    "<form>" +
                      "<fieldset>" +
                        "<label for='hc-profile-" + uid + "'>Your Accound ID</label>" +
                        "<input id='hc-profile-" + uid + "' type='text' placeholder='e.g. user@example.org' />" +
                        "<input type='hidden' name='profile' value='" + ( data.statusnet_profile_url || data.url ) + "' />" +
                        "<button type='submit'>Subscribe</button>" +
                      "</fieldset>" +
                    "</form>" +
                  "</div>" +
                "</div>" +
              "</div>";

        return html;
    }

    function buildCard( data, $link ) {
        $link.on( "mouseenter", function() {
            setTimeout( function() {
                $( ".gs-hovercard" ).hide(); /* Only show one hovercard at a time */
                $link.data( "gs-hovercard" ).show();
            }, 400 );
        } );

        var offset = $link.offset(),
            group  = ( $link.text().charAt( 0 ) === "!" ),
            html   = buildHTML( data, group );

        html = $( html ).appendTo( "body" )
            .on( "mouseleave", function() {
                setTimeout( function() {
                    html.hide();
                }, 400 );
            } )
            .css( { top: offset.top, left: offset.left } );

        html.find( ".hc-follow" ).on( "click", function( e ) {
            e.preventDefault();
            $( this ).parent().find( ".hc-follow-form" ).slideToggle();
        } );

        html.find( "form" ).on( "submit", function( e ) {
            e.preventDefault();

            var $form   = $( this ),
                $input  = $form.find( "input[type=text]" ),
                profile = $input.val().split( "@" );

            if ( profile.length !== 2 ) {
                /* TODO: show error msg */
                $input.css( "border", "1px solid #f00" );
            } else {
                profile = profile[ 1 ];
                if ( !group ) {
                    $form.attr( "action", "http://" + profile + "/main/ostatussub" );
                } else {
                    $form.attr( "action", "http://" + profile + "/main/ostatusgroup" );
                }
                this.submit();
            }
        } );

        $link.data( "gs-hovercard", html ); /* Could use ARIA instead */
        $link.trigger( "mouseenter" );      /* Initial show() after we got the data */
    }

    function buildErrorCard() {
       /* TODO */
    }

    function getData() {
        var $this = $( this ),
            id    = $this.text().substr( 1 ),
            group = ( $this.text().charAt( 0 ) === "!" ),
            patt  = group ? new RegExp( "group\/" + id + "$" ) : new RegExp( id + "$" ),
            url   = $this.attr( "href" ).replace( patt, "" ),
            api   = group ? "/api/statusnet/groups/show.json?id=" + id : "/api/users/show.json?id=" + id;

        // NOTE:  Doesn't support api at non-default locations
        $.getJSON( url + api ) /* Fancy URL */
            .success( function( data ) {
                buildCard( data, $this );
            } )
            .error( function() { /* Try non-fancy URL */
                $.getJSON( url + "/index.php" + api )
                    .success( function( data ) {
                        buildCard( data, $this );
                    } )
                    .error( function() {
                        buildErrorCard();
                    } );
            } );
    }

    // public
    var methods = {
        init: function() {
            return this.each( function() {
                var $this = $( this ),
                    $collection;

                if ( $this.is( "a[href]" ) ) {
                    $collection = $this;
                } else {
                    $collection = $this.find( "a[href]" );
                }

                if ( $collection ) {
                    $collection.each( function() {
                        if ( $( this ).text().match( /@\w+/ ) ) {
                            $( this ).one( "mouseenter", getData );
                        } else if ( $( this ).text().match( /!\w+/ ) ) {
                            $( this ).one( "mouseenter", getData );
                        }
                    } );
                }
            } );
        }
    };

    // Method calling logic
    $.fn.gsHovercard = function( method ) {
        var elm;

        if ( methods[ method ] ) {
            elm = methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof method === "object" || !method ) {
            elm = methods.init.apply( this, arguments );
        } else {
            $.error( "Method " +  method + " does not exist on jQuery.gsHovercard" );
        }

        return elm;
    };

}( jQuery ) );
