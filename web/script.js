
var testStart = false; //防止多次请求
var loopTime=100;//正式设置成100

//桌子id 用户名 密码
var loginMsg = {
    deskid: 4,
    player: "hehe",
    password: "4sbg9s",
    token:""//登录成功后存到这里
}

/**
* 请求地址
*/
var url_login = "/login";//登陆接口
var url_reconnection = "/reconnection";//(重连,不用客户端调用，交给node)获取所有用户当前牌局开局时或当前的信息
var url_betting = "/betting";//下注操作
var url_getmsg = "/getmsg"; //获取消息
var url_showdown = "/showdown"//摊牌操作（选择3张公共牌）
var url_getuserinfo = "/getuserinfo"//获取当前用户信息


try{
	//开始游戏，先进行登录操作
    $("#gamestar").addEventListener("click",function (e) {
        if (testStart) return ;
        testStart = true ;
       var btn=this;

        login(function (data) {
        	var d=JSON.parse(data);
            btn.innerHTML = "登录成功，开始轮询消息...";
            console.log("登录成功，token："+d.token);
            loginMsg.token=d.token;
            //开始轮询消息
			loop();
        })

    });


}
catch(e){}

/**
* 发送测试数据
* @param url 	请求地址
* @param callback  回调函数
*/
function sendDataOnce (url,params,callback) {
	post(url,params,callback);
}
function  login(callback) {
    post(url_login,loginMsg,callback);
}
/*
消息轮询
*/
function  loop() {
    /**
     * 轮询的回调函数
     * @param e 	请求返回的数据
     */
    function pollingCallback (d) {
    	if(d) {
            var data = JSON.parse(d);
            if (data.msgid) {
                opera.play(data)
            } else {
                // log("没有新消息")
            }
        }
    };
    //进行轮询，间隔时间为100s,
    setInterval(sendDataOnce,loopTime,url_getmsg,{deskid:loginMsg.deskid,token:loginMsg.token,count:1},pollingCallback);

}
//全局异常捕获
window.onerror = function () {
    // 重连
    if(loginMsg.token=="") {
        login(function (data) {
            var d = JSON.parse(data);
            console.log("重连登录成功，token：" + d.token);
            loginMsg.token = d.token;
            //开始轮询消息
            loop();
        })
    }else{
        loop();
	}
};

//存储类
var save={
	upMoney:0
}
var ai = 0

