/** React Components */
import React from 'react';
import {Dimensions} from 'react-native';

/** REDUX **/
import {connect} from 'react-redux';

/** Screens */
import WelcomeScreen from '../../annonces/ui/habAnnoncesScreen';
import MainMenu from '../../mainMenu/ui/habMainMenuScreen';
import CreerApurement from '../../../at/apurement/ui/creerApurement/AtApurementScreen';
import Apurement from '../../../at/apurement/ui/ongletAt/apurement/AtCreateApurementScreen';
import {ScanQrCode} from '../../../../commons/component';

/**ACTIONS */
import * as Constants from '../../../../commons/constants/generic/GenericConstants';
import * as GenericAction from '../../../../commons/state/actions/GenericAction';

/** Drawer navigation */
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const deltaScreen = Dimensions.get('window').width / 4;

class habHomeScreen extends React.Component {

  /*
    Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      login: '',
    };
  }

  /*
   componentDidMount Initialization
   */
  componentDidMount() {
    if (this.props.route.params && this.props.route.params.fromIonic) {
      // this.props.navigation.navigate('CreerApurement', {qr: true});
      /**
        => request redux action ====> notify global state by the ionic call
       */
      this.interceptIonicCall();
    }
  }

  interceptIonicCall = () => {
    let action = GenericAction.refresh({
      type: Constants.GENERIC_REFRESH,
      value: {},
    });
    this.props.dispatch(action);
  };

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

const mapStateToProps = (state) => ({...state.genericReducer});
export default connect(mapStateToProps, null)(habHomeScreen);
