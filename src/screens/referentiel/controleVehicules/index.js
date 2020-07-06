import React from 'react';

import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {translate} from '../../../common/translations/i18n';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {primaryColor} from '../../../styles/index';

import ControleVehiculesSearch from './search';
import ControleVehiculesResult from './result';

/**Custom Components */
import {BadrProgressBar, Toolbar} from '../../../components';

/** REDUX **/
import {connect} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

/** CONSTANTS **/
function ResultScreen({route, navigation}) {
  return <ControleVehiculesResult navigation={navigation} route={route} />;
}

function SearchScreen({route, navigation}) {
  return <ControleVehiculesSearch navigation={navigation} route={route} />;
}

class ControleVehicules extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          navigation={this.props.navigation}
          icon="menu"
          title={translate('referentiel.controleVehicules.title')}
          subtitle={translate('referentiel.controleVehicules.subTitle')}
        />
        {this.props.showProgress && <BadrProgressBar circle={false} />}
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

const styles = {
  container: {width: '100%', height: '100%'},
};

function mapStateToProps(state) {
  return {...state.controleVehiculesReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControleVehicules);
