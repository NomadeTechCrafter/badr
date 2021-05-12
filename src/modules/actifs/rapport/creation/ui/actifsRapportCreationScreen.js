import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { ComBadrErrorMessageComp, ComBadrProgressBarComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { load } from '../../../../../commons/services/async-storage/ComStorageService';
import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import * as Constants from '../state/actifsRapportCreationConstants';
import * as enregistrerRS from '../state/actions/actifsRapportCreationEnregistrerRSAction';
import * as getOsById from '../state/actions/actifsRapportCreationGetOsByIdAction';
import AtifsRapportCreationDetailsTab from './details/actifsRapportCreationDetails';
import ActifsRapportCreationEmbarcationsTab from './embarcations/actifsRapportCreationEmbarcationsTab';
import ActifsRapportCreationEnteteTab from './entete/actifsRapportCreationEnteteTab';
import AtifsRapportCreationSaisieTab from './saisie/actifsRapportCreationSaisieTab';



const Tab = createMaterialTopTabNavigator();


const screenHeight = Dimensions.get('window').height;


const screenWidth = Dimensions.get('window').width;

function EnteteScreen({ route, navigation }) {
  return (
    <ActifsRapportCreationEnteteTab navigation={navigation} route={route} />
  );
}

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
  return <actifsRapportCreationAvionsPriveesTab navigation={navigation} route={route} />;
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
    console.log('this.props.===========');
    console.log(this.props);
  }

  componentDidMount = () => {
    console.log('this.props : yassine                                                             09/05/2021 ', this.props);
    let data = this.props.route.params.row?.id;

    let action = getOsById.request(
      {
        type: Constants.ACTIFS_ENTETE_REQUEST,
        value: { data: data },
      } /*,
                    this.props.navigation,
                    this.props.successRedirection,*/,
    );
    this.props.dispatch(action);


  };



  updateSaisieValue = (val) => {
    console.log('val :', val);
    this.setState({ vehiculesSaisiVO: val.vehiculesSaisiVO, marchandisesVO: val.marchandisesVO, pvsSaisi: val.pvsSaisi });

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

    let dateDebut = format(this.props.rows.dateDebut);

    moment.suppressDeprecationWarnings = true;
    let dateHeureDebut = moment(dateDebut, FORMAT_DDMMYYYY_HHMM);

    console.log('dateHeureEntree : ', dateHeureDebut);

    console.log('this.state.dateFin : ', this.state.dateFin);
    let dateHeureFin = moment(this.state.dateFin, FORMAT_DDMMYYYY_HHMM);
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
  Enregister = () => {
    let rsAEnregistrer = {
      anneeRef: this.state.rows.journeeDu, //....?????getRapportTemp().anneeRef
      autreIncidents: this.state.autreIncident, //yess details
      codeCatTI: '1',
      codeUORef: this.state.rows.vehicules[0].codeUO,
      commentaire: null,
      dateEnregistrement: null,
      dateEnregistrementV0: '',
      dateFin: (this.state?.dateFin) ? this.state.dateFin : this.state.row.dateFin, //yes
      description: this.state.description, //yess reacherche(description rapport)
      disableFields: null,
      heureFin: (this.state?.heureFin) ? this.state.heureFin : this.state.row.heureFin, //yess entete
      idOS: this.state.rows.numero, //recherchess
      journeeDU: this.state.rows.journeeDu, //yess entete
      motif: null,
      numOS: null,
      numSerieRef: 3,
      ordres: null,
      pk: null,
      rapportService: this.state.rows.numero,
      reference: this.state.rows.refPJ, //yess
      statut: null,
      typeAction: 'ACTION_AJOUTER',
      typeIncident: null,
      typesIncidentSelect: this.state.typeIncident, //yess
      uniteorganisationnelle: this.state.rows.uniteOrganisationnelle, //yess
      validations: null,
      vehiculesSaisiVO: this.state.vehiculesSaisiVO,
      marchandisesVO: this.state.marchandisesVO,
      pvsSaisi: this.state.pvsSaisi,
      versionRS: null,
      versionsRS: null,
    };
    console.log('--------------------------------rows navigationsMaritimes--------------------------------------------------');
    console.log(this.state.rows.navigationsMaritimes);
    if (this.checkDatesDebutFinInformations()) {
      return;
    }
    load('navigationsMaritimes').then((value) => {
      if (value) {
        console.log(value);
        rsAEnregistrer.navigationsMaritimes = value;
        let data = {
          jsonVO: rsAEnregistrer,
        };
        console.log(data);
        let action = enregistrerRS.request({
          type: Constants.ACTIFS_CREATION_REQUEST,
          value: { data: data },
        });
        //this.props.dispatch(action);
        console.log('dispatch fired !!');
      } else {
        console.log('no value');
      }
    });
    console.log('--------------------------------rows--------------------------------------------------');
    console.log('--------------------------------rows navigationsMaritimes--------------------------------------------------');
    console.log(this.state.rows.navigationsMaritimes);
    load('navigationsMaritimes').then((value) => {
      if (value) {
        console.log(value);
        rsAEnregistrer.navigationsMaritimes = value;
        let data = {
          jsonVO: rsAEnregistrer,
        };
        console.log(data);
        let action = enregistrerRS.request({
          type: Constants.ACTIFS_CREATION_REQUEST,
          value: { data: data },
        });
        //this.props.dispatch(action);
        console.log('dispatch fired !!');
      } else {
        console.log('no value');
      }
    });
    console.log('--------------------------------rows--------------------------------------------------');



  };

  render() {

    console.log('rows 1  ActifsRapportCreationScreen :', this.state.rows);
    console.log('rows 2  ActifsRapportCreationScreen  :', this.state.rows.maritime);
    console.log('rows 3  ActifsRapportCreationScreen  :', this.props.rows);
    console.log('rows 4  ActifsRapportCreationScreen  :', this.props.rows?.maritime);
    console.log(!this.props.rows?.maritime && !this.props.rows?.aerien);
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('actifsCreation.title')}>
          <IconButton
            icon="content-save-outline"
            size={30}
            color={primaryColor}
            style={{ backgroundColor: 'white' }}
            onPress={() => this.Enregister()}
          />
        </ComBadrToolbarComp>
        {this.props.showProgress && (
          <ComBadrProgressBarComp width={screenWidth} />
        )}
        {this.state.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.state.errorMessage} />
        )}
        <NavigationContainer independent={true}>
          {!(this.props.rows?.maritime) && !(this.props.rows?.aerien) &&
            <Tab.Navigator
              initialLayout={{ height: Dimensions.get('window').height }}
              swipeEnabled={false}
              tabBarOptions={{
                labelStyle: { fontSize: 16, fontWeight: 'bold' },
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
              <Tab.Screen name="Entête1">
                {() => (
                  <ActifsRapportCreationEnteteTab
                    update={(val) => this.updateEnteteValue(val)}
                  />
                )}
              </Tab.Screen>
              <Tab.Screen name="Details">
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
              
              
            </Tab.Navigator>}
          {(this.props.rows?.maritime) && (
            <Tab.Navigator
              initialLayout={{ height: Dimensions.get('window').height }}
              swipeEnabled={false}
              tabBarOptions={{
                labelStyle: { fontSize: 16, fontWeight: 'bold' },
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
              <Tab.Screen name="Entête">
                {() => (
                  <ActifsRapportCreationEnteteTab
                    update={(val) => this.updateEnteteValue(val)}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen name="Details">
                {() => (
                  <AtifsRapportCreationDetailsTab
                    consultation={this.state.consultation}
                    row={this.state.row}
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
              <Tab.Screen name={translate('actifsCreation.embarcations.title')} component={embarcationsTab} />
            </Tab.Navigator>)}
          {(this.props.rows?.aerien) && (
            <Tab.Navigator
              initialLayout={{ height: Dimensions.get('window').height }}
              swipeEnabled={false}
              tabBarOptions={{
                labelStyle: { fontSize: 16, fontWeight: 'bold' },
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
              <Tab.Screen name="Entête">
                {() => (
                  <ActifsRapportCreationEnteteTab
                    update={(val) => this.updateEnteteValue(val)}
                  />
                )}
              </Tab.Screen>

              <Tab.Screen name="Details">
                {() => (
                  <AtifsRapportCreationDetailsTab
                    consultation={this.state.consultation}
                    row={this.state.row}
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
              <Tab.Screen name={translate('actifsCreation.avionsPrivees.title')} component={avionsPriveesTab} />
            </Tab.Navigator>)} 
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.creationReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationScreen);
