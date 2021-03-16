import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { ComBadrProgressBarComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { load } from '../../../../../commons/services/async-storage/ComStorageService';
import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import * as Constants from '../state/actifsRapportCreationConstants';
import * as enregistrerRS from '../state/actions/actifsRapportCreationEnregistrerRSAction';
import actifsRapportCreationAvionsPriveesTab from './avionsPrivees/actifsRapportCreationAvionsPriveesTab';
import AtifsRapportCreationDetailsTab from './details/actifsRapportCreationDetails';
import ActifsRapportCreationEmbarcationsTab from './embarcations/actifsRapportCreationEmbarcationsTab';
import ActifsRapportCreationEnteteTab from './entete/actifsRapportCreationEnteteTab';
import AtifsRapportCreationSaisieTab from './saisie/actifsRapportCreationSaisieTab';



const Tab = createMaterialTopTabNavigator();


const screenHeight = Dimensions.get('window').height;


const screenWidth = Dimensions.get('window').width;

function EnteteScreen({ consultation, route, navigation }) {
  return (
    <ActifsRapportCreationEnteteTab consultation={consultation} navigation={navigation} route={route} />
  );
}

function DetailsScreen({ route, navigation }) {
  return <AtifsRapportCreationDetailsTab navigation={navigation} route={route} />;
}

function SaisieScreen({ route, navigation }) {
  return <AtifsRapportCreationSaisieTab navigation={navigation} route={route} />;
}


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
    load('rows').then((value) => {
      this.setState({ rows: JSON.parse(value) }, () => {
        console.log(this.state.rows.vehicules[0]);
      });
    });
    this.loadincident();
    this.loadTypeincident();
    this.loadDescription();
  };

  loadincident = () => {
    load('autreIncident').then((value) => {
      if (value) {
        this.setState({ autreIncident: value });
      } else {
        console.log('no value');
      }
    });
  };

  loadTypeincident = () => {
    load('typeIncident').then((value) => {
      if (value) {
        this.setState({ typeIncident: value });
      } else {
        console.log('no value');
      }
    });
  };
  loadDescription = () => {
    load('description').then((value) => {
      if (value) {
        this.setState({ description: value });
      } else {
        console.log('no value');
      }
    });
  };
  Enregister = () => {
    let rsAEnregistrer = {
      anneeRef: this.state.rows.journeeDu, //....?????getRapportTemp().anneeRef
      autreIncidents: this.state.autreIncident, //yess details
      codeCatTI: '1',
      codeUORef: this.state.rows.vehicules[0].codeUO,
      commentaire: null,
      dateEnregistrement: null,
      dateEnregistrementV0: '',
      dateFin: this.state.row.dateFin, //yes
      description: this.state.description, //yess reacherche(description rapport)
      disableFields: null,
      heureFin: this.state.rows.heureFin, //yess entete
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
      vehiculesSaisiVO: '',
      marchandisesVO: '',
      pvsSaisi: '',
      versionRS: null,
      versionsRS: null,
    };
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

    console.log('rows    :', this.state.rows);
    console.log('rows    :', this.state.rows.maritime);
    console.log(!this.state.rows.maritime && !this.state.rows.aerien);
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
        <NavigationContainer independent={true}>
          {(!this.state.rows.maritime && !this.state.rows.aerien) && (
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
              <Tab.Screen consultation={this.state.consultation} name="Entête1">
                {() => (
                  <ActifsRapportCreationEnteteTab
                    consultation={this.state.consultation}
                    row={this.state.row}
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
              <Tab.Screen name="Saisie" component={SaisieScreen} />
            </Tab.Navigator>)}
          {(this.state.rows.maritime) && (
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
              <Tab.Screen consultation={this.state.consultation} name="Entête2">
                {() => (
                  <ActifsRapportCreationEnteteTab
                    consultation={this.state.consultation}
                    row={this.state.row}
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
              <Tab.Screen name="Saisie" component={SaisieScreen} />
              <Tab.Screen name={translate('actifsCreation.embarcations.title')} component={embarcationsTab} />
            </Tab.Navigator>)}
          {(this.state.rows.aerien) && (
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
              <Tab.Screen consultation={this.state.consultation} name="Entête3">
                {() => (
                  <ActifsRapportCreationEnteteTab
                    consultation={this.state.consultation}
                    row={this.state.row}
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
              <Tab.Screen name="Saisie" component={SaisieScreen} />
              <Tab.Screen name={translate('actifsCreation.avionsPrivees.title')} component={avionsPriveesTab} />
            </Tab.Navigator>)}
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.creationReducer });

export default connect(mapStateToProps, null)(ActifsRapportCreationScreen);
