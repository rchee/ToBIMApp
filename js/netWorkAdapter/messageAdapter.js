import NetWorkHelper from '../common/NetWorkHelper';
import {newMessageReceive} from '../actions/MessageAct';
import store from '../store';


export function initMessage() {
  NetWorkHelper.socket.on('newMessage', (msg:MessageType)=> {
    store.dispatch(newMessageReceive(msg));
  });
}

export function sendMessage(msg, callback) {
  NetWorkHelper.socket.emit('sendMessage', msg, callback);
}