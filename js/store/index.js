import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}

const store = configureStore();
export default store;