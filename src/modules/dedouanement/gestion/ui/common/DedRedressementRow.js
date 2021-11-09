import React from 'react';
import {View} from 'react-native';
import styles from '../../style/DedRedressementStyle';
class DedRedressementRow extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <View style={this.props.zebra ? styles.zRow : styles.row}>
        {this.props.children}
      </View>
    );
  }
}

export default DedRedressementRow;
