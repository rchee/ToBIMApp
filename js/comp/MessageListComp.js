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

import store from './../store';

class ListItem extends Component {
  render() {
    let messages:Map = store.getState().messages.messages;
    let fromId:string = this.props.data;
    let messageId:string = store.getState().messages.messageListUserMap.get(fromId).get(0);
    let msg = messages.get(messageId);

    return (
      <TouchableHighlight
        style={styles.listItem}
        underlayColor={'#CCCCCC'}
        onPress={this._onPressButton}>
        <View style={styles.listItemView}>
          <Image
            style={styles.listItemAvanta}
            source={require('./img/avanta.png')}/>
          <View style={styles.textBox}>
            <View style={styles.topBox}>
              <Text style={styles.nick}>{fromId}</Text>
              <Text style={styles.date}>{ msg.date}</Text>
            </View>
            <Text style={styles.msg}>{ msg.message || ""}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressButton() {
  }
}

class MessageListComp extends Component {

  constructor(props) {
    super(props);
    let userList:Array = store.getState().messages.recentUserList.toArray();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(userList),
    };
  }

  render() {
    let userList:Array = store.getState().messages.recentUserList.toArray();
    this.state.dataSource = this.state.dataSource.cloneWithRows(userList);
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
    height: 64
  },
  listItemView: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 13
  },
  listItemAvanta: {
    height: 50,
    width: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 13,
    borderRadius: 9999
  },
  textBox: {
    flex: 1,
    flexDirection: "column",
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  topBox: {
    height: 40,
    alignItems: 'center',
    flexDirection: "row"
  },
  nick: {
    fontSize: 16,
    flex: 1,
    color: '#000000'
  },
  date: {
    marginRight: 12,
    fontSize: 14
  },
  msg: {
    flex: 1,
    alignItems: 'center'
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