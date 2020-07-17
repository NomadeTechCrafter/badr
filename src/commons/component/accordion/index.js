import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: props.expanded,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          <Icon
            name={
              this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={30}
            color={'#5E5E5E'}
          />
        </TouchableOpacity>
        {this.state.expanded && (
          <View style={styles.child}>{this.props.children}</View>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
});
