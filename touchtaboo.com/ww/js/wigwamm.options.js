"use strict";

var WW = WW || {};

WW.options = {
    favMenu:false,
    windowWidth:0,
    windowHeight:0,
    currentX:0,
    currentY:0,
    maxX:0,
    maxY:0,

    init:function () {
        this.favMenu = false;
        this.windowWidth = $(window).width();
        this.windowHeight = $(window).height();
        this.currentX = 0;
        this.currentY = 0;
        this.maxY = 3;
        this.maxX = WW.data.length;
    }

}
;

