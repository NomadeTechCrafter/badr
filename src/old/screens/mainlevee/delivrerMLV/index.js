import React, {Component} from 'react';
import {View, Dimensions, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';

import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBadrListComp,
  ComBadrLibelleComp,
  ComBadrNumericTextInputComp,
  ComBadrPopupComp,
  ComBasicDataTableComp,
  ComBadrDualListBoxComp,
} from '../../../../commons/component';
import {
  Checkbox,
  TextInput,
  Text,
  RadioButton,
  Paragraph,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/mainLevee/delivrerMLV';
import * as DelivrerMLVAction from '../../../redux/actions/mainLevee/delivrerMLV';
import style from '../../../../modules/controle/controleApresScanner/style/ctrlControleApresScannerStyle';

const RECONNU = 'reconnu';
const DEMANDE_CONSIGNATION = 'demandeConsignation';

class DelivrerMLV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      checked: false,
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      declaration: props.route.params.declarationRI,
      delivrerMainleveeVO: props.route.params.declarationRI,
      typeRegime: translate('controle.regimeInterne'),
      decisionControle: props.route.params.declarationRI.decisionControle,
      observation: props.route.params.declarationRI.observation,
      sousReservePaiementMLV: props.route.params.sousReservePaiementMLV,
      numeroVersionCourante: 0,
      isConsultation: false,
      compteRendu: '',
      generateurNumScelleAu: '',
      generateurNumScelleDu: '',
      messagesErreur: [],
      listeNombreDeScelles: [],
      messageVisibility: false,
      message: '',
      messageType: '',
      selectedItemListScelle: '',
      includeScelles: false,
    };
    this.numeroScelle = '';

    let conteneurs = [];
    for (let i = 0; i < this.state.delivrerMainleveeVO.conteneurs.length; i++) {
      var conteneur = this.state.delivrerMainleveeVO.conteneurs[i];
      conteneurs.push({
        "code": i,
        "libelle": conteneur,
        "actif": false,
        "disabled": false
      });
    }

    let conteneursCibles = [];
    for (let j = conteneurs.length; j < conteneurs.length + this.state.delivrerMainleveeVO.conteneursCibles.length; j++) {
      var conteneurCible = this.state.delivrerMainleveeVO.conteneursCibles[j - conteneurs.length];
      conteneursCibles.push({
        "code": j,
        "libelle": conteneurCible,
        "actif": false,
        "disabled": true
      });
    }

    this.state.conteneurs = conteneurs;
    this.state.conteneursCibles = conteneursCibles;
  }

  componentDidMount() {
    console.log('componentDidMount DelivrerMLV:');
    load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
  }
  // init documentAnnexeResultVOItem JSON field for action save/validate
  initDocumentJSONField = () => {
    let documentAnnexeResultVO = [];
    let documentAnnexeResultVOItem = {};
    for (var doc of this.state.declaration.documentAnnexeResultVOs) {
      documentAnnexeResultVOItem = {};
      documentAnnexeResultVOItem.id = doc.documentAnnexe.identifiant;
      documentAnnexeResultVOItem.decisionMCI = doc.decisionMCI;
      documentAnnexeResultVOItem.reconnu = doc.documentAnnexe.reconnu;
      documentAnnexeResultVOItem.consigne =
        doc.documentAnnexe.demandeConsignation;

      documentAnnexeResultVO.push(documentAnnexeResultVOItem);
    }
    return documentAnnexeResultVO;
  };
  validerMainLevee = () => {
    var data = this.state.delivrerMainleveeVO;
    var action = DelivrerMLVAction.validerMLV(
      {
        type: Constants.DELIVRERMLV_VALIDERMLV_REQUEST,
        value: {
          data: data,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };

  showMessages = (type, message) => {
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState({
      messageVisibility: true,
      message: message,
      messageType: type,
    });
  };

  onCloseMessagesPressed = () => {
    this.setState({
      messageVisibility: false,
      message: '',
      messageType: '',
    });
  };
  /* genererCompteRendu = () => {
    var data = {
      idDed: this.state.declaration.idDed,
      //numeroVersionBase: this.state.numeroVersionCourante,
      //numeroVersionCourante: this.state.numeroVersionCourante,
    };
    var action = RegimeInterneAction.genererCR(
      {
        type: Constants.REGIMEINTERNE_VALIDATESAVE_REQUEST,
        value: {
          login: this.state.login,
          data: data,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
  };*/

  //toggleChoice for field RECONNU && DEMANDE_CONSIGNATION
  toggleChoiceInList = (indexDocument, key) => {
    let listDoc = this.state.declaration.documentAnnexeResultVOs;
    if (listDoc[indexDocument].documentAnnexe[key]) {
      listDoc[indexDocument].documentAnnexe[key] = false;
    } else {
      listDoc[indexDocument].documentAnnexe[key] = true;
      var otherKey = key === RECONNU ? DEMANDE_CONSIGNATION : RECONNU;
      listDoc[indexDocument].documentAnnexe[otherKey] = false;
    }
    return listDoc;
  };
  setChoiceDocAnnexe = (indexDocument, key) => {
    this.setState((prevState) => ({
      declaration: {
        ...prevState.declaration,
        documentAnnexeResultVOs: this.toggleChoiceInList(indexDocument, key),
      },
    }));
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.reponseData &&
      props.reponseData.historiqueCompte &&
      props.reponseData.historiqueCompte !== state.declaration.historiqueCompte
    ) {
      return {
        declaration: {
          // object that we want to update
          ...state.declaration, // keep all other key-value pairs
          historiqueCompte: props.reponseData.historiqueCompte, // update the value of specific key
        },
        isConsultation: true,
      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  genererNumeroScelle = () => {
    var {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    if (generateurNumScelleDu && generateurNumScelleAu) {
      if (
        generateurNumScelleDu.length === 8 &&
        generateurNumScelleAu.length === 8
      ) {
        var du = Number(generateurNumScelleDu);
        var au = Number(generateurNumScelleAu);
        if (au > du) {
          if (au - du <= 100) {
            //$scope.listeNombreDeScelles = $scope.listeNombreDeScelles ? $scope.listeNombreDeScelles : [];
            var nbScelle = du;

            for (var i = du; i <= au; i++) {
              listeNombreDeScelles.push(('00000000' + nbScelle).slice(-8));
              this.setState({listeNombreDeScelles: listeNombreDeScelles});
              nbScelle += 1;
            }
            this.setState({
              generateurNumScelleDu: '',
              generateurNumScelleAu: '',
            });
            this.generateurNumScelleDu.clear();
            this.generateurNumScelleAu.clear();
          } else {
            this.showMessages('warn', translate('errors.maxNombreScelle'));
          }
        } else {
          this.showMessages('warn', translate('errors.numScelleInferieur'));
        }
      } else {
        this.showMessages('warn', translate('errors.numScelleLongueur'));
      }
    }
  };

  addNumeroScelle = () => {
    var {listeNombreDeScelles} = this.state;
    let numeroScelle = this.numeroScelle;
    if (numeroScelle) {
      if (numeroScelle.length === 8) {
        if (listeNombreDeScelles.length < 100) {
          if (_.indexOf(listeNombreDeScelles, numeroScelle) === -1) {
            listeNombreDeScelles.push(numeroScelle);
            this.setState({
              listeNombreDeScelles: listeNombreDeScelles,
            });
            this.numeroScelleInput.clear();
          } else {
            this.showMessages('warn', translate('errors.numScelleExisteDeja'));
          }
        } else {
          this.showMessages('warn', translate('errors.maxNombreScelle'));
        }
      } else {
        this.showMessages('warn', translate('errors.numScelleLongueur'));
      }
    }
  };

  deleteNumeroScelle = () => {
    var {selectedItemListScelle, listeNombreDeScelles} = this.state;
    if (
      selectedItemListScelle !== '' &&
      listeNombreDeScelles[selectedItemListScelle]
    ) {
      listeNombreDeScelles.splice(selectedItemListScelle, 1);
      this.setState({
        listeNombreDeScelles: listeNombreDeScelles,
      });
    }
  };

  buildD17D20TableColumns = () => {
    return [
      {
        code: 'referenceEnregistrement',
        libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.reference'),
        width: 290,
      },
      {
        code: 'dateCreation',
        libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.dateCreation'),
        width: 290,
      },
      {
        code: 'numeroVersionCourante',
        libelle: translate('mainlevee.delivrerMainlevee.listeD17D20.numeroVersion'),
        width: 290,
      },
    ];
  };

  buildApurementD17D20TableColumns = () => {
    return [
      {
        code: 'referenceEnregistrement',
        libelle: translate('mainlevee.delivrerMainlevee.listeDeclarationsApurementD17D20.reference'),
        width: 290,
      },
      {
        code: 'dateCreation',
        libelle: translate('mainlevee.delivrerMainlevee.listeDeclarationsApurementD17D20.dateCreation'),
        width: 290,
      },
      {
        code: 'numeroVersionCourante',
        libelle: translate('mainlevee.delivrerMainlevee.listeDeclarationsApurementD17D20.numeroVersion'),
        width: 290,
      },
    ];
  };

  renderBoxItem = ({item}) => {
    const itemStyle = item === this.state.selectedScelle ? styles.selectedBoxItem : styles.boxItem;
    const itemTextStyle = item === this.state.selectedScelle ? styles.selectedBoxItemText : styles.boxItemText;

    return (
        <View style={itemStyle}>
          <TouchableOpacity disabled={this.state.isConsultation}
                            onPress={() => this.setState({
                              ...this.state,
                              selectedScelle: item,
                            })}>
            <Text style={itemTextStyle}>{item}</Text>
          </TouchableOpacity>
        </View>
    );
  };

  render() {
    const {
      delivrerMainleveeVO,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('mainlevee.title')}
          subtitle={translate('mainlevee.delivrerMainlevee.title')}
          icon="menu"
        />
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.showProgress && <ComBadrProgressBarComp />}
          <ComBadrPopupComp
            message={this.state.message}
            type={this.state.messageType}
            visible={this.state.messageVisibility}
            onClosePressed={this.onCloseMessagesPressed}
          />
          {this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.successMessage != null && (
            <ComBadrInfoMessageComp message={this.props.successMessage} />
          )}
          {/* Référence déclaration */}
          <ComBadrCardBoxComp noPadding={true}>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.bureau')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.regime')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.annee')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.serie')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.cle')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.nVoyage')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('mainlevee.refDroitTaxGaran')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  {delivrerMainleveeVO.liquidation === 'non' ? (
                    <ComBadrLibelleComp withColor={true}>
                      {delivrerMainleveeVO.liquidation}
                    </ComBadrLibelleComp>
                  ) : (
                    <Button mode="text">
                      {delivrerMainleveeVO.liquidation}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={false}>
                    {this.state.refDeclaration.slice(0, 3)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={false}>
                    {this.state.refDeclaration.slice(3, 6)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={false}>
                    {this.state.refDeclaration.slice(6, 10)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={false}>
                    {this.state.refDeclaration.slice(10, 17)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={false}>{this.state.cle}</ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={false}>{this.state.numeroVoyage}</ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('mainlevee.refPaiementAmend')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={false}>
                    {delivrerMainleveeVO.paiement}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={10} />
                <Col size={4}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('mainlevee.mainleveeSousReservePaiement')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2} />
              </Row>
            </Grid>
          </ComBadrCardBoxComp>

          <View style={styles.flexDirectionRow}>
            <Text style={styles.libelleL}>
              {translate('mainlevee.delivrerMainlevee.secondTitle')}
            </Text>
          </View>

          {/* Annotations */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.annotations.title',
              )}>
              <Row style={CustomStyleSheet.whiteRow}>
                <ComBadrLibelleComp withColor={false}>
                  {delivrerMainleveeVO.annotationsControle}
                </ComBadrLibelleComp>
              </Row>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Liste des Docs exigibles */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.listeDocumentsExigibles.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.documentAnnexe',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.portee',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.numArticle',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.reconnu',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.dConsignation',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.laisserPasser',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.decisionOrganismeControle',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>

                {delivrerMainleveeVO.listeDocsExigibles &&
                  delivrerMainleveeVO.listeDocsExigibles.map((item, index) => (
                    <Row
                      key={index}
                      style={
                        index % 2 === 0
                          ? CustomStyleSheet.lightBlueRow
                          : CustomStyleSheet.whiteRow
                      }>
                      <Col size={3}>
                        <ComBadrLibelleComp withColor={false}>{item.docAnnexe}</ComBadrLibelleComp>
                      </Col>
                      <Col size={1}>
                        <ComBadrLibelleComp withColor={false}>{item.portee}</ComBadrLibelleComp>
                      </Col>
                      <Col size={1}>
                        <ComBadrLibelleComp withColor={false}>{item.narticle}</ComBadrLibelleComp>
                      </Col>
                      <Col size={1}>
                        <Checkbox
                          color={primaryColor}
                          status={item.reconnu ? 'checked' : 'unchecked'}
                          disabled={this.state.isConsultation}
                          onPress={() => {
                            this.setChoiceDocAnnexe(index, RECONNU);
                          }}
                        />
                      </Col>
                      <Col size={1}>
                        <Checkbox
                          color={primaryColor}
                          status={item.dconsignation ? 'checked' : 'unchecked'}
                          disabled={this.state.isConsultation}
                          onPress={() => {
                            this.setChoiceDocAnnexe(
                              index,
                              DEMANDE_CONSIGNATION,
                            );
                          }}
                        />
                      </Col>
                      <Col size={1}>
                        <Checkbox
                          color={primaryColor}
                          status={item.laisserPasser ? 'checked' : 'unchecked'}
                          disabled={this.state.isConsultation}
                          onPress={() => {
                            this.setChoiceDocAnnexe(
                              index,
                              DEMANDE_CONSIGNATION,
                            );
                          }}
                        />
                      </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp withColor={false}>
                          {item.decisionOrgControle}
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                  ))}
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Redressement opéré */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.redressementOperes.title',
              )}>
              <Row style={CustomStyleSheet.whiteRow}>
                <Text>{delivrerMainleveeVO.redressementsOperes}</Text>
              </Row>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Motivations */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.motivations.title',
              )}>
              <Row style={CustomStyleSheet.whiteRow}>
                <Text style={styles.libelleM}>
                  {delivrerMainleveeVO.motifForcerMLV}
                </Text>
              </Row>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Décision */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate('mainlevee.delivrerMainlevee.decision.title')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <View
                      pointerEvents={
                        this.state.isConsultation ? 'none' : 'auto'
                      }>
                      <RadioButton.Group
                        onValueChange={(value) =>
                          this.setState({decisionControle: value})
                        }
                        value={this.state.decisionControle}>
                        <View style={styles.decisionContainerRB}>
                          <Text style={styles.textRadio}>
                            {translate(
                              'mainlevee.delivrerMainlevee.decision.redressementAvecContentieux',
                            )}
                          </Text>
                          <RadioButton
                            color={styles.textRadio.color}
                            value="contencieux"
                          />
                        </View>
                        <View style={styles.decisionContainerRB}>
                          <Text style={styles.textRadio}>
                            {translate(
                              'mainlevee.delivrerMainlevee.decision.redressementSansContentieux',
                            )}
                          </Text>
                          <RadioButton
                            color={styles.textRadio.color}
                            value="sansContencieux"
                          />
                        </View>
                      </RadioButton.Group>
                    </View>
                  </Col>
                  <Col size={1} style={styles.checkboxCol}>
                    <Checkbox
                      color={primaryColor}
                      status={
                        delivrerMainleveeVO.suggererVisite
                          ? 'checked'
                          : 'unchecked'
                      }
                      disabled={this.state.isConsultation}
                      onPress={() => {
                        this.setChoiceDocAnnexe(DEMANDE_CONSIGNATION);
                      }}
                    />
                    <Text>
                      {translate(
                        'mainlevee.delivrerMainlevee.decision.suggererVisitePhysique',
                      )}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Constation de la marchandise */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.constationMarchandise.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.constationMarchandise.numeroBulletinReception',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={false}>
                      {delivrerMainleveeVO.numeroBulletinReception}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'mainlevee.delivrerMainlevee.constationMarchandise.etatChargement',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={false}>
                      {delivrerMainleveeVO.etatChargement}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Annotations Avec Pesage */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.annotations.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <TextInput
                      value={delivrerMainleveeVO.annotations}
                      multiline={true}
                      numberOfLines={6}
                      onChangeText={(text) =>
                        this.setState({observation: text})
                      }
                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <TouchableRipple
                    onPress={() => {
                      this.setState({
                        sousReservePaiementMLV: !this.state
                          .sousReservePaiementMLV,
                      });
                    }}>
                    <View style={styles.containerCheckbox}>
                      <View pointerEvents="none">
                        <Checkbox
                          color={primaryColor}
                          status={
                            delivrerMainleveeVO.avecPesage
                              ? 'checked'
                              : 'unchecked'
                          }
                        />
                      </View>
                      <Paragraph>
                        {translate(
                          'mainlevee.delivrerMainlevee.annotations.avecPesage',
                        )}
                      </Paragraph>
                    </View>
                  </TouchableRipple>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Informations ECOR */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.informationsEcor.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={30}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('mainlevee.delivrerMainlevee.informationsEcor.scellesConfirmationEntree',)}
                    </ComBadrLibelleComp>
                  </Col>

                  <Col size={70} style={styles.boxContainer}>
                    <SafeAreaView style={styles.boxSafeArea}>
                      {(delivrerMainleveeVO.scellesConfirmationEntree == null || delivrerMainleveeVO.scellesConfirmationEntree.size === 0) && (
                          <Text style={styles.boxItemText}>Aucun élément</Text>
                      )}

                      {(delivrerMainleveeVO.scellesConfirmationEntree != null && delivrerMainleveeVO.scellesConfirmationEntree.size !== 0) && (
                          <FlatList
                              data={Object.values(delivrerMainleveeVO.scellesConfirmationEntree)}
                              renderItem={(item) => this.renderBoxItem(item)}
                              keyExtractor={item => item}
                              nestedScrollEnabled={true}
                          />
                      )}
                    </SafeAreaView>
                  </Col>
                </Row>

                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={30}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('mainlevee.delivrerMainlevee.informationsEcor.nouveauxScelles',)}
                    </ComBadrLibelleComp>
                  </Col>

                  <Col size={3}>
                    <RadioButton
                        value={this.state.includeScelles === true ? 'true' : 'false'}
                        status={this.state.includeScelles === true ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({
                          ...this.state,
                          includeScelles: true,
                        })}/>
                  </Col>

                  <Col size={10} style={style.labelContainer}>
                    <Text style={style.labelTextStyle}>
                      {translate('mainlevee.delivrerMainlevee.informationsEcor.oui')}
                    </Text>
                  </Col>

                  <Col size={3}>
                    <RadioButton
                        value={this.state.includeScelles === false ? 'true' : 'false'}
                        status={this.state.includeScelles === false ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({
                          ...this.state,
                          includeScelles: false,
                        })}/>
                  </Col>

                  <Col size={10} style={style.labelContainer}>
                    <Text style={style.labelTextStyle}>
                      {translate('mainlevee.delivrerMainlevee.informationsEcor.non')}
                    </Text>
                  </Col>

                  <Col size={40}/>
                </Row>

                {this.state.includeScelles && (
                    <View>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={1}>
                          <TextInput
                              mode={'outlined'}
                              maxLength={8}
                              value={delivrerMainleveeVO.numeroPince}
                              label={translate(
                                  'mainlevee.delivrerMainlevee.informationsEcor.numeroPince',
                              )}
                              style={CustomStyleSheet.badrInputHeight}
                              onChangeText={(text) =>
                                  this.setState({
                                    delivrerMainleveeVO: {
                                      ...this.state.delivrerMainleveeVO,
                                      numeroPince: text,
                                    },
                                  })
                              }
                          />
                        </Col>
                        <Col size={1} />
                        <Col size={1}>
                          <ComBadrNumericTextInputComp
                              maxLength={8}
                              value={delivrerMainleveeVO.nombreDeScelles}
                              label={translate(
                                  'mainlevee.delivrerMainlevee.informationsEcor.nombreScelles',
                              )}
                              onChangeBadrInput={(text) =>
                                  this.setState({
                                    delivrerMainleveeVO: {
                                      ...this.state.delivrerMainleveeVO,
                                      nombreDeScelles: text,
                                    },
                                  })
                              }
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={5}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                                'mainlevee.delivrerMainlevee.informationsEcor.generateurScelle',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrNumericTextInputComp
                              onRef={(input) => {
                                this.generateurNumScelleDu = input;
                              }}
                              maxLength={8}
                              value={this.state.generateurNumScelleDu}
                              label={translate('transverse.du')}
                              onChangeBadrInput={(text) =>
                                  this.setState({
                                    generateurNumScelleDu: text,
                                  })
                              }
                          />
                        </Col>
                        <Col size={1} />
                        <Col size={2}>
                          <ComBadrNumericTextInputComp
                              onRef={(input) => {
                                this.generateurNumScelleAu = input;
                              }}
                              maxLength={8}
                              value={generateurNumScelleAu}
                              label={translate('transverse.au')}
                              onChangeBadrInput={(text) =>
                                  this.setState({
                                    generateurNumScelleAu: text,
                                  })
                              }
                          />
                        </Col>
                        <Col size={2} />
                        <Col size={1}>
                          <Button
                              mode="contained"
                              compact="true"
                              onPress={this.genererNumeroScelle}>
                            {translate('transverse.Ok')}
                          </Button>
                        </Col>
                        <Col size={2} />
                      </Row>
                      <Row
                          style={[CustomStyleSheet.whiteRow, styles.rowListNumScelle]}>
                        <Col size={5}>
                          <ComBadrNumericTextInputComp
                              onRef={(input) => {
                                this.numeroScelleInput = input;
                              }}
                              maxLength={8}
                              value={this.numeroScelle}
                              label={translate(
                                  'mainlevee.delivrerMainlevee.informationsEcor.numeroScelle',
                              )}
                              onChangeBadrInput={(text) => {
                                this.numeroScelle = text;
                              }}
                          />
                        </Col>
                        <Col size={2} />

                        <Col size={1}>
                          <Button
                              onPress={this.addNumeroScelle}
                              icon="plus-box"
                              mode="contained"
                              compact="true"
                          />
                          <Button
                              onPress={this.deleteNumeroScelle}
                              icon="delete"
                              mode="contained"
                              compact="true"
                          />
                        </Col>
                        <Col size={2} />
                        <Col size={5}>
                          <ComBadrListComp
                              data={listeNombreDeScelles}
                              onPressListItem={(index) =>
                                  this.setState({selectedItemListScelle: index})
                              }
                          />
                        </Col>
                      </Row>
                    </View>
                )}
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Dédouanement sur remorque */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate(
                'mainlevee.delivrerMainlevee.dedouanementRemorque.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      value={delivrerMainleveeVO.numeroCarnetTIR}
                      label={translate(
                        'mainlevee.delivrerMainlevee.dedouanementRemorque.carnetTir',
                      )}
                      style={CustomStyleSheet.badrInputHeight}
                      onChangeText={(text) =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            numeroCarnetTIR: text,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col size={1} />
                  <Col size={1}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      keyboardType={'number-pad'}
                      value={delivrerMainleveeVO.numeroCarnetATA}
                      label={translate(
                        'mainlevee.delivrerMainlevee.dedouanementRemorque.carnetAta',
                      )}
                      onChangeText={(text) =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            numeroCarnetATA: text,
                          },
                        })
                      }
                      style={CustomStyleSheet.badrInputHeight}
                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={1}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      value={delivrerMainleveeVO.dechargeAcquitAcaution}
                      label={translate(
                        'mainlevee.delivrerMainlevee.dedouanementRemorque.dechargeAquitCaution',
                      )}
                      style={CustomStyleSheet.badrInputHeight}
                      onChangeText={(text) =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            dechargeAcquitAcaution: text,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col size={2} />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Transit */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
              title={translate('mainlevee.delivrerMainlevee.transit.title')}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={1}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      value={delivrerMainleveeVO.delaiAcheminement}
                      label={
                        translate(
                          'mainlevee.delivrerMainlevee.transit.delaiAcheminement',
                        ) + ' (h)'
                      }
                      style={CustomStyleSheet.badrInputHeight}
                      onChangeText={(text) =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            delaiAcheminement: text,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col size={2} />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Conteneurs */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
                title={translate('mainlevee.delivrerMainlevee.conteneurs.title')}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow} size={100}>
                  <Col size={30}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('mainlevee.delivrerMainlevee.conteneurs.conteneursCibles',)}
                    </ComBadrLibelleComp>
                  </Col>

                  <Col size={70}>
                    <ComBadrDualListBoxComp
                        style={style.dualListContainer}
                        available={this.state.conteneurs}
                        selected={this.state.conteneursCibles}
                        readonly={this.state.isConsultation}
                    />
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Liste des D17/D20 */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
                title={translate('mainlevee.delivrerMainlevee.listeD17D20.title')}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow} size={100}>
                  <Col size={100}>
                    <ComBasicDataTableComp
                        onRef={(ref) => (this.d17d20Table = ref)}
                        id="d17d20Table"
                        hasId={false}
                        rows={delivrerMainleveeVO.declarationsTryptique ? delivrerMainleveeVO.declarationsTryptique : []}
                        cols={this.buildD17D20TableColumns()}
                        totalElements={delivrerMainleveeVO.declarationsTryptique ? delivrerMainleveeVO.declarationsTryptique.length : 0}
                        maxResultsPerPage={5}
                        paginate={true}
                    />
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Liste des déclarations d'apurement D17/D20 */}
          <ComBadrCardBoxComp noPadding={true}>
            <ComAccordionComp
                title={translate('mainlevee.delivrerMainlevee.listeDeclarationsApurementD17D20.title')}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow} size={100}>
                  <Col size={100}>
                    <ComBasicDataTableComp
                        onRef={(ref) => (this.apurementd17d20Table = ref)}
                        id="apurementd17d20Table"
                        hasId={false}
                        rows={delivrerMainleveeVO.declarationsApurementTryptique ? delivrerMainleveeVO.declarationsApurementTryptique : []}
                        cols={this.buildApurementD17D20TableColumns()}
                        totalElements={delivrerMainleveeVO.declarationsApurementTryptique ? delivrerMainleveeVO.declarationsApurementTryptique.length : 0}
                        maxResultsPerPage={5}
                        paginate={true}
                    />
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Actions */}
          <View
            style={styles.containerActionBtn}
            pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('sauvegarderRI');
              }}
              text={translate('mainlevee.validerMainlevee')}
              disabled={this.state.decisionControle ? false : true}
            />
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('validerRI');
              }}
              text={translate('mainlevee.delivrerMainlevee.title')}
              disabled={this.state.decisionControle ? false : true}
            />
          </View>
        </ComContainerComp>
      </View>
    );
  }
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libelleS: {
    ...libelle,
    flex: 1,
  },
  libelleM: {
    ...libelle,
    flex: 2,
  },
  libelleL: {
    ...libelle,
    flex: 3,
  },
  decisionContainerRB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: primaryColor,
    padding: 8,
    width: 300,
  },
  checkboxCol: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  textRadio: {
    color: '#FFF',
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: 200,
  },
  rowListNumScelle: {
    height: 170,
  },
  boxContainer: {
    backgroundColor: '#ebecf3',
    borderRadius: 4,
  },
  boxSafeArea: {
    margin: '5%',
    height: 200,
    borderRadius: 4,
  },
  boxItem: {
    backgroundColor: '#ffffff',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  boxItemText: {
    paddingLeft: '4%',
    color: '#000000',
  },
  selectedBoxItem: {
    backgroundColor: '#009ab2',
    marginVertical: 2,
    height: 32,
    borderRadius: 4,
    justifyContent: 'center',
  },
  selectedBoxItemText: {
    paddingLeft: '4%',
    color: '#ffffff',
  },
  dualListContainer: {
    borderRadius: 10,
    width: '50%',
    paddingBottom: 30,
  },
};

const mapStateToProps = (state) => ({...state.delivrerMLVReducer});

export default connect(mapStateToProps, null)(DelivrerMLV);
