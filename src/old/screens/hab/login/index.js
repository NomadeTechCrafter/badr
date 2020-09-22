/** React Components */
import React from 'react';
import {View, ScrollView} from 'react-native';

/** REDUX **/
import {connect} from 'react-redux';
/**ACTIONS */
import * as Constants from '../../../common/constants/hab/auth';
import * as authAction from '../../../redux/actions/hab/auth';

/** i18n **/
import {translate} from '../../../../commons/i18n/ComI18nHelper';

/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

/** Storage **/
import {loadParsed} from '../../../services/storage-service';

/** Custom Components */
import {
  ComBadrLoginTextInputComp,
  ComBadrPasswordTextInputComp,
  ComBadrLoginHeaderComp,
  ComBadrProgressBarComp,
  ComBadrErrorMessageComp,
  ComBadrButtonComp,
} from '../../../components';

import {remote, bootstrapRoute} from '../../../common/config';

/** Inmemory session */
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';

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
      ComSessionService.getInstance().setDeviceId(value);
    });
    getManufacturer().then((value) => {
      ComSessionService.getInstance().setManufacturer(value);
    });
    ComSessionService.getInstance().setSystemVersion(getSystemVersion());

    ComSessionService.getInstance().setModel(getModel());

    getDeviceName().then((value) => {
      ComSessionService.getInstance().setDeviceName(value);
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
        {this.props.showProgress && <ComBadrProgressBarComp />}
        <View style={CustomStyleSheet.centerContainer}>
          <ComBadrLoginHeaderComp />
          <ComBadrLoginTextInputComp
            value={this.state.login}
            onChangeText={(text) => this.onLoginChanged(text)}
          />
          <ComBadrPasswordTextInputComp
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
          />
          <ComBadrButtonComp
            onPress={this.handleLogin}
            text={translate('login.connexion')}
          />
          {!this.props.loggedIn && this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({...state.authReducer});

export default connect(mapStateToProps, null)(Login);
