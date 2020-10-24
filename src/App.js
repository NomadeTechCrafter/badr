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

import {primaryColor, accentColor} from './commons/styles/ComThemeStyle';
import ComOfflineAlertService from './commons/services/offlineHandler/ComOfflineAlertService';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {remote, bootstrapRoute} from './commons/Config';
import DedRedressementScreen from './modules/dedouanement/redressement/ui/DedRedressementScreen';
import DedRedressementRecherche from './modules/dedouanement/redressement/ui/DedRechercheRedressementScreen';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    accent: accentColor,
  },
};

//setGlobalHandler();
export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <RootSiblingParent>
        <Provider store={store}>
          <PaperProvider theme={theme}>
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
                  name={bootstrapRoute}
                  options={{headerShown: false}}
                  component={DedRedressementRecherche}
                />
              )}

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
            </ComBadrStackNavigatorComp>
          </PaperProvider>
        </Provider>
      </RootSiblingParent>
    );
  }
}
