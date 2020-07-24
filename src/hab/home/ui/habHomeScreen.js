/** React Components */
import React from 'react';
import {Dimensions} from 'react-native';

/** Screens */
import WelcomeScreen from '../../annonces/ui/habAnnoncesScreen';
import MainMenu from '../../mainMenu/ui/habMainMenuScreen';
//TODO
import CreerApurement from '../../at/creerApurement';
import Apurement from '../../at/ongletAt/apurement';
import {ScanQrCode} from '../../../components';

/** Drawer navigation */
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const deltaScreen = Dimensions.get('window').width / 4;

export default class habHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
    };
  }
  componentDidMount() {
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

        <Drawer.Screen name="Bienvenue" component={WelcomeScreen}/>
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
          name="ScanQrCode"
          component={ScanQrCode}
          options={{headerShown: false}}
        />

      </Drawer.Navigator>
    );
  }
}
