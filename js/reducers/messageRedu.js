import {NEW_MESSAGE} from '../constants/ActionTypes';
import {List, Map} from 'immutable';
import  {MessageType} from '../actions/MessageAct';

type MessageStoreType ={
  messages:Map<string,MessageType>;//保存了所有消息的Map
  recentTopicList:List;//最近接收到的消息(即每个用户发来的最新那条消息)
  topicListMap:Map<string,List<string>>;//每个用户发来的消息列表，暂时不处理
};

const initMessageStore:MessageStoreType = {
  messages: Map(),
  recentTopicList: List(),
  topicListMap: Map()
};

export default function messageReducer(messageStore:MessageStoreType = initMessageStore, action = undefined):MessageStoreType {
  switch (action.type) {
    case NEW_MESSAGE:
    {
      let msg:MessageType = action.message;
      var {recentTopicList, messages, topicListMap} = messageStore;

      //检查该用户是否出现在recentMessageList中，有则删除
      var index:number = recentTopicList.indexOf(msg.from);
      if (index >= 0) {
        recentTopicList = recentTopicList.splice(index, 1);
      }
      recentTopicList = recentTopicList.unshift(msg.from);

      var newMessageList:List = topicListMap.get(msg.from) || List();
      newMessageList = newMessageList.unshift(msg.id);
      topicListMap = topicListMap.set(msg.from, newMessageList);

      return {
        ...messageStore,
        messages: messages.set(msg.id, msg),
        recentTopicList,
        topicListMap,
      };
    }

    default:
      return messageStore;

  }
} 