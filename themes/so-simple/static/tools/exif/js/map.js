( function ( doc ) {
    'use strict';

    let map,

        // What the absolute fuck.
        // https://openlayers.org/en/latest/examples/custom-interactions.html
        Drag = ( function ( PointerInteraction ) {
            function Drag() {
                PointerInteraction.call( this, {
                    handleDownEvent: handleDownEvent,
                    handleDragEvent: handleDragEvent,
                    handleMoveEvent: handleMoveEvent,
                    handleUpEvent: handleUpEvent
                } );

                this.coordinate_ = null;
                this.cursor_ = "pointer";
                this.feature_ = null;
                this.previousCursor_ = undefined;
            }

            if ( PointerInteraction ) {
                Drag.__proto__ = PointerInteraction;
            }

            Drag.prototype = Object.create( PointerInteraction && PointerInteraction.prototype );

            Drag.prototype.constructor = Drag;

            return Drag;
        }( ol.interaction.Pointer ) ),

        // https://openlayers.org/en/latest/examples/custom-interactions.html
        handleDownEvent = function( evt ) {
            let map = evt.map,
                feature = map.forEachFeatureAtPixel( evt.pixel,
                    function( feature ) {
                        return feature;
                    } );

            if ( feature ) {
                this.coordinate_ = evt.coordinate;
                this.feature_ = feature;
            }

            return !!feature;
        },

        // https://openlayers.org/en/latest/examples/custom-interactions.html
        handleDragEvent = function ( evt ) {
            let deltaX = evt.coordinate[ 0 ] - this.coordinate_[ 0 ],
                deltaY = evt.coordinate[ 1 ] - this.coordinate_[ 1 ],
                geometry = this.feature_.getGeometry();

            geometry.translate( deltaX, deltaY );

            this.coordinate_[ 0 ] = evt.coordinate[ 0 ];
            this.coordinate_[ 1 ] = evt.coordinate[ 1 ];
        },

        // https://openlayers.org/en/latest/examples/custom-interactions.html
        handleMoveEvent = function ( evt ) {
            if ( this.cursor_ ) {
                let map = evt.map,
                    feature = map.forEachFeatureAtPixel( evt.pixel,
                        function( feature ) {
                            return feature;
                        }
                    ),
                    element = evt.map.getTargetElement();

                if ( feature ) {
                    if ( element.style.cursor != this.cursor_ ) {
                        this.previousCursor_ = element.style.cursor;
                        element.style.cursor = this.cursor_;
                    }
                } else if ( this.previousCursor_ !== undefined ) {
                    element.style.cursor = this.previousCursor_;
                    this.previousCursor_ = undefined;
                }
            }
        },

        // https://openlayers.org/en/latest/examples/custom-interactions.html
        handleUpEvent = function () {
            let coords = this.coordinate_;

            doc.dispatchEvent( new CustomEvent(
                "coordsupdated",
                {
                    bubbles: true, 
                    detail: {
                        coords: {
                            lat: coords[ 1 ],
                            lon: coords[ 0 ]
                        }
                    }
                }
            ) );

            this.coordinate_ = null;
            this.feature_ = null;

            return false;
        },

        createMap = function( e ) {
            let coords = e.detail.coords,
                lat = coords.lat,
                lon = coords.lon,

                marker = new ol.Feature( {
                    type: "geoMarker",
                    geometry: new ol.geom.Point( [ lon, lat ] )
                } ),

                styles = {
                    geoMarker: new ol.style.Style( {
                        image: new ol.style.Circle( {
                            radius: 7,
                            fill: new ol.style.Fill( { color: "black" } ),
                            stroke: new ol.style.Stroke( {
                                color: "white",
                                width: 2
                            } )
                        } )
                    } )
                },

                vectorLayer = new ol.layer.Vector( {
                    source: new ol.source.Vector( {
                        features: [ marker ]
                    } ),
                    style: function( feature ) {
                        return styles[ feature.get( "type" ) ];
                    }
                } );

            map = new ol.Map( {
                interactions: ol.interaction.defaults().extend( [ new Drag() ] ),
                target: "map",
                layers: [
                    new ol.layer.Tile( {
                        source: new ol.source.OSM( {
                            url: "https://a.tile.openstreetmap.de/{z}/{x}/{y}.png"
                        } )
                    } ),
                    vectorLayer
                ],
                view: new ol.View( {
                    center: [ lon, lat ],
                    projection: "EPSG:4326",
                    zoom: 18
                } )
            } );
        };

    doc.addEventListener( "exifread", createMap );

}( document ) );

