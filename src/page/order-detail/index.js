/*
* @Author: Winnie
* @Date:   2018-09-12 16:06:57
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-12 21:08:21
*/

require('./index.css');
require('page/common/nav/index.js');  //将common下的nav-simple下的index.js引入到page下的index下的index.js中
require('page/common/header/index.js'); 
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');

// page 逻辑部分
//提供init()方法
var page = {
	data: {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init: function () {
		this.onLoad(); 
		this.bindEvent(); 
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});
		// 加载detail数据
		this.loadDetail();				
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.order-cancel', function(){
			if (window.confirm('确实要取消订单?')) {
				_order.cancelOrder(_this.data.orderNumber, function(res){
					_mm.successTips('该订单取消成功');
					_this.loadDetail();
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}			
		});
	},
	// 加载订单列表
	loadDetail: function(){
		var _this            = this,
			orderDetailHtml  = '',
			$content         = $('.content');
		$content.html('<div class="loading"></div>');
		//接口的请求
		_order.getOrderDetail(this.data.orderNumber, function(res){
			_this.dataFilter(res);
			// 渲染html
			orderDetailHtml = _mm.renderHtml(templateIndex, res);
			$content.html(orderDetailHtml);
			
		}, function(errMsg){
			$content.html('<p class="err-tip">' + errMsg + '</p>')
		});
	},
	// 数据的适配
	dataFilter : function(data){
		data.needPay      = data.status ==10;  //10是订单状态，表示提交订单、并且在支付以前
		data.isCancelable = data.status ==10;
	}
		
};
//在jquery【ready】的时候调用init方法
$(function(){
	page.init();
});
