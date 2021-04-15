import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import EtatChargementDeclarationDetail from './pecEtatChargementDeclarationDetail';

/**Custom Components */
/** REDUX **/
import { connect } from 'react-redux';
import { primaryColor } from '../../../../commons/styles/ComThemeStyle';
import style from '../style/pecEtatChargementStyle';
import { ComBadrProgressBarComp } from '../../../../commons/component';
const Tab = createMaterialTopTabNavigator();

function Tab1({ route, navigation }) {
    return <EtatChargementDeclarationDetail navigation={navigation} route={route} />;
}

function Tab2({ route, navigation }) {
    return <EtatChargementDeclarationDetail navigation={navigation} route={route} />;
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
        console.log('-------------------------3-------------------------');
        console.log(JSON.stringify(this.props));
        console.log('--------------------------3------------------------');
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
                        initialLayout={{ height: Dimensions.get('window').height }}
                        swipeEnabled={false}
                        tabBarOptions={{
                            labelStyle: { fontSize: 16, fontWeight: 'bold' },
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
                        <Tab.Screen name={translate('transverse.retablir')} component={Tab1} />
                        <Tab.Screen name="Tab 2" component={Tab2} />
                        <Tab.Screen name="Tab 3" component={Tab3} />
                        <Tab.Screen name="Tab 4" component={Tab4} />
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