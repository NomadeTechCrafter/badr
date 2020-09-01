import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Banner} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {translate} from '../../../i18n/I18nHelper';
import {primaryColor, warnColor, errorColor} from '../../../styles';

const messageTypes = {
  error: {name: 'exclamation-triangle', color: errorColor},
  warn: {name: 'exclamation-triangle', color: warnColor},
  success: {name: 'check', color: primaryColor},
  undefined: {name: 'info-circle', color: primaryColor},
};

class BadrPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  buildContainerStyle = () => {
    return {
      margin: messageTypes[this.props.type] && this.props.visible ? 10 : 0,
    };
  };

  buildBannerStyle = () => {
    return {
      color: 'white',
      borderRadius: this.props.visible ? 20 : 0,
      borderWidth: this.props.visible ? 0.9 : 0.0,
      borderColor: messageTypes[this.props.type].color,
    };
  };

  render() {
    return (
      <View style={this.buildContainerStyle}>
        {messageTypes[this.props.type] && (
          <Banner
            style={this.buildBannerStyle}
            visible={
              this.props.onClosePressed
                ? this.props.visible
                : this.state.visible
            }
            actions={[
              {
                label: translate('transverse.fermer'),
                onPress: () => {
                  this.props.onClosePressed
                    ? this.props.onClosePressed()
                    : this.setState({visible: false});
                },
              },
            ]}
            icon={({size}) => (
              <Icon
                name={messageTypes[this.props.type].name}
                color={messageTypes[this.props.type].color}
                size={40}
              />
            )}>
            <Text> {this.props.message}</Text>
          </Banner>
        )}
      </View>
    );
  }
}

export default BadrPopup;
