import {ADD_MESSAGE} from '../constants/ActionTypes';
import {List} from 'immutable';

const initialMessageList = List([{
  msg: 'aaaa'
}]);

export default function messageReducer(msgs = initialMessageList, action = undefined) {
  switch (action.type) {
    case ADD_MESSAGE:
      return msgs.push({
        msg: action.message
      });

    default:
      return msgs;

  }
} 