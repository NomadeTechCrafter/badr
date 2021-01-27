import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { ComBadrToolbarComp } from '../../../../../commons/component';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import styles from '../../style/t6bisGestionStyle';
import T6bisArticlesTab from './articles/t6bisArticlesScreen';
import T6bisEnteteTab from './entete/t6bisEnteteScreen';
import T6bisTaxationManuelleTab from './taxationmanuelle/t6bisTaxationManuelleScreen';
import T6bisTaxationGlobaleTab from './taxationglobale/t6bisTaxationGlobaleScreen';
import T6bisInformationsTab from './informations/t6bisInformationsScreen';
import T6bisHistoriqueTab from './historique/t6bisHistoriqueScreen';
import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import * as Constantes from '../../state/t6bisGestionConstants';
import t6bisinitT6bisEnteteSectionAction from '../../state/actions/t6bisInitT6bisEnteteSectionAction';



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
            haslignetaxation:null
        };
    }



    componentDidMount = async () => {
        console.log('this.state.componentDidMount',this.state);
        console.log('this.props.componentDidMount',this.props);
        let action = await t6bisinitT6bisEnteteSectionAction.request({
            type: Constantes.T6BIS_INIT_ENTETE_REQUEST, 
            value: {
                codeType: this.state.context.selectedType.code,
                mode: this.state.mode
            }
        });
        this.props.actions.dispatch(action);

        console.log('this.state.componentDidMount');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }



    reset = () => {
        console.log('reset');
    };



    render() {

        console.log('this.state', this.state);
        console.log('this.props', this.props);
        console.log('Gestion :this.props.t6bis', this.props.t6bis);

        return (

            <View style={styles.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('t6bisGestion.title')}
                />
                 
                <View style={{ flex: 1 }}>
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
                        <Tab.Screen name={translate('t6bisGestion.tabs.articles')} component={ArticlesTab} />
                        <Tab.Screen name={translate('t6bisGestion.tabs.taxation.manuelle')} component={TaxationManuelleTab} />
                        <Tab.Screen name={translate('t6bisGestion.tabs.taxation.globale')} component={TaxationGlobaleTab} />
                        <Tab.Screen name={translate('t6bisGestion.tabs.informations')} component={InformationsTab} />
                        <Tab.Screen name={translate('t6bisGestion.tabs.historique')} component={HistoriqueTab} />
                    </Tab.Navigator>
                    
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
