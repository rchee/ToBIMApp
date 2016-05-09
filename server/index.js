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

  socket.on('login', function (data, cb) {
    console.log(JSON.stringify(data, 2));
    cb();
  });

  socket.on('log', function (data) {
    console.log(`[${data.level}]${data.arg}`);
  });

  socket.on('sendMessage', function (msg, cb) {
    console.log(JSON.stringify(msg, 2));
    cb();
  });


  setTimeout(function newMessage() {
    for (var i = 0; i < 10; i++) {
      var send = (Math.random() >= 0.5 );
      var fromId = ((Math.random() * 5) >> 0);
      socket.emit('newMessage', {
        id     : uuid.v1(),
        message: "胡言乱语：" + Mock.Random.cparagraph(1, 4),//消息内容
        date   : Date.now(),//发送时间
        from   : send ? userId : fromId,//,//来自谁（id）
        to     : send ? fromId : userId,//发给谁
      });
    }
    setTimeout(newMessage, 30000);

  }, 100);

});