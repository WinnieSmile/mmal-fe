/*
* @Author: Winnie
* @Date:   2018-08-29 12:10:53
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-29 19:32:22
*/
require('./index.css');
require('page/common/nav/index.js');  //将common下的nav-simple下的index.js引入到page下的index下的index.js中
require('page/common/header/index.js'); 
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _user         = require('service/user-service.js');


// page 逻辑部分
//提供init()方法
var page = {
	init: function () {
		this.onLoad();  //调用this.bindEvent()即可初始化, 然后绑定一些信息
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name: 'user-pass-update'
		});
		
	},
	bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())              
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户密码
                _user.updatePassword({
                	passwordOld : userInfo.password,  //var将password定义在userInfo中，记得调用userInfo
                	passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
	
	// 验证字段信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		
		//验证原密码是否为空
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		//验证新密码长度
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = '密码长度不得少于6位';
			return result;
		}
	
		//验证两次输入的密码是否一致
		if (formData.passwordNew !== formData.passwordConfirm) {  //记得调用formData
			result.msg = '两次输入的密码不一致';
			return result;
		}
		
		// 通过验证，返回正确提示
		result.status  = true;
		result.msg     = '验证通过';
		return result;
	}
	
};
//在jquery【ready】的时候调用init方法
$(function(){
	page.init();
});
