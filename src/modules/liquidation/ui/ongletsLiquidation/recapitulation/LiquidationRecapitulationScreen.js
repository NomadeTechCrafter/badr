import React from 'react';
import {View} from 'react-native';
import {ComContainerComp} from '../../../../../commons/component';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';
import LiqRecapitulationOperationLiqBlock from './blocks/LiqRecapitulationOperationLiqBlock';
import LiqRecapitulationInfoLiqBlock from './blocks/LiqRecapitulationInfoLiqBlock';
import LiqRecapitulationLiqNormaleInitialeBlock from './blocks/LiqRecapitulationLiqNormaleInitialeBlock';
import LiqRecapitulationConsignationInitialeBlock from './blocks/LiqRecapitulationConsignationInitialeBlock';

class LiquidationRecapitulationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidationVO: props.data,
    };
  }
  onDateEcheanceConsignationChanged = (date) => {};
  render() {
    const {liquidationVO} = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {/* Bloc opération de Liquidation*/}
          <LiqRecapitulationOperationLiqBlock liquidationVO={liquidationVO} />

          {/* Bloc Info opération de Liquidation*/}
          <LiqRecapitulationInfoLiqBlock liquidationVO={liquidationVO} />

          {/* Bloc Liquidation Initiale Normale */}
          <LiqRecapitulationLiqNormaleInitialeBlock
            liquidationVO={liquidationVO}
          />
          {/* Bloc Consignation Initiale */}
          <LiqRecapitulationConsignationInitialeBlock
            liquidationVO={liquidationVO}
          />
        </ComContainerComp>
      </View>
    );
  }
}

export default LiquidationRecapitulationScreen;
