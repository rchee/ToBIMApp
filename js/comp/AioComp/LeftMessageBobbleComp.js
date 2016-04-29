import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';

class LeftMessageBobbleComp extends Component {
  render() {
    // let messages:Map = store.getState().messages.messages;
    // let fromId:string = this.props.data;
    // let messageId:string = store.getState().messages.messageListUserMap.get(fromId).get(0);
    // let msg = messages.get(messageId);

    return (
      <View style={styles.messageView}>
        <Image
          style={styles.avanta}
          source={require('./../../common/img/avanta.png')}/>
        <Image
          style={styles.arrow}
          source={require('./img/arrow.png')}
        />
        <Text style={styles.nick}>{"123123"}</Text>
        <View style={styles.content}>
          <Text
            style={styles.contentText}>{"的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份的说法的身份"}</Text></View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  messageView: {
    flex         : 1,
    flexDirection: "row",
    marginTop    : 10,
    marginBottom : 10,
    paddingLeft  : 10,
    paddingRight : 50,
  },
  avanta     : {
    height      : 40,
    width       : 40,
    // alignItems  : 'center',
    // alignSelf   : 'center',
    marginRight : 10,
    borderRadius: 9999
  },
  arrow      : {
    position: 'absolute',
    top     : 21,
    left    : 54.5,
    height  : 18,
    width   : 18,
  },
  nick       : {
    position: 'absolute',
    fontSize: 14,
    flex    : 1,
    color   : '#000000'
  },
  content    : {
    marginTop      : 22,
    borderRadius   : 12,
    padding        : 12,
    backgroundColor: 'rgba(255,255,255,1)',
    flex           : 1,
  },
  contentText: {
    fontSize: 15,
    color   : '#000',
    flex    : 1,
  }
});


module.exports = LeftMessageBobbleComp;