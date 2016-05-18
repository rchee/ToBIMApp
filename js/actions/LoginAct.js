import {LOGIN_STATE_CHANGE} from '../constants/ActionTypes'
import {login, reLogin} from '../netWorkAdapter/loginAdapter'


export function loginStart() {
  return {
    type : LOGIN_STATE_CHANGE,
    state: 'checking'
  }
}

export function reLoginStart(userId, loginKey) {
  return {
    userId,
    loginKey,
    type : LOGIN_STATE_CHANGE,
    state: 'reLogin'
  }
}

export function loginSuccess(data) {
  return {
    type : LOGIN_STATE_CHANGE,
    state: 'success',
    data
  }
}


export function loginFail(msg) {
  return {
    type : LOGIN_STATE_CHANGE,
    state: 'fail',
    msg
  }
}

export function logoutByServer(msg) {
  return {
    type : LOGIN_STATE_CHANGE,
    state: 'offline',
    msg,
  }
}

/**
 * 断线后重新登录
 * @returns {*}
 */
export function reLoginAct() {
  return function (dispatch, getState) {
    let {loginKey, userId, loginState}=  getState().login;
    if (loginKey && userId) {
      dispatch(reLoginStart(userId, loginKey));
      reLogin(userId, loginKey)
        .then(function (data) {
          dispatch(loginSuccess(data));
        }, function (data) {
          dispatch(loginFail(data.msg));
        });
    } else {
      dispatch({
        type : LOGIN_STATE_CHANGE,
        state: 'offline',
      });
    }
  }
}

export function loginAct(username:string, pws:string) {

  return function (dispatch, getState) {
    dispatch(loginStart());
    login(username, pws, (data)=> {
      if (data.state == 'success' && data.userId && data.loginKey) {
        dispatch(loginSuccess(data));
      } else {
        dispatch(loginFail(data.msg));
      }
    });

  };
}