( function() {
    /*global ol: false*/
    "use strict";

    var createStyle,
        createMarkers,
        createMap;

    createMap = function( container, places ) {
        var markers = createMarkers( places ),
            tiles = new ol.layer.Tile( { source: new ol.source.OSM() } ),
            layers = [ tiles, markers ],
            extent = markers.getSource().getExtent(),
            map;

        map = new ol.Map( {
            target: container,
            layers: layers,
            view: new ol.View( {
                center: [ 0, 0 ],
                zoom: 1
            } )
        } );

        map.getView().fit( extent, map.getSize(), { maxZoom: 18 } );

        return map;
    };

    /**
     * Create markers
     */
    createMarkers = function( points ) {
        var len = points.length,
            i,
            point,
            // poiName,
            markers = [];

        for ( i = 0; i < len; i += 1 ) {
            point = points[ i ];
            // poiName = point.tags.name;

            // create markers
            markers.push(
                new ol.Feature( {
                    geometry: new ol.geom.Point( ol.proj.transform( [ parseFloat( point.lon ), parseFloat( point.lat ) ], "EPSG:4326", "EPSG:3857" ) )
                } )
            );
        }

        // create and return layer
        return new ol.layer.Vector( {
            source: new ol.source.Vector( { features: markers } ),
            style: createStyle( "/images/marker-green.png" )
        } );
    };

    /**
     * Create map marker style
     *
     * @param src String URL to image
     */
    createStyle = function( src ) {
        return new ol.style.Style(
            {
                image: new ol.style.Icon(
                    {
                        anchor: [ 0.5, 46 ],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        opacity: 0.75,
                        src: src
                     }
                )
            }
        );
    };

    /**
     * Build maps
     */
    $( ".pullet-coords" ).each( function() {
        var $coords = $( this ),
            $container = $coords.closest( ".e-content" ).append( "<div>" ),
            lon = $coords.find( ".lon" ).text(),
            lat = $coords.find( ".lat" ).text();

        createMap( $container.get( 0 ), [ { lat: lat, lon: lon } ]);
    } );

    window.createMap = createMap; // For websockets.js
}() );

