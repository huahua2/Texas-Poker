
var testStart = false; //防止多次请求
var msgid=0; //对消息请求进行标记识别
var loopTime=3000;//正式设置成100

//桌子id 用户名 密码
var loginMsg = {
    deskid: 1,
    player: "hehe",
    password: "123",
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


try{
	//开始游戏，先进行登录操作
    $("#gamestar").addEventListener("click",function (e) {
        if (testStart) return ;
        testStart = true ;
        this.innerHTML = "polling already start";

        login(function (data) {
        	var d=JSON.parse(data);
			console.log(d.msg);
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
    function pollingCallback (e) {
        log(JSON.parse(e)[0].classurl)
    };

    //进行轮询，间隔时间为100s,
    setInterval(sendDataOnce,loopTime,url_getmsg,{deskid:loginMsg.deskid,token:loginMsg.token,count:1,msgid:(msgid+1)},pollingCallback);

}

