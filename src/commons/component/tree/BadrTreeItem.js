import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor} from '../../styles/index';
function getIndicator(isExpanded, hasChildrenNodes) {
  if (!hasChildrenNodes) {
    return <Icon name="circle" size={8} />;
  } else if (isExpanded) {
    return <Icon name="angle-down" size={20} />;
  } else {
    return <Icon name="angle-right" size={20} />;
  }
}

class BadrTreeItem extends React.Component {
  buildFontSize = () => {
    return {fontSize: this.props.hasChildrenNodes ? 14 : 13};
  };

  buildMarginLeft = () => {
    return {marginLeft: 25 * this.props.level};
  };
  render() {
    return (
      <View style={styles.container}>
        <Divider style={styles.dividerStyle} />
        <Text
          style={
            (styles.treeItemTextStyle,
            this.buildFontSize(),
            this.buildMarginLeft())
          }>
          {getIndicator(this.props.isExpanded, this.props.hasChildrenNodes)}
          {'  '}
          {this.props.node.libelleFonctionnalite}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {height: 60},
  treeItemTextStyle: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dividerStyle: {backgroundColor: primaryColor},
});

export default BadrTreeItem;
