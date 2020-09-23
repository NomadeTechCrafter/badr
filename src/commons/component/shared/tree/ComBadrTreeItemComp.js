import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryBackgroundColor} from '../../../styles/ComColorsStyle';

export default class ComBadrTreeItemComp extends React.Component {
  getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      return <Icon name="circle" size={8} />;
    } else if (isExpanded) {
      return <Icon name="angle-down" size={20} />;
    } else {
      return <Icon name="angle-right" size={20} />;
    }
  };

  render() {
    const textStyle = {
      fontSize: this.props.hasChildrenNodes ? 14 : 13,
      marginLeft: 25 * this.props.level,
    };
    return (
      <View style={styles.ViewHeight}>
        <Divider style={primaryBackgroundColor} />
        <Text style={[styles.textStyle, textStyle]}>
          {this.getIndicator(
            this.props.isExpanded,
            this.props.hasChildrenNodes,
          )}
          {'  '}
          {this.props.node.libelleFonctionnalite}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewHeight: {
    height: 60,
  },
  textStyle: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});