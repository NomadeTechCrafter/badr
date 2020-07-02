/** React Components */
import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';

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

/** Loadash **/
import _ from 'lodash';

import * as axios from 'axios';

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

    this.loadOldUserIfExist();

    if (!remote) {
      this.props.navigation.navigate(bootstrapRoute, {
        login: 'AD6203',
      });
    }
  }

  // testLogin = async () => {
  //   let instance = axios.create({
  //     baseURL: 'https://badr4.douane.gov.ma/badr',
  //     timeout: 1000,
  //     withCredentials: false,
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //   });

  //   let response = await instance.post(
  //     '/rest/api/login',
  //     '{"login": "AD6203","password": "testtest","forcerConnexion": "true"}',
  //   );

  //   console.log(response.headers);
  // };

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
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({...state.authReducer});

export default connect(mapStateToProps, null)(Login);
