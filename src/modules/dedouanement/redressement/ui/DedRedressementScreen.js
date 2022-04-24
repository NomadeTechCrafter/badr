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
    ENREGISTRER_REDRESSEMENT_INIT,
    ENREGISTRER_REDRESSEMENT_REQUEST,
    ENREGISTRER_REDRESSEMENT_UPDATE,
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
import DedRedressementResultatScannerScreen from './resultatScanner/DedRedressementResultatScannerScreen';
import DedRedressementMoyenTransportTransitScreen from './moyenTransport/DedRedressementMoyenTransportTransitScreen';
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';
import { DED_IMPUTATION_RED_NEW_PROVISIONNELLE, DED_IMPUTATION_TC_NOUVELLE_PROVISIONNELLE, DED_SERV_RECHREFERENCE } from '../utils/DedConstants';
import dedEnregistrerRedressementAction from '../state/actions/dedEnregistrerRedressementAction';
import ModalIntervention from './modelIntervention/modalIntervention';
import controleUpdateVersionsAction from '../../../controle/common/state/actions/controleUpdateVersionsAction';
import { CONTROLE_UPDATE_VERSIONS_REQUEST } from '../../../controle/common/state/controleCommonConstants';



const Tab = createMaterialTopTabNavigator();

function EnteteScreen({ route, navigation }) {
    return <DedRedressementEnteteScreen navigation={navigation} route={route} />;
}
function CautionScreen({ route, navigation }) {
    return <DedRedressementCautionScreen navigation={navigation} route={route} />;
}

function ArticlesScreen({ route, navigation }) {
    return (
        <DedRedressementArticlesScreen navigation={navigation} route={route} />
    );
}

function PreapurementDsScreen({ route, navigation }) {
    return (
        <DedRedressementPreapurementDsScreen
            navigation={navigation}
            route={route}
        />
    );
}

function DemandeDiverseScreen({ route, navigation }) {
    return (
        <DedRedressementDemandeDiverseScreen
            navigation={navigation}
            route={route}
        />
    );
}

function ImputationTitreChangeScreen({ route, navigation }) {
    return (
        <DedRedressementImputationTitreChangeScreen
            navigation={navigation}
            route={route}
        />
    );
}

function ImputationCompteREDScreen({ route, navigation }) {
    return (
        <DedRedressementImputationCompteREDScreen
            navigation={navigation}
            route={route}
        />
    );
}

function DocumentsScreen({ route, navigation }) {
    return (
        <DedRedressementDocumentsScreen navigation={navigation} route={route} />
    );
}

function InfoScreen({ route, navigation }) {
    return <DedRedressementInfoScreen navigation={navigation} route={route} />;
}

function ResultatScanner({ route, navigation }) {
    return <DedRedressementResultatScannerScreen navigation={navigation} route={route} reference={this.props?.data?.dedReferenceVO?.reference} />;
}

class DedRedressementScreen extends React.Component {
    defaultState = {
        isCautionVisible: true,
        isPreapurementDSVisible: true,
        isDemandesDiversesVisible: true,
        isImputationTitreChangeVisible: true,
        isImputationCompteRedVisible: true,
        showIntervention: false,
        indexDialogConfirmationReception: 0,
        showInterventionRedressement: false,
        indexDialogRedressement: 0,
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
            this.setState({ isImputationCompteRedVisible: false });
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

        console.log('ComSessionService.getInstance().getFonctionalite() :', ComSessionService.getInstance().getFonctionalite());
        console.log('DED_SERV_RECHREFERENCE :', DED_SERV_RECHREFERENCE);
        console.log('typeof ComSessionService.getInstance().getFonctionalite() :', typeof ComSessionService.getInstance().getFonctionalite());
        let data = {
            codeRegime: codeRegime,
            categorie: categorie,
            codeBureau: codeBureau,
            identifiant: identifiant,
            readOnlyAcces: this.isRecherchParReference(),
            redressement: !this.isRecherchParReference(),
        };
        this.callRedux({
            command: 'ded.isPreapurementDSAccessible',
            typeService: 'SP',
            jsonVO: data,
        });
    };

