/** React Components */
import React from 'react';
import {View, ScrollView, TextInput, Linking, Alert} from 'react-native';
import {Button} from 'react-native-paper';
/** REDUX **/
import {connect} from 'react-redux';
import style from '../style/habLoginStyle';
/**ACTIONS */
import * as LoginConstants from '../state/habLoginConstants';
import * as authAction from '../state/actions/habLoginAction';

/** i18n **/
import {translate} from '../../../../commons/i18n/I18nHelper';

/** Custom Components */
import {ComBadrLoginHeaderComp, ComBadrErrorMessageComp} from '../../../../commons/component';

/** Inmemory session */
import {load} from '../../../../commons/services/async-storage/StorageService';
import AutoLoginProcess from '../../../../commons/component/modules/autoLogin/ComAutoLoginProcessComp';
/** Utils */
import Utils from '../../../../commons/utils/Util';

class Login extends React.Component {
  state = {
    login: '',
    password: '',
    startAutoLogin: false,
    autoLoginParam: {},
  };

  /*
   Constructor
  */
  constructor(props) {
    super(props);
  }

  /*
   componentDidMount Initialization
   */
  componentDidMount() {
    Utils.setDeviceInformation();
    this.loadOldUserIfExist().then(() => {});
    this.props.initialize();
    this.initAutoLoginParameters().then(() => {});
  }

  handleLogin = (forcerConnexion) => {
    this.props.login(this.state.login, this.state.password, forcerConnexion);
  };

  initAutoLoginParameters = async () => {
    const initialUrl = await Linking.getInitialURL();
    let params = this.extractUrlParams(initialUrl);
    if (Object.keys(params).length > 0) {
      this.setState({startAutoLogin: true, autoLoginParam: params});
    }
  };

  loadOldUserIfExist = async () => {
    let user = await load('user', true);
    if (user) {
      this.setState({login: user.login});
    }
  };
  onLoginChanged = (text) => {
    this.setState({login: text.toUpperCase()});
  };

  extractUrlParams = (initialUrl) => {
    let params = {};
    if (initialUrl) {
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
    }
    return params;
  };
  render() {
    return (
      <ScrollView style={style.container}>
        {/* {this.props.showProgress && <SmartLoader />} */}
        <View style={style.loginBlock}>
          <ComBadrLoginHeaderComp />
          <View style={style.textInputContainer}>
            <TextInput
              value={this.state.login}
              autoCapitalize="characters"
              style={style.textInput}
              placeholder={translate('userName')}
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
              placeholder={translate('password')}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>
          <Button
            loading={this.props.showProgress}
            mode="contained"
            style={style.loginButton}
            onPress={() => this.handleLogin(false)}>
            {translate('connexion')}
          </Button>
          {!this.props.loggedIn &&
            this.props.errorMessage != null &&
            this.props.errorMessage !== '2' && (
              <ComBadrErrorMessageComp message={this.props.errorMessage} />
            )}
          {!this.props.loggedIn &&
            this.props.errorMessage === '2' &&
            Alert.alert(
              translate('alreadyLogged.title'),
              translate('alreadyLogged.message'),
              [
                {
                  text: translate('alreadyLogged.cancel'),
                  onPress: () => {},
                  style: translate('alreadyLogged.cancel'),
                },
                {
                  text: translate('alreadyLogged.connect'),
                  onPress: () => this.handleLogin(true),
                },
              ],
              {cancelable: false},
            )}
        </View>
        {this.state.startAutoLogin && (
          <AutoLoginProcess
            navigation={this.props.navigation}
            usr={this.state.autoLoginParam.login}
            password={this.state.autoLoginParam.password}
            smsCode={this.state.autoLoginParam.codeSms}
            bureau={this.state.autoLoginParam.bureau}
            bureauCode={this.state.autoLoginParam.codeBureau}
            arrondissement={this.state.autoLoginParam.arrondissement}
            arrondissementCode={this.state.autoLoginParam.codeArrondissement}
            profiles={JSON.parse(this.state.autoLoginParam.profiles)}
          />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({...state.loginReducer});

const mapDispatchToProps = (dispatch, props) => {
  return {
    login: (login, password, forcerConnexion) => {
      let action = authAction.request(
        {
          type: LoginConstants.AUTH_LOGIN_REQUEST,
          value: {
            login: login,
            pwd: password,
            forcerConnexion: forcerConnexion,
          },
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
