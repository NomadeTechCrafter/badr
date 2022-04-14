import React from 'react';

import { View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';


import ResultatScannerScreen from '../ongletD1720/ResultatScanner';
import EnteteScreen from '../ongletD1720/Entete';
import DecEnDetailScreen from '../ongletD1720/DecEnDetail';
import EtatChargementScreen from '../ongletD1720/EtatChargement';
import InfoScreen from '../ongletD1720/Info';



/**Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

/** REDUX **/
import { connect } from 'react-redux';
import ConnaissementsScreen from '../ongletD1720/Connaissements';
import OngletApurementScreen from '../ongletD1720/OngletApurementScreen';

const Tab = createMaterialTopTabNavigator();

class GestionApurementScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      erreur: null,
    };
  }



  render() {
    const enteteComp = () => {
      return (
        <EnteteScreen dataVo={this.props.route.params.data.jsonVO} />
      ); 
    };
    const connaissementComp = () => {
      return (
        <ConnaissementsScreen dataVo={this.props.route.params.data.jsonVO} />
      );
    };
    const declarationDetailComp = () => {
      return (
        <DecEnDetailScreen dataVo={this.props.route.params.data.jsonVO} />
      );
    };
    const etatChargementComp = () => {
      return (
        <EtatChargementScreen
          dataVo={this.props.route.params.data.jsonVO}
        />
      );
    };
    const apurementComp = () => {
      return (
        <OngletApurementScreen dataVo={this.props.route.params.data.jsonVO} />
      );
    };
    const infoComp = () => {
      return (
        <InfoScreen dataVo={this.props.route.params.data.jsonVO} />
      );
    };
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={'Apurer une déclaration'}
          subtitle={'Apurer une déclaration'}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        {/* {this.props.showProgress && <ComBadrCircleProgressBarComp size={30} />} */}
        {/* {this.state.erreur != null && ( */}

        {/* )} */}
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{ height: Dimensions.get('window').height }}
            swipeEnabled={false}
            initialRouteName= {translate('tabs.apurement')}  
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
              component={enteteComp}
            //component={EnteteScreen}
            />
            <Tab.Screen
              name={translate('tabs.connaissements')}
              component={connaissementComp}
            />

            <Tab.Screen
              name={translate('tabs.declarationDetail')}
              component={declarationDetailComp}
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
              component={etatChargementComp}
            />

            <Tab.Screen
              name={translate('tabs.apurement')}
              component={apurementComp}
              de
            />
            {/* )} */}

            {/* <Tab.Screen
              name={translate('tabs.resultScanner')}
              component={() => (
                <ResultatScannerScreen dataVo={this.props.route.params.data.jsonVO} />
              )}
            /> */}
            <Tab.Screen
              name={translate('tabs.info')}
              component={infoComp}
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
  return { ...state.gestionApurementReducer };
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
)(GestionApurementScreen);
