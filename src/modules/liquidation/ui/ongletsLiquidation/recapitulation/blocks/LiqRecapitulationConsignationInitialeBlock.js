import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
  ComBadrPickerComp,
  ComBadrDatePickerComp,
} from '../../../../../../commons/component';
import {RadioButton, Text} from 'react-native-paper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../../commons/styles/ComThemeStyle';
import {translate} from '../../../../../../commons/i18n/ComI18nHelper';
import {getValueByPath, callRedux, sumByKey} from '../../../../utils/LiqUtils';
import {connect} from 'react-redux';
import {Col, Grid, Row} from 'react-native-easy-grid';
import Numeral from 'numeral';

class LiqRecapitulationConsignationInitialeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refTypeConsignation: '',
      selectedBorderau: this.props.liquidationVO?.refModePaiement,
    };
  }
  componentDidMount() {
    this.getRubriqueComptableByTypeConsignation();
  }

  getRubriqueComptableByTypeConsignation = () => {
    let codeTypeConsignation = getValueByPath(
      'refOperationSimultanee.refTypeConsignation',
      this.props.liquidationVO,
    );
    let data = {
      codeTypeConsignation: codeTypeConsignation,
    };
    callRedux(this.props, {
      command: 'getRubriqueComptableByTypeConsignation',
      typeService: 'SP',
      jsonVO: data,
    });
  };
  handleTypeBorderauChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedBorderau: selectedValue,
    });
  };
  onDateEcheanceConsignationChanged = (date) => {};

  render() {
    const {
      liquidationVO,
      liquidationType,
      indicateurLiquidationArticlesEnFranchiseTotale,
    } = this.props;
    let rubriqueComptableByTypeConsignation = getValueByPath(
      'getRubriqueComptableByTypeConsignation.data',
      this.props.repData,
    );
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Bloc Consignation Initiale */}
        <ComAccordionComp title={translate('liq.consignationInitiale.title')}>
          <Grid>
            <Row>
              <RadioButton.Group
                onValueChange={(value) =>
                  this.setState({refTypeConsignation: value})
                }
                value={this.state.refTypeConsignation}>
                <Col style={styles.decisionContainerRB}>
                  <Row>
                    <Col size={1}>
                      <RadioButton color={styles.textRadio.color} value="02" />
                    </Col>
                    <Col size={5}>
                      <Text style={styles.textRadio}>
                        {translate(
                          'liq.consignationInitiale.avecConsignationARC',
                        )}
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col style={styles.decisionContainerRB}>
                  <Row>
                    <Col size={1}>
                      <RadioButton color={styles.textRadio.color} value="03" />
                    </Col>
                    <Col size={5}>
                      <Text style={styles.textRadio}>
                        {translate(
                          'liq.consignationInitiale.avecAutreConsignationDT',
                        )}
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col style={styles.decisionContainerRB}>
                  <Row>
                    <Col size={1}>
                      <RadioButton color={styles.textRadio.color} value="05" />
                    </Col>
                    <Col size={5}>
                      <Text style={styles.textRadio}>
                        {translate(
                          'liq.consignationInitiale.avecConsignationAI',
                        )}
                      </Text>
                    </Col>
                  </Row>
                </Col>
                {/* <Col style={styles.decisionContainerRB}>
                  <Row>
                    <Col size={1}>
                      <RadioButton color={styles.textRadio.color} value="0" />
                    </Col>
                    <Col size={5}>
                      <Text style={styles.textRadio}>
                        {translate(
                          'liq.consignationInitiale.avecConsignationAV',
                        )}
                      </Text>
                    </Col>
                  </Row>
                </Col> */}
              </RadioButton.Group>
            </Row>

            <Row style={CustomStyleSheet.whiteRow}>
              <ComBadrLibelleComp withColor={true}>
                {translate('liq.liquidationNormaleInitiale.totalValeurTaxable')}
              </ComBadrLibelleComp>
              <ComBadrLibelleComp>
                {'  '}
                {Numeral(
                  liquidationVO.refOperationSimultanee.totalValeurTaxable1,
                ).format('0.00')}
              </ComBadrLibelleComp>
            </Row>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.designations')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.montantDH')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'codeDouane',
                    rubriqueComptableByTypeConsignation,
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  {getValueByPath(
                    'libelleAbrege',
                    rubriqueComptableByTypeConsignation,
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp>
                  (+){' '}
                  {Numeral(
                    liquidationVO.refOperationSimultanee.montantTotalConsigne,
                  ).format('0.00')}
                </ComBadrLibelleComp>
              </Col>
            </Row>

            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col />
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.consignationInitiale.totalConsignationDH')}
                </ComBadrLibelleComp>
              </Col>
              <Col>
                <ComBadrLibelleComp withColor={true}>
                  {Numeral(
                    liquidationVO.refOperationSimultanee.montantTotalConsigne,
                  ).format('0.00')}
                </ComBadrLibelleComp>
              </Col>
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.typeBordereau')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrPickerComp
                  disabled={
                    !(
                      liquidationType == 'automatique' ||
                      liquidationType == 'automatiqueRedevanceAT'
                    )
                  }
                  style={styles.badrPicker}
                  titleStyle={CustomStyleSheet.badrPickerTitle}
                  onRef={(ref) => (this.comboTypeBorderau = ref)}
                  key="typeBorderau"
                  cle="code"
                  libelle="libelle"
                  module="ALI_DEC"
                  command="typesBordereau"
                  typeService="SP"
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleTypeBorderauChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                  selected={this.state.selectedBorderau}
                />
              </Col>

              {liquidationVO?.refOperationSimultanee?.refModePaiement ==
                '02' && (
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.delai')}
                  </ComBadrLibelleComp>
                </Col>
              )}
              {liquidationVO?.refOperationSimultanee?.refModePaiement ==
                '02' && (
                <Col size={2}>
                  <ComBadrPickerComp
                    style={styles.badrPicker}
                    titleStyle={CustomStyleSheet.badrPickerTitle}
                    onRef={(ref) => (this.comboDelai = ref)}
                    disabled={
                      !(
                        liquidationType == 'automatique' ||
                      liquidationType == 'automatiqueRedevanceAT'
                      )
                    }
                    key="delaiCreditConsignation"
                    cle="numeroCredit"
                    libelle="delaiCreditEnlevement"
                    module="ALI_DEC"
                    command="getCreditParOperateur"
                    typeService="SP"
                    param={{
                      codeBureauDouane:
                        liquidationVO?.refObjetLiquidation
                          ?.refBureauLiquidation,
                      idOperation: liquidationVO?.idOperation,
                    }}
                    selectedValue={
                      liquidationVO?.refOperationSimultanee?.numeroCredit
                    }
                    onValueChange={(selectedValue, selectedIndex, item) =>
                      this.handleDelaiCreditChanged(
                        selectedValue,
                        selectedIndex,
                        item,
                      )
                    }
                  />
                </Col>
              )}
            </Row>
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'liq.consignationInitiale.dateEcheanceConsignation',
                  )}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrDatePickerComp
                  labelDate={translate(
                    'liq.consignationInitiale.dateEcheanceConsignation',
                  )}
                  value={new Date()}
                  dateFormat="DD/MM/YYYY"
                  onDateChanged={this.onDateEcheanceConsignationChanged}
                  inputStyle={styles.textInputsStyle}
                />
              </Col>
            </Row>
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp>
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
  badrPicker: {
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: '#009ab2',
    backgroundColor: '#d9dfe0',
  },
});
function mapStateToProps(state) {
  return {...state.liquidationReducer};
}

export default connect(
  mapStateToProps,
  null,
)(LiqRecapitulationConsignationInitialeBlock);
