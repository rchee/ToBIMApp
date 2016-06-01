import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';
import NetWorkHelper from '../../common/NetWorkHelper';

import Mock from 'mockjs';
import store from './../../store';

class MessageBobbleComp extends Component {

  static defaultProps = {
    sent: false,
  };

  constructor(props) {
    super(props);
  }

  renderMessageContent() {
    let {message, sent}  = this.props;
    switch (message.type) {
      case 'exp':
        return <Image
          source={{uri: `${NetWorkHelper.SERVER_ADD}/public/QQexpression/${message.message}.gif`}}
          resizeMode={'contain'}
          style={[styles.exp,sent?styles.horizontallyInverted:undefined]}/>;
      default:
        return <Text
          style={[styles.contentText, sent?styles.selfContentText:styles.empty]}>
          {message.message || ''}
        </Text>
    }
  }

  render() {

    return (
      <View style={[styles.messageView,this.props.sent?styles.horizontallyInverted:styles.empty]}>
        <Image
          style={[styles.avatar,this.props.sent?styles.horizontallyInverted:styles.empty]}
          resizeMode={'cover'}
          source={{uri: `http://avatar.chsword.net/avatar/${this.props.userId}`}}/>
        <Image
          style={[styles.arrow,this.props.sent?styles.selfArrow:styles.empty]}
          source={this.props.sent?require('./img/arrow-send.png'):require('./img/arrow.png')}
        />
        <Text style={styles.nick}>{this.props.sent ? '' : this.props.nick}</Text>
        <View style={styles.contentWarp}>
          <View style={[styles.content,this.props.sent?styles.selfContent:styles.empty]}>
            {this.renderMessageContent()}
          </View>
        </View>
        <View style={{flex:0}}/>
      </View>
    );
  }
}
let horizontallyInvertedObj = {
  transform: [
    {scaleX: -1},
  ],
}

var styles = StyleSheet.create({
  messageView         : {
    flex         : 1,
    flexDirection: "row",
    marginTop    : 10,
    marginBottom : 10,
    paddingLeft  : 10,
    paddingRight : 20,
  },
  avatar              : {
    height      : 40,
    width       : 40,
    marginRight : 10,
    borderRadius: 20
  },
  arrow               : {
    position: 'absolute',
    top     : 21,
    left    : 54.5,
    height  : 18,
    width   : 18,
  },
  selfArrow           : {
    top: -1,
  },
  nick                : {
    position: 'absolute',
    fontSize: 14,
    flex    : 1,
    color   : '#000000'
  },
  contentWarp         : {
    flexDirection: 'column',
    alignItems   : 'flex-start',
    flex         : 1,
  },
  content             : {
    marginTop      : 22,
    borderRadius   : 12,
    padding        : 12,
    backgroundColor: 'rgba(255,255,255,1)',
    flex           : 1,
    // maxWidth       : 100
  },
  selfContent         : {
    marginTop      : 0,
    backgroundColor: '#12b7f5',
  },
  contentText         : {
    fontSize: 15,
    color   : '#000',
    // backgroundColor: 'rgba(255,255,255,1)',
    flex    : 1,

  },
  selfContentText     : {
    color: '#fff',
    ...horizontallyInvertedObj,// backgroundColor: '#12b7f5',

  },
  horizontallyInverted: {
    ...horizontallyInvertedObj,
  },
  empty               : {},
  exp                 : {
    flex     : 1,
    alignSelf: 'center',
    height   : 24,
    width    : 24,
  }
});


module.exports = MessageBobbleComp;