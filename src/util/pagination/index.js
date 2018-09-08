/*
* @Author: Winnie
* @Date:   2018-09-05 22:17:10
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-06 17:13:41
*/

require('./index.css');
var _mm                = require('util/mm.js');
var templatePagination = require('./index.string');

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container    : null,
		pageNum      : 1,
		pageRange    : 3,
		onSelectPage : null
	};
	// 事件的处理 (利用事件代理的方式、不能使用事件绑定的方式)
	$(document).on('click', '.pg-item', function(){
		var $this = $(this);
		// 对于active和disabled按钮点击，不做处理
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage === 'function' 
			? _this.option.onSelectPage($this.data('value')) : null;
	});

};

// 渲染分页组件
Pagination.prototype.render = function(userOption){
	// 合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	// 判断容器是否为合法的jQuery对象
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	// 判断是否只有1页
	if (this.option.pages <= 1 ) {
	 	return;
	}

	// 渲染分页内容
	this.option.container.html(this.getPaginationHtml());
}

// 获取分页的html , |上一页| 1 2 3 4 =5= 6|下一页| 5/6
Pagination.prototype.getPaginationHtml = function(){
	var html      = '',
		option    = this.option,
		pageArray = [];
		start     = option.pageNum - option.pageRange > 0
			? option.pageNum - option.pageRange : 1,
		end       = option.pageNum  + option.pageRange < option.pages
			? option.pageNum + option.pageRange : option.pages;
	// 上一页按钮的数据
	pageArray.push({
		name : '上一页',
		value : this.option.prePage,
		disabled : !this.option.hasPreviousPage    // 布尔值
	});
	// 数字按钮的处理
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name : i,
			value : i,
			active : (i === option.pageNum),
			//disabled : !this.option.hasPreviousPage
		});
	};
	// 下一页按钮的数据
	pageArray.push({
		name : '下一页',
		value : this.option.nextPage,
		disabled : !this.option.hasNextPage    // 布尔值
	});
	html = _mm.renderHtml(templatePagination, {
		pageArray : pageArray,
		pageNum   : option.pageNum,
		pages     : option.pages
	});
	return html;
};
module.exports = Pagination;