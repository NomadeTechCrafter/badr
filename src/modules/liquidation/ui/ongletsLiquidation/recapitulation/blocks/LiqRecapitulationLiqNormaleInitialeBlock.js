import React from 'react';
import {
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComAccordionComp,
  ComBadrPickerComp,
} from '../../../../../../commons/component';

import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { sumByKey } from '../../../../utils/LiqUtils';
import { connect } from 'react-redux';
import { CustomStyleSheet } from '../../../../../../commons/styles/ComThemeStyle';
import { Col, Grid, Row } from 'react-native-easy-grid';
import Numeral from 'numeral';
import _ from 'lodash';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import ComUtils from "../../../../../../commons/utils/ComUtils";
class LiqRecapitulationLiqNormaleInitialeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBorderau: '',
      selectedDelai: ''
    }
  }

  handleTypeBorderauChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedBorderau: selectedValue,
    });
  };
  handleDelaiCreditChanged = (selectedValue, selectedIndex, item) => {
    this.setState({
      selectedDelai: selectedValue,
    });
  };
  render() {
    const { liquidationVO, liquidationType, indicateurLiquidationArticlesEnFranchiseTotale } = this.props;
    // console.log('indicateurLiquidationArticlesEnFranchiseTotale', indicateurLiquidationArticlesEnFranchiseTotale)
    return (
      <ComBadrCardBoxComp noPadding={true}>
        {/* Bloc Liquidation Initiale Normale */}
        <ComAccordionComp
          title={translate('liq.liquidationNormaleInitiale.title')}>
          <Grid>
            {((liquidationType == 'manuelleOffice' && liquidationVO.typeCautionnent == 'AUTRE' && liquidationVO.refNatureOperation == '13') || liquidationType != 'manuelleOffice') &&
              <View>
                <Row style={CustomStyleSheet.whiteRow}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.liquidationNormaleInitiale.totalValeurTaxable')}
                  </ComBadrLibelleComp>
                  <ComBadrLibelleComp>
                    {'  '}
                    {Numeral(liquidationVO.totalValeurTaxable1).format('0.00')}
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

                {liquidationVO.refLignesRubriqueOperation.length == 0 &&
                  <Row style={CustomStyleSheet.whiteRow}>
                    <ComBadrLibelleComp>
                      {translate('mainlevee.Aucunenregistrementtrouve')}
                    </ComBadrLibelleComp>
                  </Row>
                }
                {_.orderBy(
                  liquidationVO.refLignesRubriqueOperation,
                  'refRubriqueComptableCode',
                  'asc',
                ).map((item, index) => (
                  <Row
                    key={index}
                    style={
                      index % 2 === 0
                        ? CustomStyleSheet.whiteRow
                        : CustomStyleSheet.lightBlueRow
                    }>
                    <Col>
                      <ComBadrLibelleComp>
                        {item.refRubriqueComptableCode}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {item.refRubriqueComptableLibelle}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        (+) {Numeral(item.montantLiquide).format('0.00')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                ))}
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col />
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'liq.liquidationNormaleInitiale.totalLiquidationDH',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {Numeral(
                        sumByKey(
                          liquidationVO.refLignesRubriqueOperation,
                          'montantLiquide',
                        ),
                      ).format('0.00')}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
              </View>
            }
            <Row style={CustomStyleSheet.whiteRow}>
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.liquidationNormaleInitiale.typeBordereau')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>

                <ComBadrPickerComp
                  disabled={(liquidationType == 'automatique' || liquidationType == 'automatiqueRedevanceAT') && liquidationVO?.montantTotalLiquide != '0.0'}
                  style={styles.badrPicker}
                  titleStyle={CustomStyleSheet.badrPickerTitle}
                  onRef={(ref) => (this.comboTypeBorderau = ref)}
                  key="typeBorderau"
                  cle="code"
                  libelle="libelle"
                  module="ALI_DEC"
                  command="typesBordereau"
                  typeService="SP"
                  selectedValue={liquidationVO?.refModePaiement}
                  onValueChange={(selectedValue, selectedIndex, item) =>
                    this.handleTypeBorderauChanged(
                      selectedValue,
                      selectedIndex,
                      item,
                    )
                  }
                />
              </Col>
              {/* {this.state.selectedBorderau == "Crédit d'enlèvement(02)"} */}
              <Col size={1}>
                <ComBadrLibelleComp withColor={true}>
                  {translate('liq.delai')}
                </ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrPickerComp
                  style={styles.badrPicker}
                  titleStyle={CustomStyleSheet.badrPickerTitle}
                  onRef={(ref) => (this.comboDelai = ref)}
                  key="delaiCredit"
                  cle="numeroCredit"
                  libelle="delaiCreditEnlevement"
                  module="ALI_DEC"
                  command="getCreditParOperateur"
                  typeService="SP"
                  param={{
                    codeBureauDouane: liquidationVO?.refObjetLiquidation?.refBureauLiquidation,
                    idOperation: liquidationVO?.idOperation,
                  }}
                  selectedValue={
                    liquidationVO?.numeroCredit
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
            </Row>

            {(indicateurLiquidationArticlesEnFranchiseTotale && liquidationType != 'manuelleOffice') &&
              < Row style={{justifyContent: 'center'}}>
                <ComBadrLibelleComp style={{color: 'red'}}>
                  {translate('liq.articleFranchiseTotale')}
                </ComBadrLibelleComp>
              </Row>
            }
          </Grid>
        </ComAccordionComp>
      </ComBadrCardBoxComp >
    );
  }
}

const styles = StyleSheet.create({
  badrPicker: {
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: '#009ab2',
    backgroundColor: '#d9dfe0',
  },
})

function mapStateToProps(state) {
  return { ...state.liquidationReducer };
}

export default connect(
  mapStateToProps,
  null,
)(LiqRecapitulationLiqNormaleInitialeBlock);
