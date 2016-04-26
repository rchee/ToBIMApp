import React from 'react-native';
import './UserAgent';
import io from 'socket.io-client/socket.io';
import store from './../store';
import {newMessage} from '../actions/MessageAct';

var socket = io('http://chee-mini:8080', {
  jsonp: false,
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

// setTimeout(()=> {
// for (var i = 0; i < 100; i++) {
//   store.dispatch(newMessage('Message' + (i++)));
// }
// }, 0);

module.exports = {
  log,
  socket
};