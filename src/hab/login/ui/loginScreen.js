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

import style from '../style/loginStyle';
/**ACTIONS */
import * as LoginConstants from '../state/loginConstants';
import * as authAction from '../state/actions/loginAction';

/** i18n **/
import {translate} from '../../../common/translations/i18n';

/** Storage **/
import {loadParsed} from '../../../services/storage-service';

/** Custom Components */
import {
  BadrLoginHeader,
  BadrProgressBar,
  BadrErrorMessage,
} from '../../../components';

/** Inmemory session */
import {Session} from '../../../common/session';

class Login extends React.Component {
  state = {
    login: '',
    password: '',
  };

  handleLogin = () => {
    this.props.login(this.state.login, this.state.password);
  };

  setDeviceInformations = () => {
    Session.getInstance().setSystemVersion(getSystemVersion());
    Session.getInstance().setModel(getModel());
    getAndroidId().then((value) => {
      Session.getInstance().setDeviceId(value);
    });
    getManufacturer().then((value) => {
      Session.getInstance().setManufacturer(value);
    });
    getDeviceName().then((value) => {
      Session.getInstance().setDeviceName(value);
    });
  };

  componentDidMount() {
    this.setDeviceInformations();
    this.loadOldUserIfExist();
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
        {this.props.showProgress && <SmartLoader />}

        <View style={style.loginBlock}>
          <BadrLoginHeader />
          <View style={style.textInputContainer}>
            <TextInput
              value={this.props.value}
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
            <BadrErrorMessage message={this.props.errorMessage} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorHolder: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const SmartLoader = (props) => {
  const {isLoading} = props;
  return (
    <Modal
      transparent
      animationType={'none'}
      visible={isLoading}
      onRequestClose={() => {}}>
      <BadrProgressBar />
      <View style={styles.modalBackground}></View>
    </Modal>
  );
};

const mapStateToProps = (state) => ({...state.loginReducer});

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (login, password) => {
      var action = authAction.request(
        {
          type: LoginConstants.AUTH_LOGIN_REQUEST,
          value: {login: login, pwd: password},
        },
        props.navigation,
      );
      dispatch(action);
    },
    initialize: () => {
      var action = authAction.init({
        type: LoginConstants.LOGIN_INIT,
        value: {},
      });
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
