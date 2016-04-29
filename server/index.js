var app = require('http').createServer(handler).listen(8080);
var io = require('socket.io')(app);

var uuid = 1;
//非常简单的 handler
function handler(req, res) {
  res.writeHead(404);
  res.end("Not found");
}

console.log("server start.");

io.on('connection', function (socket) {

  socket.on('log', function (data) {
    console.log(`[${data.level}]${data.arg}`);
  });

  setTimeout(function () {

    for (var i = 0; i < 10; i++) {
      socket.emit('newMessage', {
        id     : uuid++,
        message: "Message" + (i + 1),//消息内容
        date   : 1,//发送时间
        from   : ((Math.random() * 5) >> 0),//来自谁（id）
        to     : '000',//发给谁
      });
    }


  }, 100);

});