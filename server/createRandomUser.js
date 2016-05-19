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

function createUser(num) {
  MongoClient.connect(DB_CONN_STR)
    .then(function (_db) {
      return _db.collection("users");
    })
    .then(function (col) {
      let newUsers = [];
      for (let i = 0; i < num; i++) {
        let cname = Mock.Random.cname();
        let newUser = {
          user  : Mock.Random.word(),
          pwd   : Mock.Random.word(6, 10),
          name  : cname,
          pinyin: pinyin(cname, {
            style: 'normal'
          }).map((ele)=>ele[0]).join('')
        };
        newUsers.push(newUser);
      }
      console.log(newUsers);
      return col.insert(newUsers);
    })
    .catch(e=>console.error(e))
    .then(()=>console.log('end'));
}
console.log('start');
createUser(50);