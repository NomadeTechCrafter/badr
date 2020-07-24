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

import {BadrStackNavigator} from './commons/component';

/** REDUX */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import allReducers from './redux/reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk)),
);
import Login from './modules/hab/login/ui/habLoginScreen';
import HabProfileScreen from './modules/hab/profile/ui/habProfileScreen';
import Home from './modules/hab/home/ui/habHomeScreen';
import SmsVerifyScreen from './modules/hab/smsVerify/ui/habSmsVerifyScreen';

import {primaryColor, accentColor} from './styles/index';

import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
    accent: accentColor,
  },
};

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <BadrStackNavigator>
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
          </BadrStackNavigator>
        </Provider>
      </PaperProvider>
    );
  }
}
