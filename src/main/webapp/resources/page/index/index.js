/**
 * Created by Administrator on 2017/8/1.
 */
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navside = require('page/common/nav-side/index.js');
var __m = require('util/tools.js');
require('util/slider/index.js');
var templateBanner = require('./banner.string');

require('./index.css');

$(function() {
    // 渲染banner的html
    var bannerHtml  = __m.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider     = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
