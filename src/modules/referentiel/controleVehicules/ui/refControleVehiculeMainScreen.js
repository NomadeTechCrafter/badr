import React from 'react';

import {Dimensions, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ControleVehiculesSearch from './refControleVehiculeSearchScreen';
import ControleVehiculesResult from './refControleVehiculeResultScreen';
/**Custom Components */
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
/** REDUX **/
import {connect} from 'react-redux';

import style from '../style/refControleVehiculeStyle';
import {primaryColor} from '../../../../commons/styles/ComThemeStyle';
import translate from '../../../../commons/i18n/ComI18nHelper';

const Tab = createMaterialTopTabNavigator();

/** CONSTANTS **/
function ResultScreen({route, navigation}) {
  return <ControleVehiculesResult navigation={navigation} route={route} />;
}

function SearchScreen({route, navigation}) {
  return <ControleVehiculesSearch navigation={navigation} route={route} />;
}

class RefControleVehiculeMainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('controleVehicules.title')}
          subtitle={translate('controleVehicules.subTitle')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
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
            <Tab.Screen name="Recherche" component={SearchScreen} />
            <Tab.Screen name="Resultat" component={ResultScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.controleVehiculesReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RefControleVehiculeMainScreen);