/*
* @Author: Winnie
* @Date:   2018-08-20 17:10:58
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-25 22:42:43
*/

require('page/common/nav/index.js');  //将common下的nav-simple下的index.js引入到page下的index下的index.js中
require('page/common/header/index.js'); 
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

navSide.init({
	name : 'user-center'
});