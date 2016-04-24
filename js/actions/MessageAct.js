import {ADD_MESSAGE} from '../constants/ActionTypes'

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    message: message
  };
}