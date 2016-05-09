import NetWorkHelper from '../common/NetWorkHelper';

export function login(username:string, psw:string, callback) {
  NetWorkHelper.socket.emit('login', {username, psw}, callback);
}