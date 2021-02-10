import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';

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
  }

  handleTypeBorderauChanged = (selectedValue, selectedIndex, item) => {};
  render() {
    const {liquidationVO} = this.props;

    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Bloc Liquidation Initiale Normale */}
        <ComAccordionComp
          title={translate('liq.liquidationNormaleInitiale.title')}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.liquidationNormaleInitiale.totalValeurTaxable')}
              </ComBadrLibelleComp>
              <ComBadrLibelleComp>
                {'  '}
                {Numeral(liquidationVO.totalValeurTaxable1).format('0.00')}
              </ComBadrLibelleComp>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.designations')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.montantDH')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            {_.orderBy(
              liquidationVO.refLignesRubriqueOperation,
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
                <Col>
                  <ComBadrLibelleComp>
                    (+) {Numeral(item.montantLiquide).format('0.00')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
            ))}
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col />
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'liq.liquidationNormaleInitiale.totalLiquidationDH',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {Numeral(
                    sumByKey(
                      liquidationVO.refLignesRubriqueOperation,
                      'montantLiquide',
                    ),
                  ).format('0.00')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.typeBordereau')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrPickerComp
                  disabled={true}
                  onRef={(ref) => (this.comboTypeBorderau = ref)}
                  key="typeBorderau"
                  cle="code"
                  libelle="libelle"
                  module="ALI_DEC"
                  command="typesBordereau"
                  typeService="SP"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleTypeBorderauChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                  selected={liquidationVO.refModePaiement}
                />
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
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
