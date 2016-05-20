import React from 'react-native';
import './UserAgent';
import io from 'socket.io-client/socket.io';

var SERVER_ADD = 'http://192.168.199.136:8080';

var socket = io(SERVER_ADD, {
  jsonp     : false,
  transports: ['websocket']
});

function init() {
}

/**
 * 工具函数，由于RN在windows上开发还是比较无力，该函数用于给客户端log。
 */
function log() {
  socket.emit('log', {level: 'LOG', arg: Array.prototype.slice.call(arguments)});
}

module.exports = {
  log,
  socket,
  SERVER_ADD
};