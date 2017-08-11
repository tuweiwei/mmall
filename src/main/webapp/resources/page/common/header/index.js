/**
 * Created by Administrator on 2017/8/7.
 */
require('./index.css');

var __mm = require('util/tools.js');
//var __user = require('service/user-service.js');
//var __cart = require('service/cart-service.js');

var header = {
    init : function () {
        this.onLoad();
        this.bindEvent();

    },
    onLoad : function () {
        var keyword = __mm.getUrlParam('keyword');
        if(keyword){
             $('#search-input').val(keyword);
        }
    },
    bindEvent: function () {
        var __this = this;
        $('#search-button').click(function () {
            __this.searchSubmit();
        });
        $('#search-input').keyup(function (event) {
            if(event.keyCode === 13){
                __this.searchSubmit();
            }
        });
    },
    searchSubmit : function () {
        var keyword = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;

        }else {
            __mm.goHome();
        }
    }
};

header.init();