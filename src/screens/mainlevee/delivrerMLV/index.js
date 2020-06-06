import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

import {
  Container,
  CardBox,
  Accordion,
  BadrButton,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrProgressBar,
  Toolbar,
  BadrList,
  BadrLibelleBleu,
  BadrLibelleNoir,
} from '../../../components';
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
import {translate} from '../../../common/translations/i18n';
import {CustomStyleSheet, primaryColor} from '../../../styles';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/controle/regimeInterne';
import * as RegimeInterneAction from '../../../redux/actions/controle/regimeInterne';

const screenHeight = Dimensions.get('window').height;
const RECONNU = 'reconnu';
const DEMANDE_CONSIGNATION = 'demandeConsignation';

class DelivrerMLV extends Component {
  // init documentAnnexeResultVOItem JSON field for action save/validate
  initDocumentJSONField = () => {
    let documentAnnexeResultVO = [];
    let documentAnnexeResultVOItem = {};
    for (let doc of this.state.declaration.documentAnnexeResultVOs) {
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
  sauvgarderValider = commande => {
    console.log('sauvgarderValider');
    var data = {
      idControle: this.state.declaration.idControle,
      idDed: this.state.declaration.idDed,
      referenceDed: this.state.refDeclaration,
      documentAnnexeResultVO: this.initDocumentJSONField(),
      observation: this.state.observation,
      decisions: this.state.decisionControle,
      numeroVersionCourante: this.state.numeroVersionCourante,
    };
    console.log('data----', data);
    var action = RegimeInterneAction.validateSave(
      {
        type: Constants.REGIMEINTERNE_VALIDATESAVE_REQUEST,
        value: {
          login: this.state.login,
          commande: commande,
          data: data,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
  };
  genererCompteRendu = () => {
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
  };
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
    this.setState(prevState => ({
      declaration: {
        ...prevState.declaration,
        documentAnnexeResultVOs: this.toggleChoiceInList(indexDocument, key),
      },
    }));
  };

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
    };
  }

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

  componentDidMount() {
    console.log('componentDidMount ri:');
    load('user').then(user => {
      this.setState({login: JSON.parse(user).login});
    });
  }

  render() {
    const {delivrerMainleveeVO} = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <Toolbar
          navigation={this.props.navigation}
          title={translate('mainlevee.title')}
          subtitle={translate('mainlevee.delivrerMainlevee.title')}
          icon="menu"
        />
        <Container>
          {this.props.showProgress && <BadrProgressBar width={screenHeight} />}
          {this.props.errorMessage != null && (
            <BadrErrorMessage message={this.props.errorMessage} />
          )}
          {this.props.successMessage != null && (
            <BadrInfoMessage message={this.props.successMessage} />
          )}
          {/* Référence déclaration */}
          <CardBox noPadding={true}>
            <Grid>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={2}>
                  <BadrLibelleBleu>
                    {translate('transverse.bureau')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={2}>
                  <BadrLibelleBleu>
                    {translate('transverse.regime')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={2}>
                  <BadrLibelleBleu>
                    {translate('transverse.annee')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={2}>
                  <BadrLibelleBleu>
                    {translate('transverse.serie')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={1}>
                  <BadrLibelleBleu>
                    {translate('transverse.cle')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={1}>
                  <BadrLibelleBleu>
                    {translate('transverse.nVoyage')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={4}>
                  <BadrLibelleBleu>
                    {translate('mainlevee.refDroitTaxGaran')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={2}>
                  {delivrerMainleveeVO.liquidation === 'non' ? (
                    <BadrLibelleBleu>
                      {delivrerMainleveeVO.liquidation}
                    </BadrLibelleBleu>
                  ) : (
                    <Button mode="text">
                      {delivrerMainleveeVO.liquidation}
                    </Button>
                  )}
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(0, 3)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(3, 6)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(6, 10)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {this.state.refDeclaration.slice(10, 17)}
                  </BadrLibelleNoir>
                </Col>
                <Col size={1}>
                  <BadrLibelleNoir>{this.state.cle}</BadrLibelleNoir>
                </Col>
                <Col size={1}>
                  <BadrLibelleNoir>{this.state.numeroVoyage}</BadrLibelleNoir>
                </Col>
                <Col size={4}>
                  <BadrLibelleBleu>
                    {translate('mainlevee.refPaiementAmend')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {delivrerMainleveeVO.paiement}
                  </BadrLibelleNoir>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={10} />
                <Col size={4}>
                  <BadrLibelleBleu>
                    {translate('mainlevee.mainleveeSousReservePaiement')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={2} />
              </Row>
            </Grid>
          </CardBox>

          <View style={styles.flexDirectionRow}>
            <Text style={styles.libelleL}>
              {translate('mainlevee.delivrerMainlevee.secondTitle')}
            </Text>
          </View>

          {/* Annotations */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'mainlevee.delivrerMainlevee.annotations.title',
              )}>
              <Row style={CustomStyleSheet.whiteRow}>
                <BadrLibelleNoir>
                  {delivrerMainleveeVO.annotationsControle}
                </BadrLibelleNoir>
              </Row>
            </Accordion>
          </CardBox>

          {/* Liste des Docs exigibles */}
          <CardBox noPadding={true}>
            <Accordion
              title={translate(
                'mainlevee.delivrerMainlevee.listeDocumentsExigibles.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.documentAnnexe',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.portee',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.numArticle',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.reconnu',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.dConsignation',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.laisserPasser',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={2}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.listeDocumentsExigibles.decisionOrganismeControle',
                      )}
                    </BadrLibelleBleu>
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
                        <BadrLibelleNoir>{item.docAnnexe}</BadrLibelleNoir>
                      </Col>
                      <Col size={1}>
                        <BadrLibelleNoir>{item.portee}</BadrLibelleNoir>
                      </Col>
                      <Col size={1}>
                        <BadrLibelleNoir>{item.narticle}</BadrLibelleNoir>
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
                        <BadrLibelleNoir>
                          {item.decisionOrgControle}
                        </BadrLibelleNoir>
                      </Col>
                    </Row>
                  ))}
              </Grid>
            </Accordion>
          </CardBox>

          {/* Redressement opéré */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'mainlevee.delivrerMainlevee.redressementOperes.title',
              )}>
              <Row style={CustomStyleSheet.whiteRow}>
                <Text>{delivrerMainleveeVO.redressementsOperes}</Text>
              </Row>
            </Accordion>
          </CardBox>

          {/* Motivations */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'mainlevee.delivrerMainlevee.motivations.title',
              )}>
              <Row style={CustomStyleSheet.whiteRow}>
                <Text style={styles.libelleM}>
                  {delivrerMainleveeVO.motifForcerMLV}
                </Text>
              </Row>
            </Accordion>
          </CardBox>

          {/* Décision */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate('mainlevee.delivrerMainlevee.decision.title')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <View
                      pointerEvents={
                        this.state.isConsultation ? 'none' : 'auto'
                      }>
                      <RadioButton.Group
                        onValueChange={value =>
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
                        this.setChoiceDocAnnexe(index, DEMANDE_CONSIGNATION);
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
            </Accordion>
          </CardBox>

          {/* Constation de la marchandise */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'mainlevee.delivrerMainlevee.constationMarchandise.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.constationMarchandise.numeroBulletinReception',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {delivrerMainleveeVO.numeroBulletinReception}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.constationMarchandise.etatChargement',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {delivrerMainleveeVO.etatChargement}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Annotations Avec Pesage */}
          <CardBox noPadding={true}>
            <Accordion
              title={translate(
                'mainlevee.delivrerMainlevee.annotations.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <TextInput
                    style={{flex: 1}}
                    value={delivrerMainleveeVO.annotations}
                    multiline={true}
                    numberOfLines={6}
                    onChangeText={text => this.setState({observation: text})}
                  />
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
            </Accordion>
          </CardBox>

          {/* Informations ECOR */}
          <CardBox noPadding={true}>
            <Accordion
              title={translate(
                'mainlevee.delivrerMainlevee.informationsEcor.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      value={delivrerMainleveeVO.numeroPince}
                      label={translate(
                        'mainlevee.delivrerMainlevee.informationsEcor.numeroPince',
                      )}
                      style={{height: 50}}
                      onChangeText={text =>
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
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      keyboardType={'number-pad'}
                      value={delivrerMainleveeVO.nombreDeScelles}
                      label={translate(
                        'mainlevee.delivrerMainlevee.informationsEcor.nombreScelles',
                      )}
                      onChangeText={text =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            nombreDeScelles: text,
                          },
                        })
                      }
                      style={{height: 50}}
                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={5}>
                    <BadrLibelleBleu>
                      {translate(
                        'mainlevee.delivrerMainlevee.informationsEcor.generateurScelle',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={2}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      value={delivrerMainleveeVO.numeroPince}
                      label={translate('transverse.du')}
                      style={{height: 45}}
                      onChangeText={text =>
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
                  <Col size={2}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      keyboardType={'number-pad'}
                      value={delivrerMainleveeVO.nombreDeScelles}
                      label={translate('transverse.au')}
                      style={{height: 45}}
                      onChangeText={text =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            nombreDeScelles: text,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col size={2} />
                  <Col size={1}>
                    <Button onPress={''} mode="contained" compact="true">
                      {translate('transverse.Ok')}
                    </Button>
                  </Col>
                  <Col size={2} />
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={5}>
                    <TextInput
                      mode={'outlined'}
                      maxLength={8}
                      value={delivrerMainleveeVO.numeroScelle}
                      label={translate(
                        'mainlevee.delivrerMainlevee.informationsEcor.numeroScelle',
                      )}
                      style={{height: 50}}
                      onChangeText={text =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            numeroPince: text,
                          },
                        })
                      }
                    />
                  </Col>
                  <Col size={2} />

                  <Col size={1}>
                    <Button
                      onPress={''}
                      icon="plus-box"
                      mode="contained"
                      compact="true"
                    />
                    <Button
                      onPress={''}
                      icon="delete"
                      mode="contained"
                      compact="true"
                    />
                  </Col>
                  <Col size={2} />
                  <Col size={5}>
                    <BadrList />
                  </Col>
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Dédouanement sur remorque */}
          <CardBox noPadding={true}>
            <Accordion
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
                      style={{height: 50}}
                      onChangeText={text =>
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
                      onChangeText={text =>
                        this.setState({
                          delivrerMainleveeVO: {
                            ...this.state.delivrerMainleveeVO,
                            numeroCarnetATA: text,
                          },
                        })
                      }
                      style={{height: 50}}
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
                      style={{height: 50}}
                      onChangeText={text =>
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
            </Accordion>
          </CardBox>

          {/* Transit */}
          <CardBox noPadding={true}>
            <Accordion
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
                      style={{height: 50}}
                      onChangeText={text =>
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
            </Accordion>
          </CardBox>

          {/* Actions */}
          <View
            style={styles.containerActionBtn}
            pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
            <BadrButton
              style={{width: 100}}
              onPress={() => {
                this.sauvgarderValider('sauvegarderRI');
              }}
              text={translate('controle.sauvegarder')}
              disabled={this.state.decisionControle ? false : true}
            />
            <BadrButton
              style={{width: 100}}
              onPress={() => {
                this.sauvgarderValider('validerRI');
              }}
              text={translate('controle.validerControle')}
              disabled={this.state.decisionControle ? false : true}
            />
          </View>
        </Container>
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
};

const mapStateToProps = state => ({...state.regimeInterneReducer});

export default connect(
  mapStateToProps,
  null,
)(DelivrerMLV);
