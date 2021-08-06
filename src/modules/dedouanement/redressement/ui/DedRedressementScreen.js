/** Drawer navigation */
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import moment from 'moment';
import { NavigationContainer } from '@react-navigation/native';
import _ from 'lodash';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrToolbarComp } from '../../../../commons/component';
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import {
    accentColor,
    primaryColor,
    primaryColorRgba
} from '../../../../commons/styles/ComThemeStyle';
import DedConfirmerCertificatReceptionAction from '../../confirmationReception/state/actions/DedConfirmerCertificatReceptionAction';
import { request } from '../state/actions/DedAction';
import {
    CONFIRMER_CERTIFICAT_RECEPTION_INIT,
    CONFIRMER_CERTIFICAT_RECEPTION_REQUEST,
    GENERIC_DED_INIT,
    GENERIC_DED_REQUEST
} from '../state/DedRedressementConstants';
import { getCategorieDum, getValueByPath } from '../utils/DedUtils';
import DedRedressementArticlesScreen from './articles/DedRedressementArticlesScreen';
import DedRedressementCautionScreen from './caution/DedRedressementCautionScreen';
import DedRedressementDemandeDiverseScreen from './demandesDiverses/DedRedressementDemandeDiverseScreen';
import DedRedressementDocumentsScreen from './documents/DedRedressementDocumentsScreen';
import DedRedressementEnteteScreen from './entete/DedRedressementEnteteScreen';
import DedRedressementImputationCompteREDScreen from './imputationsCompteRED/DedRedressementImputationCompteREDScreen';
import DedRedressementImputationTitreChangeScreen from './imputationsTitresChange/DedRedressementImputationTitreChangeScreen';
import DedRedressementInfoScreen from './info/DedRedressementInfoScreen';
import ModalConfirmationReception from './modelIntervention/modalConfirmationReception';
import DedRedressementPreapurementDsScreen from './preapurementDS/DedRedressementPreapurementDsScreen';



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
        showIntervention: false,
        indexDialogConfirmationReception: 0
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
        console.log('---isArticleAvecPaiementExist --- ', articleAvecPaiementExist);
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
        console.log('componentDidMount 08052021');
        this.checkAffichabilite();
        this.checkAccessibility();
        this.checkPresenceDouaniere();
    }

    checkPresenceDouaniere=()=>{
        let identifiant = getValueByPath(
            'dedReferenceVO.identifiant',
            this.props,
            'consulterDumReducer',
        );
        this.callRedux({
            command: 'ded.isDumSansPresenceDouaniere',
            typeService: 'SP',
            jsonVO: identifiant,
        });
    }

    componentWillUnmount() { }

    lancerModal = () => {
        let index = this.state.indexDialogConfirmationReception
        this.setState({
            indexDialogConfirmationReception: index+1
        });

        let action = DedConfirmerCertificatReceptionAction.init(
            {
                type: CONFIRMER_CERTIFICAT_RECEPTION_INIT


            },

        );
        this.props.dispatch(action);
        this.setState({showIntervention:true});
    }

    onDismissCertificatReception = () => {
        this.setState({
            showIntervention: false
        });
    };

    confirmerCertificatReception = () => {
        this.onDismissCertificatReception();
        let listDeclarationMoyenTransportVO = getValueByPath(
            'dedSectionMoyenTransportVO.listDeclarationMoyenTransportVO',
            this.props,
            'consulterDumReducer',
        );

        this.state.transitCertifReceptVO = {
            ...this.state.transitCertifReceptVO, listDeclarationMoyenTransportVO: listDeclarationMoyenTransportVO
        }
        let action = DedConfirmerCertificatReceptionAction.request(
            {
                type: CONFIRMER_CERTIFICAT_RECEPTION_REQUEST,
                value:  this.state.transitCertifReceptVO,


            },

        );
        this.props.dispatch(action);


    }

    retablirCertificatReception = () => {
        this.setState({
            transitCertifReceptVO: {}
        });
    };

    updateCertificatReception = (transitCertifReceptVO) => {

        console.log('test', transitCertifReceptVO);
        this.state.transitCertifReceptVO = transitCertifReceptVO;
        /* this.setState({
          transitCertifReceptVO: transitCertifReceptVO
        }); */
    }



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
        let isDumSansPresenceDouaniere = this.extractCommandData(
            'ded.isDumSansPresenceDouaniere',
            'genericDedReducer',
        );

        let errorMessage = getValueByPath(
            'dedConfirmationReceptionReducer.errorMessage',
            this.props

        );
        let messageInfo = getValueByPath(
            'dedConfirmationReceptionReducer.messageInfo',
            this.props,
        );

        let success = getValueByPath(
            'dedConfirmationReceptionReducer.success',
            this.props,
        );

        // console.log('this.props.dedConfirmationReceptionReducer : ', this.props.dedConfirmationReceptionReducer);
        // console.log('this.props.consulterDumReducer : ', this.props.consulterDumReducer);


        return (
            <View style={{ flex: 1 }}>
                {this.props.route.params.showHeader && <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    title={this.props.route.params.title}
                    subtitle={this.props.route.params.subtitle}
                    icon="menu">
                    {(!success) && <IconButton
                        icon="arrange-bring-forward"
                        size={30}
                        color={primaryColor}
                        style={{ backgroundColor: 'white' }}
                        onPress={() => this.lancerModal()}
                    />}
                </ComBadrToolbarComp>}
                {errorMessage != null && (
                    <View>
                      <ComBadrErrorMessageComp
                          style={styles.centerErrorMsg}
                          message={errorMessage}
                      />
                    </View>
                )}
                {messageInfo != null && (
                    <View>
                      <ComBadrInfoMessageComp
                          style={styles.centerInfoMsg}
                          message={messageInfo}
                      />
                    </View>
                )}
              <NavigationContainer independent={true}>
                  {/* add test to fix the loading prob in document tab*/}
                  {!_.isNil(isCautionAccessible) &&
                  !_.isNil(isPreapurementDSAccessible) &&
                  !_.isNil(isImputationTitresDeChangeAccessible) &&
                  !_.isNil(isImputationCompteREDAccessible) &&
                  !_.isNil(isCautionAccessible.data) &&
                  !_.isNil(isPreapurementDSAccessible.data) &&
                  !_.isNil(isImputationTitresDeChangeAccessible.data) &&
                  !_.isNil(isImputationCompteREDAccessible.data) ? (

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
                          {this.state.isCautionVisible && isCautionAccessible.data === true && (
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
                          isImputationTitresDeChangeAccessible.data === true && (
                              <Tab.Screen
                                  name="Imputation Titre Change"
                                  component={ImputationTitreChangeScreen}
                              />
                          )}
                          {this.state.isImputationCompteRedVisible &&
                          isImputationCompteREDAccessible.data === true && (
                              <Tab.Screen
                                  name="Imputation Compte RED"
                                  component={ImputationCompteREDScreen}
                              />
                          )}
                        <Tab.Screen name="Documents" component={DocumentsScreen} />
                        <Tab.Screen name="Info" component={InfoScreen} />
                      </Tab.Navigator>

                  ) : (
                      <Spinner
                          visible={true}
                          cancelable={false}
                          animation="fade"
                          color={accentColor}
                          overlayColor={'rgba(' + primaryColorRgba + ',0.80)'}
                          textContent={translate('transverse.inprogress')}
                          textStyle={styles.spinnerTextStyle}
                      />
                  )}
              </NavigationContainer>
              <ModalConfirmationReception
                  visible={this.state.showIntervention}
                  identifiant={getValueByPath('dedReferenceVO.identifiant', this.props, 'consulterDumReducer',)}
                  onDismiss={this.onDismissCertificatReception}
                  confirmer={this.confirmerCertificatReception}
                  retablir={this.retablirCertificatReception}
                  depotageSansPresenceDouaniere={isDumSansPresenceDouaniere?.data}
                  update={this.updateCertificatReception}
                  index={this.state.indexDialogConfirmationReception}
              />
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

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: accentColor,
        fontSize: 20,
        fontWeight: 'normal',
    },
    centerErrorMsg: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
