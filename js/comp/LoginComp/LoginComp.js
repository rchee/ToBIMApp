import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TextInput,
  TouchableOpacity, Platform,
  ToastAndroid,
  View,
  Image
} from 'react-native';
import store from './../../store';
import {loginAct} from '../../actions/LoginAct'
import KeyboardSpacer from'react-native-keyboard-spacer';


class LoginComp extends Component {

  static defaultProps = {};

  constructor(props) {
    super(props);
    this._uname = 'admin';
    this._psw = 'admin';
  }

  render() {
    let disable = store.getState().login.state == 'checking';
    return (
      <View style={{flex:1}}>
        <View style={[this.props.style,styles.main]}>
          <TextInput
            style={styles.input}
            editable={!disable}
            onChangeText={(uname)=>this._uname=uname}
            defaultValue={this._uname}
            placeholder={"用户名"}/>
          <TextInput
            editable={!disable}
            style={styles.input}
            onChangeText={(pws)=>this._psw=pws}
            defaultValue={this._psw}
            secureTextEntry={true}
            placeholder={"密码"}/>
          <TouchableOpacity
            onPress={this._onLogin}
            style={styles.loginBtn}>
            <Text
              style={styles.loginBtnText}>{"登录"}</Text>
          </TouchableOpacity>
        </View>
        {(Platform.OS === 'ios') ? <KeyboardSpacer/> : null}
      </View>
    );
  }

  _onLogin = ()=> {
    let {_uname, _psw}=this;
    if (_uname === undefined || _psw === undefined) {
      ToastAndroid.show('请输入完整信息', ToastAndroid.SHORT);
      return;
    }
    if (_uname === '' || _psw === '') {
      ToastAndroid.show('请输入完整信息', ToastAndroid.SHORT);
      return;
    }
    store.dispatch(loginAct(_uname, _psw));
  }
}

var styles = StyleSheet.create({
  main        : {
    flex          : 1,
    alignItems    : 'center',
    justifyContent: 'center',
    paddingTop    : -200,
  },
  input       : {
    width : 300,
    height: 50,
  },
  loginBtn    : {
    backgroundColor: '#12b7f5',
    alignItems     : 'center',
    margin         : 10,
    borderRadius   : 4,
  },
  loginBtnText: {
    width         : 50,
    justifyContent: 'center',
    alignSelf     : 'center',
    alignItems    : 'center',
    textAlign     : 'center',
    color         : '#fff',
    margin        : 10,
    fontSize      : 16,
  }
});


module.exports = LoginComp;