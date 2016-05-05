import {NEW_MESSAGE} from '../constants/ActionTypes';
import {List, Map} from 'immutable';
import  {MessageType} from '../actions/MessageAct';

type MessageStoreType ={
  messages:Map<string,MessageType>;//保存了所有消息的Map
  recentUserList:List;//最近接收到的消息(即每个用户发来的最新那条消息)
  messageListUserMap:Map<string,List<string>>;//每个用户发来的消息列表，暂时不处理
};

const initMessageStore:MessageStoreType = {
  messages          : Map(),
  recentUserList    : List(),
  messageListUserMap: Map()
};

export default function messageReducer(messageStore:MessageStoreType = initMessageStore, action = undefined):MessageStoreType {
  switch (action.type) {
    case NEW_MESSAGE:
    {
      let msg:MessageType = action.message;
      let topicUserId = msg.from == '2000' ? msg.to : msg.from;

      var {recentUserList, messages, messageListUserMap} = messageStore;

      var newRecentUserList:List;

      //检查该用户是否出现在recentMessageList中，有则删除
      var index:number = recentUserList.indexOf(topicUserId);
      if (index >= 0) {
        recentUserList = recentUserList.splice(index, 1);
      }
      newRecentUserList = recentUserList.unshift(topicUserId);

      var newMessageListUserMap:Map;

      var newMessageList:List = messageListUserMap.get(topicUserId) || List();
      newMessageList = newMessageList.unshift(msg.id);
      newMessageListUserMap = messageListUserMap.set(topicUserId, newMessageList);
      return {
        ...messageStore,
        messages          : messages.set(msg.id, msg),
        recentUserList    : newRecentUserList,
        messageListUserMap: newMessageListUserMap,
      };
    }

    default:
      return messageStore;

  }
} 