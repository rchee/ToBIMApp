import {combineReducers} from 'redux';
import messages  from './messageRedu';
import login  from './loginRedu';

const rootReducer = combineReducers({
  messages,
  login
});

export default rootReducer;