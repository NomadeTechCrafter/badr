import React from 'react';
import {BackHandler, Dimensions, View} from 'react-native';
/** Drawer navigation */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {primaryColor} from '../../../../commons/styles/theme';
import DedRedressementCautionScreen from './caution/DedRedressementCautionScreen';
import DedRedressementEnteteScreen from './entete/DedRedressementEnteteScreen';
import DedRedressementArticlesScreen from './articles/DedRedressementArticlesScreen';
import DedRedressementPreapurementDsScreen from './preapurementDS/DedRedressementPreapurementDsScreen';
import DedRedressementDemandeDiverseScreen from './demandesDiverses/DedRedressementDemandeDiverseScreen';
import DedRedressementImputationTitreChangeScreen from './imputationsTitresChange/DedRedressementImputationTitreChangeScreen';
import DedRedressementImputationCompteREDScreen from './imputationsCompteRED/DedRedressementImputationCompteREDScreen';

const Tab = createMaterialTopTabNavigator();

function EnteteScreen({route, navigation}) {
  return <DedRedressementEnteteScreen navigation={navigation} route={route} />;
}
function CautionScreen({route, navigation}) {
  return <DedRedressementCautionScreen navigation={navigation} route={route} />;
}

function ArticlesScreen({route, navigation}) {
  return (
    <DedRedressementArticlesScreen navigation={navigation} route={route} />
  );
}

function PreapurementDsScreen({route, navigation}) {
  return (
    <DedRedressementPreapurementDsScreen
      navigation={navigation}
      route={route}
    />
  );
}

function DemandeDiverseScreen({route, navigation}) {
  return (
    <DedRedressementDemandeDiverseScreen
      navigation={navigation}
      route={route}
    />
  );
}

function ImputationTitreChangeScreen({route, navigation}) {
  return (
    <DedRedressementImputationTitreChangeScreen
      navigation={navigation}
      route={route}
    />
  );
}

function ImputationCompteREDScreen({route, navigation}) {
  return (
    <DedRedressementImputationCompteREDScreen
      navigation={navigation}
      route={route}
    />
  );
}

class DedRedressementScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <Tab.Navigator
          swipeEnabled={true}
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
          <Tab.Screen
            name="Caution"
            component={CautionScreen}
            listeners={{
              tabPress: (e) => {
                // Prevent default action
                e.preventDefault();
              },
            }}
          />
          <Tab.Screen name="Article" component={ArticlesScreen} />
          <Tab.Screen name="PreapurementsDS" component={PreapurementDsScreen} />
          <Tab.Screen name="DemandeDiverse" component={DemandeDiverseScreen} />
          <Tab.Screen
            name="ImputationTitreChange"
            component={ImputationTitreChangeScreen}
          />
          <Tab.Screen
            name="ImputationCompteRED"
            component={ImputationCompteREDScreen}
          />
        </Tab.Navigator>
      </View>
    );
  }
}

export default DedRedressementScreen;
