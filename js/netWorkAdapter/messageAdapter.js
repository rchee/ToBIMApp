import NetWorkHelper from '../common/NetWorkHelper';
import {newMessage} from '../actions/MessageAct';
import store from '../store';


export function init() {
  NetWorkHelper.socket.on('newMessage', (msg:MessageType)=> {
    store.dispatch(newMessage(msg));
  });
}

export function sendMessage(msg, callback) {
  NetWorkHelper.socket.emit('sendMessage', msg, callback);
}