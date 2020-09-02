import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {CustomStyleSheet, primaryColor} from '../../../styles';
import {translate} from '../../../i18n/I18nHelper';

export default class BadrCircleProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={
          this.props.style ? this.props.style : styles.defaultProgressStyle
        }>
        <Progress.Circle
          color={primaryColor}
          indeterminate={true}
          size={this.props.size}
        />
        <Text style={CustomStyleSheet.progressbarText}>
          {translate('components.progressbar.loading')}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  defaultProgressStyle: {
    ...CustomStyleSheet.centerContainer,
    backgroundColor: 'transparent',
  },
});
