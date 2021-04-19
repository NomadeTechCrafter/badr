import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import EtatChargementDeclarationDetail from './pecEtatChargementDeclarationDetail';
import EtatChargementEntete from './pecEtatChargementEntete';

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

function Tab3({ route, navigation }) {
    return <EtatChargementDeclarationDetail navigation={navigation} route={route} />;
}

function Tab4({ route, navigation }) {
    return <EtatChargementDeclarationDetail navigation={navigation} route={route} />;
}

class PecEtatChargementResultScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    onItemSelected = (row) => { };

    componentDidMount() {
    }

    componentDidUpdate() {
        //     console.log('-------------------------3-------------------------');
        //     console.log(JSON.stringify(this.props));
        //     console.log('--------------------------3------------------------');
        if (this.props.route.params.first) {
            // this.refs._badrTable.reset();
        }
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
                        {/* <Tab.Screen name={translate('etatChargement.declarationDetail')} component={declarationDetail} />
                        <Tab.Screen name={translate('etatChargement.marchandisesAutresDocuments')} component={declarationDetail} />
                        <Tab.Screen name={translate('etatChargement.ecorage')} component={declarationDetail} />
                        <Tab.Screen name={translate('etatChargement.infos')} component={declarationDetail} /> */}
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