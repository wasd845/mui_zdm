const Host = "http://v2.api.haodanku.com"
var api = {

	//全部分类
	getCategory: function(callback) {
		getJSON(Host + "/super_classify/apikey/zhangdama", callback)
	},

	//热搜关键词
	getHotkey: function(callback) {
		let url = Host + "/hot_key/apikey/zhangdama"
		console.log(url)
		getJSON(url, callback)
	},

	//商品列表
	getGoods: function(params, callback) {
		let url = Host + "/itemlist/apikey/zhangdama/nav/{nav}/cid/{cid}/back/{back}/min_id/{min_id}"
		url = url.Format(params)
		console.log(url)
		getJSON(url, callback)
	},

	//top100
	getTopGoods: function(callback) {
		let url = Host + "/itemlist/apikey/zhangdama/sort/11/cid/0/back/100/min_id/1"
		console.log(url)
		getJSON(url, callback)
	},

	//商品列表
	getCategoryGoods: function(params, callback) {
		let url = Host + "/itemlist/apikey/zhangdama/back/{back}/min_id/{min_id}/cid/{cid}"
		if(params['keyword']) {
			url = Host + "/get_keyword_items/apikey/zhangdama/back/{back}/min_id/{min_id}/cid/{cid}/keyword/{keyword}"
		}
		url = url.Format(params)
		console.log(url)
		getJSON(url, callback)
	},

	//专题列表（用于首页banner）
	getSubject: function(callback) {
		let url = Host + "/get_subject/apikey/zhangdama"
		getJSON(url, callback)
	},

	//商品详情
	getDetail: function(itemid, callback) {
		let url = Host + "/item_detail/apikey/zhangdama/itemid/" + itemid
		getJSON(url, callback)
	},

	//淘宝详情
//	getTbDetail: function(itemid, callback) {
//		let url = "https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.9/?data={item_num_id:%22ITEMID%22}&type=json"
//		url = url.replace("ITEMID", itemid)
//		getJSON(url, callback)
//	},

	getTbDetail: function(itemid, callback) {
		let url = "http://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data={id:%22ITEMID%22}&tdsourcetag=s_pctim_aiomsg&qq-pf-to=pcqq.group"
		url = url.replace("ITEMID", itemid)
		getJSON(url, callback)
	},

	//猜你喜欢（用于详情）
	getSimilar: function(itemid, callback) {
		let url = Host + "/get_similar_info/apikey/zhangdama/itemid/" + itemid
		getJSON(url, callback)
	},

	//生成高佣链接
	getGaoyong: function(itemid, callback) {
		let params = {
			itemid: itemid,
			pid: "mm_120569105_41910684_193288206",
			apikey: "zhangdama"
		}
		let url = Host + "/ratesurl"
		postRequest(url, params, callback)
	},

	//超级搜索
	//min_id
	//tb_p 第一次为1 后续来源于上次获取后的数据的tb_p值
	superSearch: function(params, callback) {
		let url = Host + "/supersearch/apikey/zhangdama/keyword/{keyword}/back/{back}/min_id/{min_id}/tb_p/{tb_p}"
		url = url.Format(params)
		getJSON(url, callback)
	},

	//达人说
	getTalent: function(callback) {
		let url = Host + "/talent_info/apikey/zhangdama"
		getJSON(url, callback)
	},

	//达人说 文章
	getTalentArt: function(id, callback) {
		let url = Host + "/talent_article/apikey/zhangdama/id/" + id
		console.log(url)
		getJSON(url, callback)
	},

	//筛选商品接口
	getColumn: function(params, callback) {
		let url = Host + "/column/apikey/zhangdama/type/{type}/back/{back}/min_id/{min_id}"
		url = url.Format(params)
		console.log(url)
		getJSON(url, callback)
	},

	//top100
	getTop100: function(callback) {
		let url = Host + "/itemlist/apikey/zhangdama/nav/3/cid/0/back/100/min_id/1/sort/9"
		console.log(url)
		getJSON(url, callback)
	},
	//快抢商品
	getFastbuy: function(hour, callback) {
		let url = "http://v2.api.haodanku.com/fastbuy/apikey/zhangdama/hour_type/" + hour + "/min_id/1"
		console.log(url)
		getJSON(url, callback)
	},
	//生成淘口令
	getTkl: function(quanUrl, callback) {
		let url = "http://45.78.20.252:8080/mktkl"
		postRequest(url, {
			quanUrl: quanUrl
		}, callback, "")
	},
	//短网址
	getShortUrl(longUrl, callback) {
		let apiUrl = "http://dwz.cn/admin/create"
		postRequest(apiUrl, {
			url: longUrl
		}, callback,"application/json")
	},
	//九块九
	getNineGoods(min_id,callback){
		let url="http://v2.api.haodanku.com/column/apikey/zhangdama/type/2/back/50/min_id/"+min_id
		getJSON(url,callback)
	},
	//聚划算
	getJuGoods(min_id,callback){
		let url="http://v2.api.haodanku.com/column/apikey/zhangdama/type/4/back/50/min_id/"+min_id
		getJSON(url,callback)
	},
	//专题商品列表
	getSubjectGoods(sid,callback){
		let url="http://v2.api.haodanku.com/get_subject_item/apikey/zhangdama/id/"+sid
		getJSON(url,callback)
	}

}

/*自定义字符串格式化*/
String.prototype.Format = function(args) {
	/*this代表要调用Format方法的字符串*/
	/*replace的第一个参数为正则表达式，g表示处理匹配到的所有字符串，在js中使用//包起来*/
	/*replace的第二个参数为匹配字符串的处理，k1匹配结果包含{}，k2只保留{}内的内容*/
	var temp = this.replace(/\{(\w+)\}/g, function(k1, k2) {
		/*replace将匹配到的k2用参数args替换后赋给新变量temp*/
		return args[k2];
	});
	/*自定义方法Format将格式化后的字符串返回*/
	return temp;
};

function getJSON(url, callback) {
	if(window.plus) {
		plus.nativeUI.showWaiting()
	}
	mui.ajax(url, {
		dataType: 'json',
		type: 'get',
		timeout: 5000,
		success: function(data) {
			callback(data)

			if(window.plus) {
				plus.nativeUI.closeWaiting()
			}
		},
		error: function(xhr, type, errorThrown) {
			callback({
				code: -1
			})

			if(window.plus) {
				plus.nativeUI.closeWaiting()
			}
		}
	});
}

function postRequest(url, params, callback, contentType) {

	mui.ajax(url, {
		type: "post",
		dataType: 'json',
		data: params,
		timeout: 5000,
		contentType: contentType || 'application/x-www-form-urlencoded',
		success: function(data) {
			callback(data)
		},
		error: function(xhr, type, errorThrown) {
			callback({
				code: -1
			})
		}
	});
}