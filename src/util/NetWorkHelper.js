import React from 'react-native';
import './UserAgent';
import io from 'socket.io-client/socket.io';

var socket = io('http://chee-mini:8080', {
  jsonp: false,
  transports: ['websocket']
});

function init(){
  
}

/**
 * 工具函数，由于RN在windows上开发还是比较无力，该函数用于给客户端log。
 */
function log(){
  socket.emit('log', { level: 'LOG',arg: Array.prototype.slice.call(arguments)});
}

module.exports = {
	log :log
};