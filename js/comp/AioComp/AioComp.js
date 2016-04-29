import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

import {connect, Provider} from 'react-redux';
import LeftMessageBobbleComp from './LeftMessageBobbleComp'

import store from './../../store';

class ListItem extends Component {
  render() {
    // let messages:Map = store.getState().messages.messages;
    // let fromId:string = this.props.data;
    // let messageId:string = store.getState().messages.messageListUserMap.get(fromId).get(0);
    // let msg = messages.get(messageId);

    return (
      <LeftMessageBobbleComp/>
    );
  }
}

class AioComp extends Component {

  constructor(props) {
    super(props);
    let userList:Array = store.getState().messages.recentUserList.toArray();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['111', '2222']),
    };
  }

  render() {
    let userList:Array = store.getState().messages.recentUserList.toArray();
    this.state.dataSource = this.state.dataSource.cloneWithRows([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    return (
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <ListItem data={rowData}/>}
      />
    );
  }
}

var styles = StyleSheet.create({
  listView: {
    backgroundColor: '#EEE',
  },
});

AioComp = connect(state=>state)(AioComp);

var Wrapper = React.createClass({
  render: function () {
    return (
      <Provider store={store}>
        <AioComp/>
      </Provider>
    )
  }
});

module.exports = Wrapper;