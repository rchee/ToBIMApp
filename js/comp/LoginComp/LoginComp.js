import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';


class LoginComp extends Component {

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[this.props.style,styles.main]}>
        <TextInput
          style={styles.input}
          placeholder={"用户名"}/>
        <TextInput
          style={styles.input}
          placeholder={"密码"}/>
        <TouchableOpacity
          style={styles.loginBtn}>
          <Text
            style={styles.loginBtnText}>{"登录"}</Text>
        </TouchableOpacity>
      </View>
    );
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
    width: 300
  },
  loginBtn    : {
    backgroundColor: '#12b7f5',
    alignItems     : 'center',
    margin         : 4,
    borderRadius   : 4,
    paddingTop     : 10,
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