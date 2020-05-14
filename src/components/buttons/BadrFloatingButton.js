import React from 'react';

import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor, accentColor} from '../../styles/index';

export default class BadrFloatingButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      this.props.visible && (
        <FAB
          buttonColor={primaryColor}
          iconTextColor={accentColor}
          onClickAction={this.props.onConfirm}
          // visible={this.props.visible}
          disabled={true}
          iconTextComponent={<Icon name={this.props.icon} />}
        />
      )
    );
  }
}
