import React from 'react';
import {Dimensions, View} from 'react-native';
/** Drawer navigation */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DedRedressementEnteteScreen from './entete/DedRedressementEnteteScreen';
import {NavigationContainer} from '@react-navigation/native';
import {primaryColor} from '../../../../commons/styles/theme';

const Tab = createMaterialTopTabNavigator();

function EnteteScreen({route, navigation}) {
  return <DedRedressementEnteteScreen navigation={navigation} route={route} />;
}
function ArticlesScreen({route, navigation}) {
  return <DedRedressementEnteteScreen navigation={navigation} route={route} />;
}

class DedRedressementScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    /**
     * You are beautiful Mr Zaouine !
     */
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          initialLayout={{height: Dimensions.get('window').height}}
          swipeEnabled={false}
          tabBarOptions={{
            scrollEnabled: true,
            labelStyle: {fontSize: 14, fontWeight: 'bold'},
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
          <Tab.Screen name="Entete" component={EnteteScreen} />
          <Tab.Screen name="Caution" component={ArticlesScreen} />
          <Tab.Screen name="Articles" component={ArticlesScreen} />
          <Tab.Screen name="Preapurement DS" component={ArticlesScreen} />
          <Tab.Screen
            name="Imputation titre de change"
            component={ArticlesScreen}
          />
          <Tab.Screen
            name="Importation Compte RED"
            component={ArticlesScreen}
          />
          <Tab.Screen name="Demandes Diverses" component={ArticlesScreen} />
          <Tab.Screen name="Documents" component={ArticlesScreen} />
          <Tab.Screen name="Info" component={ArticlesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default DedRedressementScreen;
