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

/**
 * 比较两个用户的拼音
 * @param userA
 * @param userB
 * @returns {number}
 */
function sortUser(userA, userB) {
  if (userA.pinyin < userB.pinyin)
    return -1;
  if (userA.pinyin > userB.pinyin)
    return 1;
  return 0;
}

class ListItem extends Component {
  render() {
    let userStore = store.getState().users;

    let fromId:string = this.props.data;
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
            source={{uri: `http://avatar.chsword.net/avatar/${this.props.data}`}}/>
          <View style={styles.textBox}>
            <View style={styles.topBox}>
              <Text numberOfLines={1} style={styles.nick}>{displayName}</Text>
              <Text style={styles.date}>{Math.random() > 0.5 ? '4G' : 'wifi'}</Text>
            </View>
            <Text numberOfLines={1} style={styles.msg}>{'[在线]'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _onPressButton() {
    console.warn(this.props);
  }
}

class ContactComp extends Component {

  constructor(props) {
    super(props);
    let userList:Array = store.getState().users.users.toArray().sort(sortUser);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(userList),
    };
  }

  render() {
    let userList:Array = store.getState().users.users.toArray().sort(sortUser);
    this.state.dataSource = this.state.dataSource.cloneWithRows(userList);
    return (
      <ListView
        style={[this.props.style,{flex:1}]}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <ListItem data={rowData.userId} navigator={this.props.navigator} />}
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

ContactComp = connect(state=>state)(ContactComp);

module.exports = ContactComp;