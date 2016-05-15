var app = require('http').createServer(handler).listen(8080);
var io = require('socket.io')(app)
var Mock = require('mockjs');

var uuid = require('uuid');

//非常简单的 handler
function handler(req, res) {
  res.writeHead(404);
  res.end("Not found");
}

console.log("server start.");

io.on('connection', function (socket) {

  var userId = '';
  var loginKey = '';

  socket.on('login', function (data, cb) {
    console.log(JSON.stringify(data, 2));
    userId = uuid.v4();
    loginKey = uuid.v4();
    cb({
      userId  : userId,
      loginKey: loginKey,
      state   : 'success'
    });
  });

  socket.on('log', function (data) {
    console.log(`[${data.level}]${data.arg}`);
  });

  socket.on('sendMessage', function (msg, cb) {
    if (loginKey == '') {
      socket.disconnect();
      return;
    }
    console.log(JSON.stringify(msg, 2));
    cb();
  });

  //用户名
  socket.on('getUserById', function (userId, cb) {
    if (loginKey == '') {
      socket.disconnect();
      return;
    }
    console.log(JSON.stringify(userId, 2));

    if (!userId.length) {//todo is array
      userId = [userId];
    }

    cb(userId.map(function (index, userId) {
      return {
        userId,
        name: Mock.Random.cname()
      }
    }));
  });

  setTimeout(function newMessage() {
    setTimeout(newMessage, 3000);
    if (userId == '')return;
    for (var i = 0; i < 5; i++) {
      var send = false;
      var fromId = ((Math.random() * 5) >> 0);
      socket.emit('newMessage', {
        id     : uuid.v1(),
        message: "测试：" + Mock.Random.cparagraph(1, 4),//消息内容
        date   : Date.now(),//发送时间
        from   : send ? userId : fromId,//,//来自谁（id）
        to     : send ? fromId : userId,//发给谁
      });
    }
  }, 100);

});