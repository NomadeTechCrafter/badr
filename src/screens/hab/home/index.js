/** React Components */
import React from 'react';
import {View, Text, Dimensions} from 'react-native';

/** Screens */
import WelcomeScreen from '../welcome';
import MainMenu from '../mainmenu/index';
import RechercheDum from '../../controle/rechercheDum';
import RegimeInterne from '../../controle/regimeInterne';
import PlaquesImmatriculation from '../../referentiel/plaquesimm/index';
import ControleVehicules from '../../referentiel/controleVehicules/index';

/** Drawer navigation */
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

/** STORAGE **/
import {loadParsed, load} from '../../../services/storage-service';

const Drawer = createDrawerNavigator();

const deltaScreen = Dimensions.get('window').width / 4;

/** Inmemory session */
import {Session} from '../../../common/session';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
    };
  }

  componentDidMount() {
    console.log('Displaying in memory session values ====> ');
    console.log(Session.getInstance().getNom);
  }

  render() {
    return (
      <Drawer.Navigator
        drawerType="front"
        drawerStyle={{
          width: Dimensions.get('window').width - deltaScreen,
        }}
        initialRouteName="Home"
        drawerContent={props => <MainMenu {...props} />}>
        <Drawer.Screen name="Bienvenue" component={WelcomeScreen} />

        <Drawer.Screen
          name="RechercheDum"
          options={{headerShown: false}}
          component={RechercheDum}
        />
        <Drawer.Screen name="RegimeInterne" component={RegimeInterne} />

        <Drawer.Screen
          name="PlaquesImmatriculation"
          component={PlaquesImmatriculation}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ControleVehicules"
          component={ControleVehicules}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    );
  }
}
