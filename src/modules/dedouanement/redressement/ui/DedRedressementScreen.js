import React from 'react';
import {BackHandler, Dimensions, View} from 'react-native';
/** Drawer navigation */
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {primaryColor} from '../../../../commons/styles/ComThemeStyle';
import DedRedressementCautionScreen from './caution/DedRedressementCautionScreen';
import DedRedressementEnteteScreen from './entete/DedRedressementEnteteScreen';
import DedRedressementArticlesScreen from './articles/DedRedressementArticlesScreen';
import DedRedressementPreapurementDsScreen from './preapurementDS/DedRedressementPreapurementDsScreen';
import DedRedressementDemandeDiverseScreen from './demandesDiverses/DedRedressementDemandeDiverseScreen';
import DedRedressementImputationTitreChangeScreen from './imputationsTitresChange/DedRedressementImputationTitreChangeScreen';
import DedRedressementImputationCompteREDScreen from './imputationsCompteRED/DedRedressementImputationCompteREDScreen';
import DedRedressementDocumentsScreen from './documents/DedRedressementDocumentsScreen';
import DedRedressementInfoScreen from './info/DedRedressementInfoScreen';
import {request} from '../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../state/DedRedressementConstants';
import {connect} from 'react-redux';
import consulterDumReducer from '../../../../commons/state/reducers/ConsulterDumReducer';

import {getValueByPath, getCategorieDum} from '../utils/DedUtils';
import _ from 'lodash';

const Tab = createMaterialTopTabNavigator();

function EnteteScreen({route, navigation}) {
  return <DedRedressementEnteteScreen navigation={navigation} route={route} />;
}
function CautionScreen({route, navigation}) {
  return <DedRedressementCautionScreen navigation={navigation} route={route} />;
}

function ArticlesScreen({route, navigation}) {
  return (
    <DedRedressementArticlesScreen navigation={navigation} route={route} />
  );
}

function PreapurementDsScreen({route, navigation}) {
  return (
    <DedRedressementPreapurementDsScreen
      navigation={navigation}
      route={route}
    />
  );
}

function DemandeDiverseScreen({route, navigation}) {
  return (
    <DedRedressementDemandeDiverseScreen
      navigation={navigation}
      route={route}
    />
  );
}

function ImputationTitreChangeScreen({route, navigation}) {
  return (
    <DedRedressementImputationTitreChangeScreen
      navigation={navigation}
      route={route}
    />
  );
}

function ImputationCompteREDScreen({route, navigation}) {
  return (
    <DedRedressementImputationCompteREDScreen
      navigation={navigation}
      route={route}
    />
  );
}

function DocumentsScreen({route, navigation}) {
  return (
    <DedRedressementDocumentsScreen navigation={navigation} route={route} />
  );
}

function InfoScreen({route, navigation}) {
  return <DedRedressementInfoScreen navigation={navigation} route={route} />;
}

