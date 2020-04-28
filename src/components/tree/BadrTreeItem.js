import get from 'lodash.get';
import PropTypes from 'prop-types';
import React from 'react';
import {Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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


  render() {
    return (
      <View style={{height: 60}}>
        <Divider style={{backgroundColor: '#009ab2'}} />
        <Text
          style={{
            paddingTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 10,
            fontSize: this.props.hasChildrenNodes ? 14 : 13,
            marginLeft: 25 * this.props.level,
          }}>
          {getIndicator(this.props.isExpanded, this.props.hasChildrenNodes)}
          {'  '}
          {this.props.node.libelleFonctionnalite}
        </Text>
      </View>
    );
  }
}

export default BadrTreeItem;
