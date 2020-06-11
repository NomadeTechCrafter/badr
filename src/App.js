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

import Login from './screens/hab/login';
import SmsVerify from './screens/hab/smsVerify';
import Home from './screens/hab/home';
import Profile from './screens/hab/profile';

import RechercheDum from './screens/controle/rechercheDum';
import RegimeInterne from './screens/controle/regimeInterne';
import ACVP from './screens/controle/ACVP';
import RechecheMLV from './screens/mainlevee/rechercheMLV';
import ListDeclarationMLV from './screens/mainlevee/listedeclarationsMLV';
import DelivrerMLV from './screens/mainlevee/delivrerMLV';
import ScanQrCode from './components/qrCode/';
import {primaryColor} from './styles/index';

import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

/** REDUX */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import allReducers from './redux/reducers';
import thunk from 'redux-thunk';
//config debuggin

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
//GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
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
                name="RechecheMLV"
                component={RechecheMLV}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="RechercheDum"
                options={{headerShown: false}}
                component={RechercheDum}
              />
              <Stack.Screen
                name="ScanQrCode"
                component={ScanQrCode}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="DelivrerMLV"
                component={DelivrerMLV}
                options={{headerShown: false}}
              />

              <Stack.Screen
                name="ListDeclarationMLV"
                component={ListDeclarationMLV}
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

              <Stack.Screen
                name="RegimeInterne"
                options={{headerShown: false}}
                component={RegimeInterne}
              />
              <Stack.Screen
                name="ACVP"
                options={{headerShown: false}}
                component={ACVP}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    );
  }
}
