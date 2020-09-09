import React from 'react';
import {Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {CustomStyleSheet} from '../../../styles';

export default class BadrInfoMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Animatable.View
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={styles.animatableStyle}>
        <Text style={CustomStyleSheet.infoMessages}>{this.props.message}</Text>
      </Animatable.View>
    );
  }
}

BadrInfoMessage = Animatable.createAnimatableComponent(BadrInfoMessage);

const styles = {
  animatableStyle: {
    textAlign: 'center',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
