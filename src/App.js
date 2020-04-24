/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/login';
import SmsVerify from './screens/smsVerify';
import Home from './screens/home';
import Profile from './screens/profile';

import Toolbar from './components/toolbar';

import {
  Appbar,
  Provider as PaperProvider,
  DefaultTheme,
} from 'react-native-paper';

/** REDUX */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './redux/reducers';
import thunk from 'redux-thunk';
const middleware = [thunk];
const store = createStore(allReducers, applyMiddleware(thunk));

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1cadae',
    accent: 'white',
  },
};

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="SmsVerify"
                mode="modal"
                component={SmsVerify}
              />

              <Stack.Screen
                name="Home"
                options={{headerShown: false}}
                component={Home}
              />

              <Stack.Screen
                name="Profile"
                options={{headerShown: false}}
                component={Profile}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    );
  }
}
