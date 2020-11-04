import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {darkGris, lightGris, primaryColor} from '../../../styles/ComThemeStyle';
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
          style={styles.row}
          onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          {this.props.extraFieldKey && (
            <Text style={[styles.titleExtrafield]}>
              {this.props.extraFieldKey} : {this.props.extraFieldValue}
            </Text>
          )}
          <Icon
            name={
              this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
            }
            size={30}
            color={darkGris}
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
    color: darkGris,
  },
  titleExtrafield: {
    fontSize: 14,
    fontWeight: 'bold',
    color: primaryColor,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: lightGris,
  },
  child: {
    flexDirection: 'column',
    padding: 10,
  },
});
