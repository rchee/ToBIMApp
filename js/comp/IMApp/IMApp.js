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
import {connect, Provider} from 'react-redux';

import {initMessage} from './../../netWorkAdapter/messageAdapter';
import {initLogin} from './../../netWorkAdapter/loginAdapter';

import TabView from './TabView';
import AioComp from './../AioComp/AioComp';
import TopicList from './../TopicListComp/TopicListComp';
import Contact from './../ContactComp/ContactComp';
import Login from "../LoginComp/LoginComp";
import store from './../../store';

function getInitRoute(loginSuccess:boolean = false) {
  if (loginSuccess) {
    return {
      title: '企业IM',
      name : 'index',
      tab  : 'message'
    }
  } else {
    return {
      title: '用户登录',
      name : 'login'
    }
  }

}

class NavBar extends Component {

  handleWillFocus = (route) => {
    this.setState({title: route.title});
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '企业IM',
    };
  }

  immediatelyRefresh() {
    //谜之回调           
  }

  render() {
    var title = this.props.title || "企业IM";
    var nav = this.props.navigator.getCurrentRoutes();
    var leftBtn = nav.length > 1 ? (
      <TouchableOpacity
        onPress={this.props.onBack}
        style={styles.navBarLeftButton}>
        <Text
          style={[styles.navBarText,styles.navBarButtonText]}>
          {"<返回"}
        </Text>
      </TouchableOpacity>)
      : <View style={styles.navBarLeftButton}/>;
    return (
      <View style={styles.navBar}>
        {leftBtn}
        <View style={styles.navBarTitle}>
          <Text style={[styles.navBarText,styles.navBarTitleText]}>{title}</Text>
        </View>
        <View style={styles.navBarRightButton}/>
      </View>
    );
  }
}

class IMApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '企业IM',
    };
  }


  render() {
    var initRoute = getInitRoute(store.getState().login.state === 'success');
    return (
      <Provider store={store}>
        <Navigator
          ref={(navigator) => {this._navigator = navigator;}}
          initialRoute={initRoute}
          renderScene={this.renderScene}
          onWillFocus={this._willFocus}
          navigationBar={
          <NavBar
            onBack={this.onBack}
            title={this.state.title}/>
        }
        />
      </Provider>
    );
  }

  renderScene = (route:object, navigator) => {
    switch (route.name) {
      case 'login':
      {
        return <Login style={styles.scene} navigator={navigator}/>
      }
      case 'index':
      {
        let inTabView = null;
        switch (route.tab) {
          case 'message':
            inTabView = (<TopicList style={styles.scene} navigator={navigator}/>);
            break;
          case 'contact':
            inTabView = (<Contact style={styles.scene} navigator={navigator}/>);
            break;
          case 'about':
            inTabView = null;
            break;
        }
        return (
          <View style={styles.tabWarp}>
            <View style={{flex:1}}>
              {inTabView}
            </View>
            <TabView
              currentTab={route.tab}
              onSwitch={this._onSwitchTab}/>
          </View>)
      }
      case 'Aio':
      {
        return <AioComp style={styles.scene} navigator={navigator} userId={route.fromUserId} route={route}/>
      }
    }
  };

  _onSwitchTab = (tab)=> {
    let nav = this._navigator;
    nav.replace({
      title: '企业IM',
      name : 'index',
      tab
    });
    this.setState({title: '企业IM'});
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.onBack);
    }
  }

  unsub:undefined;

  componentDidMount() {
    //TODO 这里也许有更好的写法
    unsub = store.subscribe(()=> {
      let nav = this._navigator;
      let routers = nav.getCurrentRoutes();
      let loginState = store.getState().login.loginState;
      if (routers[0].name == 'login' && loginState === 'success') {
        ToastAndroid.show('登录成功', ToastAndroid.LONG);
        let route = getInitRoute(true);
        nav.immediatelyResetRouteStack([route]);
        this.setState({title: route.title});
      } else if (loginState === 'offline') {
        ToastAndroid.show('您已下线，请重新登录', ToastAndroid.LONG);
        let route = getInitRoute(false);
        nav.immediatelyResetRouteStack([route]);
        this.setState({title: route.title});
      }
    });
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBack);
    }

    unsub && unsub();
  }

  _willFocus = (route)=> {
    this.setState({title: route.title});
  };

  onBack = () => {
    const nav = this._navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      nav.pop();
      return true;
    }
    return false;
  };
}

let topSpace = (Platform.OS === 'ios') ? 16 : 0;

var styles = StyleSheet.create({
  navBar           : {
    position       : 'absolute',
    backgroundColor: '#fff',
    flexDirection  : "row",
    height         : 45,
    top            : 0,
    left           : 0,
    right          : 0,
    paddingTop     : topSpace,
  },
  navBarText       : {
    fontSize: 18,
  },
  navBarTitle      : {
    flex      : 1,
    alignSelf : 'center',
    alignItems: 'center',
  },
  navBarTitleText  : {
    justifyContent: 'center'
  },
  navBarLeftButton : {
    flexDirection: 'row',
    alignItems   : 'flex-start',
    height       : 45,
    width        : 150,
    paddingLeft  : 9,
  },
  navBarRightButton: {
    height: 45,
    width : 150,
  },
  navBarButtonText : {
    color         : '#5890FF',
    flex          : 1,
    justifyContent: 'center',
    alignSelf     : 'center'
  },
  scene            : {
    flex     : 1,
    marginTop: 45 + topSpace,
  },
  tabWarp          : {
    flex           : 1,
    flexDirection  : 'column',
    backgroundColor: '#f8f8f8'
  }
});

TopicListComp = connect(state=>state)(IMApp);


initMessage();
initLogin();

module.exports = IMApp;
