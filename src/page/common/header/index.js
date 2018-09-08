/*
* @Author: Winnie
* @Date:   2018-08-25 15:47:13
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-01 15:49:24
*/

require('./index.css');

var _mm     = require('util/mm.js');
// 通用页面头部
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在，则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);  //选择器：在搜索框中输入搜索词,搜索到内容之后，此时搜索框中显示搜索词(即回填)
		};
	},
	bindEvent : function(){
		var _this = this;
		// 点击搜索按钮以后,做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			// 13是回车键的keyCode
			if (e.keyCode === 13) {
				_this.searchSubmit();
			} 
		});
	},
	//搜索的提交  即跳到list页,把名称传回去,剩下的逻辑在list页面处理
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的时候有keyword,正常跳转到list页
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		}
        // 如果keyword为空，直接返回首页
		else{
			_mm.goHome();
		}
	}
};
header.init();