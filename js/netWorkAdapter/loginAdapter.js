import NetWorkHelper from '../common/NetWorkHelper';
import {logoutByServer, reLoginAct}  from'../actions/LoginAct';
import store from '../store';

let socket = NetWorkHelper.socket;

export function login(username:string, psw:string, callback) {
  socket.emit('login', {username, psw}, callback);
}

export function reLogin(userId:string, loginKey:string) {
  return new Promise(function (resolve, reject) {
    socket.emit('reLogin', {userId, loginKey}, function (data) {
      if (data.state == 'success' && data.userId && data.loginKey) {
        resolve(data)
      } else {
        reject(data)
      }
    });
  });
}

export function initLogin() {
  socket.on('connect', ()=> {
    store.dispatch(reLoginAct());
  });

  socket.on('reconnect', ()=> {
    store.dispatch(reLoginAct());
  });

  socket.on('logout', (msg:string)=> {
    store.dispatch(logoutByServer(msg));
  });
}