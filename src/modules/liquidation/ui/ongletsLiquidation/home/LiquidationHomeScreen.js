import _ from 'lodash';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import {
  ComBadrToolbarComp,
} from '../../../../../commons/component';
import { connect } from 'react-redux';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import {
  primaryColor,
  CustomStyleSheet,
} from '../../../../../commons/styles/ComThemeStyle';
import LiquidationRecapitulationScreen from '../recapitulation/LiquidationRecapitulationScreen';
import LiquidationArticlesScreen from '../articles/LiquidationArticlesScreen';
import { FAB } from 'react-native-paper';
import LiquidationManuelleScreen from '../liquidationManuelle/LiquidationManuelleScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as confirmCnxAction from '../../../../hab/profile/state/actions/habProfileAction';
import * as ConstantsConfirmCnx from '../../../../hab/profile/state/habProfileConstants';
import { MainStackNavigator } from '../informations/InfoStackNavigator';
import * as RootNavigation from './RootNavigation';
import { callRedux } from '../../../utils/LiqUtils';

const Tab = createMaterialTopTabNavigator();

function RecapitulationScreen({ route, navigation }) {
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
      isActionMenuOpen: false,
      data: props.data,
      liquidationType: props.liquidationType,
      isActionMenuOpen: false,
      activerLiquiderArticle: false,
      selectedArticle:{},
      liquidationVO: props.data,
      validerInfo:false,
      indicateurLiquidationArticlesEnFranchiseTotale: props.indicateurLiquidationArticlesEnFranchiseTotale,
    };
  }

  onActionMenuStateChange = () => {
    this.setState({ isActionMenuOpen: !this.state.isActionMenuOpen });
  };

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

  onActionMenuStateChange = () => {
    this.setState({ isActionMenuOpen: !this.state.isActionMenuOpen });
  };

  activerLiquiderArticle = (active,article) => {
    this.setState({ activerLiquiderArticle: active, selectedArticle: article });
  }

  valider = (liquidationVO) => {
    console.log('valider');
    // let {liquidationVO} = this.state;
    let data = {
      idOperation: liquidationVO.idOperation,
      confirmationOrdonnancement: 'false',
    };
    if (
      liquidationVO.refOperationSimultanee &&
      liquidationVO.refOperationSimultanee.refModePaiement == '02'
    ) {
      data.numeroCreditConsignation =
        liquidationVO.refOperationSimultanee.numeroCreditConsignation;
    }
    if (
      liquidationVO.refOperationSimultanee &&
      liquidationVO.refOperationSimultanee.refTypeConsignation
    ) {
      data.refTypeConsignation =
        liquidationVO.refOperationSimultanee.refTypeConsignation;
    }
    if (
      !(
        liquidationVO.montantTotalLiquide &&
        +liquidationVO.montantTotalLiquide > 0
      )
    ) {
      data.validationComplementaire = !(
        liquidationVO.montantTotalLiquide &&
        +liquidationVO.montantTotalLiquide > 0
      );
      data.refModePaiement = liquidationVO.refModePaiement;
      if (liquidationVO.refModePaiement == '02') {
        data.numeroCredit = liquidationVO.numeroCredit;
      }
      if (
        liquidationVO.refOperationSimultanee &&
        liquidationVO.refOperationSimultanee.refModePaiement == '02'
      ) {
        data.numeroCreditConsignation =
          liquidationVO.refOperationSimultanee.numeroCredit;
      }
      if (
        liquidationVO.refOperationSimultanee &&
        liquidationVO.refOperationSimultanee.refTypeConsignation
      ) {
        data.refTypeConsignation =
          liquidationVO.refOperationSimultanee.refTypeConsignation;
      }
      if (liquidationVO.refOperationSimultanee) {
        data.refModePaiementConsignation =
          liquidationVO.refOperationSimultanee.refModePaiement;
      }
    } else {
      data.validationComplementaire = 'true';
      data.refModePaiement = liquidationVO.refModePaiement;
      if (liquidationVO.refModePaiement == '02') {
        data.numeroCredit = liquidationVO.numeroCredit;
      }
      if (
        liquidationVO.refOperationSimultanee &&
        liquidationVO.refOperationSimultanee.refModePaiement == '02'
      ) {
        data.numeroCreditConsignation =
          liquidationVO.refOperationSimultanee.numeroCredit;
      }
      if (
        liquidationVO.refOperationSimultanee &&
        liquidationVO.refOperationSimultanee.refTypeConsignation
      ) {
        data.refTypeConsignation =
          liquidationVO.refOperationSimultanee.refTypeConsignation;
      }
      if (liquidationVO.refOperationSimultanee) {
        data.refModePaiementConsignation =
          liquidationVO.refOperationSimultanee.refModePaiement;
      }
    }
    this.setState({
      validerInfo: true
    })
    this.validerOrdonancerLiqiuidation(
      data,
      'validerOrdonnancerLiquidationDUM',
    );
  };

  validerOrdonancerLiqiuidation(data, commande) {
    console.log('-----------------data', data);
    console.log('-----------------commande', commande);
    callRedux(
      this.props,
      {
        command: commande,
        typeService: 'UC',
        jsonVO: data,
      },
      'LiquidationInfoScreen',
    );
  }



  render() {
    console.log('this.props', this.props)
    const { data, liquidationType, indicateurLiquidationArticlesEnFranchiseTotale, isActionMenuOpen } = this.state
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={RootNavigation}
          title={translate('liq.title')}
          subtitle={translate('liq.titleLiqAuto')}
          icon="menu"
        />
        {!_.isNil(data) && (
          <NavigationContainer independent={true} ref={RootNavigation.navigationRef}>
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
              <Tab.Screen name="Recapitulation">
                {(props) => (
                  <LiquidationRecapitulationScreen
                    {...props}
                    data={data}
                    type={liquidationType}
                    indicateurLiquidationArticlesEnFranchiseTotale={indicateurLiquidationArticlesEnFranchiseTotale}
                  />
                )}
              </Tab.Screen>
              <Tab.Screen name="Articles">
                {(props) => (
                  <LiquidationArticlesScreen
                    {...props}
                    data={data}
                    activerLiquiderArticle={this.activerLiquiderArticle}
                    type={liquidationType}
                  />
                )}
              </Tab.Screen>
              <Tab.Screen name="Liquidation Manuelle">
                {(props) => (
                  <LiquidationManuelleScreen
                    {...props}
                    data={data}
                  />
                )}
              </Tab.Screen>
              <Tab.Screen name="Information">
                {(props) => (
                  <MainStackNavigator {...props} data={data} />
                )}
              </Tab.Screen>

            </Tab.Navigator>
          </NavigationContainer>
        )}
         <FAB.Group
          open={isActionMenuOpen}
          icon={isActionMenuOpen ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'email',
              label: translate('transverse.valider'),
              color: "black",
              onPress: () => {
                console.log('--valider--');
                this.valider(liquidationVO);
                console.log('--valider--');
              },
            },
            {
              icon: 'email',
              label: translate('liq.actions.liquiderArticle'),
              color: this.state.activerLiquiderArticle ? "black" : "grey",
              onPress: () => {
                if (this.state.activerLiquiderArticle) {
                  RootNavigation.navigate('Liquidation Manuelle', {
                    isArticle: true,
                    selectedArticle: this.state.selectedArticle,
                  });
                }
              },
            },
            {
              icon: 'bell',
              label: translate('liq.actions.liquiderGlobalement'),
              color: "black",
              onPress: () => {
                RootNavigation.navigate('Liquidation Manuelle', {
                  isArticle: false,
                });
              },
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
  return { ...state.liquidationRechercheRefDumReducer };
}

export default connect(mapStateToProps, null)(LiquidationHomeScreen);
