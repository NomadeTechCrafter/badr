import {CustomStyleSheet, primaryColor} from '../../styles/index';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';

import { translate } from "../../common/translations/i18n";
const buildProgressBar = (color, size) => {
  return (
    <View style={CustomStyleSheet.centerContainer}>
      <Progress.Circle
        color={primaryColor}
        indeterminate={true}
        size={size}
      />
      <Text style={CustomStyleSheet.progressbarText}>{translate('components.progressbar.loading')}</Text>
    </View>
  );
};

export class BadrCircleProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return buildProgressBar('#009ab2', this.props.size);
  }
}
