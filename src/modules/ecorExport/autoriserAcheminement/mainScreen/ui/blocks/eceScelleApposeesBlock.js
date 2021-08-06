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

export default class EceScelleApposeesBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
      <ComBadrCardBoxComp noPadding={true}>
        <ComAccordionComp
            title={translate('autoriserAcheminemenMainScreen.scellesApposees.title')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.scellesApposees.scellesApposees')}
                </ComBadrLibelleComp>
              </Col>
                <Col size={3}>
                <ComBadrLibelleComp>
                    {this.props.listeScellesApposees}
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