class DedRedressementScreen extends React.Component {
  defaultState = {
    isCautionVisible: true,
    isPreapurementDSVisible: true,
    isDemandesDiversesVisible: true,
    isImputationTitreChangeVisible: true,
    isImputationCompteRedVisible: true,
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  getCategorieDum = () => {
    return getCategorieDum(
      getValueByPath(
        'dedDumSectionEnteteVO.typeDUM',
        this.props,
        'consulterDumReducer',
      ),
      getValueByPath('sousDum', this.props, 'consulterDumReducer'),
    );
  };

  //affichabilité des onglets
  checkAffichabilite = () => {
    //2 » pour une DUM provisionnelle initiale : Entête, Caution, Article, Documents et Info.
    //4 » pour une sous-dum provisionnelle :  Tous les onglets sont affichés sauf caution
    if (this.getCategorieDum() === '2') {
      this.setState({
        isPreapurementDSVisible: false,
        isDemandesDiversesVisible: false,
        isImputationTitreChangeVisible: false,
        isImputationCompteRedVisible: false,
      });
    } else if (this.getCategorieDum() === '4') {
      this.setState({isImputationCompteRedVisible: false});
    }
  };
  isCautionAccessible = () => {
    let codeRegime = getValueByPath(
      'dedDumSectionEnteteVO.refRegime',
      this.props,
      'consulterDumReducer',
    );
    let categorie = this.getCategorieDum();
    let combinee = getValueByPath(
      'dedDumSectionEnteteVO.combinee',
      this.props,
      'consulterDumReducer',
    );
    let identifiant = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props,
      'consulterDumReducer',
    );
    let data = {
      codeRegime: codeRegime,
      categorie: categorie,
      combinee: combinee,
      readOnlyAcces: 'false',
    };
    this.callRedux({
      command: 'ded.isCautionAccessible',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  isPreapurementDSAccessible = () => {
    let codeRegime = getValueByPath(
      'dedDumSectionEnteteVO.refRegime',
      this.props,
      'consulterDumReducer',
    );
    let categorie = this.getCategorieDum();
    let codeBureau = getValueByPath(
      'dedDumSectionEnteteVO.refBureauDedouanement',
      this.props,
      'consulterDumReducer',
    );
    let identifiant = getValueByPath(
      'dedReferenceVO.identifiant',
      this.props,
      'consulterDumReducer',
    );

    let data = {
      codeRegime: codeRegime,
      categorie: categorie,
      codeBureau: codeBureau,
      identifiant: identifiant,
      readOnlyAcces: 'false',
      redressement: 'true',
    };
    this.callRedux({
      command: 'ded.isPreapurementDSAccessible',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  isImputationCompteREDAccessible = () => {
    let codeRegime = getValueByPath(
      'dedDumSectionEnteteVO.refRegime',
      this.props,
      'consulterDumReducer',
    );
    let data = {
      codeRegime: codeRegime,
      dedRechDoc: 'false',
      readOnlyAcces: 'false',
      imputationTitresChangeAccessible: 'false',
    };
    this.callRedux({
      command: 'ded.isImputationCompteREDAccessible',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  //verifier si parmis la liste des articles existe un article avec paiement
  isArticleAvecPaiementExist = () => {
    let articleAvecPaiementExist = 'false';
    let keepGoing = true;
    var listeArticle = getValueByPath(
      'dedDumSectionArticlesVO',
      this.props,
      'consulterDumReducer',
    )
      ? getValueByPath(
          'dedDumSectionArticlesVO.dedDumArticleFormVO',
          this.props,
          'consulterDumReducer',
        )
      : [];
    listeArticle.forEach(function (article, index, array) {
      if (keepGoing) {
        if (article.paiement == 'true') {
          articleAvecPaiementExist = 'true';
          keepGoing = false;
        }
      }
    });
    return articleAvecPaiementExist;
  };

  isImputationTitresDeChangeAccessible = () => {
    let data = {
      dedValiderImputationsTitreChange: 'false',
      imputationTitresChangeAccessible: 'false',
      articleAvecPaiementExist: this.isArticleAvecPaiementExist(),
    };
    this.callRedux({
      command: 'ded.isImputationTitresDeChangeAccessible',
      typeService: 'SP',
      jsonVO: data,
    });
  };

  checkAccessibility = () => {
    this.isCautionAccessible();
    this.isPreapurementDSAccessible();
    this.isImputationCompteREDAccessible();
    this.isImputationTitresDeChangeAccessible();
  };

  componentDidMount() {
    this.checkAffichabilite();
    this.checkAccessibility();
  }

  componentWillUnmount() {}

  render() {
    let isCautionAccessible = this.extractCommandData(
      'ded.isCautionAccessible',
      'genericDedReducer',
    );
    let isPreapurementDSAccessible = this.extractCommandData(
      'ded.isPreapurementDSAccessible',
      'genericDedReducer',
    );
    let isImputationCompteREDAccessible = this.extractCommandData(
      'ded.isImputationCompteREDAccessible',
      'genericDedReducer',
    );
    let isImputationTitresDeChangeAccessible = this.extractCommandData(
      'ded.isImputationTitresDeChangeAccessible',
      'genericDedReducer',
    );
    return (
      <View style={{flex: 1}}>
        <Tab.Navigator
          swipeEnabled={true}
          lazy={true}
          optimizationsEnabled={true}
          tabBarOptions={{
            scrollEnabled: true,
            labelStyle: {fontSize: 14, fontWeight: 'bold'},
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
          <Tab.Screen name="Entête" component={EnteteScreen} />
          {this.state.isCautionVisible &&
            isCautionAccessible &&
            isCautionAccessible.data === true && (
              <Tab.Screen
                name="Caution"
                component={CautionScreen}
                listeners={
                  {
                    /* tabPress: (e) => {
                // Prevent default action
                e.preventDefault();
              },*/
                  }
                }
              />
            )}
          <Tab.Screen name="Articles" component={ArticlesScreen} />
          {this.state.isPreapurementDSVisible &&
            isPreapurementDSAccessible &&
            isPreapurementDSAccessible === true && (
              <Tab.Screen
                name="Préapurements DS"
                component={PreapurementDsScreen}
              />
            )}
          {this.state.isDemandesDiversesVisible && (
            <Tab.Screen
              name="Demandes Diverses"
              component={DemandeDiverseScreen}
            />
          )}
          {this.state.isImputationTitreChangeVisible &&
            isImputationTitresDeChangeAccessible &&
            isImputationTitresDeChangeAccessible.data === true && (
              <Tab.Screen
                name="Imputation Titre Change"
                component={ImputationTitreChangeScreen}
              />
            )}
          {this.state.isImputationCompteRedVisible &&
            isImputationCompteREDAccessible &&
            isImputationCompteREDAccessible.data === true && (
              <Tab.Screen
                name="Imputation Compte RED"
                component={ImputationCompteREDScreen}
              />
            )}
          <Tab.Screen name="Documents" component={DocumentsScreen} />
          <Tab.Screen name="Info" component={InfoScreen} />
        </Tab.Navigator>
      </View>
    );
  }

  callRedux = (actionValue) => {
    if (this.props.dispatch) {
      console.log('calling redux ...');
      this.props.dispatch(
        request({type: GENERIC_DED_REQUEST, value: actionValue}),
      );
    }
  };

  init = () => {
    this.props.dispatch(request({type: GENERIC_DED_INIT, value: {}}));
  };

  extractCommandData = (command, reducerName) => {
    return this.props[reducerName] && this.props[reducerName].picker
      ? this.props[reducerName].picker[command]
      : null;
  };
}
function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(DedRedressementScreen);
