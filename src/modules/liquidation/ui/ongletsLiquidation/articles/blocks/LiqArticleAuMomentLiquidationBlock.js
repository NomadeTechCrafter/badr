import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import Numeral from 'numeral';
import { StyleSheet, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import ItemArticles from './itemArticles';
import {
  ComAccordionComp,
  ComBadrPickerComp,
  ComBadrCardBoxComp,
  ComBadrLibelleComp,
  ComBadrDatePickerComp,
  ComBadrAutoCompleteComp,
  ComBadrErrorMessageComp,
  ComBadrProgressBarComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrInfoMessageComp,
} from '../../../../../../commons/component';
import { Col, Grid, Row } from 'react-native-easy-grid';
import LiqArticleDetailsLiqBlock from './LiqArticleDetailsLiqBlock';
import { translate } from '../../../../../../commons/i18n/ComI18nHelper';
import { TextInput, IconButton, Button, Checkbox } from 'react-native-paper';
import LiqArticleDetailsLiqLegendeLBlock from './LiqArticleDetailsLiqLegendeLBlock';
import {
  primaryColor,
  CustomStyleSheet,
} from '../../../../../../commons/styles/ComThemeStyle';
import { callRedux, callLiquidationUpdateRedux } from '../../../../utils/LiqUtils';
import * as ConsulterDumAction from '../../../../../../commons/state/actions/ConsulterDumAction';
import { t } from 'i18n-js';
import { GENERIC_REQUEST } from '../../../../../../commons/constants/generic/ComGenericConstants';
import { ComSessionService } from '../../../../../../commons/services/session/ComSessionService';

class LiqRecapitulationLiqNormaleInitialeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listeArticlesLiquides: [],
      selectedArticle: {},
      libelleArticle: '',
      showRubriquesComptables: false,
      articleEnCours: {},
      actionType: '',
      dateEnregistrement: null,
      compteur: 0,
    };
  }
  componentDidMount() {
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
    // console.log(JSON.stringify(this.props.liquidationVO));
    // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++');
    this.setState({
      listeArticlesLiquides: this.getListeArticlesLiquides(
        this.props.liquidationVO,
        this.props.liquidationVO.refOperationSimultanee,
      ),
      dateEnregistrement: this.props.liquidationVO?.refObjetLiquidation?.dateEnregistrement
    });
  }

  getListeArticlesLiquides = (
    refOperationPrincipale,
    refOperationSimultanee,
  ) => {
    let articlesLiquides = [];
    _.forEach(refOperationPrincipale.refArticlesLiquides, function (
      item1,
      key1,
    ) {
      articlesLiquides.push(item1);
      if (
        refOperationSimultanee &&
        refOperationSimultanee.refArticlesLiquides
      ) {
        _.forEach(refOperationSimultanee.refArticlesLiquides, function (
          item2,
          key2,
        ) {
          if (item1.numArticle == item2.numArticle) {
            articlesLiquides.push(item2);
          }
        });
      }
    });
    //articles consignation only
    if (
      refOperationSimultanee &&
      refOperationSimultanee.refArticlesLiquides.length +
      refOperationPrincipale.refArticlesLiquides.length >
      articlesLiquides.length
    ) {
      _.forEach(refOperationSimultanee.refArticlesLiquides, function (
        item,
        key,
      ) {
        let exist = false;
        _.forEach(refOperationPrincipale.refArticlesLiquides, function (
          item1,
          key1,
        ) {
          if (!exist) {
            exist = item.numArticle == item1.numArticle;
          }
        });
        if (!exist) {
          articlesLiquides.push(item);
        }
      });
    }
    return articlesLiquides;
  };

  showDetailArticle = (article, libelleArticle) => {
    console.log('article ======>', JSON.stringify(article))
    this.props.showDetailArticle(article, libelleArticle)
    if (this.props.liquidationType == 'manuelle' || this.props.liquidationType == 'manuelleOffice' || this.props.liquidationType == 'manuelleRedevanceAT') {
      this.setState({
        articleEnCours: {
          ...article.refParametresLiquidation,
          refUniteQuantite: article.refParametresLiquidation.refUniteQuantite,
        },
        actionType: 'edit',
        showRubriquesComptables: true,
      })
      // console.log('articleEnCours ======>', this.state.articleEnCours)
    }
    this.setState({ selectedArticle: article, libelleArticle: libelleArticle });
  };

  retablir = () => {
    // !_.isEmpty(this.state.selectedArticle.numArticle) ?
    //   this.setState({
    //     articleEnCours: {}
    //   })
    //   :
    console.log('+++++++++++++++++++++++++++++');
    console.log('+++++++++++++++++++++++++++++');
    console.log('+++++++++++++++++++++++++++++');
    console.log(this.state.articleEnCours?.refUniteQuantite?.state?.selected);
    console.log('+++++++++++++++++++++++++++++');
    console.log('+++++++++++++++++++++++++++++');
    console.log('+++++++++++++++++++++++++++++');
      this.setState({
        articleEnCours: {
          ...this.state.articleEnCours,
          codeNomenclature: '',
          franchiseTotale: '',
          consignationIntegrale: '',
          codeNomenclature: '',
          designation: '',
          valeurTaxable: '',
          quantite: '',
          refUniteQuantite: '',
          refUniteQuantite: {
            ...this.state.articleEnCours.refUniteQuantite.state,
            selected: '',
          },
          dateEffetLiquidation: '',
        },
      })
  }

  addRubriquesComptables = () => {
    this.setState({
      showRubriquesComptables: true,
    });
  };


  checkRequiredFieldsResultatCtrl = (params) => {
    let modele = this.state.articleEnCours;

    if (_.isEmpty(modele.refUniteQuantite)) {
      params.required = true;
      params.msg += !_.isEmpty(params.msg) ? "\n" : "";
      params.msg += '- ' + translate('liq.articles.refUniteQuantite') + ' ' + translate('liq.error.shouldNotBeEmpty');
    }
    if (_.isEmpty(modele.codeNomenclature)) {
      params.required = true;
      params.msg += !_.isEmpty(params.msg) ? "\n" : "";
      params.msg += '- ' + translate('liq.articles.codeNomenclature') + ' ' + translate('liq.error.shouldNotBeEmpty');
    }
    if (_.isEmpty(modele.valeurTaxable)) {
      params.required = true;
      params.msg += !_.isEmpty(params.msg) ? "\n" : "";
      params.msg += '- ' + translate('liq.articles.valeurTaxable') + ' ' + translate('liq.error.shouldNotBeEmpty');
    }
    if (_.isEmpty(modele.designation)) {
      params.required = true;
      params.msg += !_.isEmpty(params.msg) ? "\n" : "";
      params.msg += '- ' + translate('liq.articles.designation') + ' ' + translate('liq.error.shouldNotBeEmpty');
    }
    if (_.isEmpty(modele.quantite)) {
      params.required = true;
      params.msg += !_.isEmpty(params.msg) ? "\n" : "";
      params.msg += '- ' + translate('liq.articles.quantite') + ' ' + translate('liq.error.shouldNotBeEmpty');
    }
  }

  checkRequiredFields = () => {
    let params = { msg: '', required: false }
    this.checkRequiredFieldsResultatCtrl(params);
    if (params.required) {
      let message = params.msg;
      this.setState({
        errorMessage: message
      });
    } else {
      this.setState({
        errorMessage: null
      });
    }
    return params.required;
  }

  getNumArticle = (listesArticle) => {
    var numNewArticle = 1;
    listesArticle.map(function (item, key) {
      if (numNewArticle <= Number(item.numArticle)) {
        numNewArticle = Number(item.numArticle)
      }
    });
    return (numNewArticle + 1).toString();
  }

  confirmerArticle = () => {
    console.log("----confirmerArticle-----");
    let { liquidationVO, liquidationType } = this.props;
    let { articleEnCours, actionType, selectedArticle, listeArticlesLiquides } = this.state;
    if (!this.checkRequiredFields()) {
      let articleALiquider = {
        "indicateurLiquidationManuelleRequise": (
          liquidationType == "manuelle" ||
          liquidationType == 'manuelleOffice' ||
          liquidationType == 'manuelleRedevanceAT') ? "true" : "false",
        "normalContext": articleEnCours.consignationIntegrale ? "false" : "true",
        "consignationContext": articleEnCours.consignationIntegrale ? "true" : "false",
        "refParametresLiquidation": {
          "indicateurConsignationIntegrale": articleEnCours.consignationIntegrale ? "true" : "false",
          "codeNomenclature": articleEnCours.codeNomenclature,
          "dateEffetLiquidation": articleEnCours.dateEffetLiquidation ? articleEnCours.dateEffetLiquidation : this.props.liquidationVO?.refObjetLiquidation?.dateEnregistrement,
          "designation": articleEnCours.designation,
          "indicateurFranchiseTotale": articleEnCours.franchiseTotale ? "true" : "false",
          "quantite": articleEnCours.quantite,
          "valeurTaxable": articleEnCours.valeurTaxable,
          "refUniteQuantite": articleEnCours.refUniteQuantite?.code
        }
      };


      var commande = "confirmerArticle";
      if (actionType == 'add') {
        articleALiquider.numArticle = this.getNumArticle(listeArticlesLiquides);
        // articleALiquider.refParametresLiquidation.refUniteQuantite = articleEnCours.unite;
        //En cas d'ajout d'un nouveau article en consignation intégrale,
        //avec opération simultanée inexistante Supprimer envoyé que refOpertionBase seulement sans refOperationLiquidation
        if (articleEnCours.consignationIntegrale) {
          if (liquidationVO.refOperationSimultanee && liquidationType != "manuelleOffice") {
            articleALiquider.refOperationLiquidation = liquidationVO.refOperationSimultanee.idOperation;
          }
        } else {
          articleALiquider.refOperationLiquidation = liquidationVO.idOperation;
        }
        articleALiquider.refOperationDeBase = liquidationVO.idOperation;

        console.log('----LIQ articleALiquider - add : ', JSON.stringify(articleALiquider));
        callRedux(this.props, {
          command: commande,
          typeService: 'UC',
          jsonVO: articleALiquider,
        });
      } else if (actionType == 'edit') {
        // articleALiquider.refParametresLiquidation.refUniteQuantite = articleEnCours.refUniteQuantite;
        articleALiquider.numArticle = selectedArticle.numArticle;

        if (selectedArticle.refArticleLiquideReference) {
          console.log("modifier consigner article cosnignation");
          commande = "confirmerConsignerArticle";
          articleALiquider.idArticleLiquideParOperation = selectedArticle.idArticleLiquideParOperation;
          articleALiquider.consignationContext = "false";
          articleALiquider.normalContext = "false";
          articleALiquider.refParametresLiquidation.idParameterLiquidation = selectedArticle.refParametresLiquidation.idParameterLiquidation;
          articleALiquider.refArticleLiquideReference = {
            idArticleLiquideParOperation: selectedArticle.refArticleLiquideReference.idArticleLiquideParOperation
          }
        } else {
          if (selectedArticle.liquidationFinsConsignation) {
            console.log("ajout d'un nouveau article en consignation");
            commande = "confirmerConsignerArticle";
            articleALiquider.consignationContext = "false";
            articleALiquider.normalContext = "false";
            articleALiquider.refArticleLiquideReference = {
              idArticleLiquideParOperation: selectedArticle.idArticleLiquideParOperation
            }
          } else {
            console.log("modification article normale");
            articleALiquider.idArticleLiquideParOperation = selectedArticle.idArticleLiquideParOperation;
            if (articleALiquider.refParametresLiquidation.indicateurConsignationIntegrale == "true") {
              if (liquidationVO.refOperationSimultanee) {
                articleALiquider.refOperationLiquidation = liquidationVO.refOperationSimultanee.idOperation;
              }
            } else {
              articleALiquider.refOperationLiquidation = liquidationVO.idOperation;
            }
            articleALiquider.refOperationDeBase = liquidationVO.idOperation;
          }
        }
        console.log('----LIQ articleALiquider - edit : ', JSON.stringify(articleALiquider));
        callRedux(this.props, {
          command: commande,
          typeService: 'UC',
          jsonVO: articleALiquider,
        });
      }
      if (!this.props.liquidationReducer.errorMessage) {
        this.setState({
          showRubriquesComptables: false,
        })
      } else {
        this.setState({
          showRubriquesComptables: true,
        })
      }
      // let listeTaxes = [...this.state.listeArticlesLiquides];
      // listeTaxes.push(articleALiquider);
      // this.setState({
      //   listeArticlesLiquides: listeTaxes
      // })

      console.log('----LIQ Action response  - ', JSON.stringify(this.props.liquidationReducer));
      // you should be change liquidation globale data
    }
  }

  deleteArticle = (item, index) => {
    Alert.alert(
      "Remove",
      "Are You sure you want to remove that?",
      [
        {
          text: "Yes",
          onPress: () => {
            let listeTaxes = [...this.state.listeArticlesLiquides];
            listeTaxes.splice(index, 1);
            this.setState({
              listeArticlesLiquides: listeTaxes
            })
            callRedux(
              this.props,
              {
                command: "supprimerArticle",
                typeService: 'UC',
                jsonVO: item,
              },
              null,
            );
            // callLiquidationUpdateRedux(
            //   this.props,
            //   {
            //     command: "supprimerArticle",
            //     typeService: 'UC',
            //     jsonVO: item,
            //   },
            // )
          },
        },
        { text: "No", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
      ]
    );
  }

  redirectToConsultationDUM(referenceDum, navigation) {
    let action = ConsulterDumAction.request(
      {
        type: GENERIC_REQUEST,
        value: {
          jsonVO: {
            reference: referenceDum,
            enregistre: true,
            identifiantOperateur: ComSessionService.getInstance().getOperateur()
          },
          // cle: 'F',
        },
        command: 'ded.ConsulterDum',
        fromArticles: true,
        fromLiquidation: true,
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };

  render() {
    const { liquidationVO, liquidationType } = this.props;
    console.log('liquidationType ======>', liquidationType +' ' + this.state.compteur++)
    const { listeArticlesLiquides, selectedArticle, libelleArticle, showRubriquesComptables } = this.state;
    return (
      <View>
        <Grid>
          <Row >
            <Col size={10} />
            <Col size={5}>
              <Button
                mode="contained"
                icon="check"
                compact="true"
                onPress={this.redirectToConsultationDUM.bind(this, this.props.liquidationVO?.refObjetLiquidation?.referenceObjetLiquidation, this.props.navigation)}
              >
                {translate('transverse.consulterArticlesFromLiquidation')}
              </Button>
            </Col>
            <Col size={1} />
          </Row>
        </Grid>
        {this.props.showProgress && <ComBadrProgressBarComp />}


        {this.state.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.state.errorMessage} />
        )}
        {this.props.liquidationReducer.errorMessage != null && (
          <ComBadrErrorMessageComp message={this.props.liquidationReducer?.errorMessage} />
        )}
        {this.props.liquidationReducer.messagesInfo != null && (
          <ComBadrInfoMessageComp message={this.props.liquidationReducer?.messagesInfo} />
        )}
        <ComBadrCardBoxComp noPadding={true}>
          {/* Bloc Liquidation Initiale Normale */}
          <ComAccordionComp
            title={translate('liq.articles.articlesMomentLiquidation.title')}>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <ComBadrLibelleComp withColor={true}>
                  {translate(
                    'liq.articles.articlesMomentLiquidation.nombreArticles',
                  )}
                </ComBadrLibelleComp>
                <ComBadrLibelleComp>
                  {'  '}
                  {
                    liquidationVO.refArticlesLiquides.length +
                    (liquidationVO.refOperationSimultanee ? liquidationVO.refOperationSimultanee.refArticlesLiquides.length : 0)
                  }
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>

                {(liquidationType == 'manuelle' || liquidationType == 'manuelleOffice' || liquidationType == 'manuelleRedevanceAT') ?
                  <Col size={0.4}>
                    <IconButton
                      icon="plus"
                      size={20}
                      color={'white'}
                      style={{ backgroundColor: primaryColor }}
                      onPress={() => {
                        this.setState({
                          actionType: 'add',
                          articleEnCours: {},
                          selectedArticle: {}
                        })
                        this.addRubriquesComptables()
                      }}
                    />
                  </Col>
                  :
                  <Col size={0.4} />
                }
                <Col size={0.6}>
                  <ComBadrLibelleComp withColor={true} style={{ textAlign: 'center' }}>
                    {translate('liq.articles.numeroArticle')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true} style={{ textAlign: 'center' }}>
                    {translate('liq.articles.codeNomenclature')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true} style={{ textAlign: 'center' }}>
                    {translate('liq.articles.valeurTaxableDH')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true} style={{ textAlign: 'center' }}>
                    {translate('liq.articles.quantite')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={0.6}>
                  <ComBadrLibelleComp withColor={true} style={{ textAlign: 'center' }}>
                    {translate('liq.articles.unite')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={0.6} />
                {(liquidationType == 'manuelle' || liquidationType == 'manuelleOffice' || liquidationType == 'manuelleRedevanceAT') && <Col size={0.4} />}
                {(liquidationType == 'manuelle' || liquidationType == 'manuelleOffice' || liquidationType == 'manuelleRedevanceAT') && <Col size={0.4} />}
              </Row>
              {_.orderBy(listeArticlesLiquides, 'numArticle', 'asc').map(
                (item, index) => (
                  <ItemArticles
                    item={item}
                    index={index}
                    deleteArticle={this.deleteArticle}
                    liquidationType={liquidationType}
                    showDetailArticle={this.showDetailArticle}
                  />),
              )}
              {showRubriquesComptables &&
                <Row style={{ ...CustomStyleSheet.whiteRow, alignItems: 'center', justifyContent: 'center' }}>
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
                </Row>
              }
              {(liquidationType == 'automatique' || liquidationType == 'automatiqueRedevanceAT') && !_.isEmpty(selectedArticle) && (
                <View>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.codeNomenclature')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {
                          selectedArticle.refParametresLiquidation
                            .codeNomenclature
                        }
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.designation')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation.designation}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.valeurTaxableDH')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation.valeurTaxable}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>

                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.quantite')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation.quantite}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.unite')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {selectedArticle.refParametresLiquidation
                          .refUniteQuantiteDesc +
                          '(' +
                          selectedArticle.refParametresLiquidation
                            .refUniteQuantite +
                          ')'}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.dateEffetLiquidation')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {
                          selectedArticle.refParametresLiquidation
                            .dateEffetLiquidation
                        }
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2} />
                  </Row>
                </View>
              )}
            </Grid>
          </ComAccordionComp>
        </ComBadrCardBoxComp>

        {showRubriquesComptables &&
          <ComBadrCardBoxComp>
            <Grid>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Checkbox
                  color={'#009ab2'}
                  status={this.state.articleEnCours.franchiseTotale ? 'checked' : 'unchecked'}
                  disabled={false}
                  onPress={() =>
                    this.setState({
                      articleEnCours: {
                        ...this.state.articleEnCours,
                        franchiseTotale: !this.state.articleEnCours.franchiseTotale,
                      },
                    })
                  }
                />
                <ComBadrLibelleComp>
                  {translate('liq.articles.franchiseTotale')}
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Checkbox
                  color={'#009ab2'}
                  status={this.state.articleEnCours.consignationIntegrale ? 'checked' : 'unchecked'}
                  disabled={false}
                  onPress={() =>
                    this.setState({
                      articleEnCours: {
                        ...this.state.articleEnCours,
                        consignationIntegrale: !this.state.articleEnCours.consignationIntegrale,
                      },
                    })
                  }
                />
                <ComBadrLibelleComp>
                  {translate('liq.articles.consignationIntegrale')}
                </ComBadrLibelleComp>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.codeNomenclature')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <TextInput
                    label=""
                    type="flat"
                    disabled={false}
                    style={{
                      height: 50,
                      borderRadius: 2,
                      borderWidth: 0.2,
                      borderColor: '#009ab2',
                      backgroundColor: '#d9dfe0',
                    }}
                    value={this.state.articleEnCours.codeNomenclature}
                    onChangeText={(text) => {
                      this.setState({
                        articleEnCours: {
                          ...this.state.articleEnCours,
                          codeNomenclature: text,
                        },
                      });
                    }}
                  />
                </Col>
                <Col size={1} />
                <Col size={1} />
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.designation')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={3}>
                  <TextInput
                    label=""
                    type="flat"
                    disabled={false}
                    style={{
                      height: 50,
                      borderRadius: 2,
                      borderWidth: 0.2,
                      borderColor: '#009ab2',
                      backgroundColor: '#d9dfe0',
                    }}
                    value={this.state.articleEnCours.designation}
                    onChangeText={(text) => {
                      this.setState({
                        articleEnCours: {
                          ...this.state.articleEnCours,
                          designation: text,
                        },
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.valeurTaxableDH')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <TextInput
                    label=""
                    type="flat"
                    disabled={false}
                    keyboardType={'number-pad'}
                    style={{
                      height: 50,
                      borderRadius: 2,
                      borderWidth: 0.2,
                      borderColor: '#009ab2',
                      backgroundColor: '#d9dfe0',
                    }}
                    value={this.state.articleEnCours.valeurTaxable}
                    onChangeText={(text) => {
                      this.setState({
                        articleEnCours: {
                          ...this.state.articleEnCours,
                          valeurTaxable: text,
                        },
                      });
                    }}
                  />
                </Col>
                <Col size={1} />
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.quantite')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <TextInput
                    label=""
                    type="flat"
                    disabled={false}
                    keyboardType={'number-pad'}
                    style={{
                      height: 50,
                      borderRadius: 2,
                      borderWidth: 0.2,
                      borderColor: '#009ab2',
                      backgroundColor: '#d9dfe0',
                    }}
                    value={this.state.articleEnCours.quantite}
                    onChangeText={(text) => {
                      this.setState({
                        articleEnCours: {
                          ...this.state.articleEnCours,
                          quantite: text,
                        },
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1} style={{ alignItems: 'center' }}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.unite')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrAutoCompleteChipsComp
                    onRef={(ref) => (this.state.articleEnCours.refUniteQuantite = ref)}
                    code="code"
                    selected={this.state.articleEnCours?.refUniteQuantite}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbUniteQuantite"
                    paramName="libelleUniteQuantite"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={(item) => {
                      this.setState({
                        articleEnCours: {
                          ...this.state.articleEnCours,
                          refUniteQuantite: item,
                        },
                      })
                    }
                    }
                  />

                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('liq.articles.dateEffetLiquidation')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={3}>
                  <ComBadrDatePickerComp
                    dateFormat="DD/MM/YYYY"
                    value={this.state.articleEnCours.dateEffetLiquidation ? moment(this.state.articleEnCours.dateEffetLiquidation, 'DD/MM/YYYY', true) : moment(this.state.dateEnregistrement, 'DD/MM/YYYY', true)}
                    onDateChanged={(date) => this.setState(prevState => ({
                      articleEnCours: {
                        ...prevState.articleEnCours,
                        dateEffetLiquidation: date,
                      }
                    }))}

                    inputStyle={styles.dateInputStyle}
                  />
                </Col>
              </Row>
              <View style={styles.ComContainerCompBtn}>
                <Button
                  onPress={this.confirmerArticle}
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
        }

        {!_.isEmpty(selectedArticle) && (
          <ComBadrCardBoxComp noPadding={true}>
            {/* Bloc Liquidation Initiale Normale */}
            <ComAccordionComp
              title={translate('liq.articles.detailsLiquidation')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={2} />
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('liq.articles.liquidationArticleNumero', {
                        numArticle: selectedArticle.numArticle,
                      })}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                {libelleArticle === 'M' && (
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={2} />
                    <Col>
                      <ComBadrLibelleComp
                        withColor={true}
                        style={{
                          fontWeight: 'bold',
                          textDecorationLine: 'underline',
                        }}>
                        {translate('liq.liquidationManuelleRequise')}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                )}

                {libelleArticle.toLowerCase().includes('consignation') && (
                  <LiqArticleDetailsLiqBlock
                    articles={_.orderBy(
                      selectedArticle.refLignesRubriqueBaseLiquidation,
                      'refRubriqueComptableCode',
                      'asc',
                    )}
                    total={selectedArticle.montantLiquide}
                    titre={translate('liq.articles.baseConsignation')}
                  />
                )}

                <LiqArticleDetailsLiqBlock
                  articles={_.orderBy(
                    selectedArticle.refArticleLiquideReference
                      ? selectedArticle.refArticleLiquideReference
                        .refLignesRubriqueBaseLiquidation
                      : selectedArticle.refLignesRubriqueBaseLiquidation,
                    'refRubriqueComptableCode',
                    'asc',
                  )}
                  total={ selectedArticle.refArticleLiquideReference?
                    selectedArticle.refArticleLiquideReference.montantLiquide:
                    selectedArticle.montantLiquide}
                  titre={translate('liq.articles.baseActuelleLiquidationNormale')}
                />

                {libelleArticle.toLowerCase().includes('consignation') && (
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={2} />
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('liq.articles.totalConsignationArticleDH')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {': '}
                        {Numeral(selectedArticle.montantConsigne).format('0.00')}
                      </ComBadrLibelleComp>
                    </Col>

                  </Row>
                )}


                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <LiqArticleDetailsLiqLegendeLBlock
                      article={selectedArticle}
                    />
                  </Col>
                  <Col />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>
        )}
      </View>
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
    // marginRight: 15,
  },
  btnQuitter: {
    padding: 5,
    color: '#FFF',
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

export default connect(
  mapStateToProps,
  null,
)(LiqRecapitulationLiqNormaleInitialeBlock);
