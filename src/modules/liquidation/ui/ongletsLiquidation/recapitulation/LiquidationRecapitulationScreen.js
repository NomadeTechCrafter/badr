import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { ComContainerComp } from '../../../../../commons/component';
import { CustomStyleSheet } from '../../../../../commons/styles/ComThemeStyle';
import LiqRecapitulationOperationLiqBlock from './blocks/LiqRecapitulationOperationLiqBlock';
import LiqRecapitulationInfoLiqBlock from './blocks/LiqRecapitulationInfoLiqBlock';
import LiqRecapitulationLiqNormaleInitialeBlock from './blocks/LiqRecapitulationLiqNormaleInitialeBlock';
import LiqRecapitulationConsignationInitialeBlock from './blocks/LiqRecapitulationConsignationInitialeBlock';
import translate from '../../../../../commons/i18n/ComI18nHelper';

class LiquidationRecapitulationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidationVO: props.data,
      liquidationType: props.type,
      isActionMenuOpen: false,
      indicateurLiquidationArticlesEnFranchiseTotale: props.indicateurLiquidationArticlesEnFranchiseTotale
    };
  }
  onDateEcheanceConsignationChanged = (date) => { };

  onActionMenuStateChange = () => {
    this.setState({ isActionMenuOpen: !this.state.isActionMenuOpen });
  };

  render() {
    const { liquidationVO, liquidationType, indicateurLiquidationArticlesEnFranchiseTotale } = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {/* Bloc opération de Liquidation*/}
          <LiqRecapitulationOperationLiqBlock liquidationVO={liquidationVO} liquidationType={liquidationType} />

          {/* Bloc Info opération de Liquidation*/}
          <LiqRecapitulationInfoLiqBlock liquidationVO={liquidationVO} liquidationType={liquidationType} />

          {/* <!--Cas Liquidation manuelle d'office--> */}

          {/* Bloc Liquidation Initiale Normale */}
          <LiqRecapitulationLiqNormaleInitialeBlock
            liquidationVO={liquidationVO}
            liquidationType={liquidationType}
            indicateurLiquidationArticlesEnFranchiseTotale={indicateurLiquidationArticlesEnFranchiseTotale}
          />
          {/* Bloc Consignation Initiale */}
          {liquidationVO.refOperationSimultanee?.refLignesRubriqueOperation?.length > 0 &&
            <LiqRecapitulationConsignationInitialeBlock
              liquidationVO={liquidationVO}
            />
          }
        </ComContainerComp>
        {/* <FAB.Group
          open={isActionMenuOpen}
          icon={isActionMenuOpen ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'bell',
              label: translate('liq.actions.liquiderGlobalement'),
              onPress: () => {
                this.props.navigation.navigate('Liquidation Manuelle',{
                  isArticle: false
                });
              },
              small: false
            },
          ]}
          onStateChange={() => this.onActionMenuStateChange()}
          onPress={() => {
            if (isActionMenuOpen) {
              // do something if the speed dial is open
            }
          }}
        />  */}
      </View>
    );
  }
}

export default LiquidationRecapitulationScreen;
