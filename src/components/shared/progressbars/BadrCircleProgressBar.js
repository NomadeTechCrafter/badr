import {CustomStyleSheet, primaryColor} from '../../../styles/index';
import React from 'react';
import {Text, View} from 'react-native';
import * as Progress from 'react-native-progress';

import {translate} from '../../../common/translations/i18n';
const buildProgressBar = (color, size, style) => {
  return (
    <View
      style={
        style
          ? style
          : {
              ...CustomStyleSheet.centerContainer,
              backgroundColor: 'transparent',
            }
      }>
      <Progress.Circle color={primaryColor} indeterminate={true} size={size} />
      <Text style={CustomStyleSheet.progressbarText}>
        {translate('components.progressbar.loading')}
      </Text>
    </View>
  );
};

export default class BadrCircleProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildProgressBar('#009ab2', this.props.size, this.props.style);
  }
}