//操作出牌下注类
var opera={
	//出牌
    play:function (data) {
		if(data){
			console.log(data)
            var curObj=JSON.parse( data.MsgObj);

            var msgid= data.msgid;
			//用户状态
			if(msgid==1) {
				//需要下注
                var status=curObj.users_info[0].user_status;
				console.log(curObj.users_info[0]);
				if(status==2 && curObj.users_info[0].user==loginMsg.player) {

					var curHightPrice=0;
					opera.getUserInfo(function (d) {
						var o=JSON.parse(d).users_info;
						// var temp=0;
						for(var i=0;i<o.length;i++){
                            curHightPrice=o[i].wager > curHightPrice ? o[i].wager : curHightPrice;
						}
                        log("当前最高下注："+curHightPrice);
					//TODO
                    //     剩余金额:curObj.users_info[0].money
                    //      已投金额:curObj.users_info[0].wager
                    var restMoney = curObj.users_info[0].money,
                    	betMoney = ai.howMuchBet(1, 0, curHightPrice,  restMoney),
						type=0,
						httpBetMoney = 0;
                    console.log('---------------------------'+curHightPrice)
                    console.log('---------------------------'+restMoney)
                    console.log('---------------------------'+betMoney)
 //                        1: 小盲注，系统默认下
 //                        2: 大盲注，系统默认下
 //                        3: 下注，
 //                        4: 跟注，money=0，系统按你跟最大的投注额的差额进行跟注，出现以下一种或多  种错误，记录操作错误次数加1
 //                        5：加注，money>=100,出现以下一种或多种错误，记录操作错误次数加1
 //                        6：allin，money=0，把手头上筹码全下
 //                        7：看牌/让牌，money=0,出现以下一种或多种错误，记录操作错误次数加1
                        // 8：弃牌, money=0

                        if(betMoney == 0) {
                        type = 8;
                        httpBetMoney =0;
                    }else if(betMoney =='allin'){
						type = 6;
                        httpBetMoney = 0
					}else if(betMoney == curHightPrice){
                    	type = 4;
                    	httpBetMoney = 0;
					}else if(betMoney > curHightPrice){
						type = 3;
						httpBetMoney = betMoney ;
					}
					console.log('---------------------------'+type)
					console.log('---------------------------'+httpBetMoney)
                    console.log('---------------------------begain')
                    console.log(ai.diPai)
                    console.log(ai.fanPai)
                    console.log(ai.zhuanPai)
                    console.log(ai.hePai)
                    console.log('---------------------------end')
					opera.betting(type, httpBetMoney);
                    });
                }
            }
            // 2: 牌局状态
            else if(msgid==2){
                var status=curObj.game_status;
                //摊牌
                if(status==7){
                    console.log('-----------摊牌----------------')
                    console.log(ai.initChuPai())
                    console.log(ai.chuPai)
                    opera.showdown(ai.chuPai);
                }
            }
            // 3: 发底牌
            else if(msgid==3){
				ai = new Ai(['aaa', 'bbb', 'ccc'])
				ai.initDiPai(JSON.parse(data.MsgObj).cards);
				// console.log()
				var hua = ["","♦","♣","♥","♠"]
                $("#dipai").innerHTML= hua[ai.diPai[0].huase] +""+ ai.diPai[0].value +",\r\n"+ hua[ai.diPai[1].huase] +""+ ai.diPai[1].value ;
                // console.log("底牌："+ JSON.parse(data.MsgObj).cards);
               //取出并记录底牌
            }
            // 4: 玩家执行了下注操作
			else if(msgid==4){
                //获取上家下注金额MsgObj.money
                // save.upMoney = JSON.parse(data.MsgObj).money == 0 ? save.upMoney : JSON.parse(data.MsgObj).money
                // console.log("上家下注金额："+ JSON.parse(data.MsgObj).money);
			}
            // 5：发公共牌（翻牌，转牌，河牌）
            else if(msgid==5){
                //取出并记录公共牌
                var fan_zhuan_he_type = JSON.parse(data.MsgObj).public_cards_type;
                if(fan_zhuan_he_type == 1){
                	var fanPai = JSON.parse(data.MsgObj).cards;
                	console.log('----------ai.initFanPai-------')
					ai.initFanPai(fanPai)
				}else if(fan_zhuan_he_type ==2){
                    var zhuanPai = JSON.parse(data.MsgObj).cards;
                    console.log('----------ai.initZhuanPai-------')
                    ai.initZhuanPai(zhuanPai)
				}else if(fan_zhuan_he_type ==3){
                    var hePai = JSON.parse(data.MsgObj).cards;
                    console.log('----------ai.initHePai-------')
                    ai.initHePai(hePai)
				}
            }
            // 6：牌局结果
            else if(msgid==6){
                ai = null
				opera.reset();
            }

		}
    },
	//下注
    betting:function (type,money) {
        post(url_betting,{deskid:loginMsg.deskid,token:loginMsg.token,type:type,money:money},function (d) {
			console.log(d);
        });
    },
	//摊牌
    showdown:function (array) {
        post(url_showdown,{deskid:loginMsg.deskid,token:loginMsg.token,card1:array[0],card2:array[1],card3:array[2]},function (d) {
            console.log(d);
        });
    },
	//完成一局
	reset:function () {
	   // 重置信息
    },
	//获取用户开局或者当前信息
	getUserInfo:function(callback){
        post(url_getuserinfo,{deskid:loginMsg.deskid,type:1},callback);
	}

}