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
import {ComQrCodeScannerComp} from '../../../../commons/component';
import BloquerOperateur from '../../../referentiel/operateursEconomiques/ui/bloquerOperateur/refBloquerOperateurScreen';
import DebloquerOperateur from '../../../referentiel/operateursEconomiques/ui/debloquerOperateur/refDebloquerOperateurScreen';
import DedRedressementScreen from '../../../dedouanement/redressement/ui/DedRedressementScreen';

/**ACTIONS */
import * as Constants from '../../../../commons/constants/generic/ComGenericConstants';
import * as GenericAction from '../../../../commons/state/actions/ComGenericAction';

/** Drawer navigation */
import {createDrawerNavigator} from '@react-navigation/drawer';
import DedRedressementRecherche from '../../../dedouanement/redressement/ui/DedRechercheRedressementScreen';
import DedRedressementEnteteScreen from '../../../dedouanement/redressement/ui/entete/DedRedressementEnteteScreen';

const Drawer = createDrawerNavigator();
const deltaScreen = Dimensions.get('window').width / 4;

function DedRedressementRechercheScreen({route, navigation}) {
  return <DedRedressementRecherche navigation={navigation} route={route} />;
}

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
          name="DedRechercheRedressement"
          component={DedRedressementRechercheScreen}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ComQrCodeScannerComp"
          component={ComQrCodeScannerComp}
          options={{headerShown: false}}
        />

          <Drawer.Screen
              name="BloquerOperateur"
              component={BloquerOperateur}
              options={{headerShown: false}}
          />

          <Drawer.Screen
              name="DebloquerOperateur"
              component={DebloquerOperateur}
              options={{headerShown: false}}
          />
      </Drawer.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({...state.genericReducer});
export default connect(mapStateToProps, null)(habHomeScreen);
