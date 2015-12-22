( function() {
    /*global utils: false*/
    "use strict";

    var buildMeta,
        buildHCard,
        buildComment,
        getISSO,
        getWebmentions;

    getWebmentions = function() {
        var $container = $( "#wm" ),
            loc = window.location,
            url = loc.href.replace( loc.hash, "" ); /* Remove hash from url */

        if ( $container.length === 0 ) {
            return;
        }

        $.getJSON(
            "//webmention.chromic.org/api/mentions",
            {
                target: url
            },
            function( res ) {
                var links = res.links,
                    link,
                    len = links.length,
                    i,
                    type,
                    likes = [],
                    repeats = [],
                    mentions = [],
                    html = "<ul class='interactions'>";

                // TODO
                for ( i = 0; i < len; i += 1 ) {
                    link = links[ i ];
                    type = link.activity.type;

                    if ( type === "like" ) {
                        likes.push( link );
                    } else if ( type === "repeat" ) {
                        repeats.push( link );
                    } else {
                        mentions.push( link );
                    }

                    html += "<li class='interaction'><div class='indent'>" + buildComment( link ) + "</div></li>";
                }

                if ( i > 0 ) {
                    $container.html( html + "</ul>" );
                }

                // Marginalia
                // We have the proper markup in place now; kick-off marginalia
                // $( "body" ).append( "<script src='//chromic.org/assets/js/vendor/marginalia.min.js'></script>" );
                var script = document.createElement( "script" );
                // script.type  = "text/javascript";
                script.src = "//chromic.org/assets/js/vendor/marginalia.min.js";    // use this for linked script
                // script.text  = "alert('voila!');"               // use this for inline script
                document.body.appendChild( script );
            }
        );
    };

    getISSO = function() {
        var $container = $( "#isso" ),
            domain = $container.data( "domain" ) || "chromic",
            path = window.location.pathname,
            formatComment;

        formatComment = function( data ) {
            var replies = data.replies,
                len = replies.length,
                i,
                reply,
                html = "<ul class='interactions'>",
                obj;

            for ( i = 0; i < len; i += 1 ) {
                reply = replies[ i ];

                obj = {
                    source: false,
                    data: {
                        content: reply.text,
                        published: reply.created * 1000, // seconds to milliseconds
                        author: {
                            name: reply.author,
                            url: reply.website
                        }
                    }
                };

                html += "<li class='interaction'><div class='indent'>" + buildComment( obj ) + "</div>";

                if ( reply.replies && reply.replies.length > 0 ) {
                    html += formatComment( reply );
                }

                html += "</li>";
            }

            if ( i > 0 ) {
                return html + "</ul>";
            } else {
                return "";
            }
        };

        if ( $container.length === 0 ) {
            return;
        }

        $.getJSON( "//comments.chromic.org/" + domain + "/", { "uri": path }, function( data ) {
            var html = formatComment( data ),
                $commentCounter = $( ".interaction-icons .comments .num" );

            if ( html !== "" ) {
                $container.append( html );
            }

            // Update the comment counter total
            $commentCounter.text( Number( $commentCounter.text() ) + $container.find( ".interaction" ).length );
        } );
    };

    buildMeta = function( link ) {
        var url = link.source,
            published = link.data.published || link.verified_date,
            $container;

        if ( url ) {
            $container = $( "<a rel='nofollow' class='u-url meta' href='" + url + "'>" );
        } else {
            $container = $( "<span class='meta'>" );
        }

        return $container
                    .append( "<time class='dt-published timeago' datetime='" + published + "'>" + utils.formatDate( published ) + "</time>" );
    };

    buildHCard = function( author ) {

        if ( !author ) {
            author = {};
        }

        var classes =  "u-author h-card",
            name = "<span class='p-name'>"  + ( author.name || "Somebody" ) + "</span>",
            url = author.url,
            $dom;

        if ( url ) {
            $dom = $( "<a rel='nofollow' class='" + classes + "' href='" + url + "'>" + name + "</a>" );
        } else {
            $dom = $( "<span class='" + classes + "'>" + name + "</span>" );
        }

        if ( author.photo ) {
            $dom.prepend( "<img class='u-photo avatar' src='" + author.photo + "' alt=''>" );
        }

        return $dom;
    };

    buildComment = function( link ) {
        var data = link.data,
            $hcard = buildHCard( data.author ),
            $meta = buildMeta( link ),
            fragmention = "",
            target = data.target || "",
            fragIndex = target.indexOf( "##" );

            // Marginalia
            if ( fragIndex !== -1 ) {
                fragmention = "data-fragmention='" + target.slice( fragIndex ) + "'";
            }

            return $( "<div class='u-comment h-cite'>" )
                        .append( $hcard )
                        .append( "<div " + fragmention + "class='p-content p-name'>" + ( data.content || "Linked to this page" ) + "</div>" )
                        .append( $meta )
                        .get( 0 )
                        .outerHTML;
    };

    // Fetch comments
    getISSO();
    getWebmentions();
}() );
