import React from 'react';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor} from '../../styles/index';

export default class BadrActionButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ActionButton buttonColor={primaryColor}>
        <ActionButton.Item
          buttonColor={primaryColor}
          title="Manuelle"
          onPress={() => {}}>
          <Icon name="plus-square" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={primaryColor}
          title="Automatique"
          onPress={() => {}}>
          <Icon name="plus-square" />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}
