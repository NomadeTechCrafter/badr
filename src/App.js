/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import {ComBadrStackNavigatorComp} from './commons/component';
import {RootSiblingParent} from 'react-native-root-siblings';

/** REDUX */
import {Provider} from 'react-redux';
import setGlobalHandler from './commons/services/exceptionHandler/ComGlobalErrorHandlerService';
import store from './commons/state/Store';

import Login from './modules/hab/login/ui/habLoginScreen';
import HabProfileScreen from './modules/hab/profile/ui/habProfileScreen';
import Home from './modules/hab/home/ui/habHomeScreen';
import SmsVerifyScreen from './modules/hab/smsVerify/ui/habSmsVerifyScreen';

import {
  primaryColor,
  accentColor,
  PaperTheme,
} from './commons/styles/ComThemeStyle';
import ComOfflineAlertService from './commons/services/offlineHandler/ComOfflineAlertService';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {remote, bootstrapRoute} from './commons/Config';
import DedRedressementScreen from './modules/dedouanement/redressement/ui/DedRedressementScreen';
import DedRedressementRecherche from './modules/dedouanement/redressement/ui/DedRechercheRedressementScreen';
import controleRechercheDumScreen from './modules/controle/rechercheDum/ui/controleRechercheDumScreen';
import ControleRegimeInterneScreen from './modules/controle/regimeInterne/ui/controleRegimeInterneScreen';
import ControleACVPScreen from './modules/controle/ACVP/ui/controleACVPScreen';
import EcorImportRechercheScreen from './modules/ecorImport/rechercheEcorImport/ui/EcorImportRechercheScreen';
import EcorImportEnleverMarchandiseScreen from './modules/ecorImport/enleverMarchandise/ui/EcorImportEnleverMarchandiseScreen';
import LiquidationRechercheScreen from './modules/liquidation/ui/rechercheLiquidation/LiquidationRechercheScreen';
import LiquidationHomeScreen from './modules/liquidation/ui/ongletsLiquidation/home/LiquidationHomeScreen';

import T6bisCreation from './modules/t6bis/creation/ui/t6bisCreation/t6bisCreationScreen';
import T6bisGestion from './modules/t6bis/gestion/ui/t6bisGestion/t6bisGestionScreen';
import RechercheEcorImport from './old/screens/ecorImport/rechercheEcorImport';

//Actif
import Recherche from './old/screens/actifs/rapport/recherche';
import Creation from './old/screens/actifs/rapport/creation';
import Entete from './old/screens/actifs/rapport/creation/entete';
import Details from './old/screens/actifs/rapport/creation/details';
import Saisie from './old/screens/actifs/rapport/creation/saisie';
import Consultation from './old/screens/actifs/rapport/consultation';

import ActifsRapportCreationScreen from './modules/actifs/rapport/creation/ui/actifsRapportCreationScreen'; 
import ActifsRapportRechercheScreen from './modules/actifs/rapport/recherche/ui/actifsRapportRechercheScreen'; 

//setGlobalHandler();
export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <RootSiblingParent>
        <Provider store={store}>
          <PaperProvider theme={PaperTheme}>
            <ComOfflineAlertService />
            <ComBadrStackNavigatorComp>
              {remote ? (
                <Stack.Screen
                  name="Login"
                  options={{headerShown: false}}
                  component={Login}
                />
              ) : (
                <Stack.Screen
                  name="test"
                  options={{headerShown: false}}
                    component={ActifsRapportRechercheScreen}
                />
              )}
              <Stack.Screen
                name="ControleRegimeInterneScreen"
                options={{headerShown: false}}
                component={ControleRegimeInterneScreen}
              />
              <Stack.Screen
                name="ControleACVPScreen"
                options={{headerShown: false}}
                component={ControleACVPScreen}
              />
              <Stack.Screen
                name="EnleverMarchandise"
                options={{headerShown: false}}
                component={EcorImportEnleverMarchandiseScreen}
              />
              <Stack.Screen
                name="DedRedressementScreen"
                options={{headerShown: false}}
                component={DedRedressementScreen}
              />
              <Stack.Screen
                name="SmsVerify"
                options={{headerShown: false}}
                component={SmsVerifyScreen}
              />
              <Stack.Screen
                name="Profile"
                options={{headerShown: false}}
                mode="modal"
                component={HabProfileScreen}
              />
              <Stack.Screen
                name="Home"
                options={{headerShown: false}}
                component={Home}
              />

              {/* Actif Module*/}
              <Stack.Screen
                name="Recherche"
                options={{headerShown: false}}
                component={Recherche}
              />
              <Stack.Screen
                name="CreationRapport"
                options={{headerShown: false}}
                component={ActifsRapportCreationScreen}
              />
              <Stack.Screen
                name="Entete"
                options={{headerShown: false}}
                component={Entete}
              />
              <Stack.Screen
                name="Details"
                options={{headerShown: false}}
                component={Details}
              />
              <Stack.Screen
                name="Saisie"
                options={{headerShown: false}}
                component={Saisie}
              />
              <Stack.Screen
                name="Consultation"
                options={{headerShown: false}}
                component={Consultation}
              />

              <Stack.Screen
                name="LiquidationHomeScreen"
                component={LiquidationHomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="T6bisGestion"
                options={{headerShown: false}}
                component={T6bisGestion}
              />
            </ComBadrStackNavigatorComp>
          </PaperProvider>
        </Provider>
      </RootSiblingParent>
    );
  }
}
