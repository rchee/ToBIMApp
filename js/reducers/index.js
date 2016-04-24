import {combineReducers} from 'redux';
import messageReducer from './messageRedu';

const rootReducer = combineReducers({
  messages: messageReducer,
});

export default rootReducer;