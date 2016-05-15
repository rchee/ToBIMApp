import {List, Map} from 'immutable';
import {UPDATE_USER} from '../constants/ActionTypes';

type UserStoreType = {
  users:Map,
  relationships:Map,
}

let initUserStore = {
  users        : Map(),
  relationships: Map()
};

export default function userReducer(userState:UserStoreType = initUserStore, action:object) {
  switch (action.type) {
    case UPDATE_USER:
      var {users} = userState;
      action.userInfo.map(function (userObj) {
        users = users.set(userObj.userId, userObj);
        return userObj;
      });
      return {
        ...userState,
        users
      };

    default:
      return userState;
  }
}