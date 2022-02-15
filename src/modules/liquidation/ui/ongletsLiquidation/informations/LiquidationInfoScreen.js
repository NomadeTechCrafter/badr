import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Checkbox, RadioButton, Text} from 'react-native-paper';
import {
  ComBadrLibelleComp,
  ComBadrCardBoxComp,
  ComBadrToolbarComp,
  ComContainerComp,
  ComAccordionComp,
  ComBadrItemsPickerComp,
  ComBadrDatePickerComp,
} from '../../../../../commons/component';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import {
  primaryColor,
  CustomStyleSheet,
} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Row, Grid} from 'react-native-easy-grid';
import * as ConstantsControleVehicules from '../../../../../old/common/constants/referentiel/controleVehicules';
class LiquidationInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refTypeConsignation: '',
    };
  }
  onDateEcheanceConsignationChanged = (date) => {};
  render() {
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('liq.title')}
          subtitle={translate('liq.titleLiqAuto')}
          icon="menu"
        />
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {/* Bloc opération de Liquidation*/}
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.center}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.recapitulation.operationsLiquidationEC')}
                </ComBadrLibelleComp>
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.natureOperationPrincipale')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.numeroOperation')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.natureOperationSimultane')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.numeroOperation')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.typeRecette')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('liq.typeRecette')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2} />
              </Row>
            </Grid>
          </ComBadrCardBoxComp>

          {/* Bloc Info opération de Liquidation*/}
          <ComBadrCardBoxComp>
            <Grid>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.bureauOrdonnancement')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp />
                </Col>
                <Col size={2} />
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.posteOrdonnancement')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('liq.typeRecette')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2} />
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.agentLiquidateur')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.code')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.referenceDeclaration')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.dateEnregistrement')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.typeDeclaration')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.numeroVersionLiquidee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.declarant')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.code')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.destinataireExpediteur')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.code')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>

          {/* Accordion Liquidation Initiale Normale */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate('liq.liquidationNormaleInitiale.title')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'liq.liquidationNormaleInitiale.totalValeurTaxable',
                    )}
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
                    <ComBadrLibelleComp>000110</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>DTS IMPORT NORMAL</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>(+)100.00</ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp>000110</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>DTS IMPORT NORMAL</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>(+)100.00</ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col />
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'liq.liquidationNormaleInitiale.totalLiquidationDH',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>(+)100.00</ComBadrLibelleComp>
                  </Col>
                </Row>

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'liq.liquidationNormaleInitiale.typeBordereau',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrItemsPickerComp
                      style={CustomStyleSheet.column}
                      label={translate(
                        'liq.liquidationNormaleInitiale.typeBordereau',
                      )}
                      selectedValue={''}
                      items={ConstantsControleVehicules.status}
                    />
                  </Col>
                  <Col />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Accordion Consignation Initiale  */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate('liq.consignationInitiale.title')}>
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
                          <RadioButton
                            color={styles.textRadio.color}
                            value="02"
                          />
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
                          <RadioButton
                            color={styles.textRadio.color}
                            value="03"
                          />
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
                          <RadioButton
                            color={styles.textRadio.color}
                            value="05"
                          />
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
                  </RadioButton.Group>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate(
                      'liq.liquidationNormaleInitiale.totalValeurTaxable',
                    )}
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
                    <ComBadrLibelleComp>000110</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>DTS IMPORT NORMAL</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>(+)100.00</ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp>000110</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>DTS IMPORT NORMAL</ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>(+)100.00</ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col />
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'liq.liquidationNormaleInitiale.totalLiquidationDH',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>(+)100.00</ComBadrLibelleComp>
                  </Col>
                </Row>

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'liq.liquidationNormaleInitiale.typeBordereau',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrItemsPickerComp
                      style={CustomStyleSheet.column}
                      label={translate(
                        'liq.liquidationNormaleInitiale.typeBordereau',
                      )}
                      selectedValue={''}
                      items={ConstantsControleVehicules.status}
                    />
                  </Col>
                  <Col />
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
        </ComContainerComp>
      </View>
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

export default LiquidationInfoScreen;
