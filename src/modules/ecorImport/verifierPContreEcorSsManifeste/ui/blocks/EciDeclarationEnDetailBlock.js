import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';

export default class EciDeclarationEnDetailBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {verifierCntEcorVO} = this.props;
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Accordion Déclaration en Détail*/}
        <ComAccordionComp
          title={translate('ecorimport.declarationDetail.title')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('ecorimport.declarationDetail.dateHeureEnreg')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {verifierCntEcorVO.refDedServices.dateEnregistrement}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {translate('transverse.poidsBrut')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {verifierCntEcorVO.refDedServices.poidsBruts}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('ecorimport.declarationDetail.typeDed')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {verifierCntEcorVO.refDedServices.libelleTypeDED}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {translate('transverse.poidsNet')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {verifierCntEcorVO.refDedServices.poidsNet}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp>
                  {translate('ecorimport.declarationDetail.operateurDeclarant')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {verifierCntEcorVO.refDedServices.operateurDeclarant}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {translate('ecorimport.nbreContenant')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {verifierCntEcorVO.refDedServices.nombreContenants}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {translate('ecorimport.declarationDetail.valeurDeclaree')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {verifierCntEcorVO.refDedServices.valeurDeclaree}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2} />
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
