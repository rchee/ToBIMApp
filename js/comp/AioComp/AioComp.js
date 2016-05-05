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
import LeftMessageBobbleComp from './MessageBobbleComp'
import InvertibleScrollView from 'react-native-invertible-scroll-view';

import store from './../../store';

class ListItem extends Component {
  render() {
    let messages:Map = store.getState().messages.messages;
    let msg = messages.get(this.props.data);
    return (
      <LeftMessageBobbleComp message={msg} sent={msg.from=='2000'}/>
    );
  }
}

class AioComp extends Component {

  static defaultProps = {
    userId: undefined,
  };

  constructor(props) {
    super(props);
    let userList:Array = store.getState().messages.recentUserList.toArray();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['111', '2222']),
    };
  }

  render() {
    let messageList:Array = store.getState().messages.messageListUserMap.get(this.props.userId);
    let array = messageList ? messageList.toArray() : [];
    this.state.dataSource = this.state.dataSource.cloneWithRows(array);
    return (
      <ListView
        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
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
        <AioComp userId={this.props.userId}/>
      </Provider>
    )
  }
});

module.exports = Wrapper;