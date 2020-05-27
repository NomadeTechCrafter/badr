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
} from '../../../components';
import {Checkbox, TextInput, Text, RadioButton} from 'react-native-paper';
/**i18n */
import {translate} from '../../../common/translations/i18n';
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
    load('user').then(user => {
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
  // TODO : where is i var ?
  toggleChoiceInList = (indexDocument, key) => {
    let listDoc = this.state.declaration.documentAnnexeResultVOs;
    if (listDoc[i].documentAnnexe[key]) {
      listDoc[i].documentAnnexe[key] = false;
    } else {
      listDoc[i].documentAnnexe[key] = true;
      var otherKey = key === RECONNU ? DEMANDE_CONSIGNATION : RECONNU;
      listDoc[i].documentAnnexe[otherKey] = false;
    }
    console.log('toggleChoiceInList :', listDoc);
    return listDoc;
  };

  setChoiceForReconnu = (indexDocument, key) => {
    this.setState(prevState => ({
      declaration: {
        // object that we want to update
        ...prevState.declaration, // keep all other key-value pairs
        documentAnnexeResultVOs: this.toggleChoiceInList(indexDocument, key),
      },
    }));
    console.log(
      'setChoiceForReconnu :',
      this.state.declaration.documentAnnexeResultVOs,
    );
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
      <View>
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
          <CardBox style={styles.cardBoxInfoDum}>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.libelleM}>
                {translate('transverse.bureau')}
              </Text>
              <Text style={styles.libelleM}>
                {translate('transverse.regime')}
              </Text>
              <Text style={styles.libelleM}>
                {translate('transverse.annee')}
              </Text>
              <Text style={styles.libelleL}>
                {translate('transverse.serie')}
              </Text>
              <Text style={styles.libelleS}>{translate('transverse.cle')}</Text>
              <Text style={styles.libelleM}>
                {translate('transverse.nVoyage')}
              </Text>
              <Text style={styles.libelleM}>
                {translate('transverse.type')}
              </Text>
            </View>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.libelleM}>
                {this.state.refDeclaration.slice(0, 3)}
              </Text>
              <Text style={styles.libelleM}>
                {this.state.refDeclaration.slice(3, 6)}
              </Text>
              <Text style={styles.libelleM}>
                {this.state.refDeclaration.slice(6, 10)}
              </Text>
              <Text style={styles.libelleL}>
                {this.state.refDeclaration.slice(10, 17)}
              </Text>
              <Text style={styles.libelleS}>{this.state.cle}</Text>
              <Text style={styles.libelleM}>{this.state.numeroVoyage}</Text>
              <Text style={styles.libelleM}>{this.state.typeRegime}</Text>
            </View>
          </CardBox>

          {/* Annotations */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.annotations')}>
              {this.state.declaration.annotation && (
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.libelleM}>
                    {this.state.declaration.annotation}
                  </Text>
                </View>
              )}
            </Accordion>
          </CardBox>

          {/* Intervention */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.intervention')}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.libelleM}>
                  {translate('controle.version')}
                </Text>
                <Text style={styles.libelleL}>
                  {translate('controle.typeIntervention')}
                </Text>
                <Text style={styles.libelleM}>
                  {translate('controle.date')}
                </Text>
                <Text style={styles.libelleM}>
                  {translate('controle.acteur')}
                </Text>
                <Text style={styles.libelleL}>
                  {translate('controle.commentaire')}
                </Text>
              </View>

              {this.state.declaration.autreAnnotationVOs &&
                this.state.declaration.autreAnnotationVOs.map((item, index) => (
                  <View style={styles.flexDirectionRow} key={index}>
                    <Text style={styles.libelleM}>{item.numeroVersion}</Text>
                    <Text style={styles.libelleL}>{item.intervention}</Text>
                    <Text style={styles.libelleM}>{item.dateIntervention}</Text>
                    <Text style={styles.libelleM}>{item.acteur}</Text>
                    <Text style={styles.libelleL}>{item.commentaire}</Text>
                  </View>
                ))}
            </Accordion>
          </CardBox>

          {/* Liste des Docs exigibles */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.listDocExigible')}>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.libelleM}>{translate('controle.doc')}</Text>
                <Text style={styles.libelleM}>
                  {translate('controle.portee')}
                </Text>
                <Text style={styles.libelleM}>
                  {translate('controle.nArticle')}
                </Text>
                <Text style={styles.libelleM}>
                  {translate('controle.reconnu')}
                </Text>
                <Text style={styles.libelleM}>
                  {translate('controle.consignation')}
                </Text>
                <Text style={styles.libelleL}>
                  {translate('controle.decision')}
                </Text>
              </View>
              {this.state.declaration.documentAnnexeResultVOs &&
                this.state.declaration.documentAnnexeResultVOs.map(
                  (item, index) => (
                    <View style={styles.flexDirectionRow} key={index}>
                      <Text style={styles.libelleM}>
                        {item.documentAnnexe.libelle}
                      </Text>
                      <Text style={styles.libelleM}>
                        {item.documentAnnexe.portee}
                      </Text>
                      <Text style={styles.libelleM}>
                        {item.documentAnnexe.numeroOrdreArticle}
                      </Text>
                      <Checkbox
                        color={'#009ab2'}
                        status={
                          item.documentAnnexe.reconnu ? 'checked' : 'unchecked'
                        }
                        disabled={this.state.isConsultation}
                        onPress={() => {
                          this.setChoiceForReconnu(index, RECONNU);
                        }}
                      />
                      <Checkbox
                        status={
                          item.documentAnnexe.demandeConsignation
                            ? 'checked'
                            : 'unchecked'
                        }
                        disabled={this.state.isConsultation}
                        onPress={() => {
                          this.setState({checked: !this.state.checked});
                        }}
                      />
                      <Text style={styles.libelleL}>{item.decisionMCI}</Text>
                    </View>
                  ),
                )}
            </Accordion>
          </CardBox>

          {/* Redressement opéré */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.redressementOperes')}>
              <View>
                {!_.isEmpty(this.state.declaration.redressement) && (
                  <View>
                    <Text>{this.state.declaration.redressement}</Text>
                  </View>
                )}
                {!_.isEmpty(this.state.compteRendu) && (
                  <View>
                    <Text>{this.state.compteRendu}</Text>
                  </View>
                )}
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <BadrButton
                    onPress={this.genererCompteRendu}
                    disabled={this.state.isConsultation}
                    text={translate('controle.genererCompte')}
                  />
                </View>
              </View>
            </Accordion>
          </CardBox>

          {/* Observation */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.observation')}>
              <View>
                <TextInput
                  placeholder={translate('controle.votreObservation')}
                  value={this.state.declaration.observation}
                  multiline={true}
                  numberOfLines={6}
                  disabled={this.state.isConsultation}
                  onChangeText={text => this.setState({observation: text})}
                />
              </View>
            </Accordion>
          </CardBox>

          {/* Historique des comptes rendu de contrôle */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('controle.historiqueCompteRendu')}>
              {this.state.declaration.historiqueCompte && (
                <View>
                  <Text>{this.state.declaration.historiqueCompte}</Text>
                </View>
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
                  onValueChange={value =>
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
            <BadrButton
              style={{width: 100}}
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
    backgroundColor: '#009ab2',
    padding: 8,
    width: 300,
  },
  textRadio: {
    color: '#FFF',
  },
};

const mapStateToProps = state => ({...state.regimeInterneReducer});

export default connect(
  mapStateToProps,
  null,
)(RegimeInterne);
