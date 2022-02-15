import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import {IconButton} from 'react-native-paper';
import {
  ComContainerComp,
  ComBadrLibelleComp,
  ComBadrCardBoxComp,
} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  primaryColor,
  CustomStyleSheet,
} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Row, Grid} from 'react-native-easy-grid';

class LiquidationInfoDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refTypeConsignation: '',
    };
  }
  render() {
    const {ficheAvisualiserVO} =
      this.props.route && this.props.route.params
        ? this.props.route.params
        : null;
    console.log('LiquidationInfoDetailsScreen ------ ', ficheAvisualiserVO);
    return (
      <ComContainerComp
        ContainerRef={(ref) => {
          this.scrollViewRef = ref;
        }}>
        {/* Bloc opération de Liquidation*/}
        <ComBadrCardBoxComp>
          <Grid>
            <Row style={CustomStyleSheet.whiteRow}>
              <ComBadrLibelleComp
                withColor={true}
                style={{fontSize: 14, color: 'grey', textAlign: 'center'}}>
                {translate('liq.recapitulation.operationsLiquidationEC')}
              </ComBadrLibelleComp>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.numeroLiquidation')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.referenceFiche}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.bordereauNumero')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.refBordereau.referenceBordereau}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.dateLiquidation')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {translate('transverse.regime')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.categorie')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.refBordereau.refModePaiementLibelle}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.statusFiche')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.refStatutFicheLibelle}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('transverse.type')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.refBordereau.refClasseBordereauLibelle}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.numeroOrdreFiche')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.typeRecette')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </Grid>
        </ComBadrCardBoxComp>

        {/* Bloc Info opération de Liquidation*/}
        <ComBadrCardBoxComp>
          <Grid>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.bureauOrdonnancement')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={3}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.posteOrdonnancement')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={3}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.agentLiquidateur')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.code')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.referenceDeclaration')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.dateEnregistrement')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.redevable')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.code')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>{translate('liq.code')}</ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.dateExigibilitePaiement')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.dateExigibilitePaiement}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.nombreArticle')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {ficheAvisualiserVO.numOrdreFiche}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.ongletInformations.totalValeurTaxable')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {translate('liq.liquidationNormaleInitiale.designations')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp
                  withColor={true}
                  style={{textAlign: 'center'}}>
                  {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp
                  withColor={true}
                  style={{textAlign: 'center'}}>
                  {translate('liq.liquidationNormaleInitiale.designations')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp
                  withColor={true}
                  style={{textAlign: 'center'}}>
                  {translate('liq.liquidationNormaleInitiale.montantDH')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            {_.orderBy(
              ficheAvisualiserVO.refLignesRubriqueFiche,
              'refRubriqueComptableCode',
              'asc',
            ).map((item, index) => (
              <Row style={CustomStyleSheet.whiteRow}>
                <Col>
                  <ComBadrLibelleComp style={{textAlign: 'center'}}>
                    {item.refRubriqueComptableCode}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp style={{textAlign: 'center'}}>
                    {item.refRubriqueComptableLibelle}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp style={{textAlign: 'center'}}>
                    {item.montantLiquide}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
            ))}
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp
                  withColor={true}
                  style={{textAlign: 'right'}}>
                  {translate(
                    'liq.liquidationNormaleInitiale.totalLiquidationDH',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp style={{textAlign: 'center'}}>
                  {translate(
                    'liq.liquidationNormaleInitiale.totalLiquidationDH',
                  )}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={2}>
                <ComBadrLibelleComp
                  withColor={true}
                  style={{textAlign: 'right'}}>
                  {translate('liq.ongletInformations.totalDH')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp style={{textAlign: 'center'}}>
                  {translate('liq.ongletInformations.totalDH')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.referenceDeclaration')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={3}>
                <ComBadrLibelleComp>
                  {translate('liq.referenceDeclaration')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          </Grid>
        </ComBadrCardBoxComp>
      </ComContainerComp>
    );
  }
}

const styles = StyleSheet.create({
  decisionContainerRB: {
    backgroundColor: primaryColor,
    padding: 8,
  },
  textRadio: {
    color: '#FFF',
  },
});

export default LiquidationInfoDetailsScreen;
