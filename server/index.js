var app = require('http').createServer(handler).listen(8080);
var io = require('socket.io')(app)
var Mock = require('mockjs');

var uuid = require('uuid');

var randomUserCount = 20;

var userIdList = [];
for (var i = 0; i < randomUserCount; i++) {
  userIdList.push(uuid.v4());
}

//非常简单的 handler
function handler(req, res) {
  res.writeHead(404);
  res.end("Not found");
}

console.log("server start.");

io.on('connection', function (socket) {

  console.log('someone connected.');

  var userId = '';
  var loginKey = '';

  function loginCheck() {
    if (loginKey == '') {
      socket.emit('logout', '登录态检验失败。');
      // socket.disconnect();
      console.log('login fail,log it out.');
      return false;
    } else {
      return true;
    }
  }

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
    if (!loginCheck()) return;

    console.log(JSON.stringify(msg, 2));
    cb();
  });

  //用户名
  socket.on('getUserById', function (userId, cb) {
    if (!loginCheck()) return;

    console.log(JSON.stringify(userId, 2));

    if (!userId.length) {//todo is array
      userId = [userId];
    }
    var result = userId.map(function (userId) {
      return {
        userId,
        name: Mock.Random.cname()
      }
    });
    console.log('getUserById', JSON.stringify(result, 2));

    cb(result);
  });

  setTimeout(function newMessage() {
    setTimeout(newMessage, Math.random() * 10 * 1000 + 1000);
    if (userId == '')return;
    for (var i = 0; i < 1; i++) {
      var send = false;
      var fromId = userIdList[((Math.random() * randomUserCount) >> 0)];
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