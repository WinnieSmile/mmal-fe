/*
* @Author: Winnie
* @Date:   2018-08-28 11:21:32
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-28 21:22:35
*/

require('./index.css');
require('page/common/nav/index.js');  //将common下的nav-simple下的index.js引入到page下的index下的index.js中
require('page/common/header/index.js'); 
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

// page 逻辑部分
//提供init()方法
var page = {
	init: function () {
		this.onLoad();  //调用this.bindEvent()即可初始化, 然后绑定一些信息
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name: 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	}
	
};
//在jquery【ready】的时候调用init方法
$(function(){
	page.init();
});
