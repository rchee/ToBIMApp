import {NEW_MESSAGE} from '../constants/ActionTypes'

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
    type: NEW_MESSAGE,
    message: message
  };
}