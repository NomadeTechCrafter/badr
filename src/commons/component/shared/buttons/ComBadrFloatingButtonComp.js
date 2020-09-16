import React from 'react';
import {View, Text} from 'react-native';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor, accentColor} from '../../../styles/theme';

export default class ComBadrFloatingButtonComp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {this.props.visible && (
          <FAB
            buttonColor={primaryColor}
            iconTextColor={accentColor}
            onClickAction={this.props.onConfirm}
            // visible={this.props.visible}
            disabled={true}
            iconTextComponent={
              this.props.text ? (
                <Text>{this.props.text}</Text>
              ) : (
                <Icon name={this.props.icon} />
              )
            }
          />
        )}
      </View>
    );
  }
}
