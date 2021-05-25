import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
} from '../../../../../../commons/component';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {
  getValueByPath,
  callRedux,
} from '../../../../utils/LiqUtils';
import {connect} from 'react-redux';
import {CustomStyleSheet} from '../../../../../../commons/styles/ComThemeStyle';
import {Col, Grid, Row} from 'react-native-easy-grid';
import {ComSessionService} from '../../../../../../commons/services/session/ComSessionService';
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
    const {liquidationVO} = this.props;
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
        </Grid>
      </ComBadrCardBoxComp>
    );
  }
}
function mapStateToProps(state) {
  return {...state.liquidationReducer};
}

export default connect(mapStateToProps, null)(LiqRecapitulationInfoLiqBlock);
