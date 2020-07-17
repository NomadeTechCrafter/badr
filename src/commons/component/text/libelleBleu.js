import React from 'react';
import {Text} from 'react-native';
import {CustomStyleSheet} from '../../styles/index';

export default class BadrLibelleBleu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Text style={[CustomStyleSheet.badrLibelleBleu, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}
