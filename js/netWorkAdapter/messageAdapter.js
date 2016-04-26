import NetWorkHelper from '../common/NetWorkHelper';
import {newMessage} from '../actions/MessageAct';
import store from '../store';



function init() {
  NetWorkHelper.socket.on('newMessage', (msg:MessageType)=> {
    store.dispatch(newMessage(msg));
  });
}

module.exports = {init};