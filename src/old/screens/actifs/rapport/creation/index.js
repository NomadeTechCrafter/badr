import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component/';
import moment from 'moment';

import {IconButton} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';

const Tab = createMaterialTopTabNavigator();

import {connect} from 'react-redux';

const screenHeight = Dimensions.get('window').height;

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Entete from './entete';
import Details from './details';
import Saisie from './saisie';
import * as enregistrerRS from '../../../../redux/actions/actifs/rapport/creation/creation';
import * as Constants from '../../../../common/constants/actifs/rapport/creation/creation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {load} from '../../../../services/storage-service';

const screenWidth = Dimensions.get('window').width;

function EnteteScreen({consultation, route, navigation}) {
  return (
    <Entete consultation={consultation} navigation={navigation} route={route} />
  );
}

function DetailsScreen({route, navigation}) {
  return <Details navigation={navigation} route={route} />;
}

function SaisieScreen({route, navigation}) {
  return <Saisie navigation={navigation} route={route} />;
}

class Creation extends Component {
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
      this.setState({rows: JSON.parse(value)}, () => {
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
        this.setState({autreIncident: value});
      } else {
        console.log('no value');
      }
    });
  };

  loadTypeincident = () => {
    load('typeIncident').then((value) => {
      if (value) {
        this.setState({typeIncident: value});
      } else {
        console.log('no value');
      }
    });
  };
  loadDescription = () => {
    load('description').then((value) => {
      if (value) {
        this.setState({description: value});
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
    let data = {
      jsonVO: rsAEnregistrer,
    };
    let action = enregistrerRS.request({
      type: Constants.ACTIFS_CREATION_REQUEST,
      value: {data: data},
    });
    this.props.dispatch(action);
    console.log('dispatch fired !!');
  };

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('actifs.title')}>
          <IconButton
            icon="content-save-outline"
            size={30}
            color={primaryColor}
            style={{backgroundColor: 'white'}}
            onPress={() => this.Enregister()}
          />
        </ComBadrToolbarComp>
        {this.props.showProgress && (
          <ComBadrProgressBarComp width={screenWidth} />
        )}
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{height: Dimensions.get('window').height}}
            swipeEnabled={false}
            tabBarOptions={{
              labelStyle: {fontSize: 16, fontWeight: 'bold'},
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
            <Tab.Screen consultation={this.state.consultation} name="Entête">
              {() => (
                <Entete
                  consultation={this.state.consultation}
                  row={this.state.row}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Details">
              {() => (
                <Details
                  consultation={this.state.consultation}
                  row={this.state.row}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Saisie" component={SaisieScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.creationActifsReducer});

export default connect(mapStateToProps, null)(Creation);
