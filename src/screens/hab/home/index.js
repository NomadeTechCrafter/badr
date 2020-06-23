/** React Components */
import React from 'react';
import {Dimensions} from 'react-native';

/** Screens */
import WelcomeScreen from '../welcome';
import MainMenu from '../mainmenu/index';
import RechercheDum from '../../controle/rechercheDum';
import RegimeInterne from '../../controle/regimeInterne';
import PlaquesImmatriculation from '../../referentiel/plaquesimm/index';
import ControleVehicules from '../../referentiel/controleVehicules/index';
import CreerApurement from '../../at/creerApurement';
import Apurement from '../../at/ongletAt/apurement';

import ListDeclarationDum from '../../controle/listDeclarationDum';
import RegimeTransit from '../../controle/regimeTransit';
import ACVP from '../../controle/ACVP';
import RechecheMLV from '../../mainlevee/rechercheMLV';
import ListDeclarationMLV from '../../mainlevee/listedeclarationsMLV';
import DelivrerMLV from '../../mainlevee/delivrerMLV';
import {ScanQrCode} from '../../../components';

/** Drawer navigation */
import {createDrawerNavigator} from '@react-navigation/drawer';

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
        drawerContent={(props) => <MainMenu {...props} />}>
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
        <Drawer.Screen
          name="CreerApurement"
          component={CreerApurement}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Apurement"
          component={Apurement}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="RechecheMLV"
          component={RechecheMLV}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="ScanQrCode"
          component={ScanQrCode}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="DelivrerMLV"
          component={DelivrerMLV}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ListDeclarationMLV"
          component={ListDeclarationMLV}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ACVP"
          options={{headerShown: false}}
          component={ACVP}
        />

        <Drawer.Screen
          name="ListDeclarationDum"
          options={{headerShown: false}}
          component={ListDeclarationDum}
        />

        <Drawer.Screen name="RegimeTransit" component={RegimeTransit} />
      </Drawer.Navigator>
    );
  }
}