    isRecherchParReference = () => {
        return ComSessionService.getInstance().getFonctionalite() === DED_SERV_RECHREFERENCE;
    }

    isImputerTc = ()=>{
        return ComSessionService.getInstance().getFonctionalite() === DED_IMPUTATION_TC_NOUVELLE_PROVISIONNELLE;
    }

    actionImputationRedNewProvisionnelle = () => { 
        return ComSessionService.getInstance().getFonctionalite() === DED_IMPUTATION_RED_NEW_PROVISIONNELLE;
    }

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
        this.checkAffichabilite();
        this.checkAccessibility();
        this.checkPresenceDouaniere();
    }

    checkPresenceDouaniere = () => {
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

    componentWillUnmount() {
    }

    lancerModal = () => {
        let index = this.state.indexDialogConfirmationReception
        this.setState({
            indexDialogConfirmationReception: index + 1
        });

        let action = DedConfirmerCertificatReceptionAction.init(
            {
                type: CONFIRMER_CERTIFICAT_RECEPTION_INIT


            },

        );
        this.props.dispatch(action);
        this.setState({ showIntervention: true });
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
                value: this.state.transitCertifReceptVO,


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


    lancerModalRedressement = () => {
        let index = this.state.indexDialogRedressement
        

        let action = dedEnregistrerRedressementAction.init(
            {
                type: ENREGISTRER_REDRESSEMENT_INIT


            },

        );
        this.props.dispatch(action);
        this.setState({ showInterventionRedressement: true, indexDialogRedressement: index + 1});
    }

    updateIntervention = (dedDumMotifIInputVO) => {


        let action = dedEnregistrerRedressementAction.update(
            {
                type: ENREGISTRER_REDRESSEMENT_UPDATE,
                value: dedDumMotifIInputVO


            },

        );
        this.props.dispatch(action);
        this.setState({ etat: true });
    }

    onDismissModalRedressement = () => {
        this.setState({
            showInterventionRedressement: false
        });
    };

    retablirRedressement = () => {
        this.updateIntervention({ "motif": "" });
    };

    confirmerRedressement = (dedDumMotifIInputVO) => {
        this.onDismissModalRedressement();
        let consulterDumReducer = getValueByPath('consulterDumReducer',this.props);

        dedDumMotifIInputVO.dedDumVO = consulterDumReducer.data;
        let action = dedEnregistrerRedressementAction.request(
            {
                type: ENREGISTRER_REDRESSEMENT_REQUEST,
                value: dedDumMotifIInputVO,


            }, this.updateVersions,
            this.props.navigation, this.props.route.params.successRedirection

        );

        console.log('confirmerRedressement : ', this.props.route.params.successRedirection);
        this.props.dispatch(action);


    }

    updateVersions = (numeroVersionBase,numeroVersionCourante) => {
        console.log('updateVersions numeroVersionBase:', numeroVersionBase);
        console.log('updateVersions numeroVersionCourante:', numeroVersionCourante);
        var action = controleUpdateVersionsAction.updateVersions(
            {
                type: CONTROLE_UPDATE_VERSIONS_REQUEST,
                value: { numeroVersionBase, numeroVersionCourante}
            }

        );
        this.props.dispatch(action);
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
        let isConfirmationReception = this.props.route.params.isConfirmationReception;

        let isRedressementDUM = this.props.route.params.isRedressementDUM;
        let dedDumMotifIInputVO = getValueByPath('dedEnregisterRedressementReducer.dedDumMotifIInputVO', this.props);
         console.log('this.props : ', JSON.stringify(this.props?.dedEnregisterRedressementReducer));
        

        console.log('dedDumMotifIInputVO (yla 26012021) : ', dedDumMotifIInputVO);
        // console.log('this.props.consulterDumReducer : ', this.props.consulterDumReducer);

        console.log('success : ', typeof success != "undefined");
        console.log('success : ', success);
        //console.log('this.props 15042022: ', JSON.stringify(this.props) );
        console.log('isConfirmationReception : ', isConfirmationReception);
        console.log('(typeof isConfirmationReception != "undefined") ', (typeof isConfirmationReception != "undefined"));
        console.log('isRedressementDUM : ', isRedressementDUM);
        console.log('(typeof isRedressementDUM != "undefined") ', (typeof isRedressementDUM != "undefined"));
        console.log('isImputationCompteREDAccessible ', isImputationCompteREDAccessible);
        console.log('this.state.isImputationCompteRedVisible ', this.state.isImputationCompteRedVisible);
        
 

        return (
            <View style={{ flex: 1 }}>
                {this.props.route.params.showHeader && <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    title={this.props.route.params.title}
                    subtitle={this.props.route.params.subtitle}
                    icon="menu">
                    {(((typeof isConfirmationReception != "undefined") && (isConfirmationReception)) && ((typeof success == "undefined") || (!success))) && <IconButton
                        icon="arrange-bring-forward"
                        size={30}
                        color={primaryColor}
                        style={{ backgroundColor: 'white' }}
                        onPress={() => this.lancerModal()}
                    />}
                    {(((typeof isRedressementDUM != "undefined") && (isRedressementDUM)) && ((typeof success == "undefined") || (!success))) && <IconButton
                        icon="arrange-bring-forward"
                        size={30}
                        color={primaryColor}
                        style={{ backgroundColor: 'white' }}
                        onPress={() => this.lancerModalRedressement()}
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
                                labelStyle: { fontSize: 14, fontWeight: 'bold' },
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
                            {((this.state.isPreapurementDSVisible &&
                                    isPreapurementDSAccessible?.data && !this.isImputerTc() && !this.actionImputationRedNewProvisionnelle())
                                || this.props?.consulterDumReducer?.fromWhere1 === 'ded.InitEnvoyerValeur'
                                || this.props?.consulterDumReducer?.fromWhere1 === 'ded.InitTraiterValeur') && (
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
                            {((this.state.isImputationTitreChangeVisible &&
                                isImputationTitresDeChangeAccessible.data === true)
                                || this.props?.consulterDumReducer?.fromWhere1 === 'ded.InitEnvoyerValeur'
                                || this.props?.consulterDumReducer?.fromWhere1 === 'ded.InitTraiterValeur') && (
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
                            {(this.props?.consulterDumReducer?.fromWhere1 !== 'ded.InitEnvoyerValeur'
                                && this.props?.consulterDumReducer?.fromWhere1 !== 'ded.InitTraiterValeur') && (
                                    <Tab.Screen name="Moyen de transport de transit" component={DedRedressementMoyenTransportTransitScreen} />
                                )}
                            <Tab.Screen name="Info" component={InfoScreen} />
                            <Tab.Screen name="Résultat scanner" component={ResultatScanner} />

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
                <ModalIntervention
                    visible={this.state.showInterventionRedressement}
                    dedReferenceVO={getValueByPath('dedReferenceVO', this.props, 'consulterDumReducer',)}
                    dedDumMotifIInputVO={dedDumMotifIInputVO}
                    onDismiss={this.onDismissModalRedressement}
                    confirmer={this.confirmerRedressement}
                    retablir={this.retablirRedressement}
                    update={this.updateIntervention}
                    index={this.state.indexDialogRedressement}
                />
            </View>
        );
    }

    callRedux = (actionValue) => {
        if (this.props.dispatch) {
            console.log('calling redux ...');
            this.props.dispatch(
                request({ type: GENERIC_DED_REQUEST, value: actionValue }),
            );
        }
    };

    init = () => {
        this.props.dispatch(request({ type: GENERIC_DED_INIT, value: {} }));
    };

    extractCommandData = (command, reducerName) => {
        return this.props[reducerName] && this.props[reducerName].picker
            ? this.props[reducerName].picker[command]
            : null;
    };
}
function mapStateToProps(state) {
    return { ...state };
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
