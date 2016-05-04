import React, {
  AppRegistry,
  Component,
  StyleSheet,
} from 'react-native';

import IMApp from './js/comp/IMApp/IMApp';

class ToBIMMobile extends Component {
  render() {
    return (
      <IMApp/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('ToBIMMobile', () => ToBIMMobile);
