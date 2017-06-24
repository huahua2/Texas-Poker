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
        	// console.log(json)
        if (callback) {
            callback(json);
        }

        // resp.send(json);
    }).catch(function (err) {
        console.log("err", err)
    });

}

var msgid=1;
/**
*	轮询消息
*/
exports.getmsg = function (req, resp) {

    var token=req.body.token;
    var deskid=req.body.deskid;
	var pollingCallback = function (newData) {
		if(newData.msgs) {
            console.log("轮询消息接口MsgID:" + msgid);
            // var data = getRespTpl(req);
            //
            // if (newData) {
            // 	data['data'] = newData;
            // };
            // resp.set('Content-Type', 'text/json');
            var message = newData.msgs[0];
            msgid = message.msg_id;
            var curstatus = "";// 1: 用户状态
            // 2: 牌局状态
            // 3: 发底牌
            // 4: 玩家执行了下注操作
            // 5：发公共牌（翻牌，转牌，河牌）
            // 6：牌局结果

            switch (message.msg_type) {
                case 1:
                    curstatus = "用户状态";
                    break;
                case 2:
                    curstatus = "牌局状态";
                    break;
                case 3:
                    curstatus = "发底牌";
                    break;
                case 4:
                    curstatus = "玩家执行了下注操作";
                    break;
                case 5:
                    curstatus = "发公共牌（翻牌，转牌，河牌）";
                    break;
                case 6:
                    curstatus = "牌局结果";
                    break;

            }
            console.log("桌子ID:" + deskid, "消息ID:" + message.msg_type, "消息名称:" + curstatus);
            console.log((new Buffer(message.msg, 'base64').toString() ));
            console.log("-----------------------------------------------------------------");
            console.log("-----------------------------------------------------------------");
            var obj = new Buffer(message.msg, 'base64').toString();
            var MsgObj = {
                msgid: message.msg_type,
                msgName: curstatus,
                MsgObj: obj
            };
            resp.send(MsgObj);
        }else{
            resp.send(newData);
		}
	}
    var url='http://10.20.221.136/getmsg?deskid='+deskid+'&token='+token+'&msgid='+(msgid+1)+'&count=1&callback=';
    sendRequest(url,pollingCallback);
}

/**
 *	登录
 */
exports.login = function (req, resp) {
    console.log(req.body.deskid);
    var deskid=req.body.deskid;
    var user=req.body.player;
    var pwd=req.body.password;
    var Callback = function (data) {

    	// console.log(data);
        resp.json(data);
    }
    var url='http://10.20.221.136/login?deskid='+deskid+'&user='+user+'&pass='+pwd+'&callback=';
    sendRequest(url,Callback);
}
/**
 *	下注
 */
exports.betting = function (req, resp) {
    console.log(req.body.deskid);
    var deskid=req.body.deskid;
    var token=req.body.token;
    var type=req.body.type;
    var money=req.body.money;
    var Callback = function (data) {

        // console.log(data);
        resp.json(data);
    }
    // http://10.20.221.136/action?deskid=120006&token=08376485079283375742305935202836&type=5&money=2500&callback=
    var url='http://10.20.221.136/action?deskid='+deskid+'&token='+token+'&type='+type+'&money='+money+'&callback=';
    sendRequest(url,Callback);
}

/**
 *	摊牌
 */
exports.showdown = function (req, resp) {
    console.log(req.body.deskid);
    var deskid=req.body.deskid;
    var token=req.body.token;
    var card1=req.body.card1;
    var card2=req.body.card2;
    var card3=req.body.card3;
    var Callback = function (data) {

        // console.log(data);
        resp.json(data);
    }
    // http://10.20.221.136/cards?deskid=120006&token=08376485079283375742305935202836&card1=43&card2=14&card3=29&callback=
    var url='http://10.20.221.136/cards?deskid='+deskid+'&token='+token+'&card1='+card1+'&card2='+card2+'&card3='+card3+'&callback=';
    sendRequest(url,Callback);
}


