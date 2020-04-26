import React from 'react';

import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor, accentColor} from '../../styles/index';

export class BadrFloatingButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FAB
        buttonColor={primaryColor}
        iconTextColor={accentColor}
        onClickAction={this.props.onConfirm}
        visible={true}
        iconTextComponent={<Icon name="check" />}
      />
    );
  }
}
