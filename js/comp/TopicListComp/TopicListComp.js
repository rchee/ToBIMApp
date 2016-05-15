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

import store from './../../store';
import DateHelper from '../../common/DateHelper';

class ListItem extends Component {
  render() {
    let messagesStore = store.getState().messages;
    let userStore = store.getState().users;

    let messages:Map = messagesStore.messages;
    let fromId:string = this.props.data;
    let messageId:string = messagesStore.messageListUserMap.get(fromId).get(0);
    let msg = messages.get(messageId);
    let user = userStore.users.get(fromId);
    let displayName = (user && user.name ) || fromId;
    return (
      <TouchableHighlight
        style={styles.listItem}
        underlayColor={'#EEE'}
        onPress={()=>{
          this.props.navigator.push({name: 'Aio', fromUserId: this.props.data});
          }
        }>
        <View style={styles.listItemView}>
          <Image
            style={styles.listItemAvanta}
            resizeMode={'cover'}
            source={require('./../../common/img/avanta.png')}/>
          <View style={styles.textBox}>
            <View style={styles.topBox}>
              <Text numberOfLines={1} style={styles.nick}>{displayName}</Text>
              <Text style={styles.date}>{DateHelper.getDateText(msg.date)}</Text>
            </View>
            <Text numberOfLines={1} style={styles.msg}>{ msg.message || ""}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressButton() {
    console.warn(this.props);
  }
}

class TopicListComp extends Component {

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
        style={[this.props.style,{flex:1}]}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <ListItem data={rowData} navigator={this.props.navigator} />}
      />
    );
  }
}

var styles = StyleSheet.create({
  listItem      : {
    height: 64
  },
  listItemView  : {
    flex         : 1,
    flexDirection: "row",
    marginLeft   : 13
  },
  listItemAvanta: {
    height      : 50,
    width       : 50,
    alignItems  : 'center',
    alignSelf   : 'center',
    marginRight : 13,
    borderRadius: 25
  },
  textBox       : {
    flex             : 1,
    flexDirection    : "column",
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  topBox        : {
    height       : 40,
    alignItems   : 'center',
    flexDirection: "row"
  },
  nick          : {
    fontSize: 16,
    flex    : 1,
    color   : '#000000'
  },
  date          : {
    marginRight: 12,
    fontSize   : 12
  },
  msg           : {
    flex      : 1,
    alignItems: 'center'
  }
});

TopicListComp = connect(state=>state)(TopicListComp);

// var Wrapper = React.createClass({
//   render: function () {
//     return (
//       <Provider store={store}>
//         <TopicListComp/>
//       </Provider>
//     )
//   }
// });

module.exports = TopicListComp;