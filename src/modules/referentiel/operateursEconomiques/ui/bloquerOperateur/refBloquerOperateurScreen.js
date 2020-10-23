import React from 'react';

import {Dimensions, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {primaryColor} from '../../../../../commons/styles/ComThemeStyle';

import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

import AddTab from './tabs/addTab';
import EditTab from './tabs/editTab';
import ConsultTab from './tabs/consultTab';

import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import style from '../../style/refOperateursEconomiquesStyle';

const Tab = createMaterialTopTabNavigator();

function AddScreen({route, navigation}) {
  return <AddTab navigation={navigation} route={route} />;
}

function EditScreen({route, navigation}) {
  return <EditTab navigation={navigation} route={route} />;
}

function ConsultScreen({route, navigation}) {
  return <ConsultTab navigation={navigation} route={route} />;
}

class BloquerOperateur extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={style.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('operateursEconomiques.bloquerOperateur.title')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}

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
              name={translate(
                'operateursEconomiques.bloquerOperateur.tabs.ajouter',
              )}
              component={AddScreen}
            />
            <Tab.Screen
              name={translate(
                'operateursEconomiques.bloquerOperateur.tabs.modifier',
              )}
              component={EditScreen}
            />
            <Tab.Screen
              name={translate(
                'operateursEconomiques.bloquerOperateur.tabs.services',
              )}
              component={ConsultScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.refOperateursEconomiquesReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BloquerOperateur);
