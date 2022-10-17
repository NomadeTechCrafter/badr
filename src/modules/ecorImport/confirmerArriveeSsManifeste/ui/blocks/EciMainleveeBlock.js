import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {Checkbox} from 'react-native-paper';
import {primaryColor} from '../../../../../commons/styles/ComThemeStyle';

export default class EciMainleveeBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {confirmerArriveeVO} = this.props;
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
                  {confirmerArriveeVO.refMainlevee.dateValidation}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.agentValidationMainlevee')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {confirmerArriveeVO.refMainlevee.refAgentValidation.nom}{' '}
                  {confirmerArriveeVO.refMainlevee.refAgentValidation.prenom}
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
                  {confirmerArriveeVO.refMainlevee.dateImpression}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.agentDelivranceMainlevee')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {confirmerArriveeVO.refMainlevee.refAgentEdition.nom}{' '}
                  {confirmerArriveeVO.refMainlevee.refAgentEdition.prenom}
                </ComBadrLibelleComp>
              </Col>
            </Row>

            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.conteneurCibles')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={4}>
                <ComBadrLibelleComp>
                  {translate('ecorimport.mainlevee.aucun')}
                </ComBadrLibelleComp>
              </Col>
            </Row>

            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.annotations')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={4}>
                <ComBadrLibelleComp>
                  {confirmerArriveeVO.refMainlevee.annotations}
                </ComBadrLibelleComp>
              </Col>
            </Row>

            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <Checkbox
                  color={primaryColor}
                  status={
                    confirmerArriveeVO.refMainlevee?.avecPesage
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                />
              </Col>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.avecPesage')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <Checkbox
                  color={primaryColor}
                  status={
                    confirmerArriveeVO.refMainlevee?.avecScanner
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                />
              </Col>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.avecScanner')}
                </ComBadrLibelleComp>
              </Col>
            </Row>

            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                <Checkbox
                  color={primaryColor}
                  status={
                    confirmerArriveeVO.refMainlevee?.sansSortie
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                />
              </Col>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.sansEnceinte')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <Checkbox
                  color={primaryColor}
                  status={
                    confirmerArriveeVO.refMainlevee?.sousEscorteGendarmerie
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                />
              </Col>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.sousEscorteGend')}
                </ComBadrLibelleComp>
              </Col>
            </Row>

            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <Checkbox
                  color={primaryColor}
                  status={
                    confirmerArriveeVO.refMainlevee?.sousEscorteDouane
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                />
              </Col>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.sansEscorteDoua')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <Checkbox
                  color={primaryColor}
                  status={
                    confirmerArriveeVO.refMainlevee?.pourEntrepesage
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={true}
                />
              </Col>
              <Col size={5}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('ecorimport.mainlevee.pourEntreposage')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
