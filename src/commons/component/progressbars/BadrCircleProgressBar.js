import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {CustomStyleSheet, primaryColor} from '../../styles/index';
import {translate} from '../../i18n';

const buildProgressBar = (size, style) => {
  return (
    <View style={style ? style : styles.defaultProgressStyle}>
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
    return buildProgressBar(this.props.size, this.props.style);
  }
}

const styles = StyleSheet.create({
  defaultProgressStyle: {
    ...CustomStyleSheet.centerContainer,
    backgroundColor: 'transparent',
  },
});
