import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';

export default class LiqRecapitulationOperationLiqBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { liquidationVO, liquidationType } = this.props;
    return (
      <ComBadrCardBoxComp>
        {/* Bloc opération de Liquidation*/}
        <Grid>
          <Row style={CustomStyleSheet.center}>
            <ComBadrLibelleComp withColor={true}>
              {translate('liq.recapitulation.operationsLiquidationEC')}
            </ComBadrLibelleComp>
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.natureOperationPrincipale')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {liquidationVO.refNatureOperationLibelle}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.numeroOperation')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp>
                {liquidationVO.numOrdreOperation}
              </ComBadrLibelleComp>
            </Col>
          </Row>
          {liquidationVO.refOperationSimultanee &&
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.natureOperationSimultane')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {liquidationVO.refOperationSimultanee.refNatureOperationLibelle}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.numeroOperation')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {liquidationVO.refOperationSimultanee.numOrdreOperation}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          }
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.typeRecette')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {liquidationVO.refTypeRecetteLibelle}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2} />
          </Row>
          {(liquidationType == 'automatiqueRedevanceAT' || liquidationType == 'manuelleRedevanceAT') &&
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.numRedevanceAT')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {liquidationVO.numRedevanceAT}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2} />
            </Row>
          }
        </Grid>
      </ComBadrCardBoxComp>
    );
  }
}
