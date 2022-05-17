import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ComContainerComp } from '../../../../../commons/component';
import translate from '../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../commons/styles/ComThemeStyle';
import LiqArticleAuMomentLiquidationBlock from './blocks/LiqArticleAuMomentLiquidationBlock';
import LiqArticleOperationLiqBlock from './blocks/LiqArticleOperationLiqBlock';

class LiquidationArticlesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidationVO: props.data,
      liquidationType: props.type,
    };
  }

  showDetailArticle = (article, libelleArticle) => {
    console.log('aritcle!!',article,libelleArticle)
    if (libelleArticle === "M" && Object.keys(article).length > 0)
      this.props.activerLiquiderArticle(true, article);
    else
    this.props.activerLiquiderArticle(false, article);
  };

  

  render() {
    // console.log('liquidationType °°°°°°°°°°°°°°°°°°° ',this.props.liquidationType)
    // console.log('liquidationType °°°°°°°°°°°°°°°°°°° ',this.props.type)
    // console.log('liquidationType °°°°°°°°°°°°°°°°°°° ',this.state.liquidationType)
    const { liquidationVO, liquidationType } = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          <LiqArticleOperationLiqBlock liquidationVO={liquidationVO} />
          {/* Bloc Article au moment de la Liquidation*/}
          <LiqArticleAuMomentLiquidationBlock
            liquidationVO={liquidationVO}
            liquidationType={liquidationType}
            showDetailArticle={this.showDetailArticle}
            navigation={this.props.navigation}
          />
        </ComContainerComp>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.liquidationReducer };
}

export default connect(mapStateToProps, null)(LiquidationArticlesScreen);
