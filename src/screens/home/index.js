/** React Components */
import React from 'react';
import {View, Text, Dimensions} from 'react-native';

/** Screens */
import WelcomeScreen from '../welcome';
import MainMenu from '../mainmenu/index';

/** Drawer navigation */
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const deltaScreen = 60;
export default class Home extends React.Component {
  componentDidMount() {
    console.log(this.props);
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
      </Drawer.Navigator>
    );
  }
}
