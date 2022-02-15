import React from 'react';
import {View} from 'react-native';
import {ComContainerComp} from '../../../../../commons/component';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';
import LiqArticleAuMomentLiquidationBlock from './blocks/LiqArticleAuMomentLiquidationBlock';

class LiquidationArticlesScreen extends React.Component {
  constructor(props) {
    super(props);
      console.log('LiquidationArticlesScreen', props.data);
    this.state = {
      liquidationVO: props.data,
    };
  }
  render() {
    const {liquidationVO} = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {/* Bloc Article au moment de la Liquidation*/}
          <LiqArticleAuMomentLiquidationBlock liquidationVO={liquidationVO} />
        </ComContainerComp>
      </View>
    );
  }
}

export default LiquidationArticlesScreen;
