import React from 'react';

import { View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';

import RechParRefEntete from '../ongletsRechParRef/decRechParRefEntete';
import RechParRefInfo from '../ongletsRechParRef/decRechParRefInfo';
import SoritPortScanner from '../ongletsRechParRef/decRechParRefScanner';
import RechParRefDecEnDetail from '../ongletsRechParRef/decRechParRefDecEnDetail';
import RechParRefEtatChargement from '../ongletsRechParRef/decRechParRefEtatChargement';
import RechParRefApurement from '../ongletsRechParRef/decRechParRefApurement';
import RechParRefConnaissements from '../ongletsRechParRef/RechParRefConnaissements';


/**Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

/** REDUX **/
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

class RechParRefListeDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      erreur: null,
    };
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
        <View style={styles.messages}>
          <ComBadrErrorMessageComp
            style={styles.centerErrorMsg}
            message={this.state.erreur}
          />
        </View>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{ height: Dimensions.get('window').height }}
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
              style: { height: 50 },
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
              listeners={{
                tabPress: e => {
                  if ('900' !== this.props?.route?.params?.data?.jsonVO?.enteteTrypVO?.refRegime) {
                    this.state.erreur = null;
                  } else {
                    e.preventDefault();
                    this.setState({
                      erreur: 'E13527: Section non accessible!',
                    });
                    console.log('E13527: Section non accessible!');
                  }
                },
              }}
              name={translate('tabs.connaissements')}
              component={() => (
                <RechParRefConnaissements dataVo={this.props.route.params.data.jsonVO} />
              )}
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
                listeners={{
                  tabPress: e => {
                    if ('900' === this.props?.route?.params?.data?.jsonVO?.enteteTrypVO?.refRegime) {
                      this.state.erreur = null;
                    } else {
                      e.preventDefault();
                      this.setState({
                        erreur: 'E13527: Section non accessible!',
                      });
                      console.log('E13527: Section non accessible!');
                    }
                  },
                }}
                name={translate('tabs.etatChargement')}
                component={() => (
                  <RechParRefEtatChargement
                    dataVo={this.props.route.params.data.jsonVO}
                  />
                )}
              />

            <Tab.Screen
              name={translate('tabs.apurement')}
              component={() => (
                <RechParRefApurement
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
  container: { width: '100%', height: '100%' },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function mapStateToProps(state) {
  return { ...state.plaquesImmReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RechParRefListeDeclaration);
