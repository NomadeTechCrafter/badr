import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {darkGris, lightBlue, lightGris} from '../../../styles/theme';
import {lightBlue50} from 'react-native-paper/src/styles/colors';
export default class ComBadrDetailAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  render() {
    return this.props.visible ? (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text></Text>
          <TouchableOpacity
            onPress={() => {
              this.props.onClose();
            }}>
            <Icon name={'close'} size={30} color={darkGris} />
          </TouchableOpacity>
        </View>
        <View style={styles.child}>{this.props.children}</View>
      </View>
    ) : (
      <></>
    );
  }

  toggleExpand = () => {
    this.setState({expanded: !this.state.expanded});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: darkGris,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: lightBlue50,
  },
  child: {
    flex: 1,
    flexDirection: 'column',
  },
});
