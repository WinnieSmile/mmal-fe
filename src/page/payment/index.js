/*
* @Author: Winnie
* @Date:   2018-09-13 16:11:47
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-13 17:11:05
*/

require('./index.css');
require('page/common/nav/index.js');  //将common下的nav-simple下的index.js引入到page下的index下的index.js中
require('page/common/header/index.js'); 
var _mm           = require('util/mm.js');
var _payment        = require('service/payment-service.js');
var templateIndex = require('./index.string');

// page 逻辑部分
//提供init()方法
var page = {
	data: {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init: function () {
		this.onLoad(); 	
	},
	onLoad : function(){
		// 加载detail数据
		this.loadPaymentInfo();				
	},	
	// 加载订单列表
	loadPaymentInfo: function(){
		var _this            = this,
			paymentHtml      = '',
			$pageWrap        = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		//接口的请求
		_payment.getPaymentInfo(this.data.orderNumber, function(res){			
			// 渲染html
			paymentHtml = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(paymentHtml);
			//调用 实时监听订单状态 函数
			_this.listenOrderStatus();
			
		}, function(errMsg){
			$pageWrap.html('<p class="err-tip">' + errMsg + '</p>')
		});
	},
	// 实时监听订单状态 [做法：轮询; 先把this缓存住]
	listenOrderStatus : function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber, function(){
				if (res == true) {
					//当支付成功后, 页面跳转到统一的result页; 再加一个跳转链接: 把支付成功的页面跳转到订单详情页
					window.location.href 
						= './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			});
		}, 5e3);
	}
		
};
//在jquery【ready】的时候调用init方法
$(function(){
	page.init();
});
