var express = require('express');
var bodyParser = require('body-parser')

var routers = require('./routers');

var app = express();

app.use(express.static(__dirname + '/web'));  
app.use(bodyParser.urlencoded({ extended: false }));

//普通轮询
// app.post('/polling', routers.polling);

//长轮询获取消息
app.post('/getmsg', routers.getmsg);

//长轮询获取消息
app.post('/login', routers.login);
//下注
app.post('/betting', routers.betting);
//摊牌
app.post('/showdown', routers.showdown);


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

	