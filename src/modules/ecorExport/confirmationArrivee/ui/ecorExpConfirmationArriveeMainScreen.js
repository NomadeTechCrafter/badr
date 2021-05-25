import React from 'react';

import {Dimensions, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ConfirmationArriveeRechercheScreen from './ecorExpConfirmationArriveeRechercheScreen';
import ConfirmationArriveeResultScreen from './ecorExpConfirmationArriveeResultScreen';
/**Custom Components */
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';
import {IconButton} from 'react-native-paper';
/** REDUX **/
import {connect} from 'react-redux';

import style from '../style/ecorExpConfirmationArriveeStyle';
import {primaryColor} from '../../../../commons/styles/ComThemeStyle';
import translate from '../../../../commons/i18n/ComI18nHelper';

const Tab = createMaterialTopTabNavigator();

/** CONSTANTS **/
function ResultScreen({route, navigation}) {
  return (
    <ConfirmationArriveeResultScreen navigation={navigation} route={route} />
  );
}

function SearchScreen({route, navigation}) {
  return (
    <ConfirmationArriveeRechercheScreen navigation={navigation} route={route} />
  );
}

class ConfirmationArriveeMainScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={style.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('confirmationArrivee.title')}
          subtitle={translate('confirmationArrivee.subTitle')}
          icon="menu"
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
)(ConfirmationArriveeMainScreen);
