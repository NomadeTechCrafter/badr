import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { View } from 'react-native';

export default class EceDeclarationEnDetailBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const vo = this.props.vo;
    return (
    <View>
      <ComBadrCardBoxComp noPadding={true}>
        {/* Accordion Déclaration en Détail*/}
        <ComAccordionComp
          title={translate('autoriserAcheminemenMainScreen.declarationDetail.title')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                  {translate('autoriserAcheminemenMainScreen.declarationDetail.dateHeureEnreg')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo.refDedServices.dateEnregistrement}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                  {translate('transverse.poidsBrut')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo.refDedServices.poidsBruts}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                  {translate('autoriserAcheminemenMainScreen.declarationDetail.typeDed')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo.refDedServices.libelleTypeDED}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                  {translate('transverse.poidsNet')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo.refDedServices.poidsNet}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                  {translate('autoriserAcheminemenMainScreen.declarationDetail.operateurDeclarant')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo.refDedServices.operateurDeclarant}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.nbreContenant')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {vo.refDedServices.nombreContenants}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                  {translate('autoriserAcheminemenMainScreen.declarationDetail.valeurDeclaree')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {vo.refDedServices.valeurDeclaree}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2} />
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    </View>  
    );
  }
}
