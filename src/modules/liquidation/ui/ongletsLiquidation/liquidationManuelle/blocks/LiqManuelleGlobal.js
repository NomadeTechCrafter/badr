import React from 'react';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
} from '../../../../../../commons/component';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import {IconButton} from 'react-native-paper';
import {Alert} from 'react-native';

export default class LiqManuelleGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listeTaxesGlobales: props.listeTaxesGlobales,
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({listeTaxesGlobales: this.props.listeTaxesGlobales});
      return true;
    }
    return false;
  }

  render() {
    const {listeTaxesGlobales} = this.state;
    // console.log('list to show', listeTaxesGlobales);
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Bloc Liquidation globale' */}
        <ComAccordionComp
          title={translate('liq.liquidationManuelle.liquidationGlobale')}
          expanded={true}>
          <Grid>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                <IconButton
                  icon="plus"
                  size={20}
                  color={'white'}
                  style={{backgroundColor: primaryColor}}
                  onPress={() => this.props.addRubriquesComptables()}
                />
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationManuelle.montantActuelDH')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true} />
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true} />
              </Col>
            </Row>
            {listeTaxesGlobales.map((item, index) => (
              <Row key={index} style={CustomStyleSheet.whiteRow}>
                <Col size={1} />
                <Col>
                  <ComBadrLibelleComp withColor={false}>
                    {item.codeDouane}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={false}>
                    {item.montantDH}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    <IconButton
                      icon="pencil-outline"
                      color={'white'}
                      size={20}
                      style={{backgroundColor: primaryColor}}
                      onPress={() =>
                        this.props.editRubriquesComptables(item, index)
                      }
                    />
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    <IconButton
                      icon="trash-can-outline"
                      color={'white'}
                      size={20}
                      style={{backgroundColor: primaryColor}}
                      onPress={() =>
                        this.props.deleteRubriquesComptables(item, index)
                      }
                    />
                  </ComBadrLibelleComp>
                </Col>
              </Row>
            ))}
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
    );
  }
}
