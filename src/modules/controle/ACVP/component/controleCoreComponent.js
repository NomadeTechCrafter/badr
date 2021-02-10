import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';

import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
} from '../../../../commons/component';

import BAD from '../../BAD';
import {Checkbox, TextInput, Text, RadioButton} from 'react-native-paper';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {CustomStyleSheet} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
import {load} from '../../../../commons/services/async-storage/ComStorageService';
import {connect} from 'react-redux';
import * as Constants from '../state/controleACVPConstants';
import * as RegimeACVPAction from '../state/actions/controleACVPAction';
import * as ControleRechercheRefDumAction from '../../common/state/actions/controleCommonRechercheRefDumAction';
import * as controleCommonConstants from '../../common/state/controleCommonConstants';

class ControleCoreComponent extends Component {
  constructor(props) {
    console.log('-------constructor fils----------');
    super(props);
    this.state = {
      login: '',
      checked: false,
    };
    //this.initControleState();
  }

  initControleState = () => {
    console.log(
      '-----initControleState --',
      JSON.stringify(this.props.data.refDeclaration),
    );
    if (!_.isNil(this.props.data.init)) {
      let controleVo = this.props.data.init;
      let refDeclaration = this.props.data.refDeclaration;
      this.setState({
        ...this.state,
        refDeclaration: refDeclaration,
        cle: 'D',
        numeroVoyage: '',
        declaration: controleVo,
        typeRegime: translate('controle.ACVP'),
        decisionControle: controleVo.decisionControle,
        typeControle: controleVo.decision,
        observation: controleVo.observation,
        numeroVersionCourante: 0,
        isConsultation: false,
        compteRendu: '',
      });
    }
  };

  /* componentDidMount() {
    console.log('test fils componentDidMount----');
    load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
    this.initControleState();
  }*/

  componentDidUpdate(prevProps) {
    console.log(
      'test fils componentDidUpdate----',
      JSON.stringify(this.props),
      JSON.stringify(prevProps),
    );
    /*if (prevProps.controleVO !== this.props.controleVO) {
      console.log('test componentDidUpdate----  ok');
      this.initControleState();
    }*/
    //console.log('test fils componentDidUpdate----');
    if (this.props.isFocused) {
      console.log('test fils ok componentDidUpdate----');
      // Screen has now come into focus, perform your tasks here!
      this.initControleState();
    }
  }

