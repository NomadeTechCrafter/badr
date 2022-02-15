import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FAB} from 'react-native-paper';

import {
  ComBadrLibelleComp,
  ComBadrCardBoxComp,
  ComBadrToolbarComp,
  ComContainerComp,
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrDatePickerComp,
} from '../../../../../commons/component';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  primaryColor,
  CustomStyleSheet,
} from '../../../../../commons/styles/ComThemeStyle';
import LiquidationRecapitulationScreen from '../recapitulation/LiquidationRecapitulationScreen';
import LiquidationArticlesScreen from '../articles/LiquidationArticlesScreen';
import LiquidationManuelleScreen from '../liquidationManuelle/LiquidationManuelleScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import * as confirmCnxAction from '../../../../hab/profile/state/actions/habProfileAction';
import * as ConstantsConfirmCnx from '../../../../hab/profile/state/habProfileConstants';
const Tab = createMaterialTopTabNavigator();

function RecapitulationScreen({route, navigation}) {
  console.log('route', route);
  const parentState = navigation.dangerouslyGetParent().dangerouslyGetState();
  console.log('parentState', parentState.routes[parentState.index].params);
  return <LiquidationRecapitulationScreen />;
}

class LiquidationHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    //console.log('LiquidationHomeScreen', props.route.params.declarationRI);
    this.state = {
      refTypeConsignation: '',
      declaration: props.route.params.declarationRI,
      isActionMenuOpen: false,
    };
  }
  buildConfirmConnexionAction = (
    navigation,
    codeBureau,
    listeProfilCoche,
    selectedArrondissement,
  ) => {
    var action = confirmCnxAction.request(
      {
        type: ConstantsConfirmCnx.CONFIRMCNX_REQUEST,
        value: {
          codeBureau: codeBureau,
          listeProfilCoche: listeProfilCoche,
          codeArrondissement: selectedArrondissement,
        },
      },
      navigation,
    );
    return action;
  };
  async componentDidMount() {}
  onActionMenuStateChange = () => {
    this.setState({isActionMenuOpen: !this.state.isActionMenuOpen});
  };
  render() {
    const {isActionMenuOpen} = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('liq.title')}
          subtitle={translate('liq.titleLiqAuto')}
          icon="menu"
        />

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
            <Tab.Screen name="Recapitulation">
              {() => <LiquidationRecapitulationScreen data={this.props.data} />}
            </Tab.Screen>
           <Tab.Screen name="Articles">
              {() => <LiquidationArticlesScreen data={this.props.data} />}
            </Tab.Screen>
              {/* <Tab.Screen name="Liquidation Manuelle">
              {() => <LiquidationManuelleScreen data={this.props.data} />}
            </Tab.Screen>*/}
          </Tab.Navigator>
        </NavigationContainer>

        <FAB.Group
          open={isActionMenuOpen}
          icon={isActionMenuOpen ? 'calendar-today' : 'plus'}
          actions={[
            {icon: 'plus', onPress: () => console.log('Pressed add')},
            {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
              small: false,
            },
          ]}
          onStateChange={() => this.onActionMenuStateChange()}
          onPress={() => {
            if (isActionMenuOpen) {
              // do something if the speed dial is open
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  decisionContainerRB: {
    backgroundColor: primaryColor,
    padding: 8,
  },
  textRadio: {
    color: '#FFF',
  },
});
function mapStateToProps(state) {
  return {...state.liquidationRechercheRefDumReducer};
}

export default connect(mapStateToProps, null)(LiquidationHomeScreen);
