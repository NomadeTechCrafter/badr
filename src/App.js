/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './hab/login/ui/loginScreen';
import SmsVerify from './screens/hab/smsVerify';
import Home from './screens/hab/home';
import Profile from './screens/hab/profile';

//import VuEmbarque from './screens/ecorexport/vuEmbarque/vuEmbarque';
import {primaryColor} from './styles/index';

import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: primaryColor,
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
