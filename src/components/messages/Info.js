import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {Text} from 'react-native';
import * as Progress from 'react-native-progress';
const buildInfo = (message, style) => {
  return <Text style={style}>{message}</Text>;
};

export class BadrInfoMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildInfo(this.props.message, CustomStyleSheet.infoMessages);
  }
}
