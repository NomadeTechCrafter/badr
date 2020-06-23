import React from 'react';
import {Text, View} from 'react-native';
import {Banner} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {translate} from '../../../common/translations/i18n';

import {primaryColor, warnColor, errorColor} from '../../../styles/index';

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

  render() {
    return (
      <View
        style={{
          margin: messageTypes[this.props.type] && this.props.visible ? 10 : 0,
        }}>
        {messageTypes[this.props.type] && (
          <Banner
            style={{
              color: 'white',
              borderRadius: this.props.visible ? 20 : 0,
              borderWidth: this.props.visible ? 0.9 : 0.0,
              borderColor: messageTypes[this.props.type].color,
            }}
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
