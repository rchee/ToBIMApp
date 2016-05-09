import {NEW_MESSAGE, SENT_MESSAGE} from '../constants/ActionTypes'
import {sendMessage} from '../netWorkAdapter/messageAdapter'
var uuid = require('../common/uuid/uuid.js');

//@flow
export type MessageType = {
  id:string;
  message:string;//消息内容
  date: number;//发送时间
  from:string;//来自谁（id）
  to:string;//发给谁
  group:?string;//是否来自群，群号
};

type MessageAction = {
  message:MessageType;//消息内容
  type:string;
};

export function newMessage(message:MessageType):MessageAction {
  return {
    type   : NEW_MESSAGE,
    message: message
  };
}

export function sentMessage(content:string, to:string):Function {
  let msg = {
    id     : uuid.v1(),
    message: content,//消息内容
    date   : Date.now(),//发送时间
    from   : '2000',//来自谁（id）
    to     : to,//发给谁
  };

  return function (dispatch, getState) {
    sendMessage(msg, ()=> dispatch(newMessage(msg)))
  };

}