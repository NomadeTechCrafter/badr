/** React Components */
import React from 'react';
import {Alert, Linking, ScrollView, TextInput, View} from 'react-native';
import {Button, Title, Modal, Portal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
/** REDUX **/
import {connect} from 'react-redux';
import style from '../style/habLoginStyle';
/**ACTIONS */
import * as LoginConstants from '../state/habLoginConstants';
import * as authAction from '../state/actions/habLoginAction';
/** i18n **/
import {translate} from '../../../../commons/i18n/ComI18nHelper';
/** Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrLoginHeaderComp,
} from '../../../../commons/component';
/** Inmemory session */
import {load} from '../../../../commons/services/async-storage/ComStorageService';
import AutoLoginProcess from '../../../../commons/component/modules/autoLogin/ComAutoLoginProcessComp';
/** Utils */
import ComUtils from '../../../../commons/utils/ComUtils';

class Login extends React.Component {
  state = {
    login: 'YELM',
    password: 'testtest',
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
    ComUtils.setDeviceInformation();
    this.loadOldUserIfExist().then(() => {});
    this.props.initialize();
    this.initAutoLoginParameters().then(() => {});
  }

  handleLogin = (forcerConnexion) => {
    this.props.login(this.state.login, this.state.password, forcerConnexion, "false");
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

          <Portal>
            <Modal
                dismissable={false}
                visible={this.props.showModalUpdateVersion}
                contentContainerStyle={style.containerModal}>
              <Icon
                  name="warning"
                  color={'white'}
                  size={50}
                  style={style.iconModal}
              />
              <Title style={style.textModal}>
                {this.props.msgModalUpdateVersion}
              </Title>
            </Modal>
          </Portal>
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
            {this.props.route.params && this.props.route.params.msg && (
                <ComBadrInfoMessageComp message={this.props.route.params.msg} />
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
    login: (login, password, forcerConnexion, isFromCohabitation) => {
      let action = authAction.request(
          {
            type: LoginConstants.AUTH_LOGIN_REQUEST,
            value: {
              login: login,
              pwd: password,
              forcerConnexion: forcerConnexion,
            isFromCohabitation: isFromCohabitation,
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
