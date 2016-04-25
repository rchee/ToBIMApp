import {NEW_MESSAGE} from '../constants/ActionTypes';
import {List} from 'immutable';

const initialMessageList = List([{
  msg: 'aaaa'
}]);

export default function messageReducer(msgs = initialMessageList, action = undefined) {
  switch (action.type) {
    case NEW_MESSAGE:
      return msgs.unshift({
        msg: action.message 
      });

    default:
      return msgs;

  }
} 