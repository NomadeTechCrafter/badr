/** React Components */
import React from 'react';
import {View, Dimensions, ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/** REDUX **/
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
/**ACTIONS */
import * as Constants from '../../../common/constants/hab/auth';
import * as authAction from '../../../redux/actions/hab/auth';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

/** Storage **/
import {loadParsed} from '../../../services/storage-service';

/** Loadash **/
import _ from 'lodash';

/** Custom Components */
import {
  LoginTextInput,
  PasswordTextInput,
  BadrLoginHeader,
  BadrProgressBar,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrButton,
} from '../../../components';

import {remote, bootstrapRoute} from '../../../common/config';

/** Inmemory session */
import {Session} from '../../../common/session';

/** Device informations */
import {
  getAndroidId,
  getManufacturer,
  getSystemVersion,
  getModel,
  getDeviceName,
} from 'react-native-device-info';

/** CONSTANTS **/
const screenWidth = Dimensions.get('window').width;

class Login extends React.Component {
  state = {
    login: '',
    password: '',
  };

  handleLogin = () => {
    var action = authAction.request(
      {
        type: Constants.AUTH_LOGIN_REQUEST,
        value: {login: this.state.login, pwd: this.state.password},
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };

  setDeviceInformations = () => {
    getAndroidId().then(value => {
      console.log(value);
      Session.getInstance().setDeviceId(value);
    });
    getManufacturer().then(value => {
      Session.getInstance().setManufacturer(value);
    });
    Session.getInstance().setSystemVersion(getSystemVersion());

    Session.getInstance().setModel(getModel());

    getDeviceName().then(value => {
      Session.getInstance().setDeviceName(value);
    });
  };

  componentDidMount() {
    this.setDeviceInformations();

    var action = authAction.init({
      type: Constants.LOGIN_INIT,
      value: {},
    });
    this.props.dispatch(action);

    this.loadOldUserIfExist();

    if (!remote) {
      this.props.navigation.navigate(bootstrapRoute, {
        login: 'AD6203',
      });
    }
  }

  loadOldUserIfExist = async () => {
    let user = await loadParsed('user');
    if (user) {
      this.setState({login: user.login});
    }
  };

  render() {
    return (
      <ScrollView style={CustomStyleSheet.whiteContainer}>
        {this.props.showProgress && <BadrProgressBar width={screenWidth} />}
        <View style={CustomStyleSheet.centerContainer}>
          <BadrLoginHeader />
          <LoginTextInput
            value={this.state.login}
            onChangeText={text => this.setState({login: text})}
          />
          <PasswordTextInput
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
          />
          <BadrButton
            onPress={this.handleLogin}
            text={translate('login.connexion')}
          />
          {!this.props.loggedIn && this.props.errorMessage != null && (
            <BadrErrorMessage message={this.props.errorMessage} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({...state.authReducer});

export default connect(
  mapStateToProps,
  null,
)(Login);