  componentDidMount() {
    console.log('---tcomponentDidMount fils----');
    this.initControleState();
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      console.log('---tcomponentDidMount fils unsbscrib----');
      this.reset();
    });
  }

  componentWillUnmount() {
    console.log('---test componentWillUnmount fils----');
    this._unsubscribe();
  }

  reset = () => {
    let action = ControleRechercheRefDumAction.init(
      {
        type: controleCommonConstants.INIT_CONTROLE_COMMUN_INIT,
        value: {},
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
  };

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

  sauvgarder = (commande) => {
    console.log('---sauvgarder----', commande);
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
    var action = RegimeACVPAction.validateSave(
      {
        type: Constants.ACVP_VALIDATESAVE_REQUEST,
        value: {
          login: this.state.login,
          commande: commande + this.state.typeControle,
          data: data,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo({y: 0, animated: true});
    }
  };

  genererCompteRendu = () => {
    var data = {
      idDed: this.state.declaration.idDed,
      /*numeroVersionBase: this.state.numeroVersionCourante,
      numeroVersionCourante: this.state.numeroVersionCourante,*/
    };
    var action = RegimeACVPAction.genererCR(
      {
        type: Constants.ACVP_VALIDATESAVE_REQUEST,
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

  /*static getDerivedStateFromProps(props, state) {
    console.log('-----getDerivedStateFromProps-----');
    if (
      props.reponseData &&
      props.reponseData.historiqueCompte &&
      props.reponseData.historiqueCompte !== state.declaration.historiqueCompte
    ) {
      console.log('-----getDerivedStateFromProps----- in');
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
  }*/

  reconnuChange = (index) => {
    var declaration = {...this.state.declaration};
    declaration.documentAnnexeResultVOs[
      index
    ].documentAnnexe.reconnu = !declaration.documentAnnexeResultVOs[index]
      .documentAnnexe.reconnu;
    this.setState({declaration});
  };

  demandeConsignationChange = (index) => {
    var declaration = {...this.state.declaration};
    declaration.documentAnnexeResultVOs[
      index
    ].documentAnnexe.demandeConsignation = !declaration.documentAnnexeResultVOs[
      index
    ].documentAnnexe.demandeConsignation;
    this.setState({declaration});
  };

  render() {
    console.log('--render core component', this.state.declaration);
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          back={true}
          navigation={this.props.navigation}
          title="Contrôle"
          subtitle={translate('controle.ACVP')}
          icon="menu"
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.errorMessage != null && (
            <ComBadrErrorMessageComp message={this.props.errorMessage} />
          )}
          {this.props.successMessage != null && (
            <ComBadrInfoMessageComp message={this.props.successMessage} />
          )}
          {!_.isNil(this.state.declaration) && (
            <View>
              {/* Référence déclaration */}
              <ComBadrCardBoxComp style={styles.cardBoxInfoDum}>
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
                  <Text style={styles.libelleS}>
                    {translate('transverse.cle')}
                  </Text>
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
              </ComBadrCardBoxComp>

              {/* Annotations */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp title={translate('controle.annotations')}>
                  {this.state.declaration.annotation && (
                    <View style={styles.flexDirectionRow}>
                      <Text style={styles.libelleM}>
                        {this.state.declaration.annotation}
                      </Text>
                    </View>
                  )}
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Intervention */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp title={translate('controle.intervention')}>
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
                    this.state.declaration.autreAnnotationVOs.map(
                      (item, index) => (
                        <View style={styles.flexDirectionRow} key={index}>
                          <Text style={styles.libelleM}>
                            {item.numeroVersion}
                          </Text>
                          <Text style={styles.libelleL}>
                            {item.intervention}
                          </Text>
                          <Text style={styles.libelleM}>
                            {item.dateIntervention}
                          </Text>
                          <Text style={styles.libelleM}>{item.acteur}</Text>
                          <Text style={styles.libelleL}>
                            {item.commentaire}
                          </Text>
                        </View>
                      ),
                    )}
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Liste des Docs exigibles */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp title={translate('controle.listDocExigible')}>
                  <View style={styles.flexDirectionRow}>
                    <Text style={styles.libelleM}>
                      {translate('controle.doc')}
                    </Text>
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
                              item.documentAnnexe.reconnu
                                ? 'checked'
                                : 'unchecked'
                            }
                            disabled={this.state.isConsultation}
                            onPress={() => this.reconnuChange(index)}
                          />
                          <Checkbox
                            status={
                              item.documentAnnexe.demandeConsignation
                                ? 'checked'
                                : 'unchecked'
                            }
                            disabled={this.state.isConsultation}
                            onPress={() =>
                              this.demandeConsignationChange(index)
                            }
                          />
                          <Text style={styles.libelleL}>
                            {item.decisionMCI}
                          </Text>
                        </View>
                      ),
                    )}
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Redressement opéré */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  title={translate('controle.redressementOperes')}>
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
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <ComBadrButtonComp
                        onPress={this.genererCompteRendu}
                        disabled={this.state.isConsultation}
                        text={translate('controle.genererCompte')}
                      />
                    </View>
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Observation */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp title={translate('controle.observation')}>
                  <View>
                    <TextInput
                      placeholder={translate('controle.votreObservation')}
                      value={this.state.observation}
                      multiline={true}
                      numberOfLines={6}
                      disabled={this.state.isConsultation}
                      onChangeText={(text) =>
                        this.setState({observation: text})
                      }
                    />
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Historique des comptes rendu de contrôle */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  disable={
                    !(this.state.declaration.historiqueCompte.length > 0)
                  }
                  title={translate('controle.historiqueCompteRendu')}>
                  {this.state.declaration.historiqueCompte.length > 0 && (
                    <View>
                      <Text>{this.state.declaration.historiqueCompte}</Text>
                    </View>
                  )}
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Décision */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp title={translate('controle.decision')}>
                  <View
                    style={styles.flexColumn}
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
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* BAD */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp title={translate('bad.title')}>
                  <View style={styles.flexColumn}>
                    {/* <BAD
                  idDeclaration={
                    this.props.route &&
                    this.props.route.params &&
                    this.props.route.params.declarationRI
                      ? this.props.route.params.declarationRI.idDed
                      : -1
                  }
                />*/}
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Actions */}
              <View
                style={styles.containerActionBtn}
                pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
                <ComBadrButtonComp
                  style={{width: 100}}
                  onPress={() => {
                    this.sauvgarder('sauvegarder');
                  }}
                  text={translate('controle.sauvegarder')}
                  disabled={this.state.decisionControle ? false : true}
                />
                <ComBadrButtonComp
                  style={{width: 100}}
                  onPress={() => {
                    this.sauvgarder('valider');
                  }}
                  text={translate('controle.validerControle')}
                  disabled={this.state.decisionControle ? false : true}
                />
                <ComBadrButtonComp
                  style={{width: 100}}
                  text={translate('controle.redresserDeclaration')}
                />
              </View>
            </View>
          )}
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
    backgroundColor: '#009ab2',
    padding: 8,
    width: 300,
  },
  textRadio: {
    color: '#FFF',
  },
  flexColumn: {flexDirection: 'column'},
};

//const mapStateToProps = (state) => ({...state.controleACVPReducer});

function mapStateToProps(state) {
  return {...state.controleCommonReducer};
}

export default connect(mapStateToProps, null)(ControleCoreComponent);
