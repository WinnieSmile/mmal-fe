/*
* @Author: Winnie
* @Date:   2018-09-11 21:55:54
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-12 11:37:48
*/

require('./index.css');
require('page/common/nav/index.js');  //将common下的nav-simple下的index.js引入到page下的index下的index.js中
require('page/common/header/index.js'); 
var navSide       = require('page/common/nav-side/index.js');
var _mm           = require('util/mm.js');
var _order        = require('service/order-service.js');
var Pagination    = require('util/pagination/index.js');
var templateIndex = require('./index.string');

// page 逻辑部分
//提供init()方法
var page = {
	data: {
		listParam : {
			pageNum   : 1,
			pageSize  : 10
		}
	},
	init: function () {
		this.onLoad();  //调用this.bindEvent()即可初始化, 然后绑定一些信息
	},
	onLoad : function(){
		this.loadOrderList();
		//初始化左侧菜单
		navSide.init({
			name: 'order-list'
		});		
	},
	// 加载订单列表
	loadOrderList: function(){
		var _this          = this,
			orderListHtml  = '',
			$listCon       = $('.order-list-con');
		$listCon.html('<div class="loading"></div>');
		//接口的请求
		_order.getOrderList(this.data.listParam, function(res){
			//_this.dataFilter(res);
			// 渲染html
			orderListHtml = _mm.renderHtml(templateIndex, res);
			$listCon.html(orderListHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
			});
		}, function(errMsg){
			$listCon.html('<p class="err-tip">加载订单失败, 请刷新后重试</p>')
		});
	},
	// // 数据的适配   【由于hogon模板支持filter,所以数据的适配可以不用写2】
	// dataFilter : function(data){
	// 	data.isEmpty = !data.list.length;
	// },
	// 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : this.pagination = new Pagination();
        this.pagination.render($.extend({},pageInfo,{
            container : $('.pagination'),
            onSelectPage: function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
        
    } 

	
};
//在jquery【ready】的时候调用init方法
$(function(){
	page.init();
});
