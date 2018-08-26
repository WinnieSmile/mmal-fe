/*
* @Author: Winnie
* @Date:   2018-08-25 22:51:33
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-26 13:00:30
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type        =  _mm.getUrlParam('type') || 'default',
		$element    = $('.' + type + '-success');
	//显示对应的提示元素
	$element.show();
})
