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
import {createStore, applyMiddleware, compose} from 'redux';
import allReducers from './commons/state/Store';
import thunk from 'redux-thunk';
import setGlobalHandler from './commons/services/exceptionHandler/GlobalErrorHandler'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk)),
);
import Login from './modules/hab/login/ui/habLoginScreen';
import HabProfileScreen from './modules/hab/profile/ui/habProfileScreen';
import Home from './modules/hab/home/ui/habHomeScreen';
import SmsVerifyScreen from './modules/hab/smsVerify/ui/habSmsVerifyScreen';

import {primaryColor, accentColor} from './commons/styles/theme';

import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

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
  render() {
    return (
      <RootSiblingParent>
        <PaperProvider theme={theme}>
          <Provider store={store}>
            <ComBadrStackNavigatorComp>
              <Stack.Screen
                name="Login"
                options={{headerShown: false}}
                component={Login}
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
          </Provider>
        </PaperProvider>
      </RootSiblingParent>
    );
  }
}
