import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  darkGris,
  lightGris,
  primaryColor,
  accentColor,
} from '../../../styles/ComThemeStyle';
export default class ComAccordionComp extends Component {
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
          style={[
            styles.row,
            this.props.badr ? styles.rowPrimary : styles.rowLightGris,
          ]}
          onPress={() => this.toggleExpand()}>
          <Text
            style={[
              styles.title,
              styles.font,
              this.props.badr ? styles.titleWhite : styles.titleGris,
            ]}>
            {this.props.title}
          </Text>
          <Icon
            color={this.props.badr ? accentColor : darkGris}
            name={
              this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={30}
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
  },
  titleGris: {
    color: darkGris,
  },
  titleExtrafield: {
    fontSize: 14,
    fontWeight: 'bold',
    color: primaryColor,
  },
  titleWhite: {
    color: accentColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
  },
  rowLightGris: {
    backgroundColor: lightGris,
    height: 56,
  },
  rowPrimary: {
    backgroundColor: primaryColor,
    height: 46,
  },
  child: {
    flexDirection: 'column',
    padding: 10,
  },
});
