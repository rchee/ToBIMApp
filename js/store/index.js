import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import immutableTransform from 'redux-persist-transform-immutable'
/**
 * 讲真，我不知道自己在写什么
 */
var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var createAppStore = applyMiddleware(thunk)(createStore);

function configureStore(onComplete:?() => void) {
  // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
  const store = autoRehydrate()(createAppStore)(rootReducer);
  persistStore(store, {
    storage   : AsyncStorage,
    transforms: [immutableTransform({})]
  }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

const store = configureStore();
export default store;