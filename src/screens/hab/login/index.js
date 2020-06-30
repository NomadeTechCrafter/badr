/** React Components */
import React from 'react';
import {View, Dimensions, ScrollView, Linking} from 'react-native';

import {buildRnRoute} from '../../../common/routing';
/** REDUX **/
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
    externalCallMsg: null,
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
      Session.getInstance().setDeviceId(value);
    });
    getManufacturer().then((value) => {
      Session.getInstance().setManufacturer(value);
    });
    Session.getInstance().setSystemVersion(getSystemVersion());
    Session.getInstance().setModel(getModel());
    getDeviceName().then((value) => {
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
    // this.loadOldUserIfExist();
    if (!remote) {
      this.props.navigation.navigate(bootstrapRoute, {
        login: 'AD6203',
      });
    }
    this.initExternalCall();
  }

  initExternalCall = async () => {
    const initialUrl = await Linking.getInitialURL();
    console.log('initial url : ');
    console.log('|__ ' + initialUrl);
    if (initialUrl) {
      let params = this.extractUrlParams(initialUrl);
      console.log(' params : ');
      console.log('|__ ' + params);
      this.setState({login: params.login});
      if (params) {
        this.handleExternalCall(params);
      }
    }
  };

  extractUrlParams = (initialUrl) => {
    let params = {};
    let urlParts = initialUrl.split('?');
    if (urlParts && urlParts.length > 1) {
      let parameters = urlParts[1];
      let paramsParts = parameters.split('&');
      if (paramsParts) {
        paramsParts.forEach((parameter) => {
          let paramsKeyValue = parameter.split('=');
          params[paramsKeyValue[0]] = paramsKeyValue[1];
        });
      }
    }
    return params;
  };

  handleExternalCall = (params) => {
    console.log(params.login);
    Session.getInstance().setLogin(params.login);
    Session.getInstance().setUserObject({
      login: params.login,
      prenomAgent: params.prenomAgent,
      nomAgent: params.nomAgent,
    });
    let route = buildRnRoute(params.cf.replace('cf', ''));
    this.setState({externalCallMsg: 'Calling ' + route + ' ...'});
    this.props.navigation.navigate('Home', {
      screen: route.screen,
      params: route.params,
    });
  };

  loadOldUserIfExist = async () => {
    let user = await loadParsed('user');
    if (user) {
      this.setState({login: user.login});
    }
  };

  render() {
    console.log(this.props.errorMessage);
    return (
      <ScrollView style={CustomStyleSheet.whiteContainer}>
        {this.props.showProgress && <BadrProgressBar width={screenWidth} />}
        <View style={CustomStyleSheet.centerContainer}>
          <BadrLoginHeader />
          <LoginTextInput
            value={this.state.login}
            onChangeText={(text) => this.setState({login: text})}
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

          {this.state.externalCallMsg && (
            <BadrInfoMessage message={this.state.externalCallMsg} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({...state.authReducer});

export default connect(mapStateToProps, null)(Login);
