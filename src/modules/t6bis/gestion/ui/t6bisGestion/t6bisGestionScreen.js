import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrButtonComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import { isCm, isMtm } from '../../../utils/t6bisUtils';
import t6bisinitT6bisEnteteSectionAction from '../../state/actions/t6bisInitT6bisEnteteSectionAction';
import * as Constantes from '../../state/t6bisGestionConstants';
import styles from '../../style/t6bisGestionStyle';
import T6bisArticlesTab from './articles/t6bisArticlesScreen';
import T6bisEnteteTab from './entete/t6bisEnteteScreen';
import T6bisHistoriqueTab from './historique/t6bisHistoriqueScreen';
import T6bisInformationsTab from './informations/t6bisInformationsScreen';
import T6bisTaxationGlobaleTab from './taxationglobale/t6bisTaxationGlobaleScreen';
import T6bisTaxationManuelleTab from './taxationmanuelle/t6bisTaxationManuelleScreen';



const Tab = createMaterialTopTabNavigator();

function EnteteTab({ route, navigation }) {
    return (<T6bisEnteteTab navigation={navigation} route={route} />);
}

function ArticlesTab({ route, navigation }) {
    return (
        <T6bisArticlesTab navigation={navigation} route={route} />
    );
}

function TaxationManuelleTab({ route, navigation }) {
    return (
        <T6bisTaxationManuelleTab navigation={navigation} route={route} />
    );
}
function TaxationGlobaleTab({ route, navigation }) {
    return (
        <T6bisTaxationGlobaleTab navigation={navigation} route={route} />
    );
}
function InformationsTab({ route, navigation }) {
    return (
        <T6bisInformationsTab navigation={navigation} route={route} />
    );
}
function HistoriqueTab({ route, navigation }) {
    return (
        <T6bisHistoriqueTab navigation={navigation} route={route} />
    );
}




class T6bisGestion extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            context: props.route.params.context,
            mode: props.route.params.mode,
            t6bisEnteteData: null,
            t6bis: null,
            identifiants: null,
            listmoyenpaiement: null,
            haslignetaxation: null,
            tabs: null
        };
    }


    componentDidMount = async () => {
        console.log('this.state.componentDidMount', this.state);
        console.log('this.props.componentDidMount', this.props);
        let action = await t6bisinitT6bisEnteteSectionAction.request({
            type: Constantes.T6BIS_INIT_ENTETE_REQUEST,
            value: {
                codeType: this.state.context.selectedType.code,
                mode: this.state.mode
            }
        });
        this.props.actions.dispatch(action);

        this.state.tabs = [{ name: translate('t6bisGestion.tabs.entete.title'), comp: EnteteTab },
        { name: translate('t6bisGestion.tabs.articles.title'), comp: ArticlesTab },
        { name: translate('t6bisGestion.tabs.taxation.manuelle.title'), comp: TaxationManuelleTab },
        { name: translate('t6bisGestion.tabs.taxation.globale.title'), comp: TaxationGlobaleTab },
        { name: translate('t6bisGestion.tabs.informations'), comp: InformationsTab },
        { name: translate('t6bisGestion.tabs.historique.title'), comp: HistoriqueTab },
        ];




    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };


    /* getTabContent = () => {
        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;
        let testTypeT6bis = isMtm(codeTypeT6bis) || isCm(codeTypeT6bis);
        if (testTypeT6bis) {
            return (
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
                    <Tab.Screen name={translate('t6bisGestion.tabs.entete.title')} component={EnteteTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.articles.title')} component={ArticlesTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.taxation.manuelle.title')} component={TaxationManuelleTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.taxation.globale.title')} component={TaxationGlobaleTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.informations')} component={InformationsTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.historique.title')} component={HistoriqueTab} />
                </Tab.Navigator>
            );
        }
        if (!testTypeT6bis) {
            return (
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
                    <Tab.Screen name={translate('t6bisGestion.tabs.entete.title')} component={EnteteTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.taxation.globale.title')} component={TaxationGlobaleTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.informations')} component={InformationsTab} />
                    <Tab.Screen name={translate('t6bisGestion.tabs.historique.title')} component={HistoriqueTab} />
                </Tab.Navigator>
            );
        }
 


}
 */


    render() {

        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;

        return (

            <View style={styles.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('t6bisGestion.title')}
                />

                

                    <View style={{ flex: 1 }} >

                        {(!isMtm(codeTypeT6bis) && !isCm(codeTypeT6bis)) && (
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
                                <Tab.Screen name={translate('t6bisGestion.tabs.entete.title')} component={EnteteTab} />
                                <Tab.Screen name={translate('t6bisGestion.tabs.taxation.globale.title')} component={TaxationGlobaleTab} />
                                <Tab.Screen name={translate('t6bisGestion.tabs.informations')} component={InformationsTab} />
                                <Tab.Screen name={translate('t6bisGestion.tabs.historique.title')} component={HistoriqueTab} />
                            </Tab.Navigator>)}
                        {(isMtm(codeTypeT6bis) || isCm(codeTypeT6bis)) && (<Tab.Navigator
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
                            <Tab.Screen name={translate('t6bisGestion.tabs.entete.title')} component={EnteteTab} />
                            <Tab.Screen name={translate('t6bisGestion.tabs.articles.title')} component={ArticlesTab} />
                            <Tab.Screen name={translate('t6bisGestion.tabs.taxation.manuelle.title')} component={TaxationManuelleTab} />

                            <Tab.Screen name={translate('t6bisGestion.tabs.taxation.globale.title')} component={TaxationGlobaleTab} />
                            <Tab.Screen name={translate('t6bisGestion.tabs.informations')} component={InformationsTab} />
                            <Tab.Screen name={translate('t6bisGestion.tabs.historique.title')} component={HistoriqueTab} />
                        </Tab.Navigator>)}

                    </View>
                    <View
                        style={styles.containerActionBtn}
                        pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => {
                                this.sauvgarder('sauvegarderRI');
                            }}
                            text={translate('controle.sauvegarder')}
                            disabled={this.state.decisionControle ? false : true}
                        />
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            onPress={() => {
                                this.sauvgarder('validerRI');
                            }}
                            text={translate('controle.validerControle')}
                            disabled={this.state.decisionControle ? false : true}
                        />
                        <ComBadrButtonComp
                            style={{ width: 100 }}
                            text={translate('controle.redresserDeclaration')}
                        />
                    </View>


            </View>


        );
    }
}

function mapStateToProps(state) {
    return { ...state.t6bisGestionReducer };
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
)(T6bisGestion);
