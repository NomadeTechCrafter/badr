/** React Components */
import React from 'react';
import {View, ScrollView} from 'react-native';

/** REDUX **/
import {connect} from 'react-redux';
/**ACTIONS */
import * as Constants from '../../../common/constants/hab/auth';
import * as authAction from '../../../redux/actions/hab/auth';

/** i18n **/
import {translate} from '../../../commons/i18n';

/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

/** Storage **/
import {loadParsed} from '../../../services/storage-service';

/** Custom Components */
import {
  LoginTextInput,
  PasswordTextInput,
  BadrLoginHeader,
  BadrProgressBar,
  BadrErrorMessage,
  BadrButton,
} from '../../../components';

import {remote, bootstrapRoute} from '../../../common/config';

/** Inmemory session */
import {CommonSession} from '../../../commons/services/session/commonSession';

/** Device informations */
import {
  getAndroidId,
  getManufacturer,
  getSystemVersion,
  getModel,
  getDeviceName,
} from 'react-native-device-info';

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
    getAndroidId().then((value) => {
      CommonSession.getInstance().setDeviceId(value);
    });
    getManufacturer().then((value) => {
      CommonSession.getInstance().setManufacturer(value);
    });
    CommonSession.getInstance().setSystemVersion(getSystemVersion());

    CommonSession.getInstance().setModel(getModel());

    getDeviceName().then((value) => {
      CommonSession.getInstance().setDeviceName(value);
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

  onLoginChanged = (text) => {
    this.setState({login: text.toUpperCase()});
  };

  render() {
    return (
      <ScrollView style={CustomStyleSheet.whiteContainer}>
        {this.props.showProgress && <BadrProgressBar />}
        <View style={CustomStyleSheet.centerContainer}>
          <BadrLoginHeader />
          <LoginTextInput
            value={this.state.login}
            onChangeText={(text) => this.onLoginChanged(text)}
          />
          <PasswordTextInput
            onChangeText={(text) => this.setState({password: text})}
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

const mapStateToProps = (state) => ({...state.authReducer});

export default connect(mapStateToProps, null)(Login);
