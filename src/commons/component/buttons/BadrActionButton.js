import React from 'react';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor, accentColor} from '../../styles/index';

export default class BadrActionButton extends React.Component {
  constructor(props) {
    super(props);
  }
  renderIcon = () => {
    return <Icon name="ellipsis-v" size={20} color={accentColor} />;
  };

  render() {
    return this.props.visible ? (
      <ActionButton
        style={this.props.style}
        renderIcon={this.renderIcon}
        size={50}
        backgroundTappable={true}
        buttonColor={primaryColor}
        active={this.props.active}>
        {this.props.actions.map((action) => (
          <ActionButton.Item
            buttonColor={primaryColor}
            color
            title={action.title}
            onPress={() => action.onActionPressed()}>
            <Icon color={accentColor} size={20} name={action.icon} />
          </ActionButton.Item>
        ))}
      </ActionButton>
    ) : (
      <View />
    );
  }
}
