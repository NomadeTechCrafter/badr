import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import LiqArticleDetailsLiqBlock from './LiqArticleDetailsLiqBlock';
import LiqArticleDetailsLiqLegendeLBlock from './LiqArticleDetailsLiqLegendeLBlock';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {sumByKey} from '../../../../utils/LiqUtils';
import {connect} from 'react-redux';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import Numeral from 'numeral';
import _ from 'lodash';
class LiqRecapitulationLiqNormaleInitialeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listeArticlesLiquides: [],
      selectedArticle: {},
    };
  }
  componentDidMount() {
    this.setState({
      listeArticlesLiquides: this.getListeArticlesLiquides(
        this.props.liquidationVO,
        this.props.liquidationVO.refOperationSimultanee,
      ),
    });
  }
  handleTypeBorderauChanged = (selectedValue, selectedIndex, item) => {};

  getListeArticlesLiquides = (
    refOperationPrincipale,
    refOperationSimultanee,
  ) => {
    let articlesLiquides = [];
    _.forEach(refOperationPrincipale.refArticlesLiquides, function (
      item1,
      key1,
    ) {
      articlesLiquides.push(item1);
      if (
        refOperationSimultanee &&
        refOperationSimultanee.refArticlesLiquides
      ) {
        _.forEach(refOperationSimultanee.refArticlesLiquides, function (
          item2,
          key2,
        ) {
          if (item1.numArticle == item2.numArticle) {
            articlesLiquides.push(item2);
          }
        });
      }
    });
    //articles consignation only
    if (
      refOperationSimultanee &&
      refOperationSimultanee.refArticlesLiquides.length +
        refOperationPrincipale.refArticlesLiquides.length >
        articlesLiquides.length
    ) {
      _.forEach(refOperationSimultanee.refArticlesLiquides, function (
        item,
        key,
      ) {
        let exist = false;
        _.forEach(refOperationPrincipale.refArticlesLiquides, function (
          item1,
          key1,
        ) {
          if (!exist) {
            exist = item.numArticle == item1.numArticle;
          }
        });
        if (!exist) {
          articlesLiquides.push(item);
        }
      });
    }
    return articlesLiquides;
  };
  showDetailArticle = (article) => {
    this.setState({selectedArticle: article});
  };
  render() {
    const {liquidationVO} = this.props;
    console.log('artcile--------', liquidationVO)
    const {listeArticlesLiquides, selectedArticle} = this.state;
    return (
      <View>
        <ComBadrCardBoxComp noPadding={true}>
          {/* Bloc Liquidation Initiale Normale */}
          <ComAccordionComp
            title={translate('liq.articles.articlesMomentLiquidation.title')}>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'liq.articles.articlesMomentLiquidation.nombreArticles',
                  )}
                </ComBadrLibelleComp>
                <ComBadrLibelleComp>
                  {'  '}
                  {Numeral(
                    liquidationVO.refArticlesLiquides.length +
                      liquidationVO.refOperationSimultanee.refArticlesLiquides
                        .length,
                  ).format('0.00')}
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.numeroArticle')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.codeNomenclature')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.valeurTaxableDH')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.quantite')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.unite')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              {_.orderBy(listeArticlesLiquides, 'numArticle', 'asc').map(
                (item, index) => (
                  <TouchableOpacity
                    onPress={() => this.showDetailArticle(item)}>
                    <Row
                      key={index}
                      style={
                        index % 2 === 0
                          ? CustomStyleSheet.whiteRow
                          : CustomStyleSheet.lightBlueRow
                      }>
                      <Col>
                        <ComBadrLibelleComp>
                          {item.numArticle}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {item.refParametresLiquidation.codeNomenclature}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {Numeral(
                            item.refParametresLiquidation.valeurTaxable,
                          ).format('0.000')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {Numeral(
                            item.refParametresLiquidation.quantite,
                          ).format('0.000')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {item.refParametresLiquidation.refUniteQuantiteDesc}
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                  </TouchableOpacity>
                ),
              )}
              {!_.isEmpty(selectedArticle) && (
                <View>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.codeNomenclature')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {
                          selectedArticle.refParametresLiquidation
                            .codeNomenclature
                        }
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.designation')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation.designation}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.valeurTaxableDH')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation.valeurTaxable}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>

                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.quantite')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation.quantite}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.unite')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation
                          .refUniteQuantiteDesc +
                          '(' +
                          selectedArticle.refParametresLiquidation
                            .refUniteQuantite +
                          ')'}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.dateEffetLiquidation')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {
                          selectedArticle.refParametresLiquidation
                            .dateEffetLiquidation
                        }
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                </View>
              )}
            </Grid>
          </ComAccordionComp>
        </ComBadrCardBoxComp>
        {!_.isEmpty(selectedArticle) && (
          <ComBadrCardBoxComp noPadding={true}>
            {/* Bloc Liquidation Initiale Normale */}
            <ComAccordionComp
              title={translate('liq.articles.detailsLiquidation')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={2} />
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('liq.articles.liquidationArticleNumero', {
                        numArticle: selectedArticle.numArticle,
                      })}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <LiqArticleDetailsLiqBlock
                  article={selectedArticle}
                  titre={translate(
                    'liq.articles.baseActuelleLiquidationNormale',
                  )}
                />
                <LiqArticleDetailsLiqBlock
                  article={selectedArticle}
                  titre={translate('liq.articles.baseConsignation')}
                />

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <LiqArticleDetailsLiqLegendeLBlock
                      article={selectedArticle}
                    />
                  </Col>
                  <Col />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>
        )}
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {...state.liquidationReducer};
}

export default connect(
  mapStateToProps,
  null,
)(LiqRecapitulationLiqNormaleInitialeBlock);
