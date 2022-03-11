import React from 'react';

import {View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {primaryColor} from '../../../../../commons/styles/ComThemeStyle';

import MainleveeEntete from '../ongletsMainlevee/decMainleveeEntete';
import MainleveeInfo from '../ongletsMainlevee/decMainleveeInfo';
import MainleveeScanner from '../ongletsMainlevee/decMainleveeScanner';
import MainleveeDecEnDetail from '../ongletsMainlevee/decMainleveeDecEnDetail';
import MainleveeConnaissements from '../ongletsMainlevee/decMainleveeConnaissements';
import MainleveeEtatChargement from '../ongletsMainlevee/decMainleveeEtatChargement';

/**Custom Components */
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

/** REDUX **/
import {connect} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

class MainleveeListeDeclaration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('mainlevee.title')}
          subtitle={translate('mainlevee.subTitleAction')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        {/* {this.props.showProgress && <ComBadrCircleProgressBarComp size={30} />} */}
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{height: Dimensions.get('window').height}}
            swipeEnabled={false}
            tabBarOptions={{
              labelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
              },
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
              scrollEnabled: true,
              style: {height: 50},
              tabStyle: {
                borderRightWidth: 1,
                borderRightColor: primaryColor,
                width: 200,
              },
            }}>
            <Tab.Screen
              name={translate('tabs.entete')}
              component={() => (
                <MainleveeEntete dataVo={this.props.route.params.data.jsonVO} />
              )}
              //component={EnteteScreen}
            />

            <Tab.Screen
              name={translate('tabs.connaissements')}
              component={() => (
                <MainleveeConnaissements
                  dataVo={this.props.route.params.data.jsonVO}
                />
              )}
            />

            <Tab.Screen
              name={translate('tabs.declarationDetail')}
              component={() => (
                <MainleveeDecEnDetail
                  dataVo={this.props.route.params.data.jsonVO}
                />
              )}
            />
            <Tab.Screen
              name={translate('tabs.etatChargement')}
              component={() => (
                <MainleveeEtatChargement
                  dataVo={this.props.route.params.data.jsonVO}
                />
              )}
            />

            <Tab.Screen
              name={translate('tabs.resultScanner')}
              component={() => (
                <MainleveeScanner dataVo={this.props.route.params.data.jsonVO} />
              )}
            />

            <Tab.Screen
              name={translate('tabs.info')}
              component={() => (
                <MainleveeInfo dataVo={this.props.route.params.data.jsonVO} />
              )}
            />
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
  return {...state.plaquesImmReducer};
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
)(MainleveeListeDeclaration);
