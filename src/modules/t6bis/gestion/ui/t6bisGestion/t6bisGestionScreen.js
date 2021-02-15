import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrButtonComp, ComBadrDialogComp, ComBadrErrorMessageComp, ComBadrInfoMessageComp, ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import { CMD_ENREGISTRER_T6BIS, CMD_SAUVEGARDER_T6BIS } from '../../../utils/t6bisConstants';
import { calculerMontantGlobal, completer, deleteAttributes, getMessageValidation, isCm, isCreation, isMtm, preconditions, prepareListArticlesCm, prepareListArticlesMtm, validate } from '../../../utils/t6bisUtils';
import t6bisinitT6bisEnteteSectionAction from '../../state/actions/t6bisInitT6bisEnteteSectionAction';
import t6bissauvegarderT6BISAction from '../../state/actions/t6bissauvegarderT6BISAction';
import t6bissupprimerT6BISAction from '../../state/actions/t6bissupprimerT6BISAction';
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
            t6bis: props.route.params.t6bis,
            title: props.route.params.title,
            identifiants: null,
            listmoyenpaiement: null,
            haslignetaxation: null,
            tabs: null,
            dialogVisibility: false
        };
    }
    showDialog = () => {
        this.setState({
            dialogVisibility: true
        });
    };

    hideDialog = () => this.setState({ dialogVisibility: false });


    componentDidMount = async () => {
        console.log('this.state.componentDidMount', this.state);
        console.log('this.props.componentDidMount', this.props);
        let action = await t6bisinitT6bisEnteteSectionAction.request({
            type: Constantes.T6BIS_INIT_ENTETE_REQUEST,
            value: {
                codeType: this.state.context.selectedType.code,
                t6bis: this.state.t6bis,
                mode: this.state.mode
            }
        });
        this.props.actions.dispatch(action);






    }

    componentWillUnmount() {
        console.log('T6bisGestion        componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };


    sauvgarder = () => {
        this.lancerUC(CMD_SAUVEGARDER_T6BIS);
    }
    lancerUC = (uc) => {

        if (isCreation && this.props.t6bis && this.props.t6bis.dateEnregistrement) {
            var messages = [translate('t6bisGestion.declarationDejaEnregistree')];
            this.setState({ errorMessage: messages });
        } else {


            completer(this.props.t6bis);
            deleteAttributes(this.props.t6bis);
            console.log('sauvgarder 1');
            var tempListArticles = [];

            if (isCreation && this.props.t6bis && this.props.t6bis?.codeTypeT6bis === '01') {
                prepareListArticlesMtm(tempListArticles, this.props.t6bis);
            }
            else if (this.props.t6bis && this.props.t6bis?.codeTypeT6bis === '02') {
                if (this.props.t6bis.listeArticleT6bis) {
                    if (isCreation) {
                        prepareListArticlesCm(tempListArticles, this.props.t6bis);
                    }
                    this.props.t6bis.listeArticleT6bis.forEach(function (article) {
                        article.dateMiseEnCirculation = moment(new Date(article.dateMiseEnCirculation)).format("dd/MM/yyyy");
                    });
                } else {
                    this.props.t6bis.listeArticleT6bis = [];
                }
            } else if (this.props.t6bis && this.props.t6bis?.codeTypeT6bis === '03') {
                this.props.t6bis.dateEntree = moment(new Date(this.props.t6bis.dateEntree)).format("dd/MM/yyyy");
                this.props.t6bis.dateSortie = moment(new Date(this.props.t6bis.dateSortie)).format("dd/MM/yyyy");
            }
            if (CMD_ENREGISTRER_T6BIS === uc) {
                calculerMontantGlobal(this.props.t6bis);
            }
            if (validate(this.props.t6bis)) {
                var action = uc + this.props.t6bis?.codeTypeT6bis;
                console.log('sauvgarder 2');
                let dataToAction = {
                    type: Constantes.T6BIS_SAUVEGARDER_REQUEST,
                    value: {
                        cmd: action,
                        t6bis: this.props.t6bis,
                        tempListArticles: tempListArticles
                    }
                };
                console.log('sauvgarder dataToAction-------------------------------------------', dataToAction);
                this.props.actions.dispatch(t6bissauvegarderT6BISAction.request(dataToAction));
            } else {
                this.setState({ errorMessage: ["Champs obligatoires : " + getMessageValidation(this.props.t6bis).join(", ")] });
            }
        }

    }
    enregistrer = () => {
        this.lancerUC(CMD_ENREGISTRER_T6BIS);
    }
    quitter = () => {
        this.props.navigation.navigate('Home', {});
    }

    supprimer = () => {

        this.showDialog();
    };

    suppressionEffective = () => {
        console.log('--------------------------------------------------SuppressionEffective---  1  -------------------------------------------------------------------------');
        deleteAttributes(this.props.t6bis);
        console.log('--------------------------------------------------SuppressionEffective---  2  -------------------------------------------------------------------------');
        var cmd = "supprimerT6BIS" + this.props.t6bis?.codeTypeT6bis;
        var result = preconditions(this.props.t6bis, 'supprimer');
        if (!result) {
            console.log('--------------------------------------------------SuppressionEffective---  3  -------------------------------------------------------------------------');
            delete this.props.t6bis.listeArticleT6bis;
            let action = t6bissupprimerT6BISAction.request(
                {
                    type: Constantes.T6BIS_SUPPRIMER_REQUEST,
                    value: {
                        t6bis: this.props.t6bis,
                        cmd: cmd
                    },
                }, this.props.navigation, 'Home'
            );
            this.props.actions.dispatch(action);
            this.hideDialog();
            console.log('--------------------------------------------------SuppressionEffective---  4  -------------------------------------------------------------------------');
        } else {
            console.log('--------------------------------------------------SuppressionEffective---  5 2 -------------------------------------------------------------------------');
            this.setState({ errorMessage: result, dialogVisibility: false });

        }
    };

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps--------------------props ', props);
        console.log('getDerivedStateFromProps--------------------state ', state);

        if (
            props.errorMessage
        ) {
            return {

                errorMessage: props.errorMessage// update the value of specific key

            };
        }
        if (
            props.successMessage
        ) {
            return {

                successMessage: props.successMessage// update the value of specific key

            };
        }
        // Return null to indicate no change to state.
        return null;
    }
    render() {

        let codeTypeT6bis = this.props.t6bis?.codeTypeT6bis;

        return (

            <ScrollView style={styles.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={this.state.title}
                />
                {this.state.errorMessage != null && (
                    <View style={styles.messages}>
                        <ComBadrErrorMessageComp
                            message={this.state.errorMessage}
                        />
                    </View>
                )}
                {this.state.successMessage != null && (
                    <View>
                        <ComBadrInfoMessageComp
                            message={this.state.successMessage}
                        />
                    </View>
                )}




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
                            this.sauvgarder();
                        }}
                        text={translate('t6bisGestion.buttons.sauvegarder')}
                    />
                    <ComBadrButtonComp
                        style={{ width: 100 }}
                        onPress={() => {
                            this.enregistrer();
                        }}
                        text={translate('t6bisGestion.buttons.enregistrer')}
                    />
                    <ComBadrButtonComp
                        style={{ width: 100 }}
                        onPress={() => {
                            this.supprimer();
                        }}
                        text={translate('t6bisGestion.buttons.supprimer')}
                    />
                    <ComBadrButtonComp
                        style={{ width: 100 }}
                        onPress={() => {
                            this.quitter();
                        }}
                        text={translate('t6bisGestion.buttons.quitter')}
                    />



                </View>
                <ComBadrDialogComp
                    title={translate('t6bisGestion.suppression.confirmDialog.info')}
                    confirmMessage={translate('t6bisGestion.suppression.confirmDialog.oui')}
                    cancelMessage={translate('t6bisGestion.suppression.confirmDialog.non')}
                    dialogMessage={translate('t6bisGestion.suppression.confirmDialog.suppressionMessage')}
                    onCancel={this.hideDialog}
                    onOk={this.suppressionEffective}
                    dialogVisibility={this.state.dialogVisibility}
                />

            </ScrollView>



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
