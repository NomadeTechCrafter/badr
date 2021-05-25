import React from 'react';
import {Text, StyleSheet} from 'react-native';
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
        {this.props.isRequired && <Text style={styles.required}> * </Text>}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  required: {
    fontWeight: 'bold',
    color: '#F00',
  },
});
