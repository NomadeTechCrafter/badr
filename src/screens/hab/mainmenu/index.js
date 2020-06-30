import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
/** React Components */
import {View, ScrollView, Linking, Image} from 'react-native';

import {Col, Grid} from 'react-native-easy-grid';
import {primaryColor, accentColor} from '../../../styles/index';

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
import {Session} from '../../../common/session';

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
    console.log('-----------> ' + Session.getInstance().getLogin());
    console.log(this.props.menuList.length);
    this.fetchMenu();
    if (this.props.navigation) {
      this.props.navigation.toggleDrawer();
    }
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
    );
  };

  onItemSelected = (item) => {
    console.log('device id : ' + Session.getInstance().getDeviceId());
    if (this.props.navigation) {
      let route = buildRouteWithParams(item.id);
      console.log('Going to => ', route);
      console.log(route.screen);
      if (route.screen.includes('app2.')) {
        console.log('go to ionic app. ');
        this.openIntent(route, item.id).then((resp) => {
          console.log(resp);
        });
      } else {
        this.props.navigation.navigate(route.screen, route.params);
      }
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
          showProgress={this.props.showProgress}
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
                source={require('../../../common/assets/images/agent.png')}
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
              data={this.props.menuList}
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
  return {...state.menuReducer};
};

export default connect(mapStateToProps, null)(MainMenu);
