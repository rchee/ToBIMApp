var http = require('http');
var express = require('express');
var app = express();
app.use("/public", express.static(__dirname + '/public'));
var expressApp = http.createServer(app).listen(8080, function () {
  console.log("server start.");
});
var io = require('socket.io')(expressApp);
var Mock = require('mockjs');
var DB_CONN_STR = 'mongodb://localhost:27017/to_b_im';
var Promise = require('bluebird');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Collection = mongodb.Collection;
var ObjectID = mongodb.ObjectID;
var pinyin = require("node-pinyin");

Promise.promisifyAll(Collection.prototype);
Promise.promisifyAll(MongoClient);

var uuid = require('uuid');

var userIdList = [];

function initUserIdList() {
  MongoClient.connect(DB_CONN_STR)
    .then(_db=> {
      return _db.collection("users").find({}).toArray();
    })
    .then(users => {
      userIdList = users.map(user=>user._id);
    })
    .catch(e=>console.error(e))
    .then(()=> console.log(JSON.stringify(userIdList)));
}

initUserIdList();

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
    //TODO 这里为了能在 .then() 中使用 db 而采用了类似全局变量的写法，不知道还有没有更加美观的写法。
    var db;
    MongoClient.connect(DB_CONN_STR)
      .then(function (_db) {
        db = _db;
        return db.collection("users").find({user: data.username, pwd: data.psw}).toArray();
      })
      .then(function (docs) {
        console.log(docs);
        if (docs.length > 0) {
          return docs[0];
        } else {
          return Promise.reject(new Error("用户名密码错误"));
        }
      })
      .then(function (user) {
        loginKey = uuid.v4();
        userId = user._id;
        return db.collection('users').update(user, {$set: {loginKey: loginKey}});
      })
      .then(function () {
        cb({
          userId,
          loginKey,
          state: 'success'
        });
      })
      .catch(function (err) {
        console.error(err);
        cb({
          msg  : err.message,
          state: 'fail'
        });
      })
  });

  socket.on('reLogin', function (data, cb) {
    console.log(JSON.stringify(data, 2));
    var _db;
    MongoClient.connect(DB_CONN_STR)
      .then(function (_db) {
        db = _db;
        return db.collection("users").find({_id: ObjectID(data.userId), loginKey: data.loginKey}).toArray();
      })
      .then(function (row) {
        if (row.length > 0) {
          return row[0];
        } else {
          return Promise.reject(new Error("登录态过期"));
        }
      })
      .then(function (user) {
        userId = data.userId;
        loginKey = data.loginKey;
        cb({
          userId,
          loginKey,
          state: 'success'
        });
      })
      .catch(function (err) {
        console.error(err);
        cb({
          msg  : err.message,
          state: 'fail'
        });
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

    MongoClient.connect(DB_CONN_STR)
      .then(_db => {
        return Promise.all(userId.map(_id => {
          return _db.collection("users").find({_id: ObjectID(_id)}).toArray();
        }));
      })
      .then(users => {
        var result = users.map(userList => {
          var user = userList[0];
          return {
            userId: user._id,
            name  : user.name,
            pinyin: user.pinyin
          }
        });
        cb(result);
        console.log('getUserById', JSON.stringify(result, 2));
      })
      .catch(e => console.log(e));
  });

  socket.on('getFriends', function (userId, cb) {

  });


  setTimeout(function newMessage() {
    setTimeout(newMessage, Math.random() * 10 * 1000 + 1000);
    if (userId == '')return;
    for (var i = 0; i < 1; i++) {
      var send = false;
      var fromId = userIdList[((Math.random() * userIdList.length) >> 0)];
      socket.emit('newMessage', {
        id     : uuid.v1(),
        type   : 'text',
        message: "测试：" + Mock.Random.cparagraph(1, 4),//消息内容
        date   : Date.now(),//发送时间
        from   : send ? userId : fromId,//,//来自谁（id）
        to     : send ? fromId : userId,//发给谁
      });
    }
  }, 100);

});