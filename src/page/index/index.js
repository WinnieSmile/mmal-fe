/*
* @Author: Winnie
* @Date:   2018-08-20 17:10:58
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-03 22:31:34
*/

require('./index.css');
require('page/common/nav/index.js');  // 将common下的nav-simple下的index.js引入到page下的index下的index.js中
require('page/common/header/index.js'); 
require('util/slider/index.js');      // 引入slider插件js资源
var navSide        = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _mm            = require('util/mm.js');

$(function() { 
	// 渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
    var $slider = $('.banner').unslider({
    	dots: true
    });    
    // 前一张和后一张操作的事件绑定 
    $('.banner-con .banner-arrow').click(function(){
    	var forword = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forword]();
    })
});
