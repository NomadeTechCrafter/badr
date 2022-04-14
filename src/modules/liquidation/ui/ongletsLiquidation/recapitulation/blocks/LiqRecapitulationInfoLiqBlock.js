import React from 'react';
import {
  ComAccordionComp,
  ComBadrCardBoxComp,
  ComBadrDatePickerComp,
  ComBadrLibelleComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {getValueByPath, callRedux} from '../../../../utils/LiqUtils';
import {connect} from 'react-redux';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {ComSessionService} from '../../../../../../commons/services/session/ComSessionService';
import {RadioButton, Text} from 'react-native-paper';
import Numeral from 'numeral';
class LiqRecapitulationInfoLiqBlock extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getRefEnteteDeclarationEnDouane();
  }

  getRefEnteteDeclarationEnDouane = () => {
    let referenceDed = getValueByPath(
      'refObjetLiquidation.referenceObjetLiquidation',
      this.props.liquidationVO,
    );
    let data = {
      referenceDed: referenceDed,
      numeroSousDUM: '',
      numeroVersion: '0',
    };
    callRedux(this.props, {
      command: 'getRefEnteteDeclarationEnDouane',
      typeService: 'SP',
      jsonVO: data,
    });
  };
  render() {
    const {liquidationVO, liquidationType} = this.props;
    let getRefEnteteDeclarationEnDouane = getValueByPath(
      'getRefEnteteDeclarationEnDouane.data',
      this.props.repData,
    );

    return (
      <ComBadrCardBoxComp>
        {/* Bloc Info opération de Liquidation*/}
        <Grid>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.bureauOrdonnancement')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {ComSessionService.getInstance().getNomBureauDouane()}{' '}
                {liquidationVO.refObjetLiquidation.refBureauLiquidation}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2} />
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.posteOrdonnancement')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {liquidationVO.refPosteOrdonnancementLibelle}(
                {liquidationVO.refPosteOrdonnancementCode})
              </ComBadrLibelleComp>
            </Col>
            <Col size={2} />
          </Row>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.agentLiquidateur')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {liquidationVO.refActeurInterneNom}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.code')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp>
                {liquidationVO.refActeurInterne}
              </ComBadrLibelleComp>
            </Col>
          </Row>
          <Row style={CustomStyleSheet.whiteRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.referenceDeclaration')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {liquidationVO.refObjetLiquidation.referenceObjetLiquidation}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.dateEnregistrement')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp>
                {liquidationVO.refObjetLiquidation.dateEnregistrement}
              </ComBadrLibelleComp>
            </Col>
          </Row>
          <Row style={CustomStyleSheet.lightBlueRow}>
            <Col size={2}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.typeDeclaration')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={2}>
              <ComBadrLibelleComp>
                {
                  liquidationVO.refObjetLiquidation
                    .refTypeObjetLiquidationLibelle
                }
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.numeroVersionLiquidee')}
              </ComBadrLibelleComp>
            </Col>
            <Col size={1}>
              <ComBadrLibelleComp>
                {liquidationVO.numVersionDeD}
              </ComBadrLibelleComp>
            </Col>
          </Row>
          {(liquidationType == 'automatique' ||
            liquidationType == 'automatiqueRedevanceAT') && (
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.declarant')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'nomDeclarant',
                    getRefEnteteDeclarationEnDouane,
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.code')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'codeDeclarant',
                    getRefEnteteDeclarationEnDouane,
                  )}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          )}

          {liquidationType == 'manuelleOffice' && (
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.redevable')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'nomOperateurDestinataire',
                    getRefEnteteDeclarationEnDouane,
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.code')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'identifiantOperateurDestinataire',
                    getRefEnteteDeclarationEnDouane,
                  )}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          )}

          {(liquidationType == 'automatique' ||
            liquidationType == 'automatiqueRedevanceAT') && (
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col size={2}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.destinataireExpediteur')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'nomOperateurDestinataire',
                    getRefEnteteDeclarationEnDouane,
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.code')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'identifiantOperateurDestinataire',
                    getRefEnteteDeclarationEnDouane,
                  )}
                </ComBadrLibelleComp>
              </Col>
            </Row>
          )}
        </Grid>

        {/* Bloc  Compte crédit utilisé */}
        {liquidationVO.refOperationSimultanese.refModePaiement == '02' && liquidationVO.refModePaiement == '02' && (
            <ComAccordionComp title={translate('liq.compteCreditUtilise')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('liq.titulaireCompteCredit')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {getValueByPath(
                        'nomOperateurDestinataire',
                        getRefEnteteDeclarationEnDouane,
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('liq.numCompte')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp>
                      {liquidationVO.numeroCredit}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>

                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('liq.delai')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>{}</ComBadrLibelleComp>
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          )}
      </ComBadrCardBoxComp>
    );
  }
}
function mapStateToProps(state) {
  return {...state.liquidationReducer};
}

export default connect(mapStateToProps, null)(LiqRecapitulationInfoLiqBlock);
