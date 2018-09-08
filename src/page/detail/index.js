/*
* @Author: Winnie
* @Date:   2018-09-06 17:29:24
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-08 21:17:59
*/

// 商品详情页的页面逻辑：通过url拿到productid, 然后通过productid拿到商品详细信息, 最后把商品详细信息展现出来, 在浏览完商品详细信息之后, 加购物车功能：选择商品数量，点击加入购物车[请求接口], 把商品加入购物车以后跳到提示加入购物车成功的页面

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');  //商品
var _cart           = require('service/cart-service.js');     //购物车
var templateIndex   = require('./index.string');

var page = {
    data : {
            productId         : _mm.getUrlParam('productId') || '',       
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	// 如果没有传productId, 自动跳回首页
        if (!this.data.productId) {
        	_mm.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览 【鼠标放在缩略图上，在大图上会显示预览出来】  jquery上不能使用onhover,只能使用onmouseover、onmouseleave、onmouseenter属性
        $(document).on('mouseenter','.p-img-item', function(){
        	var imageUrl = $(this).find('.p-img').attr('src');
        	$('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click','.p-count-btn', function(){
        	var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
        		$pCount     = $('.p-count'),
        		currCount   = parseInt($pCount.val()),
        		minCount    = 1,
        		maxCount    = _this.data.detailInfo.stock || 1;
        	if (type === 'plus') {
        		$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
        	}
        	else if (type === 'minus') {
        		$pCount.val(currCount > minCount ? currCount - 1 : minCount);
        	}

        });
        // 加入购物车
        $(document).on('click','.cart-add', function(){
        	_cart.addToCart({
        		productId  : _this.data.productId,
        		count      : $('.p-count').val()
        	}, function(res){
        		window.location.href = './result.html?type=cart-add';
        	}, function(errMsg){
        		_mm.errorTips(errMsg);
        	});
        });
        
    },
 
    // 加载商品详情的数据
    loadDetail : function(){
        var _this       = this,
        	html        = '',
        	$pageWrap   = $('.page-wrap');
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            // 做html的render
        	html = _mm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },
      // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');    // split()函数: 将字符串分割成数组; join()函数: 将数组中的每个元素以分隔符连城一个长字符串
    }
    
};
$(function(){
    page.init();
})