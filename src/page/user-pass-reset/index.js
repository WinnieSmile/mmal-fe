/*
* @Author: Winnie
* @Date:   2018-08-27 17:46:36
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-25 17:25:45
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
	data : {  //存储用户的用户名密码等数据、暂存
		username   : '',
		question   : '',
		answer     : '',
		token      : ''    //存储的是token 而不是password
	},
	init: function () {
		this.onLoad();  //定义onload方法, 在加载的时候就显示输入用户名,其他步骤是隐藏的
		this.bindEvent();  //调用this.bindEvent()即可初始化, 然后绑定一些信息
	},
	onLoad : function () {
		this.loadStepUsername();      //在onload的时候显示第一步_输入用户名
	},
	bindEvent : function(){
		var _this = this;
		// 输入用户名后下一步按钮的点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());   //如果用户名是空的话，需要添加trim
			//第一步
			// 用户名存在
			if (username) {
				_user.getQuestion(username, function (res) {
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();  //该函数是第二步
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			// 用户名不存在
			else{
				formError.show('请输入用户名');
			}
		});

		// 输入密码提示问题答案中的按钮的点击
		$('#submit-question').click(function(){
			var answer = $.trim(('#answer').val());   //如果用户名是空的话，需要添加trim			
			// 密码提示问题答案存在
			if (answer) {
				//检查密码提示问题答案
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				}, function (res) {
					_this.data.answer = answer;
					_this.data.token  = res;
					_this.loadStepPassword(); 
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			// 密码提示问题答案不存在
			else{
				formError.show('请输入密码提示问题的答案');
			}
		});

		// 输入新密码后的按钮的点击
		$('#submit-password').click(function(){
			var password = $.trim(('#password').val());   //如果用户名是空的话，需要添加trim			
			// 密码不为空
			if (password && password.length >= 6) { //密码长度大于等于6才成功
				//检查密码提示问题答案
				_user.resetPassword({
					username       : _this.data.username,
					passwordNew    : password,
					forgetToken    : _this.data.token   //此处的token是上一步中保存的token
				}, function (res) {
					window.location.href = './result.html?type=pass-reset';  //当输入重置新密码后，跳转到成功页
				}, function(errMsg){
					formError.show(errMsg);
				});
			}
			// 密码为空
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
		
	},
	// 加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();    // id用.  class用#
	},
	// 加载输入密码提示问题答案的一步
	loadStepQuestion : function(){
		//清除错误提示
		formError.hide();
		//做容器的切换
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	// 加载输入password的一步
	loadStepPassword : function(){
		//清除错误提示
		formError.hide();
		//做容器的切换
		$('.step-question').hide()
			.siblings('.step-password').show();
			
	}

};
//在jquery【ready】的时候调用init方法
$(function(){
	page.init();
});
