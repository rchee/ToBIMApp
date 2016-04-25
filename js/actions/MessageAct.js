import {NEW_MESSAGE} from '../constants/ActionTypes'

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message: message
  };
}