import React from 'react';

/** React Components */
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  Linking,
} from 'react-native';

import {NavigationContainer, DrawerActions} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

/** Custom Components */
import {BadrTree, BadrTreeItem, MenuHeader} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';

/**ACTIONS */
import * as Constants from '../../../common/constants/hab/menu';
import * as menuAction from '../../../redux/actions/hab/menu';

/** STYLING **/
import {CustomStyleSheet} from '../../../styles/index';

import {buildRouteWithParams} from '../../../common/routing';

/** STORAGE **/
import {loadParsed, load} from '../../../services/storage-service';

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
    if (this.props.menuList.length === 0) {
      this.fetchMenu();
    }
    if (this.props.navigation) {
      this.props.navigation.toggleDrawer();
    }
  }

  fetchMenu = predicate => {
    var action = menuAction.request({
      type: Constants.MENU_REQUEST,
      value: {
        predicate: predicate,
      },
    });
    this.props.dispatch(action);
  };

  openIntent = async route => {
    return await Linking.openURL(
      'badrio://ma.adii.badrmobile?login=' +
        this.state.login +
        '&route=' +
        route.screen,
    );
  };

  onItemSelected = item => {
    if (this.props.navigation) {
      let route = buildRouteWithParams(item.id);
      console.log('Going to => ', route);
      console.log(route.screen);
      if (route.screen.includes('app2.')) {
        console.log('go to ionic app. ');
        this.openIntent(route).then(resp => {
          console.log(resp);
        });
      } else {
        this.props.navigation.navigate(route.screen, route.params);
      }
    }
  };

  render() {
    return (
      <View style={CustomStyleSheet.menuContainer}>
        <MenuHeader
          fullname={this.state.fullname}
          bureau={this.state.bureau}
          arrondissement={this.state.arrondissement}
        />
        <ScrollView>
          <BadrTree
            getCollapsedNodeHeight={() => 60}
            data={this.props.menuList}
            onItemSelected={item => this.onItemSelected(item)}
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
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {...state.menuReducer};
};

export default connect(
  mapStateToProps,
  null,
)(MainMenu);
