import {CustomStyleSheet} from '../../../styles';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

export default class BadrButtonIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button
        onPress={this.props.onPress}
        mode="contained"
        icon={this.props.icon}
        dark={true}
        loading={this.props.loading}
        compact={this.props.compact}
        labelStyle={styles.whiteColor}
        disabled={this.props.compact}
        style={
          this.props.style ? this.props.style : CustomStyleSheet.badrButtonIcon
        }>
        {this.props.text}
      </Button>
    );
  }
}
const styles = StyleSheet.create({
  whiteColor: {
    color: 'white',
  },
});
