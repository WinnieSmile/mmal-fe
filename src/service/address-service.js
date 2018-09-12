/*
* @Author: Winnie
* @Date:   2018-09-10 20:10:28
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-11 21:22:08
*/

var _mm = require('util/mm.js');

var _address = {
   
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
            	pageSize : 50,
            	pageNum  : 1   /* 根据接口文档，默认是1,可以不写 */
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建收件人 (地址)
    save : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新收件人（地址）
    update : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除收件人（地址）
    deleteAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息 (选中查看具体地址)
    getAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
   
}
module.exports = _address;