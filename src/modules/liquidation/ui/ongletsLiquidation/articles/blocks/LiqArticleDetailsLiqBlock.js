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
    const {article, titre} = this.props;
    return (
      <View>
        <Row style={CustomStyleSheet.whiteRow}>
          <ComBadrLibelleComp withColor={true}>{titre}</ComBadrLibelleComp>
        </Row>
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.rubrique')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.assiette')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.taux')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.sTVA')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.sFR')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.tauxVirtuel')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.montant')}
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
                {Numeral(item.assiette).format('0.000')}
              </ComBadrLibelleComp>
            </Col>
            <Col>
              <ComBadrLibelleComp>
                {Numeral(item.taux).format('0.00')}
              </ComBadrLibelleComp>
            </Col>
            <Col>
              <ComBadrLibelleComp>{item.indicateurTVA}</ComBadrLibelleComp>
            </Col>
            <Col>
              <ComBadrLibelleComp>
                {item.indicateurFranchise}
              </ComBadrLibelleComp>
            </Col>
            <Col>
              <ComBadrLibelleComp>{item.tauxVirtuel}</ComBadrLibelleComp>
            </Col>
            <Col>
              <ComBadrLibelleComp>
                {Numeral(item.montantLiquide).format('0.00')}
              </ComBadrLibelleComp>
            </Col>
          </Row>
        ))}
        <Row style={CustomStyleSheet.lightBlueRow}>
          <Col size={2} />
          <Col>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.articles.totalLiquidationArticleDH')}
            </ComBadrLibelleComp>
          </Col>
          <Col>
            <ComBadrLibelleComp>
              {': '}
              {Numeral(article.montantLiquide).format('0.00')}
            </ComBadrLibelleComp>
          </Col>
        </Row>
      </View>
    );
  }
}

export default LiqArticleDetailsLiqBlock;
