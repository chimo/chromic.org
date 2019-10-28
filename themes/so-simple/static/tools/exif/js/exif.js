( function( doc ) {
    'use strict';

    let output = doc.querySelector( "#results" ),

        /**
         * Build frontmatter DOM template out of exif data
         */
        getFrontMatterContainer = function ( exif ) {
            let image = "tmp",
                exifreadEvent,
                template = doc.createElement( "template" ),
                html = `
<div class="result">
<img src="${image}" />
<pre class="meta">
---
title: ""
date: ""

resources:
- name: original
  title: ""
  src: images/original.jpg

datetaken: "${exif.dateTaken}"
address1: ""
address2: ""
latitude: "<span id="js-lat">${exif.latitude}</span>"
longitude: "<span id="js-lon">${exif.longitude}</span>"
size: "${exif.size}"
resolution: "${exif.width} x ${exif.height}"
camera: "${exif.make} ${exif.model}"
---
</pre>
</div>
            `
            template.innerHTML = html.trim();

            doc.dispatchEvent( new CustomEvent(
                "exifread",
                {
                    bubbles: true,
                    detail: {
                        coords: {
                            lat: exif.latitude,
                            lon: exif.longitude
                        }
                    }
                }
            ) );

            return template.content.firstChild;
        },

        /**
         * Event handler for files picked from file picker.
         */
        processInput = function() {
            let files = this.files,
                len = files.length,
                i;

            for ( i = 0; i < len; i += 1 ) {
                process( files[ i ] );
            }
        },

        /**
         * Entry method to process a file.
         */
        process = function( file ) {
            extractExif( file )
                .then( function( exif ) {
                    let container = getFrontMatterContainer( exif ),
                        reader = new FileReader(),
                        img = container.querySelector( "img" );

                    output.appendChild( container );

                    reader.addEventListener( "load", function() {
                        img.src = reader.result;
                    } );

                    reader.readAsDataURL( file );
                } );
        },

        /**
         * Convert bytes to easy to read format
         */
        readableBytes = function( bytes ) {
            let i = Math.floor( Math.log( bytes ) / Math.log( 1024 ) ),
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            return ( bytes / Math.pow( 1024, i ) ).toFixed( 2 ) *
                1 + " " + sizes[ i ];
        },

        /**
         * For a given file, extract exif data.
         */
        extractExif = function( file ) {
            const size = readableBytes( file.size );

            return new Promise( function( resolve, reject ) {
                EXIF.getData( file, function() {
                    let exif = EXIF.getAllTags( this ),
                        latitude = "",
                        longitude = "",
                        dateTaken = "",
                        info = {};

                    if ( exif.DateTimeOriginal ) {
                        dateTaken = convertDate( exif.DateTimeOriginal );
                    }

                    if ( exif.GPSLatitude ) {
                        latitude = convertCoords( exif.GPSLatitudeRef,
                            exif.GPSLatitude );
                    }

                    if ( exif.GPSLongitude ) {
                        longitude = convertCoords( exif.GPSLongitudeRef,
                            exif.GPSLongitude );
                    }

                    info = {
                        latitude: latitude,
                        longitude: longitude,
                        dateTaken: dateTaken,
                        width: exif.PixelXDimension,
                        height: exif.PixelYDimension,
                        make: exif.Make || "",
                        model: exif.Model || "",
                        size: size
                    };

                    resolve( info );
                } );
            } );
        },

        /**
         * Event handler when dropping files on the dropzone.
         */
        processDroppedImages = function( e ) {
            e.preventDefault();

            let files = e.dataTransfer.files,
                dataUrl;

            forEach( function( file ) {
                process( file );
            } );
        },

        /**
         * Convert date to ISO format.
         */
        convertDate = function( datetime ) {
            let arr = datetime.split( " " ),
                date = arr[ 0 ].replace(/:/g, '-'),
                time = arr[ 1 ],
                d = new Date( date + " " + time);

            return d.toISOString();
        },

        /**
         * Convert coordinate (lat or lon) from degrees to decimal.
         */
        convertCoords = function( ref, coord ) {
            let direction = 1,
                decimalCoords;

            if ( ref === 'S' || ref === 'W' ) {
                direction = -1;
            }

            decimalCoords = coord[ 0 ] + ( coord[ 1 ] / 60 ) +
                ( coord[ 2 ] / 3600 );

            return decimalCoords * direction;
        },

        updateCoords = function( e ) {
            let coords = e.detail.coords,
                lat = coords.lat,
                lon = coords.lon,
                latContainer = doc.querySelector( "#js-lat" ),
                lonContainer = doc.querySelector( "#js-lon" );

            latContainer.textContent = lat;
            lonContainer.textContent = lon;
        };

    doc.querySelector( "#pic" )
        .addEventListener( "change", processInput );

    doc.addEventListener( "coordsupdated", updateCoords );

}( document ) );

