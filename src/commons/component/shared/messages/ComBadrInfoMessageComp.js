import React from 'react';
import {Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {CustomStyleSheet} from '../../../styles/ComThemeStyle';

export default class ComBadrInfoMessageComp extends React.Component {
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

ComBadrInfoMessageComp = Animatable.createAnimatableComponent(
  ComBadrInfoMessageComp,
);

const styles = {
  animatableStyle: {
    textAlign: 'center',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
