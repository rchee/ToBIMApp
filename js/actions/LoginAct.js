import {LOGIN_STATE_CHANGE} from '../constants/ActionTypes'
import {login} from '../netWorkAdapter/loginAdapter'


export function loginStart() {
  return {
    type : LOGIN_STATE_CHANGE,
    state: 'checking'
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