import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import EtatChargementDeclarationDetail from './pecEtatChargementDeclarationDetail';
import EtatChargementEntete from './pecEtatChargementEntete';
import EtatChargementMarchandisesAutresDocuments from './pecEtatChargementMarchandisesAutresDocuments';
import EtatChargementEcorage from './pecEtatChargementEcorage';
import EtatChargementInfos from './pecEtatChargementInfos'
import EtatChargementScanner from './pecEtatChargementScanner'
import * as ScannerEtatChargementAction from '../state/actions/pecScannerEtatChargementAction';
import * as HistEtatChargementAction from '../state/actions/pecHistoriqueEtatChargementAction';
import * as VersionsEtatChargementAction from '../state/actions/pecVersionsEtatChargementAction';
import * as ScellesApresScannerEtatChargementAction from '../state/actions/pecScellesApresScannerEtatChargementAction';
import * as Constants from '../state/pecEtatChargementConstants';


/**Custom Components */
/** REDUX **/
import { connect } from 'react-redux';
import { primaryColor } from '../../../../commons/styles/ComThemeStyle';
import style from '../style/pecEtatChargementStyle';
import { ComBadrProgressBarComp } from '../../../../commons/component';
import translate from '../../../../commons/i18n/ComI18nHelper';
const Tab = createMaterialTopTabNavigator();

function declarationDetail({ route, navigation }) {
    return <EtatChargementDeclarationDetail navigation={navigation} route={route} />;
}

function enteteEtatChargement({ route, navigation }) {
    return <EtatChargementEntete navigation={navigation} route={route} />;
}

function marchandisesAutresDocuments() {
    return <EtatChargementMarchandisesAutresDocuments />;
}

function ecorage({ route, navigation }) {
    return <EtatChargementEcorage navigation={navigation} route={route} />;
}

function infos({ route, navigation }) {
    return <EtatChargementInfos navigation={navigation} route={route} />;
}

function scanner({ route, navigation }) {
    return <EtatChargementScanner navigation={navigation} route={route} />;
}

class PecEtatChargementResultScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onItemSelected = (row) => { };

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.navigation.navigate('Resultat', { screen: translate('etatChargement.enteteEtatChargement') });
        });
    }


    searchScanner = (bureau, regime, annee, serie) => {
        let action = ScannerEtatChargementAction.request(
            {
                type: Constants.SCANNER_ETAT_CHARGEMENT_VE_REQUEST,
                value: bureau + regime + annee + serie

            },
            // this.props.navigation,
        );
        return action
    };

    searchScellesApresScanner = (bureau, regime, annee, serie) => {
        let action = ScellesApresScannerEtatChargementAction.request(
            {
                type: Constants.SCELLES_APRES_SCANNER_ETAT_CHARGEMENT_VE_REQUEST,
                value: bureau + regime + annee + serie

            },
            this.props.navigation,
        );
        return action
    };


    searchHistorique = (bureau, regime, annee, serie)  => {
        let action = HistEtatChargementAction.request(
            {
                type: Constants.HISTORIQUE_ETAT_CHARGEMENT_VE_REQUEST,
                value: {
                    bureau: bureau,
                    regime: regime,
                    annee: annee,
                    serie: serie,
                },
            },
            this.props.navigation,
        );
        return action
    };

    searchVersions = (bureau, regime, annee, serie)  => {
        let action = VersionsEtatChargementAction.request(
            {
                type: Constants.VERSIONS_ETAT_CHARGEMENT_VE_REQUEST,
                value: {
                    bureau: bureau,
                    regime: regime,
                    annee: annee,
                    serie: serie,
                },
            },
            this.props.navigation,
        );
        return action
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <View style={style.container}>
                {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
                <NavigationContainer independent={true}>
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
                        <Tab.Screen name={translate('etatChargement.enteteEtatChargement')} component={enteteEtatChargement} />
                        <Tab.Screen name={translate('etatChargement.declarationDetail')} component={declarationDetail} />
                        <Tab.Screen name={translate('etatChargement.marchandisesAutresDocuments')} component={marchandisesAutresDocuments} />
                        <Tab.Screen
                            listeners={{
                                tabPress: e => {
                                    const bureau = this.props?.data?.refEtatChargement?.refBureauDouane?.codeBureau;
                                    const regime = this.props?.data?.refEtatChargement?.regime
                                    const annee = this.props?.data?.refEtatChargement?.anneeEnregistrement;
                                    const serie = this.props?.data?.refEtatChargement?.numeroSerieEnregistrement;

                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.refBureauDouane?.codeBureau));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.regime));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.anneeEnregistrement));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.numeroSerieEnregistrement));
                                    const actionScellesApresScanner = this.searchScellesApresScanner(bureau, regime, annee, serie);
                                    this.props.actions.dispatch(actionScellesApresScanner);
                                },
                            }}
                            name={translate('etatChargement.ecorage')}
                            component={ecorage}
                        />
                        <Tab.Screen

                            listeners={{
                                tabPress: e => {
                                    const bureau = this.props?.data?.refEtatChargement?.refBureauDouane?.codeBureau;
                                    const regime = this.props?.data?.refEtatChargement?.regime
                                    const annee = this.props?.data?.refEtatChargement?.anneeEnregistrement;
                                    const serie = this.props?.data?.refEtatChargement?.numeroSerieEnregistrement;

                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.refBureauDouane?.codeBureau));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.regime));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.anneeEnregistrement));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.numeroSerieEnregistrement));

                                    const actionHistorique = this.searchHistorique(bureau, regime, annee, serie);
                                    const actionVersions = this.searchVersions(bureau, regime, annee, serie);
                                    this.props.actions.dispatch(actionHistorique);
                                    this.props.actions.dispatch(actionVersions);
                                },
                            }}
                            name={translate('etatChargement.infos')}
                            component={infos}
                        />
                        <Tab.Screen
                            listeners={{
                                tabPress: e => {
                                    const bureau = this.props?.data?.refEtatChargement?.refBureauDouane?.codeBureau;
                                    const regime = this.props?.data?.refEtatChargement?.regime
                                    const annee = this.props?.data?.refEtatChargement?.anneeEnregistrement;
                                    const serie = this.props?.data?.refEtatChargement?.numeroSerieEnregistrement;

                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.refBureauDouane?.codeBureau));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.regime));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.anneeEnregistrement));
                                    console.log('******************************************' + JSON.stringify(this.props?.data?.refEtatChargement?.numeroSerieEnregistrement));
                                    const actionScanner = this.searchScanner(bureau, regime, annee, serie);
                                    this.props.actions.dispatch(actionScanner);
                                },
                            }}
                            name={translate('etatChargement.resultatScanner')}
                            component={scanner}
                        />

                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pecEtatChargementVEReducer };
}

function mapDispatchToProps(dispatch) {
    let actions = { dispatch };
    return {
        actions,
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PecEtatChargementResultScreen);