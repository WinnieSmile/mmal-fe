/*
* @Author: Winnie
* @Date:   2018-08-22 17:28:21
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-26 17:06:05
*/

//网络请求工具(Ajax请求，服务器地址配置)
//URL路径工具
//模板渲染工具
//字段验证&&通用提示
//统一跳转

var Hogan = require('hogan.js');   //渲染html模板_引进Hogan再require('hogan.js')  方法: 先编译再渲染
var conf = {
    serverHost : ''             //获取服务器地址_引进serverHost
};

// 定义模块化对象
var _mm = {
    // 网络数据请求功能
    request : function(param){
        var _this = this;        //存入mm对象
        $.ajax({
            type        : param.method || 'get',        // 从param中取方法，如果没有默认get方法
            url         : param.url    || '',           // 默认空
            dataType    : param.type   || 'json',       // 数据类型 
            data        : param.data   || '',           // 请求时需要的数据
            // 请求成功时的方法处理
            success     : function(res){
                // 请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 无登录状态，需强制登录
                else if (10 === res.status){
                    _this.doLogin()
                }
                // 请求数据错误
                else if(1 === res.status){
                    typeof param.error=== 'function' && param.error(res.msg);
                }
            },                                          
            error       : function(err){
                typeof param.error=== 'function' && param.error(err.statusText);
            }
        })
    },

    // 获取服务器地址  //注意：path后面的分号;可能会造成bug,如果是bug则删掉分号;
    getServerUrl : function(path){
        return conf.serverHost + path;   // 不在接口请求中直接输入path,而采取这种方法,原因是：当host改变、请求加一些统计参数时，在这里加比较方便
    }, 
    // 获取url参数
    getUrlParam : function(name){
        // happymall.com/product/list?keyword=xxx&page=1
        // 提取keyword步骤：1.截取?后参数；2.按&分开每一组keyword与value
        // 定义正则表达式
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // window的location对象;search得到的是url中query部分(?keyword=xxx&page=1);substr()返回一个从指定位置开始的指定长度的子字符串,设置为1，是为了把url中的?号去掉()
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;        //参数解码：decodeURIComponent()
    },

    // 渲染html模板
    renderHtml : function(htmlTemplate, data){        // 传入模板和数据
    
        var template    = Hogan.compile(htmlTemplate),  //调用 hogan方法
            result      = template.render(data);
        return result;
    },
   
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    
    // 字段的验证，支持非空、手机、邮箱的判断   (将validate单独封装起来,目的之一是为了全栈的标准化)
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证，require表示必须有值
        if('require' === type){
            // 返回boolean值
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            // 1开头的11位数字
            return /^1\d{10}$/.test(value);   //使用正则表达式,来判断手机号是否复合以1开头、接下来是十位数字的格式。是的话则可判断其是手机号
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);  //遇到复杂的正则表达式，在浏览器中搜一下 email 正则
        }
    },

    // 统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);        // 登录完跳回当前页面
    },
    goHome : function(){   //跳转: 跳回主页
        window.location.href = './index.html';  //跳转方法
    }

    
};

// 输出模块化对象
module.exports = _mm;