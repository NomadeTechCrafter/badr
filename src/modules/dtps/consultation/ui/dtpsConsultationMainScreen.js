import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { connect } from "react-redux";
import { Dimensions, View } from 'react-native';
/**Custom Components */
import {
    ComBadrProgressBarComp,
    ComBadrToolbarComp,
} from '../../../../commons/component';
import translate from "../../../../commons/i18n/ComI18nHelper";
import style from '../style/dtpsConsultationStyle';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { primaryColor } from '../../../../commons/styles/ComThemeStyle';
import DTPSConsultationResult from "./dtpsConsultationResultScreen";
import DTPSConsultationSearch from "./dtpsConsultationRechercheScreen";

const Tab = createMaterialTopTabNavigator();

function ResultScreen({ route, navigation }) {
    return <DTPSConsultationResult navigation={navigation} route={route} />;
}

function SearchScreen({ route, navigation }) {
    return <DTPSConsultationSearch navigation={navigation} route={route} />;
}

class DTPSConsultationMainScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (

            <View style={style.container}>
                <ComBadrToolbarComp
                    navigation={this.props.navigation}
                    icon="menu"
                    title={translate('dtps.title')}
                    subtitle={translate('dtps.subTitleCons')}
                />
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
                        <Tab.Screen name="Recherche" component={SearchScreen} />
                        <Tab.Screen name="Resultat" component={ResultScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return { ...state.dtpsConsultationReducer };
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
)(DTPSConsultationMainScreen);