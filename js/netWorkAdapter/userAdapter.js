import NetWorkHelper from '../common/NetWorkHelper';

import store from '../store';

export function getUserInfo(userId:array<string>, cb) {
  if (userId.length == 0) {
    return;
  }
  NetWorkHelper.socket.emit(
    'getUserById',
    userId,
    cb
  );
}