import React from 'react';
import * as Progress from 'react-native-progress';
const buildProgressBar = (color, circle) => {
  return circle ? (
    <Progress.Circle
      style={styles.circleStyle}
      color={'#009ab2'}
      indeterminate={true}
    />
  ) : (
    <Progress.Bar
      animate={true}
      width={2000}
      color={'#009ab2'}
      indeterminate={true}
    />
  );
};

export default class BadrProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildProgressBar('#009ab2', this.props.circle);
  }
}

const styles = {
  circleStyle: {justifyContent: 'center', alignItems: 'center', padding: 15},
  barStyle: {width: 2000},
};
