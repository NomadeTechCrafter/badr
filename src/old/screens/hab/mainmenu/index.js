import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
/** React Components */
import {View, ScrollView, Linking, Image} from 'react-native';

import {Col, Grid} from 'react-native-easy-grid';
import {primaryColor, accentColor} from '../../../styles/index';

import * as Zxing from '../../../../commons/native/zxing';

/** Custom Components */
import {BadrTree, BadrTreeItem, MenuHeader} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../../common/constants/hab/menu';
import * as menuAction from '../../../redux/actions/hab/menu';

import * as LoginConstants from '../../../common/constants/hab/auth';
import * as authAction from '../../../redux/actions/hab/auth';

/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

import {buildRouteWithParams} from '../../../common/routing';

/** Utils */
import Utils from '../../../common/util';

/** Inmemory session */
import {Session} from '../../../../commons/services/session/Session';

import * as QrCodeAction from '../../../redux/actions/components/qrCode';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: Session.getInstance().getLogin(),
      fullname: Utils.buildUserFullname(Session.getInstance().getUserObject()),
      bureau: Session.getInstance().getNomBureauDouane(),
      arrondissement: Session.getInstance().getLibelleArrondissement(),
    };
  }

  componentDidMount() {
    this.fetchMenu();
    if (this.props.navigation) {
      this.props.navigation.toggleDrawer();
    }
    console.log('SessionId=' + Session.getInstance().getSessionId(true));
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
        Session.getInstance().getLogin() +
        '&route=' +
        route.screen,
      '&fonctionalite=' + id,
      '&sessionId=' + Session.getInstance().getSessionId(true),
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
      let action = QrCodeAction.request({
        type: Constants.QRCODE_REQUEST,
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
                source={require('../../../../assets/images/agent.png')}
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

export default connect(mapStateToProps, null)(MainMenu);
