/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import messageAdapter from './js/netWorkAdapter/messageAdapter';
import MessageListComp from './js/comp/MessageListComp';

class ToBIMMobile extends Component {
  render() {
    return (
      <MessageListComp style={styles.container}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('ToBIMMobile', () => ToBIMMobile);
messageAdapter.init();