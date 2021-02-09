import React from 'react';
import {View} from 'react-native';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
} from '../../../../../../commons/component';

import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import Numeral from 'numeral';
import _ from 'lodash';

class LiqArticleDetailsLiqBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {article} = this.props;
    return (
      <View>
        <Row style={CustomStyleSheet.whiteRow}>
          <ComBadrLibelleComp withColor={true}>
            {translate('liq.articles.legende')}
          </ComBadrLibelleComp>
        </Row>
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.rubrique')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.designations')}
            </ComBadrLibelleComp>
          </Col>
        </Row>

        {_.orderBy(
          article.refArticleLiquideReference
            ? article.refArticleLiquideReference
                .refLignesRubriqueBaseLiquidation
            : article.refLignesRubriqueBaseLiquidation,
          'refRubriqueComptableCode',
          'asc',
        ).map((item, index) => (
          <Row
            key={index}
            style={
              index % 2 === 0
                ? CustomStyleSheet.whiteRow
                : CustomStyleSheet.lightBlueRow
            }>
            <Col>
              <ComBadrLibelleComp>
                {item.refRubriqueComptableCode}
              </ComBadrLibelleComp>
            </Col>
            <Col>
              <ComBadrLibelleComp>
                {item.refRubriqueComptableLibelle}
              </ComBadrLibelleComp>
            </Col>
          </Row>
        ))}
      </View>
    );
  }
}

export default LiqArticleDetailsLiqBlock;
