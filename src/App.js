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

import { ComBadrStackNavigatorComp, ComControleRechercheRefComp} from './commons/component';
import {RootSiblingParent} from 'react-native-root-siblings';

/** REDUX */
import {Provider} from 'react-redux';
import setGlobalHandler from './commons/services/exceptionHandler/ComGlobalErrorHandlerService';
import store from './commons/state/Store';

import Login from './modules/hab/login/ui/habLoginScreen';
import HabProfileScreen from './modules/hab/profile/ui/habProfileScreen';
import Home from './modules/hab/home/ui/habHomeScreen';
import SmsVerifyScreen from './modules/hab/smsVerify/ui/habSmsVerifyScreen';
import HabOperatScreen from './modules/hab/operateur/ui/habOperatScreen';

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
import EciConsultationBLSSearchScreen from './modules/ecorImport/eciConsultationBLS/ui/eciConsultationBLSMainScreen'
import EciConsultationBLESearchScreen from './modules/ecorImport/eciConsultationBLE/ui/eciConsultationBLEMainScreen'

import T6bisCreation from './modules/t6bis/creation/ui/t6bisCreation/t6bisCreationScreen';
import T6bisGestion from './modules/t6bis/gestion/ui/t6bisGestion/t6bisGestionScreen';
import RechercheEcorImport from './old/screens/ecorImport/rechercheEcorImport';

import SortiPortScreen from './modules/DeclarationD17D20/sortiPort/ui/decSortiPort/decSortiPortMainScreen'

import ConfirmationEntreeResultScreen from './modules/ecorExport/confirmationEntree/ui/ecorExpConfirmationEntreeResultScreen';
import ConfirmationArriveeResultScreen from './modules/ecorExport/confirmationArrivee/ui/ecorExpConfirmationArriveeResultScreen';


//Actif
import ActifsRapportCreationScreen from './modules/actifs/rapport/creation/ui/actifsRapportCreationScreen';
import ActifsRapportRechercheScreen from './modules/actifs/rapport/recherche/ui/actifsRapportRechercheScreen';
import PecEtatChargementMainScreen from './modules/pecEtatChargement/VuEmbarquer/ui/pecEtatChargementMainScreen';
import EtatChargement from './modules/pecEtatChargement/rechParRef/ui/pecEtatChargementMainScreen';
import VuEmbarqueScreen from './modules/DeclarationD17D20/vuEmbarquer/ui/vuEmbarquer/VuEmbarqueScreen';
import ConsultationIgTIScreen from './modules/tarifIntegre/tiConsultationIgTI/ui/tiConsultationIgTIScreen';
import ConsultationTIScreen from './modules/tarifIntegre/tiConsultationTI/ui/tiConsultationTIScreen';
import autoriserAcheminementMainScreen from './modules/ecorExport/autoriserAcheminement/mainScreen/ui/autoriserAcheminementMainScreen';
import RechercheAutoriserAcheminementScreen from './modules/ecorExport/autoriserAcheminement/recherche/ui/rechercheAutoriserAcheminementScreen';
import ecorExpConfirmationEntreeArriveeRechercheScreen from './modules/ecorExport/confirmationEntreeArrivee/ui/ecorExpConfirmationEntreeArriveeRechercheScreen';
import DedRedressementEnteteScreen from './modules/dedouanement/redressement/ui/entete/DedRedressementEnteteScreen';
import controleACVPScreen from './modules/controle/ACVP/ui/controleACVPScreen';
import ControleCompteRenduScreen from './modules/controle/ACVP/ui/onglets/compteRendu/ControleCompteRenduScreen';
import decRechParRefMainScreen from './modules/DeclarationD17D20/rechParRef/ui/decRechParRef/decRechParRefMainScreen';
import actifsRapportCreationRondesApparitionsTab from './modules/actifs/rapport/creation/ui/rondesApparitions/actifsRapportCreationRondesApparitionsTab';
import ecorExpVuEmbarqueScreen from './modules/ecorExport/vuEmbarquer/ui/ecorExpVuEmbarqueScreen';
import VuEmbListeDeclaration2 from './modules/ecorExport/vuEmbarquer/ui/ecorExpVuEmbListeDeclaration';
import CtrlResultatScannerResultScreen from './modules/controle/ctrlResultatScanner/ui/ctrlResultatScannerMainScreen';
import etatChargementTabSearchComponent from './modules/controle/controleApresScanner/component/searchTabs/etatChargementTabSearchComponent';
import ctrlControleApresScannerSearchComponent from './modules/controle/controleApresScanner/component/ctrlControleApresScannerSearchComponent';
import ActifsRapportCreationAvitaillementEntreeTab from './modules/actifs/rapport/creation/ui/avitaillementEntree/actifsRapportCreationAvitaillementEntreeTab';


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
                    component={ActifsRapportCreationAvitaillementEntreeTab}
                />
              )}
              <Stack.Screen
                name="ControleRegimeInterneScreen"
                options={{ headerShown: false }}
                component={ControleRegimeInterneScreen}
              />
              <Stack.Screen
                name="ConfirmationEntreeResultScreen"
                options={{ headerShown: false }}
                component={ConfirmationEntreeResultScreen}
              />
              <Stack.Screen
                name="ConfirmationArriveeResultScreen"
                options={{ headerShown: false }}
                component={ConfirmationArriveeResultScreen}
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
                name="VuEmbListeDeclaration2"
                component={VuEmbListeDeclaration2}
                options={{ headerShown: false }}
              />
                 <Stack.Screen
                name="OperatValidate"
                options={{headerShown: false}}
                component={HabOperatScreen}
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
                name="CreationRapport"
                options={{headerShown: false}}
                component={ActifsRapportCreationScreen}
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
              <Stack.Screen
                name="AutoriserAcheminementMainScreen"
                component={autoriserAcheminementMainScreen}
                options={{ headerShown: false }}
              />
            </ComBadrStackNavigatorComp>
          </PaperProvider>
        </Provider>
      </RootSiblingParent>
    );
  }
}
