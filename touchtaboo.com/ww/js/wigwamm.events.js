"use strict";

var WW = WW || {};
WW.events = WW.events || {};

(function (self) {

    $(document).on('click touchstart', '.fav', function () {
        WW.options.favMenu ? $('.fav-menu').hide() : $('.fav-menu').show();
        WW.options.favMenu = !WW.options.favMenu;
    });

    $(window).resize(function () {
        WW.setRemValue();
        WW.options.windowWidth = $(window).width();
        WW.options.windowHeight = $(window).height();
        WW.renderImages();
        WW.positionScreen();
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode == 39) {
            ++WW.options.currentX;
        }
        if (e.keyCode == 37) {
            --WW.options.currentX;
        }
        if (e.keyCode == 38) {
            --WW.options.currentY;
        }
        if (e.keyCode == 40) {
            ++WW.options.currentY;
        }

        WW.positionScreen();

        //return false;
    });

    $(document).on('click touchstart', '[data-prop-id]', function () {
        WW.options.currentX = $(this).attr('data-prop-id');
        WW.positionScreen();
    });


})(WW.events);

