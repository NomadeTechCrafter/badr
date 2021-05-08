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
                        <Tab.Screen name={translate('etatChargement.ecorage')} component={ecorage} />
                        <Tab.Screen name={translate('etatChargement.infos')} component={infos} />
                        <Tab.Screen name={translate('etatChargement.resultatScanner')} component={scanner} />
                        
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.pecEtatChargementReducer };
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