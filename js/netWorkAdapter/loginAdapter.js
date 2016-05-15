import NetWorkHelper from '../common/NetWorkHelper';
import {logoutByServer} from '../actions/LoginAct';
import store from '../store';


export function login(username:string, psw:string, callback) {
  NetWorkHelper.socket.emit('login', {username, psw}, callback);
}

export function initLogin() {
  NetWorkHelper.socket.on('logout', (msg:string)=> {
    store.dispatch(logoutByServer(msg));
  });
}