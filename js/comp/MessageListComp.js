import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import NetWorkHelper from '../common/NetWorkHelper';

import {connect, Provider} from 'react-redux';

import store from './../store';

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.listItem}
        underlayColor={'#CCCCCC'}
        onPress={this._onPressButton}>
        <Text> {this.props.data}</Text>
      </TouchableHighlight>
    );
  }

  _onPressButton() {
  }
}

class MessageListComp extends Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };

  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <ListItem data={rowData}/>}
      />
    );
  }
}

var styles = StyleSheet.create({
  listItem: {
    height: 100
  }
});

MessageListComp = connect(state=>state)(MessageListComp);

var Wrapper = React.createClass({
  render: function () {
    return (
      <Provider store={store}>
        <MessageListComp/>
      </Provider>
    )
  }
});

module.exports = Wrapper;