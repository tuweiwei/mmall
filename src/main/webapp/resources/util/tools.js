/**
 * Created by Administrator on 2017/8/1.
 */
var Hogan = require('hogan.js');
var conf = {

    serverHost : ''
};
var m = {
   doLogin: function () {
       window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href);
   } ,

    //获取服务器地址
    getServerUrl : function (path) {
        return conf.serverHost+path;
    },

    //获取参数
    getUrlParam : function (name) {
        var reg = new RegExp('(^|$)'+ name + '=([^&]*)(&|$)');
        var res = window.location.search.substr(1).match(reg);
        return res ? decodeURIComponent(res[2]):null;
    },

    renderHtml : function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);
            result   = template.render(data);
        return result;
    },

    successTips : function (msg) {
         alert(msg || '操作成功');
    },
    errorTips   :function (msg) {
         alert(msg || '操作失败');
    },

    //验证 手机 邮箱 是否为空
    validate : function (value , type) {
       var val = $.trim(value);
       switch(type){
           case 'require':
               return !!val;
               break;
           case 'phone':
               return /^1\d{10}$/.test(value);
               break;
           case 'email':
               return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
               break;
           default:
               break;
       }

    },
    
    goHome : function () {
        window.location.href = './index.html';
    },
    

   request: function (param) {
       var __this = this;
       $.ajax({
           type: param.method || 'get',
           url : param.url || '',
           dataType: param.type || 'json',
           data : param.data,
           success : function (res) {
               if(0 === res.status){
                    typeof  param.success === 'function' && param.success(res.data,res.msg);

               }else if(10 === res.status){
                   __this.doLogin();

               }else if(1 === res.status){
                   typeof  param.success === 'function' && param.error(res.msg);
               }
           },
           error:function (err) {
               typeof  param.success === 'function' && param.error(err.statusText);
           },

       });



    }


};
module.exports = m;