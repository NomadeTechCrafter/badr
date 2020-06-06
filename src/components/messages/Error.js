import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {View, Text} from 'react-native';
import * as Progress from 'react-native-progress';

import * as Animatable from 'react-native-animatable';

const buildError = (message, style) => {
  return message ? <Text style={style}>{message}</Text> : <View />;
};

class BadrErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Animatable.View
        animation={this.props.pulse ? 'pulse' : 'flipInX'}
        easing="ease-out"
        iterationCount={this.props.pulse ? 'infinite' : 1}
        style={[{textAlign: 'center'}, this.props.style]}>
        {buildError(this.props.message, CustomStyleSheet.errorMessages)}
      </Animatable.View>
    );
  }
}

BadrErrorMessage = Animatable.createAnimatableComponent(BadrErrorMessage);
export default BadrErrorMessage;
