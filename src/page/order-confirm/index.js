/*
* @Author: Winnie
* @Date:   2018-09-10 16:27:59
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-11 21:47:49
*/

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm               = require('util/mm.js');
var _order            = require('service/order-service.js');     //购物车
var _address          = require('service/address-service.js');
var templateAddress   = require('./address-list.string');
var templateProduct   = require('./product-list.string');
var addressModal      = require('./address-Modal.js');   //引入address-Modal.js文件

var page = {
    data : {
       selectedAddressId : null     
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){   	
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        // 地址的选择 【选中会出现红色虚线边框】
        $(document).on('click', '.address-item', function(){
        	$(this).addClass('active')
        		.siblings('.address-item').removeClass('active');
        	_this.data.selectedAddressId = $(this).data('id');  // 在选中地址状态时，记住该地址的id
        }); 
        // 订单的提交
        $(document).on('click', '.order-submit', function(){
        	var shippingId = _this.data.selectedAddressId;  //先判断addressId是否存在，shippingId与addressId是一个意思，两个不同单词，shappingId是接口中需要的字段
        	if (shippingId) {
        		_order.createOrder({
        			shippingId : shippingId
        		}, function(res){
        			window.location.href = './payment.html?orderNumber=' + res.orderNo;
        		}, function(errMsg){
        			_mm.errorTips(errMsg)
        		});
        	}else{
        		_mm.errorTips('请选择地址后再提交');
        	}
        });
        // 地址的添加
        $(document).on('click', '.address-add', function(){
            addressModal.show({
                isUpdate : false,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            })
        }); 
        // 地址的编辑  
        $(document).on('click', '.address-update', function(e){
            e.stopPropagation();  // 阻止冒泡，不会向上冒泡，就不会点击
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function(res){
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function(){
                        _this.loadAddressList();
                    }
                })
            }, function(errMsg){
               _mm.errorTips(errMsg); 
            });            
        });
        // 地址的删除
        $(document).on('click', '.address-delete', function(e){
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除该地址？')) {
                _address.deleteAddress(id, function(){
                    _this.loadAddressList();
                }, function(){
                    _mm.errorTips(errMsg);
                });
            }
        }); 
    },
 
    // 加载地址列表
    loadAddressList : function(){
        var _this       = this;
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表	
        _address.getAddressList(function(res){
            _this.addressFilter(res);
        	var addressListHtml = _mm.renderHtml(templateAddress, res);  //别忘了加这句话
        	$('.address-con').html(addressListHtml);
        }, function(errMsg){
        	$('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })        
    },
    //处理地址列表中选中状态
    addressFilter :function(data){
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag  = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;    //标记位
                    selectedAddressIdFlag     = true;    //标记位，表示该地址是有用的
                }
            };
            // 如果以前选中的地址不在列表里，将其删除
            if (!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
    // 加载商品清单
    loadProductList : function(){
        var _this       = this;
        $('.product-con').html('<div class="loading"></div>');      // 在进入购物车列表页面时，有个loading图标
        // 获取商品列表	
        _order.getProductList(function(res){
        	_this.productListHtml = _mm.renderHtml(templateProduct, res);
        	var productListHtml = _mm.renderHtml(templateProduct, res);  //别忘了加这句话
        	$('.product-con').html(productListHtml);
        }, function(errMsg){
        	$('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        })        
    }
    
};
$(function(){
    page.init();
})