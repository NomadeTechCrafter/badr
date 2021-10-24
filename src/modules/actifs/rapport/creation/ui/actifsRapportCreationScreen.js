import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrProgressBarComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import { cleanOrdreService, convert, format } from '../../utils/actifsUtils';
import * as Constants from '../state/actifsRapportCreationConstants';
import * as enregistrerRS from '../state/actions/actifsRapportCreationEnregistrerRSAction';
import * as getOsById from '../state/actions/actifsRapportCreationGetOsByIdAction';

import * as getRsByIdOs from '../state/actions/actifsRapportConsultationGetRsByIdOsAction';
import ActifsRapportCreationAvionsPriveesTab from './avionsPrivees/actifsRapportCreationAvionsPriveesTab';
import AtifsRapportCreationDetailsTab from './details/actifsRapportCreationDetails';
import ActifsRapportCreationEmbarcationsTab from './embarcations/actifsRapportCreationEmbarcationsTab';
import ActifsRapportCreationEnteteTab from './entete/actifsRapportCreationEnteteTab';
import AtifsRapportCreationSaisieTab from './saisie/actifsRapportCreationSaisieTab';
import RondesApparitionsTab from './rondesApparitions/actifsRapportCreationRondesApparitionsTab';
import PerquisitionTab from './perquisition/actifsRapportCreationPerquisitionTab';


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

class ActifsRapportCreationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consultation: props.route.params ? props.route.params.consultation : {},
      row: props.route.params ? props.route.params.row : {},
      autreIncident: '',
      typeIncident: '',
      description: '',
      rows: '',
    };
    // console.log('this.props.===========');
    // console.log(JSON.stringify(this.props));
  }

  componentDidMount = () => {
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log(JSON.stringify(this.props));
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.===========>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.state = {
        consultation: this.props.route.params ? this.props.route.params.consultation : {},
        row: this.props.route.params ? this.props.route.params.row : {},
        autreIncident: '',
        typeIncident: '',
        description: '',
        rows: '',
      };
      let data = this.props.route.params.row?.id;
      if (this.props.route.params.consultation) {
        let action = getRsByIdOs.request(
          {
            type: Constants.ACTIFS_CONSULTATION_REQUEST,
            value: { data: data },
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
    console.log('val :', val);
    this.setState({ vehiculesSaisiVO: val.vehiculesSaisiVO, marchandisesVO: val.marchandisesVO, pvsSaisi: val.pvsSaisi });

  }

  updateRondesApparitions = (val) => {
    console.log('val :', val);
    this.setState({ rondesApparitions: val.rondesApparitions });

  }


  updateEnteteValue = (val) => {
    console.log('val :', val);
    this.setState({ heureFin: val.heureFin, dateFin: val.dateFin });

  }

  updateDetailsValue = (val) => {
    console.log('val :', val);
    this.setState({
      description: val.description,
      typeIncident: val.typeIncident,
      autreIncident: val.autreIncident
    });

  }

  checkDatesDebutFinInformations = () => {
    this.setState({
      errorMessage: null
    });

    let dateDebut = format(this.props.route?.params?.row?.dateDebut);

    moment.suppressDeprecationWarnings = true;
    let dateHeureDebut = moment(dateDebut, FORMAT_DDMMYYYY_HHMM);

    console.log('dateHeureEntree : ', dateHeureDebut);

    console.log('this.state.dateFin : ', this.state.dateFin);
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

  Enregister = () => {
    // console.log('Enregister this.props ', JSON.stringify(this.props));
    // console.log('Enregister this.state?.dateFin ', this.state?.dateFin);
    let res = this.props.route?.params?.row?.refPJ?.split('_');
    let localOrdreService = this.props.route?.params?.row;
    localOrdreService.dateDebut = moment(this.props.route?.params?.row?.dateDebut).format("YYYY-MM-DD HH:mm").toString();
    localOrdreService.dateFin = moment(this.props.route?.params?.row?.dateFin).format("YYYY-MM-DD HH:mm").toString();
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
      rondesApparition: this.state?.rondesApparitions ? this.state?.rondesApparitions : [],
      gibPerquisition: this.state?.gibPerquisition ? this.state?.gibPerquisition : {},

    };
    //rsAEnregistrer = { "anneeRef": "2021", "autreIncidents": "Autres incidents", "codeCatTI": "1", "codeUORef": "371", "commentaire": null, "dateEnregistrement": null, "dateEnregistrementV0": "", "dateFin": "2021-02-24", "description": "Description", "disableFields": null, "heureFin": "00:30", "idOS": 3, "journeeDU": "2021-02-24", "motif": null, "numOS": null, "numSerieRef": "9005", "ordres": null, "pk": null, "rapportService": { "id": null, "ordreService": { "id": 5719, "numero": 3, "confidentiel": false, "additif": false, "dateDebut": "2021-02-24", "dateFin": "2021-02-24", "description": "test2", "chefEquipe": { "idActeur": "AD6205", "nom": "AD6205", "numeroPaie": -1, "prenom": "AD6205", "refGradeLib": "" }, "vehicules": [], "agentsBrigade": [{ "id": 17374, "agent": { "idActeur": "AGKLO", "nom": "AGKLO", "numeroPaie": -1, "prenom": "AGKLO", "refGradeLib": "" }, "agentBrigade": "AGKLO AGKLO (AGKLO)" }, { "id": 17375, "agent": { "idActeur": "BOUCHRAAG1", "nom": "bouchraAG1", "numeroPaie": -1, "prenom": "bouchraAG1", "refGradeLib": "" }, "agentBrigade": "bouchraAG1 bouchraAG1 (BOUCHRAAG1)" }], "typeService": { "code": "8.1", "libelle": "Entretien des armes", "classeService": "E", "sousService": false, "categorie": { "code": "8", "libelle": "Armement" } }, "heureDebut": "00:00", "heureFin": "00:30", "os_chefBrigade": false, "ronde": false, "maritime": false, "aerien": true, "uniteOrganisationnelle": "Brigade Casa-Port (371)(371)", "refPJ": "371_2021_9005", "journeeDu": "24/02/2021", "libAdditif": "Non", "libChefBrigade": "Non", "libRonde": "Non", "libMaritime": "Non", "libAerien": "Oui", "libConfidentiel": "Non", "defaultConverter": {}, "rapportExiste": false }, "vrs": null }, "reference": "371_2021_9005", "statut": null, "typeAction": "ACTION_AJOUTER", "typeIncident": null, "typesIncidentSelect": ["1.6"], "uniteorganisationnelle": "Brigade Casa-Port (371)(371)", "validations": null, "vehiculesSaisiVO": [{ "natureVehicule": { "code": "2", "libelle": "\tAutocar" }, "libelle": "123", "valeur": "123" }], "marchandisesVO": [{ "marque": { "code": "01-13", "libelle": "Chocolat en poudre (unité) " }, "quantite": "10", "valeur": "100", "uniteMesure": { "codeUniteMesure": "049", "descriptionUniteMesure": "pièce nouvelle" } }], "pvsSaisi": [{ "numPV": "123", "datePV": "2021-05-19" }], "navigationsAeriennes": [{ "dateAtterissage": 1621459105794, "heureAtterissage": 1621459105794, "motifAtterissage": "ddd", "aeroportEntree": "ddd", "provenance": { "codePays": "FR", "nomPays": "FRANCE(FR)" }, "villeProvenance": "nice", "aeroportAttache": "AA", "pavillon": "Paviollon", "dateDepart": 1621459105794, "heureDepart": 1621459105794, "destination": { "codePays": "DE", "nomPays": "ALLEMAGNE(DE)" }, "villeDestination": "berlin", "typeAvion": "type", "immatriculation": "immatriculation", "nomAvion": "nom", "couleur": "Gris", "nbPlaces": "10", "nbMoteurs": "20", "tonnage": "20", "dateDebutControle": 1621459105794, "heureDebutControle": 1621459105794, "dateFinControle": 1621459105794, "heureFinControle": 1621459105794, "documentsVerifies": "document", "observations": "observation", "resultatControle": "resultat", "intervenants": [{ "passager": true, "equipage": false, "professionIntervenant": "ProfessiProfession", "intervenant": { "refTypeDocumentIdentite": "07", "numeroDocumentIndentite": "1A22", "nomIntervenant": "NoNom", "prenomIntervenant": "Prenom", "nationaliteFr": "DE", "adresse": "Adressse" } }], "proprietaires": [{ "professionIntervenant": "pofnoiess", "intervenant": { "numeroRC": "", "refCentreRC": { "codeCentreRC": "" }, "refTypeDocumentIdentite": "02", "numeroDocumentIndentite": "A123", "nomIntervenant": "nom", "prenomIntervenant": "prenom", "nationaliteFr": "FR", "adresse": "Adresse" } }] }], "navigationsMaritimes": [], "versionRS": null, "versionsRS": null };
    cleanOrdreService(rsAEnregistrer);
    console.log('--------------------------------After Cleaning rsAEnregistrer--------------------------------------------------');
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

    let action = enregistrerRS.request({
      type: Constants.ACTIFS_CREATION_REQUEST,
      value: { data: rsAEnregistrer },
    });
    this.props.dispatch(action);
    console.log('dispatch fired !!');

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
          {(!this.props.consultation) && <IconButton
            icon="content-save-outline"
            size={30}
            color={primaryColor}
            style={{ backgroundColor: 'white' }}
            onPress={() => this.Enregister()}
          />}
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
            <Tab.Screen name={translate('actifsCreation.perquisition.title')}>
              {() => (
                <PerquisitionTab />
              )}
            </Tab.Screen>

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
          </Tab.Navigator>

        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.creationActifsReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationScreen);
