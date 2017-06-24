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
function sendRequest(url,callback) {

    fetch(url).then(function(res) {
            return res.json();

        }).then(function(json) {
        if (callback) {
            callback(json);
        }

        // resp.send(json);
    });

}

/**
*	轮询消息
*/
exports.getmsg = function (req, resp) {
    console.log(req.body.msgid);
    console.log(req.body.token);
	var pollingCallback = function (newData) {
		// var data = getRespTpl(req);
        //
		// if (newData) {
		// 	data['data'] = newData;
		// };
        // resp.set('Content-Type', 'text/json');
        // console.log(newData);
		resp.send(newData);
	}
    var url='https://www.duba.com/dhads?id=yoivicyinywihcoji2tcoxlbacjn&ncategory=5';
    sendRequest(url,pollingCallback);
}

/**
 *	登录
 */
exports.login = function (req, resp) {
    console.log(req.body.deskid);
    var Callback = function (data) {

        resp.json({token:"huahua",msg:"登录成功"});
    }
    var url='https://www.duba.com/dhads?id=yoivicyinywihcoji2tcoxlbacjn&ncategory=5';
    sendRequest(url,Callback);
}

