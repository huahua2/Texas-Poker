
var testStart = false; //防止多次请求
var index = 0 ; //对请求进行标记识别

/**
* 请求地址
*/
var url_login = "/login";//登陆接口
var url_reconnection = "/reconnection";//(重连,不用客户端调用，交给node)获取所有用户当前牌局开局时或当前的信息
var url_betting = "/betting";//下注操作
var url_getmsg = "/getmsg"; //获取消息
var url_showdown = "/showdown"//摊牌操作（选择3张公共牌）

/**
* 发送测试数据
* @param url 	请求地址
* @param callback  回调函数
*/
function sendDataOnce (url,callback) {
	post(url,{},callback);
}



$("#gamestar").addEventListener("click",function (e) {
    if (testStart) return ;
    testStart = true ;

    this.innerHTML = "polling already start";

    /**
     * 轮询的回调函数
     * @param e 	请求返回的数据
     */
    function pollingCallback (e) {
        log(e)
    };

    //进行轮询，间隔时间为3s,
    setInterval(sendDataOnce,3000,url_getmsg,pollingCallback);
});