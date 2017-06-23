var fetch = require('node-fetch');


/**
*	获取基本数据
*/
function getRespTpl (req) {
	var tpl = {
		index : req.body.index    
	};
	return tpl;
}

/**
* 模拟检查新数据   
* @param callback   回调函数
*/
function checkNewData (callback) {

    fetch('https://www.duba.com/dhads?id=yoivicyinywihcoji2tcoxlbacjn&ncategory=5')
        .then(function(res) {
            return res.json();

        }).then(function(json) {
        if (callback) {
            callback(json);
        }
        console.log(json);
        // resp.send(json);
    });

}

/**
*	用于处理普通轮询
*/
exports.getmsg = function (req, resp) {

	var pollingCallback = function (newData) {
		// var data = getRespTpl(req);
        //
		// if (newData) {
		// 	data['data'] = newData;
		// };
		resp.send(newData);
	}

	checkNewData(pollingCallback);
}

