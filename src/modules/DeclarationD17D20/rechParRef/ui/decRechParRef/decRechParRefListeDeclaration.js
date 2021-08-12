import React from 'react';

import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {primaryColor} from '../../../../../commons/styles/ComThemeStyle';

import RechParRefEntete from '../ongletsRechParRef/decRechParRefEntete';
import RechParRefInfo from '../ongletsRechParRef/decRechParRefInfo';
import SoritPortScanner from '../ongletsRechParRef/decRechParRefScanner';
import RechParRefDecEnDetail from '../ongletsRechParRef/decRechParRefDecEnDetail';
import RechParRefEtatChargement from '../ongletsRechParRef/decRechParRefEtatChargement';

/**Custom Components */
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

class RechParRefListeDeclaration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('rechParRef.title')}
          subtitle={translate('rechParRef.subTitleAction')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        {/* {this.props.showProgress && <ComBadrCircleProgressBarComp size={30} />} */}
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{height: Dimensions.get('window').height}}
            swipeEnabled={false}
            tabBarOptions={{
              labelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
              },
              showLabel: true,
              allowFontScaling: true,
              activeBackgroundColor: primaryColor,
              activeTintColor: primaryColor,
              inactiveTintColor: 'gray',
              indicatorStyle: {
                backgroundColor: primaryColor,
                borderWidth: 2.5,
                borderColor: primaryColor,
              },
              scrollEnabled: true,
              style: {height: 50},
              tabStyle: {
                borderRightWidth: 1,
                borderRightColor: primaryColor,
                width: 200,
              },
            }}>
            <Tab.Screen
              name={translate('tabs.entete')}
              component={() => (
                <RechParRefEntete dataVo={this.props.route.params.data.jsonVO} />
              )}
              //component={EnteteScreen}
            />

            <Tab.Screen
              name={translate('tabs.declarationDetail')}
              component={() => (
                <RechParRefDecEnDetail
                  dataVo={this.props.route.params.data.jsonVO}
                />
              )}
            />
            <Tab.Screen
              name={translate('tabs.etatChargement')}
              component={() => (
                <RechParRefEtatChargement
                  dataVo={this.props.route.params.data.jsonVO}
                />
              )}
            />

            <Tab.Screen
              name={translate('tabs.resultScanner')}
              component={() => (
                <SoritPortScanner dataVo={this.props.route.params.data.jsonVO} />
              )}
            />

            <Tab.Screen
              name={translate('tabs.info')}
              component={() => (
                <RechParRefInfo dataVo={this.props.route.params.data.jsonVO} />
              )}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = {
  container: {width: '100%', height: '100%'},
};

function mapStateToProps(state) {
  return {...state.plaquesImmReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RechParRefListeDeclaration);
