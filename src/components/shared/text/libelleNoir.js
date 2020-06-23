import {CustomStyleSheet} from '../../../styles/index';
import React from 'react';
import {Text} from 'react-native';

export default class BadrLibelleBleu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (

        <Text style={[CustomStyleSheet.badrLibelleNoir, this.props.style]}>
            {this.props.children}
        </Text>
    );
  }
}