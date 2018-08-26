/*
* @Author: Winnie
* @Date:   2018-08-25 19:38:19
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-25 22:38:04
*/
require('./index.css');
var _mm            = require('util/mm.js');
var templateIndex  = require('./index.string');

// 侧边导航
var navSide = {
	option : {
		name : '',
		navList : [
			{name : 'user-center', desc : '个人中心', href: './user-center.html'},
			{name : 'order-list',  desc : '我的订单', href: './order-list.html'},
			{name : 'pass-update', desc : '修改密码', href: './pass-update.html'},
			{name : 'about', desc : '关于mmal', href: './about.html'}
		]
	},
	init : function(option){
		// 合并 option 选项
		$.extend(this.option, option);
		this.renderNav();
	},
	// 渲染导航菜单
	renderNav : function(){
		// 计算active数据
		for (var i = 0, iLength = this.option.navList.length; i < iLength; i++){
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;  //加标记位
			} 
		};
		// 渲染list数据
		var navHtml = _mm.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		//把html放入容器中  (利用选择器)
		$('.nav-side').html(navHtml);

	}	
};
module.exports = navSide;