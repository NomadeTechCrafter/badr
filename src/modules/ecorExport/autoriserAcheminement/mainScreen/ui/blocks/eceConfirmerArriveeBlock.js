import React from 'react';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { View } from 'react-native';
import {
  TextInput
} from 'react-native-paper';
import {
  ComAccordionComp, ComBadrCardBoxComp,
  ComBadrLibelleComp
} from '../../../../../../commons/component';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';

export default class EceConfirmerArriveeBlock extends React.Component {
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
            title={translate('autoriserAcheminemenMainScreen.confirmationArrivee.title')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.confirmationArrivee.dateHeure')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                    {vo?.dateHeureArrive}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.confirmationArrivee.agentDouanier')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                    {vo?.refAgentConfirmationArrive?.nom}{' '}
                    {vo?.refAgentConfirmationArrive?.prenom}
                </ComBadrLibelleComp>
              </Col>
            </Row>
              
          </Grid>
        </ComAccordionComp>
        </ComBadrCardBoxComp>
      </View>
    );
  }
}
