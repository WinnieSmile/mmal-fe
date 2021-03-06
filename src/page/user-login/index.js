/*
* @Author: Winnie
* @Date:   2018-08-20 17:24:11
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-26 20:52:46
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm   = require('util/mm.js');

// 表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);		
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');		
	}	
};

// page 逻辑部分
//提供init()方法
var page = {
	init: function () {
		this.bindEvent();  //调用this.bindEvent()即可初始化, 然后绑定一些信息
	},
	bindEvent : function(){
		var _this = this;
		// 登录按钮的点击
		$('#submit').click(function(){
			_this.submit();
		});
		// 如果按下回车键, 也进行提交
		$('.user-content').keyup(function(e){
			// keyCode === 13 表示回车键
			if (e.keyCode === 13) {
				_this.submit();
			} 
		});
	},
	//提交表单：此处是伪表单,没有form元素。 字段验证都是在submit中做的
	submit : function(){
		var formData = {
				username : $.trim($('#username').val()),
				password : $.trim($('#password').val())
		    },
			// 表单验证结果
			validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			_user.login(formData, function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg){
				formError.show(errMsg);
			});
		}
		// 验证失败
		else{
			// 错误提示
			formError.show(validateResult.msg);
		}
	},
	// 表单字段的验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg    : ''
		};
		if (!_mm.validate(formData.username,'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password,'require')) {
			result.msg = '密码不能为空';
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
