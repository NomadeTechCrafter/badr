import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';

export default class EciMainleveeBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {enleverMarchandiseVO} = this.props;
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/*Accordion Mainlevée*/}
        <ComAccordionComp
          title={translate('ecorimport.mainlevee.title')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.dateValidationMainlevee')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {enleverMarchandiseVO.refMainlevee.dateValidation}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.agentValidationMainlevee')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {enleverMarchandiseVO.refMainlevee.refAgentValidation.nom}{' '}
                  {enleverMarchandiseVO.refMainlevee.refAgentValidation.prenom}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.dateDelivranceMainlevee')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {enleverMarchandiseVO.refMainlevee.dateImpression}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.agentDelivranceMainlevee')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {enleverMarchandiseVO.refMainlevee.refAgentEdition.nom}{' '}
                  {enleverMarchandiseVO.refMainlevee.refAgentEdition.prenom}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
