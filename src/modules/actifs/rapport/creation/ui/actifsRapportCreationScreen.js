import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { ComBadrButtonComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrProgressBarComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import { getNavigationAvitaillementSortieModelInitial, getNavigationAvitaillementEntreeModelInitial, cleanOrdreService, convert, format } from '../../utils/actifsUtils';
import * as Constants from '../state/actifsRapportCreationConstants';
import * as enregistrerRS from '../state/actions/actifsRapportCreationEnregistrerRSAction';
import * as sauvegarderRS from '../state/actions/actifsRapportCreationSauvegarderRSAction';

import * as getOsById from '../state/actions/actifsRapportCreationGetOsByIdAction';

import * as getRsByIdOs from '../state/actions/actifsRapportConsultationGetRsByIdOsAction';
import ActifsRapportCreationAvionsPriveesTab from './avionsPrivees/actifsRapportCreationAvionsPriveesTab';
import AtifsRapportCreationDetailsTab from './details/actifsRapportCreationDetails';
import ActifsRapportCreationEmbarcationsTab from './embarcations/actifsRapportCreationEmbarcationsTab';
import ActifsRapportCreationEnteteTab from './entete/actifsRapportCreationEnteteTab';
import AtifsRapportCreationSaisieTab from './saisie/actifsRapportCreationSaisieTab';
import RondesApparitionsTab from './rondesApparitions/actifsRapportCreationRondesApparitionsTab';
import PerquisitionTab from './perquisition/actifsRapportCreationPerquisitionTab';
import ActifsRapportCreationAvitaillementEntreeTab from './avitaillementEntree/actifsRapportCreationAvitaillementEntreeTab';
import ActifsRapportCreationAvitaillementSortieTab from './avitaillementSortie/actifsRapportCreationAvitaillementSortieTab';


import moment from 'moment';
import { FORMAT_DDMMYYYY_HHMM } from '../../utils/actifsConstants';
import _ from 'lodash';



const Tab = createMaterialTopTabNavigator();


const screenHeight = Dimensions.get('window').height;


const screenWidth = Dimensions.get('window').width;

// function EnteteScreen({ route, navigation }) {
//   return (
//     <ActifsRapportCreationEnteteTab navigation={navigation} route={route} />
//   );
// }

/* function DetailsScreen({ route, navigation }) {
  return <AtifsRapportCreationDetailsTab navigation={navigation} route={route} />;
}

function SaisieScreen({ route, navigation }) {
  return <AtifsRapportCreationSaisieTab navigation={navigation} route={route} />;
} */


function embarcationsTab({ route, navigation }) {
  return <ActifsRapportCreationEmbarcationsTab navigation={navigation} route={route} />;
}

function avionsPriveesTab({ route, navigation }) {
  return <ActifsRapportCreationAvionsPriveesTab navigation={navigation} route={route} />;
}

function avitaillementSortieTab({ route, navigation }) {
  return <ActifsRapportCreationAvitaillementSortieTab navigation={navigation} route={route} navigationAvitaillementSortieModel={getNavigationAvitaillementSortieModelInitial()} navigationsAvitaillementSorties={[]} />;
}

class ActifsRapportCreationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultation: props.route.params ? props.route.params.consultation : {},
      row: props.route.params ? props.route.params.row : {},
      autreIncident: '',
      typeIncident: '',
      description: '',
      osAvecSaisie: false,
      osAvecIncident: false,
      coiffeInitiePar: null,
      refAgentDetachement: null,
      rows: '',
    };
  }

  componentDidMount = () => {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.state = {
        consultation: this.props.route.params ? this.props.route.params.consultation : {},
        row: this.props.route.params ? this.props.route.params.row : {},
        autreIncident: '',
        typeIncident: '',
        description: '',
        osAvecSaisie: false,
        osAvecIncident: false,
        coiffeInitiePar: null,
        refAgentDetachement: null,
        rows: '',
      };
      let data = this.props.route.params.row?.id;
      if (this.props.route.params.consultation) {
        let action = getRsByIdOs.request(
          {
            type: Constants.ACTIFS_CONSULTATION_REQUEST,
            value: { data: data ? data + '' : '' },
          } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
        );
        this.props.dispatch(action);
      } else {
        let action = getOsById.request(
          {
            type: Constants.ACTIFS_ENTETE_REQUEST,
            value: { data: data ? data + '' : '' },
          } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
        );
        this.props.dispatch(action);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }



  updateSaisieValue = (val) => {
    console.log('val 1:', val);
    this.setState({ vehiculesSaisiVO: val.vehiculesSaisiVO, marchandisesVO: val.marchandisesVO, pvsSaisi: val.pvsSaisi });

  }

  updateRondesApparitions = (val) => {
    console.log('val 2:', val);
    this.setState({ rondesApparitions: val.rondesApparitions });

  }

  updatePerquisitions = (val) => {
    console.log('val 3:', val);
    this.setState({ gibPerquisition: val.gibPerquisition });

  }

  updateAvitaillementEntrees = (val) => {
    console.log('val updateAvitaillementEntrees :', val);
    this.setState({ avitaillementEntrees: val.updateAvitaillementEntrees });

  }  

  updateEnteteValue = (val) => {
    console.log('val 4:', val);
    this.setState({ heureFin: val.heureFin, dateFin: val.dateFin });

  }

  updateDetailsValue = (val) => {
    console.log('val 5:', val);
    this.setState({
      description: val.description,
      osAvecSaisie: val.osAvecSaisie,
      osAvecIncident: val.osAvecIncident,
      coiffeInitiePar: val.coiffeInitiePar,
      refAgentDetachement: val.refAgentDetachement,
      themeConference: val.themeConference,
      listAnimateurConferenceVo: val.listAnimateurConferenceVo,
    });

  }

  checkDatesDebutFinInformations = () => {
    this.setState({
      errorMessage: null
    });

    let dateDebut = format(this.props.route?.params?.row?.dateDebut);

    moment.suppressDeprecationWarnings = true;
    let dateHeureDebut = moment(dateDebut, FORMAT_DDMMYYYY_HHMM);


    let dateHeureFin = moment(this.state.dateFin + ' ' + this.state.heureFin, FORMAT_DDMMYYYY_HHMM);
    if (dateHeureFin === null) {
      console.log("test : ", dateHeureFin);
      let message = translate('actifsCreation.entete.errors.dateFinRequired');
      this.setState({
        errorMessage: message
      });
      return true;

    }
    if (dateHeureFin < dateHeureDebut) {
      let message = translate('actifsCreation.entete.errors.dateDebutFinOrdre');

      this.setState({
        errorMessage: message
      });
      return true;
    } else {

      return false
    }



  }

  checkDetail = () => {
    this.setState({
      errorMessage: null
    });
    if (_.isEmpty(this.state.description)) {
      let message = translate('actifsCreation.detail.errors.requiredDescription');

      this.setState({
        errorMessage: message
      });
      return true;
    } else {

      return false
    }
  }

  preparerRSAEnregistrer = () => {
    let res = this.props.route?.params?.row?.refPJ?.split('_');
    let localOrdreService = this.props.route?.params?.row;
    localOrdreService.dateDebut = moment(this.props.route?.params?.row?.dateDebut).format();
    localOrdreService.dateFin = moment(this.props.route?.params?.row?.dateFin).format();
    let localRondesApparitions = [];
    this.state?.rondesApparitions?.forEach((rondeApparition) => {
      let element = rondeApparition;
      element.dateDebut = rondeApparition?.dateDebut?.split("/").reverse().join("-");
      element.dateFin = rondeApparition?.dateFin?.split("/").reverse().join("-");
      localRondesApparitions.push(element);
    });
    let localGibPerquisition = this.state?.gibPerquisition;
    if (localGibPerquisition) {
      let localDatePerquisition = localGibPerquisition?.datePerquisition?.split("/").reverse().join("-");
      localGibPerquisition.datePerquisition = localDatePerquisition;
    }

    let rsAEnregistrer = {


      anneeRef: _.isArray(res) ? res[1] : '', //....?????getRapportTemp().anneeRef
      autreIncidents: this.state.autreIncident, //yess details
      codeCatTI: '1',
      codeUORef: _.isArray(res) ? res[0] : '',
      commentaire: null,
      dateEnregistrement: null,
      dateEnregistrementV0: '',
      dateFin: (this.state?.dateFin) ? this.state.dateFin : moment(this.props.route?.params?.row?.dateFin), //yes
      description: this.state.description, //yess reacherche(description rapport)

      osAvecSaisie: this.state.osAvecSaisie,
      osAvecIncident: this.state.osAvecIncident,
      coiffeInitiePar: this.state.coiffeInitiePar,
      refAgentDetachement: this.state.refAgentDetachement,
      themeConference: this.state.themeConference,
      listAnimateurConferenceVo: this.state.listAnimateurConferenceVo,


      disableFields: null,
      heureFin: (this.state?.heureFin) ? this.state.heureFin : this.props.route?.params?.row?.heureFin, //yess entete
      idOS: this.props.route?.params?.row?.numero, //recherchess
      journeeDU: this.props.route?.params?.row?.journeeDu ? convert(this.props.route?.params?.row?.journeeDu) : '', //yess entete
      motif: null,
      numOS: null,
      numSerieRef: _.isArray(res) ? res[2] : '',
      ordres: null,
      pk: null,
      rapportService: {
        id: null,
        ordreService: localOrdreService,
        vrs: null,
      },
      reference: this.props.route?.params?.row?.refPJ, //yess
      statut: null,
      typeAction: 'ACTION_AJOUTER',
      typeIncident: null,
      typesIncidentSelect: this.state.typeIncident, //yess
      uniteorganisationnelle: this.props.route?.params?.row?.uniteOrganisationnelle, //yess
      validations: null,
      vehiculesSaisiVO: this.state.vehiculesSaisiVO,
      marchandisesVO: this.state.marchandisesVO,
      pvsSaisi: this.state.pvsSaisi,
      navigationsAeriennes: this.props.navigationsAeriennes,
      navigationsMaritimes: this.props.navigationsMaritimes,
      versionRS: null,
      versionsRS: null,
      rondesApparition: localRondesApparitions,
      // gibPerquisition: this.state?.gibPerquisition ? this.state?.gibPerquisition : {},
      gibPerquisition: localGibPerquisition,

    };
    cleanOrdreService(rsAEnregistrer);
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('this.state.vehiculesSaisiVO : ', this.state.vehiculesSaisiVO);
    console.log('this.state.marchandisesVO : ', this.state.marchandisesVO);
    console.log('this.state.pvsSaisi : ', this.state.pvsSaisi);
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log(JSON.stringify(rsAEnregistrer));
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
    if (this.checkDatesDebutFinInformations() || this.checkDetail()) {
      return;
    }
    return rsAEnregistrer;
  }

  enregisterRS = () => {
    let rsAEnregistrer = this.preparerRSAEnregistrer();

    let action = enregistrerRS.request({
      type: Constants.ACTIFS_CREATION_REQUEST,
      value: { data: rsAEnregistrer },
    });

    this.props.dispatch(action);

  };

  sauvegarderRS = () => {

    let rsAEnregistrer = this.preparerRSAEnregistrer();

    let action = sauvegarderRS.request({
      type: Constants.ACTIFS_CREATION_REQUEST,
      value: { data: rsAEnregistrer },
    });

    this.props.dispatch(action);

  };


  parsePvsSaisi = (pvsSaisi) => {
    let array = [];
    if (_.isArray(pvsSaisi)) {
      pvsSaisi.forEach((pv) => {
        let element = {};
        element.numPV = pv.numPV;
        element.datePV = convert(pv.datePV);

        array.push(element);
      });

    }
    return array;

  }


  render() {

    return (
      <View style={{ width: '100%', height: '100%' }}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('actifsCreation.title')}>
          {(!this.props.consultation) &&
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.enregisterRS();
              }}
              text={translate('transverse.enregistrer')}
            />
          }
          {(!this.props.consultation) &&
            <ComBadrButtonComp
              style={{ width: 100 }}
              onPress={() => {
                this.sauvegarderRS();
              }}
              text={translate('transverse.sauvegarder')}
            />
          }
        </ComBadrToolbarComp>
        {this.props.showProgress && (
          <ComBadrProgressBarComp width={screenWidth} />
        )}
        {this.state.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.state.errorMessage} />
        )}


        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{ height: Dimensions.get('window').height }}
            swipeEnabled={false}
            tabBarOptions={{
              labelStyle: { fontSize: 16, fontWeight: 'bold' },
              showLabel: true,
              allowFontScaling: true,
              scrollEnabled: true,
              activeBackgroundColor: primaryColor,
              activeTintColor: primaryColor,
              inactiveTintColor: 'gray',
              indicatorStyle: {
                backgroundColor: primaryColor,
                borderWidth: 2.5,
                borderColor: primaryColor,
              },
            }}>
            <Tab.Screen name="Entête">
              {() => (
                <ActifsRapportCreationEnteteTab
                  update={(val) => this.updateEnteteValue(val)}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Détail">
              {() => (
                <AtifsRapportCreationDetailsTab
                  update={this.updateDetailsValue}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Saisie" >
              {() => (
                <AtifsRapportCreationSaisieTab
                  update={this.updateSaisieValue}
                />
              )}
            </Tab.Screen>
            {(this.props.route?.params?.row?.ronde) && (
              <Tab.Screen name={translate('actifsCreation.rondesApparitions.title')} >
                {() => (
                  <RondesApparitionsTab update={this.updateRondesApparitions} />
                )}
              </Tab.Screen>
            )}
            {(this.props.route?.params?.row?.typeService?.categorie?.code === '7') && (
              <Tab.Screen name={translate('actifsCreation.perquisition.title')}>
                {() => (
                  <PerquisitionTab update={this.updatePerquisitions} />
                )}
              </Tab.Screen>
            )}

            {(this.props.route?.params?.row?.aerien) && (
              <Tab.Screen name={translate('actifsCreation.avionsPrivees.title')}>
                {() => (
                  <ActifsRapportCreationAvionsPriveesTab />
                )}
              </Tab.Screen>

              // <Tab.Screen name={translate('actifsCreation.avionsPrivees.title')} component={avionsPriveesTab} />
            )}
            {(this.props.route?.params?.row?.maritime) && (
              <Tab.Screen name={translate('actifsCreation.embarcations.title')}>
                {() => (
                  <ActifsRapportCreationEmbarcationsTab />
                )}
              </Tab.Screen>
              // <Tab.Screen name={translate('actifsCreation.embarcations.title')} component={embarcationsTab} />
            )}
            {(this.props.route?.params?.row?.typeService?.categorie?.code === '5') && (
              <Tab.Screen name={translate('actifsCreation.avitaillementEntree.title')} >
                {() => (
                  <ActifsRapportCreationAvitaillementEntreeTab update={this.updateAvitaillementEntrees} />
                )}
              </Tab.Screen>
            )}
            {(this.props.route?.params?.row?.typeService?.categorie?.code === '5') && (
              <Tab.Screen name={translate('actifsCreation.avitaillementSortie.title')} component={avitaillementSortieTab} />
            )}
          </Tab.Navigator>

        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationScreen);
