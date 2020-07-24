import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
/** React Components */
import {View, ScrollView, Linking, Image} from 'react-native';

import {Col, Grid} from 'react-native-easy-grid';
import {primaryColor, accentColor} from '../../../styles/index';

import * as Zxing from '../../../native/zxing';

/** Custom Components */
import {BadrTree, BadrTreeItem, MenuHeader} from '../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';
import * as menuAction from '../state/actions/habMainMenuAction';
import * as Constants from '../state/habMainMenuConstants';
import * as qrCodeAction from '../../../redux/actions/components/qrCode';
import * as qrCodeConstants from '../../../commons/constants/components/qrCode';
import * as authAction from '../../login/state/actions/habLoginAction';
import * as LoginConstants from '../../login/state/habLoginConstants';

/** STYLING **/
import {CustomStyleSheet} from '../../../commons/styles';

import {buildRouteWithParams} from '../../../commons/routing';

/** Utils */
import Utils from '../../../commons/utils/util';

/** Inmemory session */
import {CommonSession} from '../../../commons/services/session/commonSession';


class habMainMenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: CommonSession.getInstance().getLogin(),
      fullname: Utils.buildUserFullname(CommonSession.getInstance().getUserObject()),
      bureau: CommonSession.getInstance().getNomBureauDouane(),
      arrondissement: CommonSession.getInstance().getLibelleArrondissement(),
    };
  }

  componentDidMount() {
    this.fetchMenu();
    if (this.props.navigation) {
      this.props.navigation.toggleDrawer();
    }
    console.log('SessionId=' + CommonSession.getInstance().getSessionId(true));
  }

  fetchMenu = (predicate) => {
    var action = menuAction.request({
      type: Constants.MENU_REQUEST,
      value: {
        predicate: predicate,
      },
    });
    this.props.dispatch(action);
  };

  openIntent = async (route, id) => {
    return await Linking.openURL(
      'badrio://ma.adii.badrmobile?login=' +
      CommonSession.getInstance().getLogin() +
      '&route=' +
      route.screen,
      '&fonctionalite=' + id,
      '&sessionId=' + CommonSession.getInstance().getSessionId(true),
    );
  };

  onItemSelected = (item) => {
    if (this.props.navigation) {
      let route = buildRouteWithParams(item.id);
      if (route.params.qr) {
        Zxing.default.showQrReader(this.onBarcodeRead);
        this.props.navigation.navigate(route.screen, route.params);
      } else {
        if (route.screen.includes('app2.')) {
          this.openIntent(route, item.id).then((resp) => {});
        } else {
          this.props.navigation.navigate(route.screen, route.params);
        }
      }
    }
  };

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
    var action = authAction.requestLogout(
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
        <MenuHeader
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
                style={styles.agentImageStyle}
                source={require('../../../assets/images/agent.png')}
              />
            </Col>
            <Col />
          </Grid>
        </MenuHeader>
        <LinearGradient
          colors={[primaryColor, accentColor, accentColor, accentColor]}
          start={{x: 0, y: 0}}
          locations={[0, 0.04, 0.05, 0.07]}
          end={{x: 0, y: 1}}>
          <ScrollView style={styles.scrollViewStyle}>
            <BadrTree
              getCollapsedNodeHeight={() => 60}
              data={this.props.menuReducer.menuList}
              onItemSelected={(item) => this.onItemSelected(item)}
              renderNode={({node, level, isExpanded, hasChildrenNodes}) => {
                return (
                  <BadrTreeItem
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

const styles = {
  scrollViewStyle: {zIndex: -1, marginTop: 20, marginBottom: 200},
  agentImageStyle: {
    width: 100,
    height: 100,
    paddingBottom: 30,
    marginTop: -10,
    position: 'absolute',
    zIndex: 1,
  },
};

const mapStateToProps = (state) => {
  return {
    menuReducer: {...state.menuReducer},
    qrCodeReducer: {...state.qrCodeReducer},
  };
};

export default connect(mapStateToProps, null)(habMainMenuScreen);
