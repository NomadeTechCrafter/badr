import React from 'react';
import _ from 'lodash';
import { Dimensions, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AtEntete from './entete/AtEnteteScreen';
import AtComposant from './composant/AtComposantScreen';
import AtCreateApurementScreen from './apurement/AtCreateApurementScreen';
import AtDocAnnexeScreen from './docAnnexe/AtDocAnnexeScreen';
import AtHistoriqueScreen from './historique/AtHistoriqueScreen';
import * as InitApurementAction from '../../state/actions/atApurementInitAction';
import * as ConstantsAt from '../../state/atConstants';
/**Custom Components */
import {
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../../commons/component';
/** REDUX **/
import { connect } from 'react-redux';

import { primaryColor } from '../../../../../commons/styles/ComThemeStyle';
import translate from '../../../../../commons/i18n/ComI18nHelper';

const Tab = createMaterialTopTabNavigator();

/** CONSTANTS **/
function EnteteScreen({ route, navigation }) {
  return <AtEntete navigation={navigation} route={route} />;
}

function ComposantScreen({ route, navigation }) {
  return <AtComposant navigation={navigation} route={route} />;
}

function ApurementScreen({ route, navigation }) {
  return <AtCreateApurementScreen navigation={navigation} route={route} />;
}

function DocAnnexeScreen({ route, navigation }) {
  return <AtDocAnnexeScreen navigation={navigation} route={route} />;
}

function HistoriqueScreen({ route, navigation }) {
  return <AtHistoriqueScreen navigation={navigation} route={route} />;
}



class AtGestionScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!_.isEmpty(this.props.initApurement?.data)) {
      this.unsubscribe = this.props.navigation.addListener('focus', () => {
        this.onScreenReloaded();
      });
    }
  }
  
  componentWillUnmount() {
    if (!_.isEmpty(this.props.initApurement?.data)) {
      this.unsubscribe();
    }
  }

  onScreenReloaded = () => {
    if (
      this.props.initApurement &&
      this.props.initApurement.data &&
      this.props.initApurement.data.atEnteteVO
    ) {
      let verifierDelaiDepassementAction = InitApurementAction.verifierDepassementDelaiRequest(
        {
          type: ConstantsAt.VERIFIER_DELAI_DEPASSEMENT_REQUEST,
          value: {
            dateFinSaisieAT: this.props.initApurement.data.atEnteteVO
              .dateFinSaisieAT,
          },
        },
      );
      this.props.actions.dispatch(verifierDelaiDepassementAction);

      let verifierExistanceAutreATVoyVehMotoAction = InitApurementAction.verifierExistanceAutreATVoyVehMotoRequest(
        {
          type: ConstantsAt.VERIFIER_EXISTANCE_AUTRE_AT_VOY_VEH_MOTO_REQUEST,
          value: {
            atVo: this.props.initApurement.data,
          },
        },
      );
      this.props.actions.dispatch(verifierExistanceAutreATVoyVehMotoAction);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {!this.props.route.params.consultation &&
          <ComBadrToolbarComp
            back={true}
            navigation={this.props.navigation}
            title={translate('at.title')}
            subtitle={translate('at.apurement.title')}
            icon="menu"
          />
        }
        {this.props.route.params.consultation &&
          <ComBadrToolbarComp
            back={true}
            navigation={this.props.navigation}
            icon="menu"
            title={translate('at.title')}
            subtitle={translate('at.recherche.subTitleMulti')}
          />
        }
        {this.props.showProgress && <ComBadrProgressBarComp circle={false} />}
        <Tab.Navigator
          initialLayout={{ height: Dimensions.get('window').height }}
          initialRouteName= {translate('tabs.entete')}
          swipeEnabled={false}
          tabBarOptions={{
            labelStyle: { fontSize: 14, fontWeight: 'bold' },
            showLabel: true,
            allowFontScaling: true,
            scrollEnabled: true,
            activeBackgroundColor: primaryColor,
            activeTintColor: primaryColor,
            inactiveTintColor: 'gray',
            indicatorStyle: {
              backgroundColor: primaryColor,
              borderWidth: 2.5,
              borderColor: primaryColor,
            },
            tabStyle: {
              borderRightWidth: 1,
              borderRightColor: primaryColor,
              width: 200,
            },
          }}>
          <Tab.Screen name={translate('tabs.entete')} component={EnteteScreen} />
          <Tab.Screen name={translate('tabs.composant')} component={ComposantScreen} />
          <Tab.Screen name={translate('tabs.apurement')} component={ApurementScreen} />
          <Tab.Screen name={translate('tabs.docAnnexe')} component={DocAnnexeScreen} />
          <Tab.Screen name={translate('tabs.historique')} component={HistoriqueScreen} />
        </Tab.Navigator>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const combinedState = {
    initApurement: { ...state.initApurementReducer },
    atConsulter: { ...state.atConsulterReducer },
  };
  return combinedState;
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
)(AtGestionScreen);

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%' },
});
