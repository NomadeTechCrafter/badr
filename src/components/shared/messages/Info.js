import {CustomStyleSheet} from '../../../styles/index';
import React from 'react';
import {Text} from 'react-native';

import * as Animatable from 'react-native-animatable';

const buildInfo = (message, style) => {
  return (
    <Animatable.View
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
      style={styles.animatableStyle}>
      <Text style={style}>{message}</Text>
    </Animatable.View>
  );
};

class BadrInfoMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildInfo(this.props.message, {
      ...CustomStyleSheet.infoMessages,
    });
  }
}

BadrInfoMessage = Animatable.createAnimatableComponent(BadrInfoMessage);
export default BadrInfoMessage;

const styles = {
  animatableStyle: {
    textAlign: 'center',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
