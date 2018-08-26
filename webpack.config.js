/*
* @Author: Winnie
* @Date:   2018-08-20 16:14:45
* @Last Modified by:   Winnie
* @Last Modified time: 2018-08-25 23:07:18
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量的配置: dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);    //区分是线上online 还是 开发环境dev

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
	return {
		template : './src/view/' + name + '.html',    //html本身的模板
		filename : 'view/' + name + '.html',
		title    : title,
		inject   : true,
		hash     : true,
		chunks   : ['common', name]
	};
};

// webpack config
var config = {
	entry: {
		'common'     : ['./src/page/common/index.js'],
		'index'      : ['./src/page/index/index.js'],
		'login'      : ['./src/page/login/index.js'],
		'result'     : ['./src/page/result/index.js']
	},
	output:{
		path:'./dist',   //存放文件时的路径,最终生成文件的目录
		publicPath:'/dist',   //访问文件时的路径
		filename:'js/[name].js'
	},
	externals : {
		'jquery' : 'window.jQuery'
	},
	module: {
	    loaders: [
	    	{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
	    	{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader'}, 
	    	{ test: /\.string$/, loader: 'html-loader'} 
	    ]
    },
	
	
    resolve : {  //给页面配别名,省去调用页面使用../../util的麻烦
    	alias : {
    		util            : __dirname + '/src/util',
    		page            : __dirname + '/src/page',
    		service         : __dirname + '/src/service',
    		image           : __dirname + '/src/image',
    		node_modules    : __dirname + '/node_modules'   //字体库文件: node_modules/font-awesome/css/font-awesome.min.css
    	}
    },

    

	plugins : [
		//独立通用模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename : 'js/base.js'
		}),
		//把css单独打包到文件里
		new ExtractTextPlugin("css/[name].css"),
		//html模板的处理
		new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
		//新new一个login文件页面(和上方的index文件页面一样)
		new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
		new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
			
	]
};

if ('dev' === WEBPACK_ENV) {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
