import {LOGIN_STATE_CHANGE} from '../constants/ActionTypes';

type loginState = {
  userId:?string,
  loginKey:?string,
  loginState:'unlogin'|'checking'|'success'|'failed'|'offline',
  msg:''
}

const initLoginState:loginState = {
  loginState: 'unlogin'
};

export default function loginReducer(loginState:loginState = initLoginState, action = undefined):loginState {

  switch (action.type) {
    case LOGIN_STATE_CHANGE:

      switch (action.state) {
        case'success' ://登录成功
          let {userId, loginKey} = action.data;
          return {
            userId,
            loginKey,
            loginState: 'success',
            msg       : '登录成功'
          };

        case  'failed':
          return {
            loginState: 'failed',
            msg       : '登录失败'
          };

        case  'offline':
          return {
            loginState: 'offline',
            msg       : '您已下线'
          };

        case  'checking':
          return {
            loginState: 'checking',
            msg       : '登录中...'
          };

      }


    default:
      return loginState;
  }
}