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
  BadrLibelleBleu,
  BadrLibelleNoir,
  Toolbar,
} from '../../../components';
import {Checkbox, TextInput, Text, RadioButton} from 'react-native-paper';
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
class RegimeInterne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      checked: false,
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      declaration: props.route.params.declarationRI,
      typeRegime: translate('controle.regimeInterne'),
      decisionControle: props.route.params.declarationRI.decisionControle,
      observation: props.route.params.declarationRI.observation,
      numeroVersionCourante: 0,
      isConsultation: false,
      compteRendu: '',
    };
  }

  componentDidMount() {
    console.log('componentDidMount ri:');
    load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
  }

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

  sauvgarderValider = (commande) => {
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

  render() {
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <Toolbar
          navigation={this.props.navigation}
          title="Contrôle"
          subtitle="Régime interne"
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
                    {translate('transverse.type')}
                  </BadrLibelleBleu>
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
                  <BadrLibelleBleu>{this.state.typeRegime}</BadrLibelleBleu>
                </Col>
              </Row>
            </Grid>
          </CardBox>

          {/* Annotations */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.annotations')}>
              {this.state.declaration.annotation && (
                <Row style={CustomStyleSheet.whiteRow}>
                  <BadrLibelleNoir>
                    {this.state.declaration.annotation}
                  </BadrLibelleNoir>
                </Row>
              )}
            </Accordion>
          </CardBox>

          {/* Intervention */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.intervention')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={2}>
                    <BadrLibelleBleu>
                      {translate('controle.version')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={2}>
                    <BadrLibelleBleu>
                      {' '}
                      {translate('controle.typeIntervention')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={2}>
                    <BadrLibelleBleu>
                      {' '}
                      {translate('controle.date')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={2}>
                    <BadrLibelleBleu>
                      {translate('controle.acteur')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={2}>
                    <BadrLibelleBleu>
                      {translate('controle.commentaire')}
                    </BadrLibelleBleu>
                  </Col>
                </Row>
                {this.state.declaration.autreAnnotationVOs &&
                  this.state.declaration.autreAnnotationVOs.map(
                    (item, index) => (
                      <Row style={CustomStyleSheet.lightBlueRow} key={index}>
                        <Col size={2}>
                          <BadrLibelleNoir>
                            {item.numeroVersion}
                          </BadrLibelleNoir>
                        </Col>
                        <Col size={2}>
                          <BadrLibelleNoir>{item.intervention}</BadrLibelleNoir>
                        </Col>
                        <Col size={2}>
                          <BadrLibelleNoir>
                            {item.dateIntervention}
                          </BadrLibelleNoir>
                        </Col>
                        <Col size={2}>
                          <BadrLibelleNoir>{item.acteur}</BadrLibelleNoir>
                        </Col>
                        <Col size={2}>
                          <BadrLibelleNoir>{item.commentaire}</BadrLibelleNoir>
                        </Col>
                      </Row>
                    ),
                  )}
              </Grid>
            </Accordion>
          </CardBox>

          {/* Liste des Docs exigibles */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.listDocExigible')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={3}>
                    <BadrLibelleBleu>
                      {translate('controle.doc')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate('controle.portee')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate('controle.nArticle')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate('controle.reconnu')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate('controle.consignation')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate('controle.decision')}
                    </BadrLibelleBleu>
                  </Col>
                </Row>

                {this.state.declaration.documentAnnexeResultVOs &&
                  this.state.declaration.documentAnnexeResultVOs.map(
                    (item, index) => (
                      <Row
                        key={index}
                        style={
                          index % 2 === 0
                            ? CustomStyleSheet.lightBlueRow
                            : CustomStyleSheet.whiteRow
                        }>
                        <Col size={3}>
                          <BadrLibelleNoir>
                            {item.documentAnnexe.libelle}
                          </BadrLibelleNoir>
                        </Col>
                        <Col size={1}>
                          <BadrLibelleNoir>
                            {item.documentAnnexe.portee}
                          </BadrLibelleNoir>
                        </Col>
                        <Col size={1}>
                          <BadrLibelleNoir>
                            {item.documentAnnexe.numeroOrdreArticle}
                          </BadrLibelleNoir>
                        </Col>
                        <Col size={1}>
                          <Checkbox
                            color={primaryColor}
                            status={
                              item.documentAnnexe.reconnu
                                ? 'checked'
                                : 'unchecked'
                            }
                            disabled={this.state.isConsultation}
                            onPress={() => {
                              this.setChoiceDocAnnexe(index, RECONNU);
                            }}
                          />
                        </Col>
                        <Col size={1}>
                          <Checkbox
                            color={primaryColor}
                            status={
                              item.documentAnnexe.demandeConsignation
                                ? 'checked'
                                : 'unchecked'
                            }
                            disabled={
                              this.state.isConsultation ||
                              !item.documentAnnexe.impactFiscal
                            }
                            onPress={() => {
                              this.setChoiceDocAnnexe(
                                index,
                                DEMANDE_CONSIGNATION,
                              );
                            }}
                          />
                        </Col>
                        <Col size={1}>
                          <BadrLibelleNoir>{item.decisionMCI}</BadrLibelleNoir>
                        </Col>
                      </Row>
                    ),
                  )}
              </Grid>
            </Accordion>
          </CardBox>

          {/* Redressement opéré */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.redressementOperes')}>
              <Grid>
                {!_.isEmpty(this.state.declaration.redressement) && (
                  <Row style={CustomStyleSheet.whiteRow}>
                    <BadrLibelleNoir>
                      {this.state.declaration.redressement}
                    </BadrLibelleNoir>
                  </Row>
                )}
                {!_.isEmpty(this.state.compteRendu) && (
                  <Row style={CustomStyleSheet.whiteRow}>
                    <BadrLibelleNoir>{this.state.compteRendu}</BadrLibelleNoir>
                  </Row>
                )}
                <Row
                  style={[
                    CustomStyleSheet.whiteRow,
                    {justifyContent: 'center'},
                  ]}>
                  <BadrButton
                    onPress={this.genererCompteRendu}
                    disabled={this.state.isConsultation}
                    text={translate('controle.genererCompte')}
                  />
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Observation */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.observation')}>
              <Grid>
                <Row>
                  <Col>
                    <TextInput
                      placeholder={translate('controle.votreObservation')}
                      value={this.state.declaration.observation}
                      multiline={true}
                      numberOfLines={6}
                      disabled={this.state.isConsultation}
                      onChangeText={(text) =>
                        this.setState({observation: text})
                      }
                    />
                  </Col>
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Historique des comptes rendu de contrôle */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.historiqueCompteRendu')}>
              {this.state.declaration.historiqueCompte && (
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <BadrLibelleNoir>
                      {this.state.declaration.historiqueCompte}
                    </BadrLibelleNoir>
                  </Row>
                </Grid>
              )}
            </Accordion>
          </CardBox>

          {/* Décision */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.decision')}>
              <View
                style={{flexDirection: 'column'}}
                pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
                <RadioButton.Group
                  onValueChange={(value) =>
                    this.setState({decisionControle: value})
                  }
                  value={this.state.decisionControle}>
                  <View style={styles.decisionContainerRB}>
                    <Text style={styles.textRadio}>
                      {translate('controle.controleConforme')}
                    </Text>
                    <RadioButton
                      color={styles.textRadio.color}
                      value="controleConforme"
                    />
                  </View>
                  <View style={styles.decisionContainerRB}>
                    <Text style={styles.textRadio}>
                      {translate('controle.redressementContentieux')}
                    </Text>
                    <RadioButton
                      color={styles.textRadio.color}
                      value="contencieux"
                    />
                  </View>
                  <View style={styles.decisionContainerRB}>
                    <Text style={styles.textRadio}>
                      {translate('controle.redressementSansContentieux')}
                    </Text>
                    <RadioButton
                      color={styles.textRadio.color}
                      value="sansContencieux"
                    />
                  </View>
                </RadioButton.Group>
              </View>
            </Accordion>
          </CardBox>

          {/* Actions */}
          <View
            style={styles.containerActionBtn}
            pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
            <BadrButton
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('sauvegarderRI');
              }}
              text={translate('controle.sauvegarder')}
              disabled={this.state.decisionControle ? false : true}
            />
            <BadrButton
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('validerRI');
              }}
              text={translate('controle.validerControle')}
              disabled={this.state.decisionControle ? false : true}
            />
            <BadrButton
              style={styles.actionBtn}
              text={translate('controle.redresserDeclaration')}
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
  textRadio: {
    color: '#FFF',
  },
  actionBtn: {width: 100},
};

const mapStateToProps = (state) => ({...state.regimeInterneReducer});

export default connect(mapStateToProps, null)(RegimeInterne);
