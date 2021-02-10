import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
/** React Components */
import {View, ScrollView, Linking, Image} from 'react-native';

import {Col, Grid} from 'react-native-easy-grid';
import RNExitApp from 'react-native-exit-app';
import * as Zxing from '../../../../commons/native/ComZxingNative';

/** Custom Components */
import {
  ComBadrTreeComp,
  ComBadrTreeItemComp,
  ComMenuHeaderComp,
} from '../../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';
import * as menuAction from '../state/actions/habMainMenuAction';
import * as Constants from '../state/habMainMenuConstants';
import * as qrCodeAction from '../../../../commons/state/actions/ComQrCodeAction';
import * as qrCodeConstants from '../../../../commons/constants/components/ComQrCodeConstants';
import * as authAction from '../../login/state/actions/habLoginAction';
import * as LoginConstants from '../../login/state/habLoginConstants';

/** STYLING **/
import {
  CustomStyleSheet,
  primaryColor,
  accentColor,
} from '../../../../commons/styles/ComThemeStyle';
import style from '../style/habMainMenuStyle';

import {buildRouteWithParams} from '../../../../commons/Routing';

/** Utils */
import ComUtils from '../../../../commons/utils/ComUtils';

/** Inmemory session */
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';
import habLoginApi from '../../login/service/api/habLoginApi';

class habMainMenuScreen extends React.Component {
  /*
   Constructor
 */
  constructor(props) {
    super(props);
    this.state = {
      login: ComSessionService.getInstance().getLogin(),
      fullname: ComUtils.buildUserFullname(
        ComSessionService.getInstance().getUserObject(),
      ),
      bureau: ComSessionService.getInstance().getNomBureauDouane(),
      arrondissement: ComSessionService.getInstance().getLibelleArrondissement(),
    };
  }
  /*
   componentDidMount Initialization
   */
  componentDidMount() {
    this.fetchMenu();
    if (this.props.navigation) {
      this.props.navigation.toggleDrawer();
    }
  }

  fetchMenu = (predicate) => {
    let action = menuAction.request({
      type: Constants.MENU_REQUEST,
      value: {
        predicate: predicate,
      },
    });
    this.props.dispatch(action);
  };
  /**lancer intent sur l'application Ionic avec le chargment du data requise */
  openIntent = async (id) => {
    let url = `badrio://ma.adii.badrmobile?login=${ComSessionService.getInstance().getLogin()}
      &route=${id}
      &fonctionalite=${id}
      &password=${ComSessionService.getInstance().getPassword()}
      &profiles=${JSON.stringify(ComSessionService.getInstance().getProfiles())}
      &bureau=${ComSessionService.getInstance().getNomBureauDouane()}
      &codeBureau=${ComSessionService.getInstance().getCodeBureau()}
      &arrondissement=${ComSessionService.getInstance().getLibelleArrondissement()}
      &codeArrondissement=${ComSessionService.getInstance().getCodeArrondissement()}
      &uuid=${ComSessionService.getInstance().getDeviceId()}
      &manifacturer=${ComSessionService.getInstance().getManufacturer()}
      &model=${ComSessionService.getInstance().getModel()}
      &platform=${ComSessionService.getInstance().getPlatform()}
      &version=${ComSessionService.getInstance().getSystemVersion()}
      &codeSmsVerify=${ComSessionService.getInstance().getCodeSmsVerify()}`;
    console.log('switch to ionic App', url);
    return await Linking.openURL(url);
  };

  onItemSelected = (item) => {
    if (this.props.navigation) {
      let route = buildRouteWithParams(item.id);
      console.log('onItemSelected route', route);
      ComSessionService.getInstance().setFonctionalite(
        item.fon_VAR_CODEFONCTIONALITE,
      );
      if (route) {
          console.log('route RN', route);
        if (route.params.qr) {
          Zxing.default.showQrReader(this.onBarcodeRead);
        }
        this.props.navigation.navigate(route.screen, route.params);
      } else {
          console.log('route IONIC', route);
        this.openIntent(item.id).then((resp) => {
          habLoginApi.logout().then((logoutResponse) => {
            RNExitApp.exitApp();
          });
        });
      }
    }
  };
  /** action de lecture de QrCode*/
  onBarcodeRead = (data) => {
    if (data) {
      let action = qrCodeAction.request({
        type: qrCodeConstants.QRCODE_REQUEST,
        value: {
          module: 'DED_LIB',
          command: 'ded.lireCodeQr',
          typeService: 'SP',
          param: data,
        },
      });
      this.props.dispatch(action);
    }
  };

  logout = () => {
    let action = authAction.requestLogout(
      {
        type: LoginConstants.AUTH_LOGOUT_REQUEST,
        value: {},
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };

  changeProfile = () => {
    this.props.navigation.pop();
  };

  goHome = () => {
    this.props.navigation.replace('Home', {});
  };

  render() {
    return (
      <View style={CustomStyleSheet.menuContainer}>
        <ComMenuHeaderComp
          showProgress={this.props.menuReducer.showProgress}
          onLogout={this.logout}
          onGoHome={this.goHome}
          onChangeProfile={this.changeProfile}
          fullname={this.state.fullname}
          bureau={this.state.bureau}
          arrondissement={this.state.arrondissement}>
          <Grid>
            <Col>
              <Image
                style={style.agentImageStyle}
                source={require('../../../../assets/images/badrAgentIcon.png')}
              />
            </Col>
            <Col />
          </Grid>
        </ComMenuHeaderComp>
        <LinearGradient
          colors={[primaryColor, accentColor, accentColor, accentColor]}
          start={{x: 0, y: 0}}
          locations={[0, 0.04, 0.05, 0.07]}
          end={{x: 0, y: 1}}>
          <ScrollView style={style.scrollViewStyle}>
            <ComBadrTreeComp
              getCollapsedNodeHeight={() => 60}
              data={this.props.menuReducer.menuList}
              onItemSelected={(item) => this.onItemSelected(item)}
              renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
                return (
                  <ComBadrTreeItemComp
                    node={node}
                    level={level}
                    isExpanded={isExpanded}
                    hasChildrenNodes={hasChildrenNodes}
                  />
                );
              }}
            />
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    menuReducer: {...state.menuReducer},
    qrCodeReducer: {...state.qrCodeReducer},
  };
};

export default connect(mapStateToProps, null)(habMainMenuScreen);
