( function( document ) {
    "use strict";

    var Panel = class Panel {
        constructor( panel ) {
            this.panel = panel;
            this.toggleButton = document.querySelector( "[href='#" + panel.getAttribute( "id" ) + "']" );
            this.closeButton = panel.querySelector( ".js-panel-close" );

            this.toggleButton.addEventListener( "click", ( e ) => {
                e.preventDefault();

                this.toggle()
            } );

            this.closeButton.addEventListener( "click", ( e ) => {
                e.preventDefault();

                this.close();
            } );
        }

        toggle() {
            let panel = this.panel;

            this.toggleButton.classList.toggle( "active" );

            panel.classList.toggle( "slide-in" );
            panel.classList.toggle( "slide-out" );

            if ( panel.classList.contains( "slide-in" ) ) {
                panel.focus();
                panel.scrollIntoView();
            }
        }

        close() {
            let panel = this.panel,
                toggleButton = this.toggleButton;

            panel.classList.remove( "slide-in" );
            panel.classList.add( "slide-out" );

            toggleButton.classList.remove( "active" );
            toggleButton.focus();
        }
    };

    document.querySelectorAll( ".js-panel" ).forEach( ( elm ) => {
        new Panel( elm );
    } );
}( document ) );

