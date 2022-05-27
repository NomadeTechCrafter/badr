import React from 'react';
import {View} from 'react-native';
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
import {Button, RadioButton, Text} from 'react-native-paper';
import * as ConsulterDumAction from '../../../../../../commons/state/actions/ConsulterDumAction';
import {t} from 'i18n-js';
import {GENERIC_REQUEST} from '../../../../../../commons/constants/generic/ComGenericConstants';
import TransverseApi from '../../../../../../commons/services/api/ComTransverseApi';
import _ from 'lodash';

class LiqRecapitulationInfoLiqBlock extends React.Component {
  defaultState = {
    creditParOperateur: '',
  };
  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }
  componentDidMount = () => {
    const {liquidationVO} = this.props;
    this.getRefEnteteDeclarationEnDouane();
    this.getCreditParOperateur(liquidationVO);
  };
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

  redirectToConsultationDUM(referenceDum, navigation) {
    let action = ConsulterDumAction.request(
      {
        type: GENERIC_REQUEST,
        value: {
          jsonVO: {
            reference: referenceDum,
            enregistre: true,
            identifiantOperateur: ComSessionService.getInstance().getOperateur(),
          },
          // cle: 'F',
        },
        command: 'ded.ConsulterDum',
        fromLiquidation: true,
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  }
  getCreditParOperateur = (liquidationVO) => {
    TransverseApi.doProcess('ALI_DEC', 'getCreditParOperateur', 'SP', {
      codeBureauDouane:
        liquidationVO?.refObjetLiquidation?.refBureauLiquidation,
      idOperation: liquidationVO?.idOperation,
    })
      .then((response) => {
        if (response?.data && !_.isNil(response.data.jsonVO)) {
          console.log('getCreditParOperateur', response.data.jsonVO);
          let delaiCreditEnlevement = '';
          _.forEach(response.data.jsonVO, function (item, key) {
            if (item.numeroCredit == liquidationVO.numeroCredit) {
              delaiCreditEnlevement = item.delaiCreditEnlevement;
              return false;
            }
          });
          this.setState({creditParOperateur: delaiCreditEnlevement});
        } else {
          console.log('----LIQ Action ERR data');
        }
      })
      .catch((e) => {
        console.log('----LIQ Action ERR getCreditParOperateur', e);
      });
  };

  render() {
    const {liquidationVO, liquidationType} = this.props;
    const {creditParOperateur} = this.state;
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
                <Button
                  mode="contained"
                  icon="check"
                  compact="true"
                  onPress={this.redirectToConsultationDUM.bind(
                    this,
                    this.props.liquidationVO?.refObjetLiquidation
                      ?.referenceObjetLiquidation,
                    this.props.navigation,
                  )}>
                  {liquidationVO.refObjetLiquidation.referenceObjetLiquidation}
                </Button>
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

          {/* Bloc  Compte crédit utilisé */}
          {liquidationVO?.refModePaiement == '02' &&
            liquidationVO?.refOperationSimultanee?.refModePaiement == '02' && (
              <View>
                <Row style={CustomStyleSheet.grisRow}>
                  <Col size={1}>
                    <ComBadrLibelleComp>
                      {translate('liq.compteCreditUtilise')}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
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

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('liq.delai')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={4}>
                    <ComBadrLibelleComp>
                      {creditParOperateur}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
              </View>
            )}
        </Grid>
      </ComBadrCardBoxComp>
    );
  }
}
function mapStateToProps(state) {
  return {...state.liquidationReducer};
}

export default connect(mapStateToProps, null)(LiqRecapitulationInfoLiqBlock);
