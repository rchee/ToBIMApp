import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Navigator,
  ToastAndroid,
  View,
  Image
} from 'react-native';
import NetWorkHelper from '../../../common/NetWorkHelper';

class ExpressionChooser extends Component {

  static totalExpression = 132;

  static displayExp = 21;

  static defaultProps = {};

  initRoute:array<number>;

  constructor(props) {
    super(props);
    this.initRoute = ( new Array(Math.ceil(ExpressionChooser.totalExpression / ExpressionChooser.displayExp)))
      .join(0).split('').map((ele, index)=> {
        return {index}
      });
  }

  render() {
    return (
      <Navigator
        ref={(navigator) => {this._navigator = navigator;}}
        initialRouteStack={this.initRoute}
        initialRoute={this.initRoute[0]}
        renderScene={this.renderScene}
        onWillFocus={()=>{}}
      />
    );
  }//

  renderScene = (route:object, navigator) => {
    let rowNum = 7;
    let first = route.index * ExpressionChooser.displayExp;
    let currExpIndex = first;
    let rows = [];

    for (let i = 0; i < 3; i++) {
      let newRow = [];
      for (let j = 0; j < 7; j++) {
        currExpIndex++;
        newRow.push(<Image
          key={currExpIndex}
          source={{uri: `${NetWorkHelper.SERVER_ADD}/public/QQexpression/${currExpIndex}.gif`}}
          style={styles.exp}
          resizeMode={'contain'}
        />);
      }
      rows.push(<View key={currExpIndex} style={styles.row}>{newRow}</View>);
    }
    return <View style={styles.main}>
      {rows}
    </View>
  }
}

var styles = StyleSheet.create({
  main: {
    height: 500,
    flex  : 1,
  },
  row : {
    flex         : 1,
    alignItems   : 'center',
    flexDirection: 'row'
  },
  exp : {
    flex     : 1,
    alignSelf: 'center',
    height   : 24,
    width    : 24,
  }
});


module.exports = ExpressionChooser;