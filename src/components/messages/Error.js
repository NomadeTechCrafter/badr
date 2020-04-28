import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {View, Text} from 'react-native';
import * as Progress from 'react-native-progress';
const buildError = (message, style) => {
  return message ? <Text style={style}>{message}</Text> : <View />;
};

export default class BadrErrorMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildError(this.props.message, CustomStyleSheet.errorMessages);
  }
}
