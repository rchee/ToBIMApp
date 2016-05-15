import {UPDATE_USER} from '../constants/ActionTypes'
import {getUserInfo} from '../netWorkAdapter/userAdapter'


const TIME_OUT = 1000 * 5 * 60;

export function updateUser(userInfo:array):object {
  return {
    type: UPDATE_USER,
    userInfo
  };
}

/**
 * 这个object用于记录有哪些userId是最近更新过的，防止反复更新同一个user的信息
 * @type {{}}
 */
let unupdateMap:object = {};

export function getUserData(userIdArray:array<string>):Function {

  let now = Date.now();
  userIdArray = userIdArray.filter(function (id:string) {
    if (unupdateMap[id] && now - unupdateMap[id] < TIME_OUT) {
      return false;
    } else {
      unupdateMap[id] = now;
      return true;
    }
  });


  return function (dispatch:Function) {
    getUserInfo(userIdArray, function (userInfo) {
      // console.warn(111, JSON.stringify(userInfo));
      dispatch(updateUser(userInfo));
    });
  };
}