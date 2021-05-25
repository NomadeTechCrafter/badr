import React from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';

export default class EciReferenceDeclarationBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      referenceEnregistrement,
      cle,
      numeroVoyage,
    } = this.props;
    return (
      <ComBadrCardBoxComp noPadding={true}>
        <Grid>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.bureau')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.regime')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.annee')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.serie')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.cle')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('transverse.nVoyage')}
              </ComBadrLibelleComp>
            </Col>
           
          </Row>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp>
                {referenceEnregistrement.slice(0, 3)}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {referenceEnregistrement.slice(3, 6)}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {referenceEnregistrement.slice(6, 10)}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {referenceEnregistrement.slice(10, 17)}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp>{cle}</ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp>{numeroVoyage}</ComBadrLibelleComp>
            </Col>
           
          </Row>
        </Grid>
      </ComBadrCardBoxComp>
    );
  }
}
