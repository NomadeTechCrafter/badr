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
import VuEmbarqueScreen from '../../../DeclarationD17D20/vuEmbarquer/ui/vuEmbarquer/VuEmbarqueScreen';
import VuEmbListeDeclaration from '../../../DeclarationD17D20/vuEmbarquer/ui/vuEmbarquer/VuEmbListeDeclaration';

import {ComQrCodeScannerComp} from '../../../../commons/component';
import BloquerOperateur from '../../../referentiel/operateursEconomiques/ui/bloquerOperateur/refBloquerOperateurScreen';
import DebloquerOperateur from '../../../referentiel/operateursEconomiques/ui/debloquerOperateur/refDebloquerOperateurScreen';
import DedRedressementScreen from '../../../dedouanement/redressement/ui/DedRedressementScreen';
import controleRechercheDumScreen from '../../../controle/rechercheDum/ui/controleRechercheDumScreen';
import controleListDecalarationDumScreen from '../../../controle/listDeclarationDum/ui/controleListDecalarationDumScreen';
import ControleACVPScreen from '../../../controle/ACVP/ui/controleACVPScreen';
import ControleRegimeInterneScreen from '../../../controle/regimeInterne/ui/controleRegimeInterneScreen';
import ControleRegimeTransitScreen from '../../../controle/regimeTransit/ui/controleRegimeTransitScreen';
import RechecheMLV from '../../../../old/screens/mainlevee/rechercheMLV';
import ListDeclarationMLV from '../../../../old/screens/mainlevee/listedeclarationsMLV';
import DelivrerMLV from '../../../../old/screens/mainlevee/delivrerMLV';
import RechercheEcorImport from '../../../../old/screens/ecorImport/rechercheEcorImport';
import AjouterReconnaissance from '../../../controle/reconnaissance/ui/ajouterReconnaissance/ctrlAjouterReconnaissanceScreen';
import ModifierReconnaissance from '../../../controle/reconnaissance/ui/modifierReconnaissance/ctrlModifierReconnaissanceScreen';
import AnnulerReconnaissance from '../../../controle/reconnaissance/ui/annulerReconnaissance/ctrlAnnulerReconnaissanceScreen';
import CreerCompteRenduMission from '../../../enquetes/compteRendu/ui/creerCompteRenduMission/enqCreerCompteRenduMissionScreen';
import ModifierCompteRenduMission from '../../../enquetes/compteRendu/ui/modifierCompteRenduMission/enqModifierCompteRenduMissionScreen';
import ValiderCompteRenduMission from '../../../enquetes/compteRendu/ui/validerCompteRenduMission/enqValiderCompteRenduMissionScreen';
import ControleApresScanner from '../../../controle/controleApresScanner/ui/controleApresScanner/ctrlControleApresScannerScreen';

/**T6bis */
import T6bisCreation from '../../../t6bis/creation/ui/t6bisCreation/t6bisCreationScreen';
import T6bisRecherche from '../../../t6bis/recherche/ui/t6bisRechercheScreen';
import T6bisGestion from '../../../t6bis/gestion/ui/t6bisGestion/t6bisGestionScreen';


import ActifsRapportRechercheScreen from '../../../actifs/rapport/recherche/ui/actifsRapportRechercheScreen';


import Entete from '../../../../old/screens/actifs/rapport/creation/entete';
import Recherche from '../../../../old/screens/actifs/rapport/recherche';
import Saisie from '../../../../old/screens/actifs/rapport/creation/saisie';
import Details from '../../../../old/./screens/actifs/rapport/creation/details';
import Consultation from '../../../../old/screens/actifs/rapport/consultation';
import Creation from '../../../../old/screens/actifs/rapport/creation';
/**ACTIONS */
import * as Constants from '../../../../commons/constants/generic/ComGenericConstants';
import * as GenericAction from '../../../../commons/state/actions/ComGenericAction';

/** Drawer navigation */
import {createDrawerNavigator} from '@react-navigation/drawer';
import DedRedressementRecherche from '../../../dedouanement/redressement/ui/DedRechercheRedressementScreen';
import DedRedressementEnteteScreen from '../../../dedouanement/redressement/ui/entete/DedRedressementEnteteScreen';
import RefControleVehiculeMainScreen from '../../../referentiel/controleVehicules/ui/refControleVehiculeMainScreen';
import RefPlaquesImmMainScreen from '../../../referentiel/plaquesImmatriculation/ui/refPlaquesImmMainScreen';

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
          name="controleRechercheDumScreen"
          component={controleRechercheDumScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="controleListDecalarationDumScreen"
          component={controleListDecalarationDumScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="ControleRegimeInterneScreen"
          component={ControleRegimeInterneScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="ControleRegimeTransitScreen"
          component={ControleRegimeTransitScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="ControleACVPScreen"
          component={ControleACVPScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="RechecheMLV"
          component={RechecheMLV}
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
          name="RechercheEcorImport"
          component={RechercheEcorImport}
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

        <Drawer.Screen
          name="AjouterReconnaissance"
          component={AjouterReconnaissance}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ModifierReconnaissance"
          component={ModifierReconnaissance}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="AnnulerReconnaissance"
          component={AnnulerReconnaissance}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="CreerCompteRenduMission"
          component={CreerCompteRenduMission}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ModifierCompteRenduMission"
          component={ModifierCompteRenduMission}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ValiderCompteRenduMission"
          component={ValiderCompteRenduMission}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="ControleApresScanner"
          component={ControleApresScanner}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="RefControleVehicule"
          component={RefControleVehiculeMainScreen}
          options={{headerShown: false}}
        />

        <Drawer.Screen
          name="RefPlaquesImm"
          component={RefPlaquesImmMainScreen}
          options={{headerShown: false}}
        />
        {/* Actif Module*/}
        <Drawer.Screen
          name="Recherche"
          options={{headerShown: false}}
          component={Recherche}
        />
        <Drawer.Screen
          name="ActifsRecherche"
          options={{headerShown: false}}
          component={ActifsRapportRechercheScreen}
        />
        <Drawer.Screen
          name="Entete"
          options={{headerShown: false}}
          component={Entete}
        />
        <Drawer.Screen
          name="Details"
          options={{headerShown: false}}
          component={Details}
        />
        <Drawer.Screen
          name="Saisie"
          options={{headerShown: false}}
          component={Saisie}
        />
        <Drawer.Screen
          name="Consultation"
          options={{headerShown: false}}
          component={Consultation}
        />
        {/* Fonc Vu embarquer */}
        <Drawer.Screen
          name="VuEmbarqueScreen"
          component={VuEmbarqueScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="VuEmbListeDeclaration"
          component={VuEmbListeDeclaration}
          options={{headerShown: false}}
        />
        {/* Module T6bis start*/}
        <Drawer.Screen
          name="T6bisCreation"
          component={T6bisCreation}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="T6bisRecherche"
          component={T6bisRecherche}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="T6bisGestion"
          component={T6bisGestion}
          options={{headerShown: false}}
        />
        {/* Module T6bis end*/}

      </Drawer.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({...state.genericReducer});
export default connect(mapStateToProps, null)(habHomeScreen);
