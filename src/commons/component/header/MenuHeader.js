import {CustomStyleSheet, accentColor} from '../../styles/index';
import React from 'react';
import {View, ImageBackground, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
/** i18n **/
import {translate} from '../../i18n';

export default class MenuHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground blurRadius={4} style={{...CustomStyleSheet.menuHeader}}>
        <View style={styles.containerStyle}>
          {this.props.children}
          <View style={styles.infoContainer}>
            <Text style={CustomStyleSheet.menuHeaderTitle}>
              {this.props.fullname}
            </Text>
            <Text style={CustomStyleSheet.menuHeaderSubTitle}>
              {translate('menu.bureau')}
              {this.props.bureau}
            </Text>
            <Text style={CustomStyleSheet.menuHeaderSubTitle}>
              {translate('menu.arrondissement')}
              {this.props.arrondissement}
            </Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={this.props.onGoHome}>
              <View style={styles.actionContainer}>
                <Icon
                  name="home"
                  style={styles.iconInput}
                  color={accentColor}
                  size={22}
                />
                <Text style={styles.actionText}>Page principale</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={this.props.onChangeProfile}>
              <View style={styles.actionContainer}>
                <Icon
                  name="users"
                  style={styles.iconInput}
                  color={accentColor}
                  size={20}
                />
                <Text style={styles.actionText}>
                  {translate('menu.change_profile')}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={this.props.onLogout}>
              <View style={styles.actionContainer}>
                <Icon
                  name="sign-out"
                  style={styles.iconInput}
                  color={accentColor}
                  size={22}
                />
                <Text style={styles.actionText}>
                  {this.props.showProgress
                    ? translate('menu.logout_in_progress')
                    : translate('menu.logout')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = {
  actionButton: {
    paddingRight: 5,
    width: '100%',
  },
  actionText: {
    paddingTop: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
    color: 'white',
  },
  infoContainer: {
    flexDirection: 'column',
    paddingLeft: 110,
  },
  containerStyle: {
    ...CustomStyleSheet.menuHeader,
    backgroundColor: 'rgba(0, 154, 178, 1)',
    width: '100%',
    marginTop: -10,
    marginBottom: -20,
    zIndex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  iconInput: {
    paddingTop: 10,
    marginRight: 5,
  },
  actionContainer: {flexDirection: 'row'},
};
