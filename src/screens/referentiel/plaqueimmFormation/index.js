import React from 'react';
import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import PlaquesImmatriculationFormationResult from './result';
import PlaquesImmatriculationFormationSearch from './search';

function ResultScreen({route, navigation}) {
  return (
    <PlaquesImmatriculationFormationResult
      navigation={navigation}
      route={route}
    />
  );
}
function SearchScreen({route, navigation}) {
  return (
    <PlaquesImmatriculationFormationSearch
      navigation={navigation}
      route={route}
    />
  );
}

const tabBarOptions = {
  labelStyle: {fontSize: 16, fontWeight: 'bold'},
  showLabel: true,
  allowFontScaling: true,
  activeBackgroundColor: 'red',
  activeTintColor: 'red',
  inactiveTintColor: 'gray',
  indicatorStyle: {
    backgroundColor: 'red',
    borderWidth: 2.5,
    borderColor: 'red',
  },
};

export default class PlaquesImmatriculationFormation extends React.Component {
  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialLayout={{height: Dimensions.get('window').height}}
          swipeEnabled={false}
          tabBarOptions={tabBarOptions}>
          <Tab.Screen name="Recherche" component={SearchScreen} />
          <Tab.Screen name="Resultat" component={ResultScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  };
}
