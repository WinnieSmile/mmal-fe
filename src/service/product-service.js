/*
* @Author: Winnie
* @Date:   2018-08-31 23:00:58
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-08 10:09:46
*/

var _mm = require('util/mm.js');

var _product = {
   
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
   
}
module.exports = _product;