/*
* @Author: Winnie
* @Date:   2018-09-13 16:43:58
* @Last Modified by:   Winnie
* @Last Modified time: 2018-09-13 17:13:56
*/

var _mm = require('util/mm.js');

var _payment = {

    // 获取支付信息
    getPaymentInfo : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
            	orderNo  : orderNumber    //后端接口用的是orderNo, 前端用的是orderNumber
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取订单状态
    getPaymentStatus : function(orderNumber, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo  : orderNumber   
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _payment;