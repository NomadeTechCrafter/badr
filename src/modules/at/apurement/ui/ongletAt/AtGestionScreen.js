import React from 'react';

import { View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';

import AtEnteteScreen from './entete/AtEnteteScreen';
import AtComposantScreen from './composant/AtComposantScreen';
import AtCreateApurementScreen from './apurement/AtCreateApurementScreen';
import AtDocAnnexeScreen from './docAnnexe/AtDocAnnexeScreen';
import AtHistoriqueScreen from './historique/AtHistoriqueScreen';

/**Custom Components */
import {
  ComBadrErrorMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';

/** REDUX **/
import { connect } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

class AtGestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      erreur: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          back={true}
          navigation={this.props.navigation}
          icon="menu"
          title={translate('at.title')}
          subtitle={translate('at.recherche.subTitleMulti')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        <View style={styles.messages}>
          <ComBadrErrorMessageComp
            style={styles.centerErrorMsg}
            message={this.props.errorMessage}
          />
        </View>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialLayout={{ height: Dimensions.get('window').height }}
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
              style: { height: 50 },
              tabStyle: {
                borderRightWidth: 1,
                borderRightColor: primaryColor,
                width: 200,
              },
            }}>
            <Tab.Screen
              name={translate('tabs.entete')}
              component={() => (
                <AtEnteteScreen data={this.props.data} />
              )}
            />

            <Tab.Screen
              name={translate('tabs.composant')}
              component={() => (
                <AtComposantScreen data={this.props.data} />
              )}
            />

            <Tab.Screen
              name={translate('tabs.apurement')}
              component={() => (
                <AtCreateApurementScreen data={this.props.data} consultation={true} />
              )}
            />

            <Tab.Screen
              name={translate('tabs.docAnnexe')}
              component={() => (
                <AtDocAnnexeScreen data={this.props.data} />
              )}
            />

            <Tab.Screen
              name={translate('tabs.historique')}
              component={() => (
                <AtHistoriqueScreen data={this.props.data} />
              )}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View >
    );
  }
}

const styles = {
  messages: {},
  container: { width: '100%', height: '100%' },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function mapStateToProps(state) {
  return { ...state.atConsulterReducer };
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
)(AtGestion);
