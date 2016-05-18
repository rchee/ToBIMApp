import React, {
  Component,
  StyleSheet,
  Navigator,
  Text,
  BackAndroid,
  Platform,
  TouchableOpacity,
  ToastAndroid,
  View
} from 'react-native';

class TabView extends Component {
  render() {

    let TabArray = [
      {name: 'message', title: '消息'},
      {name: 'contact', title: '联系人'},
      {name: 'about', title: '关于'}].map((ele)=>
      <TouchableOpacity
        style={styles.btn}
        onPress={()=>this.props.onSwitch(ele.name)}
        key={ele.name}>
        <Text style={this.props.currentTab==ele.name?styles.textActive:{}}>{ele.title}</Text>
      </TouchableOpacity>
    );
    return <View style={styles.tabView}>
      {TabArray}
    </View>;
  }
}

var styles = StyleSheet.create({
  tabView   : {
    height         : 64,
    flexDirection  : 'row',
    backgroundColor: '#FFF',
    // flex           : 1
  },
  btn       : {
    flex      : 1,
    alignSelf : 'center',
    alignItems: 'center',
  },
  textActive: {
    color: '#12b7f5'
  }
});

module.exports = TabView;