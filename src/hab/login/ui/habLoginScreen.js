/** React Components */
import React from 'react';
import {View, ScrollView, TextInput, Modal, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
/** REDUX **/
import {connect} from 'react-redux';
/** Device informations */
import {
  getAndroidId,
  getManufacturer,
  getSystemVersion,
  getModel,
  getDeviceName,
} from 'react-native-device-info';

import style from '../style/habLoginStyle';
/**ACTIONS */
import * as LoginConstants from '../state/habLoginConstants';
import * as authAction from '../state/actions/habLoginAction';

/** i18n **/
import {translate} from '../../../commons/i18n';

/** Custom Components */
import {
  BadrLoginHeader,
  BadrErrorMessage,
} from '../../../components';

/** Inmemory session */
import {loadParsed} from '../../../commons/services/async-storage/storage-service';
import {CommonSession} from '../../../commons/services/session/commonSession';

class Login extends React.Component {
  state = {
    login: '',
    password: '',
  };

  handleLogin = () => {
    this.props.login(this.state.login, this.state.password);
  };

  setDeviceInformation = () => {
    CommonSession.getInstance().setSystemVersion(getSystemVersion());
    CommonSession.getInstance().setModel(getModel());
    getAndroidId().then((value) => {
      CommonSession.getInstance().setDeviceId(value);
    });
    getManufacturer().then((value) => {
      CommonSession.getInstance().setManufacturer(value);
    });
    getDeviceName().then((value) => {
      CommonSession.getInstance().setDeviceName(value);
    });
  };

  componentDidMount() {
    this.setDeviceInformation();
    this.loadOldUserIfExist().then(() => console.log('user loaded with no errors.'));
    this.props.initialize();
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
      <ScrollView style={style.container}>
        {/* {this.props.showProgress && <SmartLoader />} */}

        <View style={style.loginBlock}>
          <BadrLoginHeader/>
          <View style={style.textInputContainer}>
            <TextInput
              value={this.state.login}
              autoCapitalize="characters"
              style={style.textInput}
              placeholder={translate('login.userName')}
              onChangeText={(text) => this.onLoginChanged(text)}
              secureTextEntry={false}
            />
          </View>
          <View style={style.textInputContainer}>
            <TextInput
              value={this.state.password}
              style={style.textInput}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder={translate('login.password')}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>
          <Button
            loading={this.props.showProgress}
            mode="contained"
            style={style.loginButton}
            onPress={this.handleLogin}>
            {translate('connexion')}
          </Button>
          {!this.props.loggedIn && this.props.errorMessage != null && (
            <BadrErrorMessage message={this.props.errorMessage}/>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({...state.loginReducer});

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (login, password) => {
      let action = authAction.request(
        {
          type: LoginConstants.AUTH_LOGIN_REQUEST,
          value: {login: login, pwd: password},
        },
        props.navigation,
      );
      dispatch(action);
    },
    initialize: () => {
      let action = authAction.init({
        type: LoginConstants.LOGIN_INIT,
        value: {},
      });
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
