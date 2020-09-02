import React from 'react';
import * as Progress from 'react-native-progress';
import {primaryColor} from '../../../styles';

export default class BadrProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.circle ? (
      <Progress.Circle
        style={styles.circleStyle}
        color={primaryColor}
        indeterminate={true}
      />
    ) : (
      <Progress.Bar
        animate={true}
        width={2000}
        color={primaryColor}
        indeterminate={true}
      />
    );
  }
}

const styles = {
  circleStyle: {justifyContent: 'center', alignItems: 'center', padding: 15},
  barStyle: {width: 2000},
};
