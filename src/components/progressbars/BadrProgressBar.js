import {CustomStyleSheet} from '../../styles/index';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
const buildProgressBar = (color, width) => {
  return <Progress.Bar color={'#009ab2'} indeterminate={true} width={width} />;
};

export default class BadrProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildProgressBar('#009ab2', this.props.width);
  }
}
