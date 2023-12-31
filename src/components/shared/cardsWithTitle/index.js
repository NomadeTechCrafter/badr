import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class CardsWithTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }

  render() {
    return (
      <View>
        <View style={styles.row}>
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
        </View>
        <View style={styles.child}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5E5E5E',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: '#ececec',
  },
  child: {
    flexDirection: 'column',
    padding: 8,
    marginBottom: 10,
  },
});
