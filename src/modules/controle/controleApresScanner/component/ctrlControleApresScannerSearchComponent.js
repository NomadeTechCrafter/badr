import React from 'react';

import {Dimensions, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {primaryColor} from '../../../../commons/styles/ComThemeStyle';

import {
    ComBadrProgressBarComp,
    ComBadrToolbarComp,
} from '../../../../commons/component';

import ReferenceTabSearchComponent from './searchTabs/referenceTabSearchComponent';
import EtatChargementTabSearchComponent from './searchTabs/etatChargementTabSearchComponent';

import {connect} from 'react-redux';
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import style from '../style/ctrlControleApresScannerStyle';

const Tab = createMaterialTopTabNavigator();

function ReferenceTabSearchTab({route, navigation}) {
    return <ReferenceTabSearchComponent navigation={navigation} route={route}/>;
}

function EtatChargementTabSearchTab({route, navigation, props}) {
    return <EtatChargementTabSearchComponent navigation={navigation} route={route}/>;
}

class CtrlControleApresScannerSearchComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={style.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('controleApresScanner.controleApresScanner.title')}
                />
                {this.props.showProgress && (
                    <ComBadrProgressBarComp/>
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
                        <Tab.Screen
                            name={translate('controleApresScanner.search.declarationEnDetail.title')}
                            component={ReferenceTabSearchTab}
                        />
                        <Tab.Screen
                            name={translate('controleApresScanner.search.etatChargement.title')}
                            component={EtatChargementTabSearchTab}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {...state.ctrlControleApresScannerReducer};
}

function mapDispatchToProps(dispatch) {
    let actions = {dispatch};
    return {
        actions,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CtrlControleApresScannerSearchComponent);
