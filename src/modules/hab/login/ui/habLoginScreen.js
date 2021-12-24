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
    login: '',
    password: '',
    startAutoLogin: true,
    autoLoginParam: {
      login: 'AD6311',
      password: 'Testtest1*',
      codeSms: '000000',
      bureau: '309',
      codeBureau: '309',
      codeArrondissement: '309',
      arrondissement: '309',
      profiles: [
        // "0", "AAMAX", "AB", "PRO TEST",
        "ACTIFS_AD", "ACTIFS" //, "ALL"
      //   "AR", "ADMINBV",
      //   "ADMSELCOT", "ADT", "AGBRIGADE", "AGDP", "AGENTD", "AGECOR", "AGENT_TEST", "AV",
        // "AG_VISIT", "AGLACI", "ALLPROFIL", "ALL", "ALLPRO", "A123", "AMAL2015", "AMAL-PRO",
      //   "AMMARI", "AMPROF", "ARABBANK", "AT_A_BORD", "AT_VOY", "AT1", "PIF", "TESTAUDI1",
      //   "BATCH", "BLOCAGE", "BROF", "CB-PROFIL", "CAUTION-BA", "CC2015", "CENTRAL", "CHAR", "ETAT",
      //   "CHBRIGADE", "CIMET", "CNF_PROFIL", "CNT-AGENT", "CNT_DEV", "CNT-ORD", "CNT_PERF", "CR3",
      //   "CNT_RECETT", "CODE C", "E00596", "CODEREF2", "CONSULTCTR", "MCV-MCV", "CST", "ANQ", "MCV-CONSUL",
      //   "CNF", "CONT_CTRL", "CONTROL ", "CTRL", "CTRL_I", "DECINT", "MCV-DECVIE", "DECA1", "ROY_DEC", "TRIPTIQUE",
      //   "DECOUP_P10", "DECOUP_P15", "DECOUP_P16", "DECOUP_P7", "DECOUP_P8", "DECTNI", "DED12", "DED13", "DED3",
      //   "DED-TEST", "DEPO", "AJOUTERTES", "AJOUTERTER", "ECOR_IMPOR", "EID", "YYY", "ELN", "ENQ", "ENTPARAM",
      //   "FFFF", "FORCER_CD", "FORM_PRO1", "FORM_PRO2", "FORM_PRO3", "FORM_PRO9", "CD145", "GEST_AUTO", "GESTDEC",
      //   "GESACCESS", "GESAGDOUAN", "PF-CAUTION", "GEST_ENQ", "GESNAVIRES", "PGOE", "PROCURAT", "GIB", "HABPRODEL",
      //   "IMANLIQ", "INFO", "INSGC", "ISVAL", "INSP_VENTE", "INSVEX", "INSVI", "INTRVNT", "KHALID", "CODEP1",
      //   "CODE155555", "CODE111111", "CODEP", "RADPROF", "LIQJSF", "LIQREFREC", "LIQ-TEST", "LSTRI-AT", "MA",
      //   "MLV", "MCV", "MCV-REC1", "MCV-REDSCP", "MCV-ORD", "MCV-REC", "MCV-AGORD", "MCV-CONS", "MCV-GESREF",
      //   "MFB", "MYPROFIL", "MOYTRANS", "NETHAH", "T2", "NEW_PROFIL", "OPDECTEST", "OPDECL", "OPRDEC", "OUBEDDAAG1",
      //   "OUBEDDADEC", "PERSO_BLOQ", "PF DECLARA", "PFDECLARA", "PFTRANSIT", "PFKARIM", "PFREFCT15", "PF_TEST_DE",
      //   "PROTESTCEN", "PRNONCENT", "MOB", "PRO_AT", "PROCTRL", "PRO_CNT", "PROFADMIN", "PROFB", "PROFD", "NEWPROFIL",
      //   "DEMAT", "PF PEC ", "PRO_MVT", "PF141212", "CTRLML", "REGIME", "OPTESTT", "TEST2", "PROFILEDI", "PROF_LPC",
      //   "PROFT", "PROFTEST2", "PROJ_LPC", "PRO_MCV", "PRO_T6BIS", "OPE-PROV", "PRO_YELM", "HELLP", "HELLOP", "REFAC3",
      //   "REFAC5", "PROSOFR", "REFACT9", "REFACTOR45", "REFCAT15", "REF-ETAT", "REF-ETAT-1", "RESP_GESCP", "RESP_EXPOR",
      //   "RESP_IMPOR", "SC-P", "SDEV_PRO", "TESTTES2", "SELCOT-EC", "PF SELECT", "SIGNDTP", "SIGNATURE", "SIGN_DEC",
      //   "TST BTC", "TSTBTCDED", "TDP", "TEST_DEC1", "TESTDEP", "TESTDUM", "TEST ENCOD", "TST_LEGISL", "TESTHABILI",
      //   "PECETDC", "TESTMCI", "VEHVOL", "TEST_30", "TESTAG3", "TESTAG4_PR", "TEST-CBAN", "TESTDUM222", "TESTJSF1",
      //   "TESTLISTEA", "TESTMP", "TESTPM", "TESTPRO", "PROFILAM", "TEST1", "TESTR", "TESTSOFR4", "TESTSOFR7", "TESTSOFR9",
      //   "TESTSOF8", "TESTSSO", "TESTAAA", "TEST001", "TEST0012", "TEST001254", "TEST003", "545454", "TEST11", "TEST19",
      //   "TEST2018", "TEST2021", "TEST2090", "TEST24", "TEST90", "TNRPROF", "TOUS", "TRANS", "TT", "PFTRANSPO", "TR", "TRY",
      //   "TRYP_AGENT", "TRYP_DECL", "TRYP_C", "TRYPTIQUE", "T6BIS", "T6BIS12", "VE_VE", "VIDPRO"
      ]
    },
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
                  profiles={this.state.autoLoginParam.profiles}
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
