/**
 * Created by Administrator on 2017/8/7.
 */
require('./index.css');
var __mm  = require('util/tools.js');
var templateIndex = require('./index.string');

var navSide = {
    option : {
        name : '',
        navList : [
            {name:'user-center',desc: '个人中心',href:'./user-center.html'},
            {name:'oder-list',desc: '我的订单',href:'./my-oreder.html'},
            {name:'modify-password',desc: '修改密码',href:'./modify-password.html'},
            {name:'about',desc: '关于mall',href:'./about.html'},
        ],
    },
    init : function (option) {
        $.extend(this.option,option);
         this.renderNav();
    },
    renderNav :function () {

        for(var i= 0,iLength = this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        var navHtml =    __mm.renderHtml(templateIndex,{
            navList : this.option.navList
        });
        $('.nav-side').html(navHtml);


    }
};
module.exports = navSide;