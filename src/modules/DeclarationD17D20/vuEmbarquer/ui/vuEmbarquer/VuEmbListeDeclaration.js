import React from 'react';

import { View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';

import VuEmbEntete from '../ongletVuEmbarquer/VuEmbEntete';
import VuEmbInfo from '../ongletVuEmbarquer/VuEmbInfo';
import ResultatScanner from '../ongletVuEmbarquer/ResultatScanner';
import VuEmbarquerDecEnDetail from '../ongletVuEmbarquer/DecEnDetail';
import VuEmbarquerEtatChargement from '../ongletVuEmbarquer/EtatChargement';

/**Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

/** REDUX **/
import { connect } from 'react-redux';
import Connaissements from '../ongletVuEmbarquer/Connaissements';

const Tab = createMaterialTopTabNavigator();

class VuEmbListeDeclaration extends React.Component {
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
          title={translate('vuEmbarquee.title')}
          subtitle={translate('vuEmbarquee.subTitleAction')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        {/* {this.props.showProgress && <ComBadrCircleProgressBarComp size={30} />} */}
        {/* {this.state.erreur != null && ( */}
        <View style={styles.messages}>
          <ComBadrErrorMessageComp
            style={styles.centerErrorMsg}
            message={this.state.erreur}
          />
        </View>
        {/* )} */}
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
                <VuEmbEntete dataVo={this.props.route.params.data.jsonVO} />
              )}
            //component={EnteteScreen}
            />
            <Tab.Screen
              name={translate('tabs.connaissements')}
              component={() => (
                <Connaissements dataVo={this.props.route.params.data.jsonVO} />
              )}
            />

            <Tab.Screen
              name={translate('tabs.declarationDetail')}
              component={() => (
                <VuEmbarquerDecEnDetail
                  dataVo={this.props.route.params.data.jsonVO}
                />
              )}
            />
            {/* {'009' !== this.props?.route?.params?.data?.jsonVO?.dataVo?.enteteTrypVO?.refRegime && ( */}
            <Tab.Screen
              listeners={{
                tabPress: e => {
                  if ('009' !== this.props?.route?.params?.data?.jsonVO?.enteteTrypVO?.refRegime) {
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
                <VuEmbarquerEtatChargement
                  dataVo={this.props.route.params.data.jsonVO}
                />
              )}
            />
            {/* )} */}

            <Tab.Screen
              name={translate('tabs.info')}
              component={() => (
                <VuEmbInfo dataVo={this.props.route.params.data.jsonVO} />
              )}
            />
            <Tab.Screen
              name={translate('tabs.resultScanner')}
              component={() => (
                <ResultatScanner dataVo={this.props.route.params.data.jsonVO} />
              )}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View >
    );
  }
}

const styles = {
  messages: {},
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
)(VuEmbListeDeclaration);
