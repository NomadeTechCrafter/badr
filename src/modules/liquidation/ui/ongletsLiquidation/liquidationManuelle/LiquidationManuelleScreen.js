import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { TextInput, IconButton, Button, Checkbox } from 'react-native-paper';
import {
  ComContainerComp,
  ComBadrLibelleComp,
  ComBadrPickerComp,
  ComBadrCardBoxComp,
  ComBadrErrorMessageComp
} from '../../../../../commons/component';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../../commons/styles/ComThemeStyle';
import LiqManuelleGlobal from './blocks/LiqManuelleGlobal';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  getValueByPath,
  callRedux,
  callReduxError,
  callLiquidationUpdateRedux,
  extractCommandData,
} from '../../../utils/LiqUtils';

import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import LiqManuelleConsignationInitialeBlock from './blocks/LiqManuelleOperationLiqBlock';
import { Picker } from '@react-native-community/picker';
import { nullPlaceholder } from 'i18n-js';
import { ECI_INIT_APPOSITION_SCELLES_REQUEST } from '../../../../ecorImport/appositionScelles/recherche/state/eciAppositionScellesRechercheConstants';

class LiquidationManuelleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liquidationVO: props.data,
      showRubriquesComptables: false,
      ligneRubrique: {},
      listeTaxesGlobales: [],
      selectedLanguage: '',
      listeTaxesArticle: [],
      selectedArticle: {},
      isConfirmed: false,
      commande: "",
      listeTaxesGlobales: []
    };
  }

  componentDidMount() {
    console.log("params", this.props.route.params)
    this.setState({
      selectedArticle:
        this.props.route && this.props.route.params
          ? this.props.route.params.selectedArticle
          : {},
    });
  }

  addToListeTaxesGlobales = (listeTaxesGlobales) => {
    console.log('-- listeTaxesGlobales', listeTaxesGlobales);
    this.setState((state) => {
      listeTaxesGlobales = [...state.listeTaxesGlobales, listeTaxesGlobales];
    });
  };



  initLiquidation(liquidationVO, articleALiquider) {
    console.log('----- init ---------');
    if (articleALiquider && articleALiquider.refLignesRubriqueBaseLiquidation) {
      this.loadListeTaxesArticle(
        articleALiquider.refLignesRubriqueBaseLiquidation,
      );
    }
    console.log(liquidationVO.refLignesRubriqueOperation);
    if (liquidationVO.refLignesRubriqueOperation) {
      this.loadListeTaxesGlobale(
        liquidationVO.refLignesRubriqueOperation,
        false,
      );
    }
    if (
      liquidationVO.refOperationSimultanee &&
      liquidationVO.refOperationSimultanee.refLignesRubriqueOperation
    ) {
      this.loadListeTaxesGlobale(
        liquidationVO.refOperationSimultanee.refLignesRubriqueOperation,
        true,
      );
    }
  }

  loadListeTaxesArticle(refLignesRubriqueBaseLiquidation) {
    refLignesRubriqueBaseLiquidation.map((item, key) => {
      item.codeDouane = item.refRubriqueComptableCode;
      item.codeRubriqueComptable = item.refRubriqueComptable;
      item.indicateurFranchise = item.indicateurFranchise == 'true';
      item.indicateurTVA = item.indicateurTVA == 'true';
      item.adValorem = item.indicateurAdValorem;
      item.statusRubrique = item.adValorem
        ? 'liquidation.adValorem'
        : 'liquidation.valeuSpecifique';
      this.setState(({
        listeTaxesArticle: [
          ...this.state.listeTaxesArticle,
          item,
        ],
      }))
      console.log('item', item);
    });
  }

  loadListeTaxesGlobale(refLignesRubriqueOperation, consignation) {
    refLignesRubriqueOperation.map(function (item, key) {
      if (item.indicateurLiquidationGlobale == 'true') {
        listeTaxesGlobales.push({
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
  }

  fieldsAreValid = () => {
    // if (!ligneRubrique.taux) {
    //   messagesErreurRubriqueArticle.push(
    //     translate('liquidation.error.veuillezSaisir') + translate('liquidation.error.taux'))
    // }
    // if (!ligneRubrique.assiette) {
    //   messagesErreurRubriqueArticle.push(
    //     translate('liquidation.error.veuillezSaisir') + translate('liquidation.error.assiette'))
    // }
    // if (!ligneRubrique.codeRubriqueComptable) {
    //   messagesErreurRubriqueArticle.push(
    //     translate('liquidation.error.veuillezSaisir') + translate('liquidation.error.rubrique'))
    // }
    return (
      this.state.ligneRubrique.codeRubriqueComptable != '' &&
      this.state.ligneRubrique.taux != '' &&
      this.state.ligneRubrique.assiette != ''
    );
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

  confirmer = async () => {
    const { liquidationVO, ligneRubrique } = this.state;
    console.log('----- ligneRubrique', ligneRubrique);
    this.setState({
      isConfirmed: false,
    });
    if (
      this.props.route &&
      this.props.route.params &&
      this.props.route.params.isArticle
    ) {
      if (this.fieldsAreValid()) {
        if (ligneRubrique && ligneRubrique.tauxVirtuel && !ligneRubrique.indicateurTVA) {
          console.log('Error!')
          // messagesErreurRubriqueArticle.push(
          //   translate('liquidation.error.indicateurTvaObligatoireTauxVirtuel'));
          await callReduxError(
            this.props,
            {
              command: "confirmerArticle",
            },
            'liq.error.indicateurTvaObligatoireTauxVirtuel',
          );
          this.setState({
            commande: "confirmerArticle"
          })
        } else {
          console.log('Success')
          let index = -1;
          this.state.listeTaxesArticle.map((item, key) => {
            if (ligneRubrique && ligneRubrique.codeDouane == item.codeDouane) {
              index = this.state.listeTaxesArticle.indexOf(item);
            }
          });
          if (index == -1) {
            this.setState({
              listeTaxesArticle: [
                ...this.state.listeTaxesArticle,
                ligneRubrique
              ]
            })
          } else {
            let listTaxes = [...this.state.listeTaxesArticle];
            listTaxes[index] = ligneRubrique;
            this.setState({
              listeTaxesArticle: listTaxes
            })
          }
        }
      }
    } else if (ligneRubrique.codeRubriqueComptable) {
      let data = '';
      let commande = '';
      if (!ligneRubrique.consignation) {
        data = {
          refOperationLiquidation: liquidationVO.idOperation,
          refRubriqueComptable: ligneRubrique.codeRubriqueComptable,
          montantLiquide: ligneRubrique.montantDH.toString(),
        };
        await this.setState({
          commande: 'liquiderTaxeGlobale'
        })
      } else {
        data = {
          refOperationBase: liquidationVO.idOperation,
          refRubriqueComptable: ligneRubrique.codeRubriqueComptable,
          montantConsigne: ligneRubrique.montantDH.toString(),
        };
        await this.setState({
          commande: 'consignerTaxeGlobale'
        })
        if (
          liquidationVO.refOperationSimultanee &&
          liquidationVO.refOperationSimultanee.idOperation
        ) {
          data.refOperationLiquidation =
            liquidationVO.refOperationSimultanee.idOperation;
        }
      }

      await callRedux(
        this.props,
        {
          command: this.state.commande,
          typeService: 'UC',
          jsonVO: data,
        },
        null,
      );

      await callLiquidationUpdateRedux(
        this.props,
        {
          command: this.state.commande,
          typeService: 'UC',
          jsonVO: data,
        }
      )

    } else {
      console.log('--------***- ereeur');
      await callReduxError(
        this.props,
        {
          command: "liquiderTaxeGlobale",
        },
        'liq.error.rubriqueComptableObligatoire',
      );
      this.setState({
        commande: "liquiderTaxeGlobale"
      })
    }

    this.setState({
      isConfirmed: true,
    });
  };
  liquiderConsignerArticleManuelle = async () => {
    let article = this.state.selectedArticle;
    var refLignesRubriqueBaseLiquidation = this.state.listeTaxesArticle.map(function (item) {
      return {
        "assiette": item.assiette,
        "indicateurTVA": item.indicateurTVA + "",
        "indicateurAdValorem": item.adValorem,
        "indicateurFranchise": item.indicateurFranchise + "",
        "refRubriqueComptable": item.codeRubriqueComptable,
        "taux": item.taux,
        "tauxVirtuel": item.tauxVirtuel
      }
    });
    var normalContext = "false";
    var consignationContext = "false";
    var data = {};
    var commande = "confirmerArticle";
    if (!article.refArticleLiquideReference) {
      if (this.props.liquidationType == "automatique") {
        normalContext = "true";
        consignationContext = "false";
      } else {
        normalContext = !(article.refParametresLiquidation.indicateurConsignationIntegrale == "true") + "";
        consignationContext = (article.refParametresLiquidation.indicateurConsignationIntegrale == "true") + "";
      }
    } else {
      //Liquider un article avec liquidation manuelle et en consignation
      commande = "confirmerConsignerArticle";
      normalContext = "false";
      consignationContext = "false";
    }

    data = {
      "indicateurLiquidationManuelleRequise": article.indicateurLiquidationManuelleRequise,
      "normalContext": normalContext,
      "consignationContext": consignationContext,
      "numArticle": article.numArticle,
      "idArticleLiquideParOperation": article.idArticleLiquideParOperation,
      "refOperationLiquidation": article.refOperationLiquidation,
      "refOperationDeBase": article.refParametresLiquidation.indicateurConsignationIntegrale == "true" ? $rootScope.liquidationVO.idOperation : article.refOperationDeBase,
      "refParametresLiquidation": {
        "idParameterLiquidation": article.refParametresLiquidation.idParameterLiquidation,
        "codeNomenclature": article.refParametresLiquidation.codeNomenclature,
        "dateEffetLiquidation": article.refParametresLiquidation.dateEffetLiquidation,
        "designation": article.refParametresLiquidation.designation ? article.refParametresLiquidation.designation : ".",
        "indicateurConsignationIntegrale": article.refParametresLiquidation.indicateurConsignationIntegrale,
        "indicateurFranchiseTotale": article.refParametresLiquidation.indicateurFranchiseTotale,
        "quantite": article.refParametresLiquidation.quantite,
        "refUniteQuantite": article.refParametresLiquidation.refUniteQuantite,
        "valeurTaxable": article.refParametresLiquidation.valeurTaxable
      },
      refLignesRubriqueBaseLiquidation: refLignesRubriqueBaseLiquidation
    };
    if (commande == "confirmerConsignerArticle") {
      //Liquider un article avec liquidation manuelle et en consignation
      data.refArticleLiquideReference = {
        idArticleLiquideParOperation: article.refArticleLiquideReference.idArticleLiquideParOperation
      };
    }

    console.log('liquiderConsignerArticleManuelle ----', data);

    this.setState({
      listeTaxesArticle: [],
      showRubriquesComptables: false
    })

    await callRedux(
      this.props,
      {
        command: commande,
        typeService: 'UC',
        jsonVO: data,
      },
      null,
    );

    await callLiquidationUpdateRedux(
      this.props,
      {
        command: commande,
        typeService: 'UC',
        jsonVO: data,
      }
    )

  }

  getListeTaxesGlobales = (data) => {
    this.setState({
      listeTaxesGlobales: data
    })
  };
  addRubriquesComptables = () => {
    this.setState({
      showRubriquesComptables: true,
      ligneRubrique: {
        ...this.state.ligneRubrique,
        consignation: false,
        montantDH: '0',
      },
    });
    this.initLiquidation(this.state.liquidationVO, this.state.selectedArticle);
  };

  editRubriquesComptables = (item, index) => {
    this.setState({
      ligneRubrique: item,
      showRubriquesComptables: true,
      type: "edit"
    })
  };

  deleteRubriquesComptables = (item, index) => {
    Alert.alert(
      "Remove",
      "Are You sure you want to remove that?",
      [
        {
          text: "Yes",
          onPress: () => {
            let listeTaxes = [...this.state.listeTaxesArticle];
            listeTaxes.splice(index, 1);
            this.setState({
              listeTaxesArticle: listeTaxes
            })
          },
        },
        { text: "No", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
      ]
    );
  }

  render() {
    const { selectedArticle } = this.state;
    const isArticle =
      this.props.route && this.props.route.params
        ? this.props.route.params.isArticle
        : false;
    const {
      liquidationVO,
      ligneRubrique,
      listeTaxesGlobales,
      selectedLanguage,
      showRubriquesComptables
    } = this.state;

    let response = extractCommandData(
      this.props,
      this.state.commande,
      'liquidationReducer',
    );

    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          <LiqManuelleConsignationInitialeBlock liquidationVO={liquidationVO} />
          <ComBadrCardBoxComp>
            <Grid>
              <ComBadrLibelleComp
                withColor={true}
                style={{ fontSize: 14, color: 'grey' }}>
                {isArticle
                  ? translate('liq.actions.liquiderArticle')
                  : translate('liq.actions.liquiderGlobalement')}
              </ComBadrLibelleComp>
              {isArticle && (
                <View>
                  <Row style={styles.whiteRow}>
                    {selectedArticle.numArticle && (<><Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articleNumero')}
                      </ComBadrLibelleComp>
                    </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp>
                          {selectedArticle.numArticle}
                        </ComBadrLibelleComp>
                      </Col></>)}
                    {liquidationVO.numOrdreOperation &&
                      (<>
                        <Col size={1}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('liq.codeNGP')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                          <ComBadrLibelleComp>
                            {liquidationVO.numOrdreOperation}
                          </ComBadrLibelleComp>
                        </Col>
                      </>)}
                  </Row>
                  <Row style={styles.whiteRow}>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                          'liq.articles.baseActuelleLiquidationNormale',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp></ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                </View>
              )}
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={1}>
                  <IconButton
                    icon="plus"
                    size={20}
                    color={'white'}
                    style={{ backgroundColor: primaryColor }}
                    onPress={() => this.addRubriquesComptables()}
                  />
                </Col>
                {!isArticle ? (
                  <>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.liquidationNormaleInitiale.montantDH')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                    <Col size={1} />
                    <Col size={1} />
                  </>
                ) : (
                  <>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.liquidationNormaleInitiale.codeRubrique')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.assiette')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.sTVA')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.sFR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.taux')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1} />
                    <Col size={1} />
                  </>
                )}
              </Row>

              {!_.isNil(response) && !_.isNil(response.data) && !(this.props.route &&
        this.props.route.params &&
        this.props.route.params.isArticle) && (
                <ListeTaxesGlobales data={response.data} editRubriquesComptables={this.editRubriquesComptables} ligneRubrique={ligneRubrique} />
              )}
              {this.state.listeTaxesArticle.length > 0 && isArticle && (
                <View>
                  {
                    this.state.listeTaxesArticle.map((item, index) => (
                      <Row
                        key={index}
                        style={
                          index % 2 === 0
                            ? CustomStyleSheet.whiteRow
                            : CustomStyleSheet.lightBlueRow
                        }>
                        <Col size={1} />
                        <Col size={2} style={{ textAlign: 'center' }}>
                          <ComBadrLibelleComp>{item.codeRubriqueComptable}</ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrLibelleComp>{item.assiette}</ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrLibelleComp>{item.indicateurTVA ? item.indicateurTVA.toString() : ""}</ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrLibelleComp>{item.indicateurFranchise ? item.indicateurFranchise.toString() : ""}</ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrLibelleComp>{item.taux}</ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                          <IconButton
                            icon="pencil-outline"
                            color={'white'}
                            size={20}
                            style={{ backgroundColor: primaryColor }}
                            onPress={() => this.editRubriquesComptables(item, index)}
                          />
                        </Col>
                        <Col size={1}>
                          <IconButton
                            icon="trash-can-outline"
                            color={'white'}
                            size={20}
                            style={{ backgroundColor: primaryColor }}
                            onPress={() =>
                              this.deleteRubriquesComptables(item, index)
                            }
                          />
                        </Col>
                      </Row>
                    ))}
                </View >
              )}
              {this.state.listeTaxesArticle.length > 0 && isArticle && (<View style={styles.ComContainerCompBtn}>
                <Button
                  onPress={this.liquiderConsignerArticleManuelle}
                  icon="check"
                  compact="true"
                  mode="contained"
                  style={styles.btnConfirmer}
                  loading={this.props.showProgress}>
                  {translate('transverse.liquider')}
                </Button>
                <Button
                  onPress={() => {
                    this.setState({
                      listeTaxesArticle: []
                    })
                  }}
                  icon="autorenew"
                  mode="contained"
                  style={styles.btnRetablir}>
                  {translate('transverse.abandonner')}
                </Button>
                <Button
                  onPress={() => {
                    this.setState({
                      listeTaxesArticle: []
                    });
                    this.props.navigation.navigate('Articles');
                  }
                  }
                  icon="autorenew"
                  mode="contained"
                  style={styles.btnQuitter}>
                  {translate('transverse.annulerTout')}
                </Button>
              </View>)}
            </Grid>
          </ComBadrCardBoxComp>
          {response &&
            response.errorMessage && (
              <ComBadrErrorMessageComp message={response.errorMessage} />
            )}
          {showRubriquesComptables &&
            (isArticle ? (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={0.6}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.rubrique')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2.4}>
                      <ComBadrPickerComp
                        disabled={false}
                        style={styles.badrPicker}
                        titleStyle={CustomStyleSheet.badrPickerTitle}
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
                    <Col size={0.5} />
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col />
                    <Col size={0.4}>
                      <Checkbox
                        color={'#009ab2'}
                        status={ligneRubrique.indicateurTVA ? 'checked' : 'unchecked'}
                        disabled={false}
                        onPress={() =>
                          this.setState({
                            ...this.state,
                            ligneRubrique: {
                              ...this.state.ligneRubrique,
                              indicateurTVA: !this.state.ligneRubrique.indicateurTVA,
                            },
                          })
                        }
                      />
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={false}>
                        {translate('liq.articles.sTVA')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={0.4}>
                      <Checkbox
                        color={'#009ab2'}
                        status={ligneRubrique.indicateurFranchise ? 'checked' : 'unchecked'}
                        disabled={false}
                        onPress={() =>
                          this.setState({
                            ...this.state,
                            ligneRubrique: {
                              ...this.state.ligneRubrique,
                              indicateurFranchise: !this.state.ligneRubrique.indicateurFranchise,
                            },
                          })
                        }
                      />
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={false}>
                        {translate('liq.articles.sFR')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={false}>
                        {translate('liq.adValorem')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col />
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={0.6}>
                      <ComBadrLibelleComp
                        withColor={true}
                        style={{ textAlign: 'center' }}>
                        {translate('liq.articles.assiette')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <TextInput
                        label=""
                        type="flat"
                        disabled={false}
                        style={{
                          height: 40,
                          borderRadius: 2,
                          borderWidth: 0.2,
                          borderColor: '#009ab2',
                          backgroundColor: '#d9dfe0',
                        }}
                        value={ligneRubrique.assiette}
                        onChangeText={(text) => {
                          this.setState({
                            ...this.state,
                            ligneRubrique: {
                              ...this.state.ligneRubrique,
                              assiette: text,
                            },
                          });
                        }}
                      />
                    </Col>
                    <Col size={0.6}>
                      <ComBadrLibelleComp
                        withColor={true}
                        style={{ textAlign: 'center' }}>
                        {translate('liq.articles.taux')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <TextInput
                        label=""
                        type="flat"
                        disabled={false}
                        style={{
                          height: 40,
                          borderRadius: 2,
                          borderWidth: 0.2,
                          borderColor: '#009ab2',
                          backgroundColor: '#d9dfe0',
                        }}
                        value={ligneRubrique.taux}
                        onChangeText={(text) => {
                          this.setState({
                            ...this.state,
                            ligneRubrique: {
                              ...this.state.ligneRubrique,
                              taux: text,
                            },
                          });
                        }}
                      />
                    </Col>
                    <Col size={0.6}>
                      <ComBadrLibelleComp
                        withColor={true}
                        style={{ textAlign: 'center' }}>
                        {translate('liq.articles.tauxVirtuel')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <TextInput
                        label=""
                        type="flat"
                        disabled={false}
                        style={{
                          height: 40,
                          borderRadius: 2,
                          borderWidth: 0.2,
                          borderColor: '#009ab2',
                          backgroundColor: '#d9dfe0',
                        }}
                        value={ligneRubrique.tauxVirtuel}
                        onChangeText={(text) => {
                          this.setState({
                            ...this.state,
                            ligneRubrique: {
                              ...this.state.ligneRubrique,
                              tauxVirtuel: text,
                            },
                          });
                        }}
                      />
                    </Col>
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
                    <Button
                      onPress={() =>
                        this.setState({
                          showRubriquesComptables: false,
                        })
                      }
                      icon="autorenew"
                      mode="contained"
                      style={styles.btnQuitter}>
                      {translate('transverse.quitter')}
                    </Button>
                  </View>
                </Grid>
              </ComBadrCardBoxComp>
            ) : (
              <ComBadrCardBoxComp>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={0.6}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.rubrique')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2.4}>
                      <ComBadrPickerComp
                        disabled={false}
                        style={styles.badrPicker}
                        titleStyle={CustomStyleSheet.badrPickerTitle}
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
                    <Col size={0.5} />
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={0.6}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.liquidationNormaleInitiale.montantDH')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={0.6} style={styles.badrPicker}>
                      <Picker
                        style={{ height: 40 }}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue) =>
                          this.setState({
                            selectedLanguage: itemValue,
                          })
                        }>
                        <Picker.Item label="+" value="+" />
                        <Picker.Item label="-" value="-" />
                      </Picker>
                    </Col>
                    <Col size={1.8} style={{ paddingLeft: 12 }}>
                      <TextInput
                        label=""
                        type="flat"
                        disabled={false}
                        style={{
                          height: 40,
                          borderRadius: 2,
                          borderWidth: 0.2,
                          borderColor: '#009ab2',
                          backgroundColor: '#d9dfe0',
                        }}
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
                    <Col size={0.5} />
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1} />
                    <Col size={0.4}>
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
                              consignation: !this.state.ligneRubrique
                                .consignation,
                            },
                          })
                        }
                      />
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp withColor={false}>
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
                    <Button
                      onPress={() =>
                        this.setState({
                          showRubriquesComptables: false,
                        })
                      }
                      icon="autorenew"
                      mode="contained"
                      style={styles.btnQuitter}>
                      {translate('transverse.quitter')}
                    </Button>
                  </View>
                </Grid>
              </ComBadrCardBoxComp>
            ))}
          <LiqManuelleGlobal listeTaxesGlobales={listeTaxesGlobales} />
        </ComContainerComp>
      </View>
    );
  }
}

class ListeTaxesGlobales extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listeTaxesGlobales: [],
    };
  }

  componentDidMount() {
    this.getListeTaxesGlobales(this.props.data)
  }

  editRubriquesComptables = (item, index) => {

    this.props.editRubriquesComptables(item, index);
    let listTaxes = [...this.state.listeTaxesGlobales];
    listTaxes[index] = this.props.ligneRubrique;
    this.setState({
      listeTaxesGlobales: listTaxes
    })

  };

  deleteRubriquesComptables = (item, index) => {
    Alert.alert(
      "Remove",
      "Are You sure you want to remove that?",
      [
        {
          text: "Yes",
          onPress: () => {
            let listeTaxes = [...this.state.ListeTaxesGlobales];
            listeTaxes.splice(index, 1);
            this.setState({
              ListeTaxesGlobales: listeTaxes
            })
            callRedux(
              this.props,
              {
                command: "supprimerTaxeGlobale",
                typeService: 'UC',
                jsonVO: item,
              },
              null,
            );
            callLiquidationUpdateRedux(
              this.props,
              {
                command: "supprimerTaxeGlobale",
                typeService: 'UC',
                jsonVO: item,
              },
            )
          },
        },
        { text: "No", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
      ]
    );
  }


  loadListeTaxesGlobale = (refLignesRubriqueOperation, consignation) => {
    console.log('refLignesRubriqueOperation', refLignesRubriqueOperation);
    refLignesRubriqueOperation.map((item, key) => {
      if (item.indicateurLiquidationGlobale == 'true') {
        this.setState({
          listeTaxesGlobales: [
            ...this.state.listeTaxesGlobales,
            {
              codeRubriqueComptable: item.refRubriqueComptable,
              libelleAbrege: item.refRubriqueComptableLibelle,
              codeDouane: item.refRubriqueComptableCode,
              montantDH:
                item.montantConsigne != '0.0'
                  ? item.montantConsigne
                  : item.montantLiquide,
              consignation: consignation,
            }
          ]
        });
      }
    });
    // setListeTaxesGlobales(listeTaxesGlobales);
    console.log('listeTaxesGlobales', this.state.listeTaxesGlobales);
  };

  getListeTaxesGlobales = (data) => {
    if (data) {
      console.log(' ---------data----------', data);
      if (data.refLignesRubriqueOperation) {
        this.loadListeTaxesGlobale(data.refLignesRubriqueOperation, false);
      }
      if (
        data.refOperationSimultanee &&
        data.refOperationSimultanee.refLignesRubriqueOperation
      ) {
        this.loadListeTaxesGlobale(
          data.refOperationSimultanee.refLignesRubriqueOperation,
          true,
        );
      }
    }
  };

  render() {

    const { listeTaxesGlobales } = this.state;
    return (
      <View>
        {
          listeTaxesGlobales.map((item, index) => (
            <Row
              key={index}
              style={
                index % 2 === 0
                  ? CustomStyleSheet.whiteRow
                  : CustomStyleSheet.lightBlueRow
              }>
              <Col size={1} />
              <Col size={2} style={{ textAlign: 'center' }}>
                <ComBadrLibelleComp>{item.codeDouane}</ComBadrLibelleComp>
              </Col>
              <Col size={2}>
                <ComBadrLibelleComp>{item.montantDH}</ComBadrLibelleComp>
              </Col>
              <Col size={2} style={{ textAlign: 'center' }}>
                <ComBadrLibelleComp style={{ color: 'red' }}>
                  {item.consignation && 'Consignation'}
                </ComBadrLibelleComp>
              </Col>
              <Col size={1}>
                <IconButton
                  icon="pencil-outline"
                  color={'white'}
                  size={20}
                  style={{ backgroundColor: primaryColor }}
                  onPress={() => this.editRubriquesComptables(item, index)}
                />
              </Col>
              <Col size={1}>
                <IconButton
                  icon="trash-can-outline"
                  color={'white'}
                  size={20}
                  style={{ backgroundColor: primaryColor }}
                  onPress={() =>
                    this.deleteRubriquesComptables(item, index)
                  }
                />
              </Col>
            </Row>
          ))}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  ComContainerCompBtn: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnQuitter: {
    color: '#FFF',
    padding: 5,
  },
  badrPicker: {
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: '#009ab2',
    backgroundColor: '#d9dfe0',
  },
  whiteRow: {
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps, null)(LiquidationManuelleScreen);
