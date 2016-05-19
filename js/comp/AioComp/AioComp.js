import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Platform,
  View,
  Image
} from "react-native";

import {connect, Provider} from "react-redux";
import LeftMessageBobbleComp from "./MessageBobbleComp";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import {sentMessage} from "../../actions/MessageAct";
import store from "./../../store";
import KeyboardSpacer from'react-native-keyboard-spacer';
var uuid = require('../../common/uuid/uuid.js');

var Mock = require('mockjs');


class ListItem extends Component {
  render() {


    //消息内容
    let messages:Map = store.getState().messages.messages;
    let msg = messages.get(this.props.data);
    let currUserId = store.getState().login.userId;
    let sent = msg.from == currUserId;


    //用户名
    let userStore = store.getState().users;
    let userId = msg.from;
    let user = userStore.users.get(userId);
    let nick = (user && user.name) || userId;

    return (
      <LeftMessageBobbleComp message={msg} sent={sent} nick={nick} userId={userId}/>
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
      dataSource: ds.cloneWithRows([]),
      inputText : ''
    };
  }

  render() {
    let messageList:Array = store.getState().messages.messageListUserMap.get(this.props.userId);
    let array = messageList ? messageList.toArray() : [];
    this.state.dataSource = this.state.dataSource.cloneWithRows(array);
    return (
      <View style={[styles.aio,this.props.style]}>
        <ListView
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <ListItem data={rowData}/>}
        />
        <View style={styles.inputWrap}>
          <TextInput
            onChangeText={(text) => this.setState({inputText:text})}
            style={styles.input}
            onSubmitEditing={this._onSend}
            value={this.state.inputText}
            returnKeyType={'send'}
          />
          <TouchableOpacity
            onPress={this._onSend}
            style={styles.sendBtn}>
            <View style={styles.sendBtnTextWarp}>
              <Text
                style={styles.sendBtnText}>{'发送'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {(Platform.OS === 'ios') ? <KeyboardSpacer/> : null}
      </View>
    );
  }

  _onSend = ()=> {

    let text = this.state.inputText;
    if (text === "") {
      return;
    }

    store.dispatch(sentMessage(text, this.props.userId));

    this.setState({inputText: ''});
  }
}

var styles = StyleSheet.create({
  aio            : {
    flex: 1
  },
  listView       : {
    backgroundColor: '#EEE',
    flex           : 1,
  },
  inputWrap      : {
    height         : 50,
    backgroundColor: '#fff',
    flexDirection  : 'row',
  },
  input          : {
    flex: 1
  },
  sendBtn        : {
    backgroundColor: '#12b7f5',
    // alignSelf      : 'center',
    alignItems     : 'center',
    margin         : 4,
    borderRadius   : 4,
    // flex: 1
  },
  sendBtnTextWarp: {
    alignSelf     : 'center',
    alignItems    : 'center',
    justifyContent: 'center'
  },
  sendBtnText    : {
    width         : 50,
    justifyContent: 'center',
    alignSelf     : 'center',
    alignItems    : 'center',
    textAlign     : 'center',
    color         : '#fff'
  }
});

AioComp = connect(state=>state)(AioComp);

module.exports = AioComp;