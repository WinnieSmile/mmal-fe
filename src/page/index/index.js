/*
* @Author: Winnie
* @Date:   2018-08-20 17:10:58
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-24 16:56:47
*/
var _mm = require('util/mm.js');

console.log(_mm.getUrlParam('test'));







/*


var _mm = require('util/mm.js');

// (3) 测试渲染html模板的方法
var html = '<div>{{data}}</div>';
var html = {
	data : 'test'
}
console.log(_mm.renderHtml(html,data));

//（2）测试获取url参数的方法
console.log(_mm.getUrlParam('test'));

//（1）测试 get请求的方法

_mm.request({
	url: 'https://cloud.botbrain.ai/config/v1/RVCQS9UR56',   //布本的接口列表
	success: function (res) {
		console.log(res);
	},
	error: function (errMsg) {
		console.log(errMsg);
	}	
})

*/