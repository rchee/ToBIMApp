import {combineReducers} from 'redux';
import messages  from './messageRedu';
import login  from './loginRedu';
import users  from './userRedu';

const rootReducer = combineReducers({
  messages,
  login,
  users
});

export default rootReducer;