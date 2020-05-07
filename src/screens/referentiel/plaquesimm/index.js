import React from 'react';

import {View, Text, ScrollView} from 'react-native';

import {translate} from '../../../common/translations/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {primaryColor, accentColor} from '../../../styles/index';

import PlaquesImmatriculationSearch from './search';
import PlaquesImmatriculationResult from './result';

const Tab = createMaterialTopTabNavigator();

export default class PlaquesImmatriculation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {fontSize: 16, fontWeight: 'bold'},
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
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
          name="Recherche"
          component={PlaquesImmatriculationSearch}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="list" color={color} size={size} />
            ),
          }}
          name="Résultats"
          component={PlaquesImmatriculationResult}
        />
      </Tab.Navigator>
    );
  }
}
