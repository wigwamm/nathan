"use strict";

var WW = WW || {};

(function (self) {

    self.init = function () {
        console.log("something");
        WW.options.init();
        WW.renderImages();
        WW.renderThumbs();
        WW.renderTime();
        WW.positionScreen();
        WW.setRemValue();
        WW.renderMatrix();

        /*
         $('.prop-images').pep({
         cssEaseDuration:100,
         multiplier:1.7,
         rest:function (ev, obj) {
         WW.options.currentX = Math.round((-1 * $(obj.el).position().left) / WW.options.windowWidth);
         WW.options.currentY = Math.round((-1 * $(obj.el).position().top) / WW.options.windowHeight);
         WW.colourMatrix();
         WW.positionScreen();
         }
         });
         */

        $('.prop-images').pep({
            stop:function (ev, obj) {
                WW.options.currentX = Math.round((-1 * $(obj.el).position().left) / WW.options.windowWidth);
                WW.options.currentY = Math.round((-1 * $(obj.el).position().top) / WW.options.windowHeight);
                //WW.renderMatrix();
                WW.colourMatrix();
                WW.positionScreen();
            }
        });
    };

    self.positionScreen = function () {
        WW.options.currentX = (WW.options.currentX < 0) ? 0 : WW.options.currentX;
        WW.options.currentY = (WW.options.currentY < 0) ? 0 : WW.options.currentY;

        WW.options.currentX = (WW.options.currentX <= WW.options.maxX) ? WW.options.currentX : WW.options.maxX;
        WW.options.currentY = (WW.options.currentY <= WW.options.maxY) ? WW.options.currentY : WW.options.maxY;

        $('.prop-images').css({
            'left':'-' + WW.options.currentX * WW.options.windowWidth + 'px',
            'top':'-' + WW.options.currentY * WW.options.windowHeight + 'px'
        });

        $('[data-prop-id]').removeClass('selected');
        $('[data-prop-id=' + WW.options.currentX + ']').addClass('selected');

        WW.renderMatrix();
    };

    self.renderImages = function () {
        $('.prop-images').html('');

        //for each property
        for (var a in WW.data) {
            var z = {};
            z.col = $('<div />', {
                'class':"prop-images-col"
            });

            z.col.css({
                width:WW.options.windowWidth
            });

            //for each image
            for (var b in WW.data[a].images) {
                z.container = $('<div />', {
                    'class':"background-image",
                    'data-property':WW.data[a].id,
                    'data-image':b
                });
                z.container.css({
                    width:WW.options.windowWidth,
                    height:WW.options.windowHeight
                });

                z.image = $('<img />', {
                    'src':WW.data[a].images[b]
                });

                z.container.append(z.image);
                z.col.append(z.container);
            }

            $('.prop-images').append(z.col);
            $('.prop-images').css({
                width:WW.options.windowWidth * (a * 1 + 1)
            });
        }
    };

    self.renderThumbs = function () {
        $('.slider-top').html('');

        //for each property
        for (var a in WW.data) {
            var z = {};

            z.prop = $('<div/>', {
                'class':"prop",
                'data-prop-id':a
            });

            (WW.data[a].fav) ? z.prop.addClass('favourite') : false;

            $('.slider-top').append(z.prop);
        }
    };

    self.renderTime = function () {
        $('.slider-bottom').html('');

        //for each property
        for (var a in WW.data) {
            var z = {};

            z.prop = $('<div/>', {
                'class':"est",
                'data-est-id':a,
                'html':'<i class="icon-reorder"></i> ' + WW.data[a].time
            });

            //(WW.data[a].fav) ? z.prop.addClass('favourite') : false;

            $('.slider-bottom').append(z.prop);
        }
    }

    self.renderMatrix = function () {
        $('.matrix').html('');

        //for each property
        for (var a = 0; a < WW.options.maxY; a++) {
            var z = {};
            var i = 0;

            z.row = $('<div/>', {
                'class':"matrix-row clearfix"
            });

            for (var b = 0; b < WW.options.maxX; b++) {
                z.cell = $('<div/>', {
                    'class':"matrix-cell clearfix",
                    'data-cellX':b,
                    'data-cellY':a
                });
                z.row.append(z.cell);
            }

            $('.matrix').append(z.row);
            $('.matrix').append('<br>');
        }
        WW.colourMatrix();

    }

    self.colourMatrix = function () {
        $('[data-cellY]').removeClass('active').removeClass('current');

        $('[data-cellY=' + WW.options.currentY + ']').addClass('active');
        $('[data-cellX=' + WW.options.currentX + ']').addClass('active');
        $('[data-cellX=' + WW.options.currentX + '][data-cellY=' + WW.options.currentY + ']').addClass('current');
    }

    self.setRemValue = function () {
        var width = $(window).width() / 130;
        var height = $(window).height() / 70;
        var value = (width < height) ? height : width;
        $('html').css('font-size', value + 'px');
    }
})(WW);

$(function () {
    WW.init();
});
