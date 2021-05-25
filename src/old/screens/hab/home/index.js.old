/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainMenu from '../mainmenu';
import WelcomeScreen from '../welcome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

export default class Home extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="grid" color={color} size={size} />
            ),
          }}
          name="Fontionnalités"
          component={MainMenu}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
          name="Bienvenue"
          component={WelcomeScreen}
        />
      </Tab.Navigator>
    );
  }
}
