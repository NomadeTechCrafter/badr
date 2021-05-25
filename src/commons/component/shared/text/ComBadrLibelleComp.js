import React from 'react';
import {Text} from 'react-native';
import {CustomStyleSheet} from '../../../styles/ComThemeStyle';

export default class ComBadrLibelleComp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text
        style={[
          this.props.withColor
            ? CustomStyleSheet.badrLibelleBleu
            : CustomStyleSheet.badrLibelleNoir,
          this.props.style,
        ]}>
        {this.props.children}
      </Text>
    );
  }
}
