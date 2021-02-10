import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {TextInput, IconButton, Button, Checkbox} from 'react-native-paper';
import {
  ComContainerComp,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBadrCardBoxComp,
} from '../../../../../commons/component';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {getValueByPath, callRedux} from '../../../utils/LiqUtils';

import {translate} from '../../../../../commons/i18n/ComI18nHelper';

class LiquidationManuelleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidationVO: props.data,
      showRubriquesComptables: false,
      ligneRubrique: {},
      listeTaxesGlobales: [],
    };
  }
  handleRubriquesChanged = (selectedValue, selectedIndex, item) => {
    console.log('----**** --- befor', item);
    this.setState({
      ligneRubrique: {
        ...item,
        consignation: this.state.ligneRubrique.consignation,
        montantDH: this.state.ligneRubrique.montantDH,
      },
    });
  };

  confirmer = () => {
    const {liquidationVO, ligneRubrique} = this.state;
    console.log('----- ligneRubrique', ligneRubrique);
    if (ligneRubrique.codeRubriqueComptable) {
      let data = '';
      let commande = '';

      if (!ligneRubrique.consignation) {
        data = {
          refOperationLiquidation: liquidationVO.idOperation,
          refRubriqueComptable: ligneRubrique.codeRubriqueComptable,
          montantLiquide: ligneRubrique.montantDH.toString(),
        };
        commande = 'liquiderTaxeGlobale';
      } else {
        data = {
          refOperationBase: liquidationVO.idOperation,
          refRubriqueComptable: ligneRubrique.codeRubriqueComptable,
          montantConsigne: ligneRubrique.montantDH.toString(),
        };
        commande = 'consignerTaxeGlobale';
        if (
          liquidationVO.refOperationSimultanee &&
          liquidationVO.refOperationSimultanee.idOperation
        ) {
          data.refOperationLiquidation =
            liquidationVO.refOperationSimultanee.idOperation;
        }
      }
      console.log('----- data', data);
      callRedux(this.props, {
        command: commande,
        typeService: 'SP',
        jsonVO: data,
      });
    } else {
      console.log('--------***- ereeur');
      /*messagesErreurRubriqueGlobale.push(
            translate('liq.error.rubriqueComptableObligatoire'),
          );*/
    }
  };
  loadListeTaxesGlobale = (refLignesRubriqueOperation, consignation) => {
    refLignesRubriqueOperation.map(function (item, key) {
      if (item.indicateurLiquidationGlobale == 'true') {
        this.state.listeTaxesGlobales.push({
          codeRubriqueComptable: item.refRubriqueComptable,
          libelleAbrege: item.refRubriqueComptableLibelle,
          codeDouane: item.refRubriqueComptableCode,
          montantDH:
            item.montantConsigne != '0.0'
              ? item.montantConsigne
              : item.montantLiquide,
          consignation: consignation,
        });
      }
    });
  };
  addRubriquesComptables = () => {
    this.setState((prevState) => ({
      showRubriquesComptables: true,
      ligneRubrique: {
        ...prevState.ligneRubrique,
        consignation: false,
        montantDH: '0',
      },
    }));
  };
  editRubriquesComptables = (item, index) => {};
  deleteRubriquesComptables = (item, index) => {};

  /*  static getDerivedStateFromProps(props, state) {
      let liquiderTaxeGlobaleRep = getValueByPath(
          'liquiderTaxeGlobale.data',props.repData,
      );
    if (liquiderTaxeGlobaleRep  && liquiderTaxeGlobaleRep!== state.listeTaxesGlobales
    ) {
      return {
          listeTaxesGlobales: {
          // object that we want to update
          ...state.declaration, // keep all other key-value pairs
          historiqueCompte: props.reponseData.historiqueCompte, // update the value of specific key
        },
      };
    }
    // Return null to indicate no change to state.
    return null;
  }*/

  render() {
    const {liquidationVO, ligneRubrique} = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={1}>
                  <IconButton
                    icon="plus"
                    size={20}
                    color={'white'}
                    style={{backgroundColor: primaryColor}}
                    onPress={() => this.addRubriquesComptables()}
                  />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true} />
                </Col>
                <Col size={2} />
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1} />
                <Col size={1}>
                  <ComBadrLibelleComp />
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp />
                </Col>
                <Col size={1}>
                  <Row>
                    <IconButton
                      icon="pencil-outline"
                      color={'white'}
                      size={20}
                      style={{backgroundColor: primaryColor}}
                      onPress={() =>
                        this.editRubriquesComptables('item', 'index')
                      }
                    />
                    <IconButton
                      icon="trash-can-outline"
                      color={'white'}
                      size={20}
                      style={{backgroundColor: primaryColor}}
                      onPress={() =>
                        this.deleteRubriquesComptables('item', 'index')
                      }
                    />
                  </Row>
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.rubrique')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrPickerComp
                    disabled={false}
                    onRef={(ref) => (this.rubriquesComptables = ref)}
                    key="rubriquesComptables"
                    cle="codeRubriqueComptable"
                    libelle={['libelleAbrege', 'codeDouane']}
                    module="ALI_DEC"
                    command="getRubriquesComptablesGlobalesVO"
                    typeService="SP"
                    onValueChange={(selectedValue, selectedIndex, item) =>
                      this.handleRubriquesChanged(
                        selectedValue,
                        selectedIndex,
                        item,
                      )
                    }
                    param={{
                      typeRecette: liquidationVO.refTypeRecette,
                    }}
                  />
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.liquidationNormaleInitiale.montantDH')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <TextInput
                    type="flat"
                    disabled={true}
                    label=""
                    value="+"
                    style={{width: 60}}
                  />
                </Col>
                <Col size={3}>
                  <TextInput
                    type="flat"
                    disabled={false}
                    label=""
                    value={ligneRubrique.montantDH}
                    onChangeText={(text) => {
                      this.setState({
                        ...this.state,
                        ligneRubrique: {
                          ...this.state.ligneRubrique,
                          montantDH: text,
                        },
                      });
                    }}
                  />
                </Col>
                <Col size={1} />
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={3} />
                <Col size={1}>
                  <Checkbox
                    color={'#009ab2'}
                    status={
                      ligneRubrique.consignation ? 'checked' : 'unchecked'
                    }
                    disabled={false}
                    onPress={() =>
                      this.setState({
                        ...this.state,
                        ligneRubrique: {
                          ...this.state.ligneRubrique,
                          consignation: !this.state.ligneRubrique.consignation,
                        },
                      })
                    }
                  />
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.liquidationManuelle.aConsigne')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={3} />
              </Row>
              <View style={styles.ComContainerCompBtn}>
                <Button
                  onPress={this.confirmer}
                  icon="check"
                  compact="true"
                  mode="contained"
                  style={styles.btnConfirmer}
                  loading={this.props.showProgress}>
                  {translate('transverse.confirmer')}
                </Button>
                <Button
                  onPress={this.retablir}
                  icon="autorenew"
                  mode="contained"
                  style={styles.btnRetablir}>
                  {translate('transverse.retablir')}
                </Button>
              </View>
            </Grid>
          </ComBadrCardBoxComp>
        </ComContainerComp>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ComContainerCompBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
  },
});

function mapStateToProps(state) {
  return {...state.liquidationReducer};
}

export default connect(mapStateToProps, null)(LiquidationManuelleScreen);
