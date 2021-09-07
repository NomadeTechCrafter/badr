import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';

import {
  ComContainerComp,
  ComBadrCardBoxComp,
  ComAccordionComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBadrLibelleComp,
  ComBadrButtonIconComp,
} from '../../../../commons/component';

import BAD from '../../BAD';
import { Checkbox, TextInput, Text, RadioButton } from 'react-native-paper';
/**i18n */
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { load } from '../../../../commons/services/async-storage/ComStorageService';
import { connect } from 'react-redux';
import * as ControleRechercheRefDumAction from '../../common/state/actions/controleCommonRechercheRefDumAction';
import * as ControleCommonActionBtnAction from '../../common/state/actions/controleCommonActionBtnAction';
import * as controleCommonConstants from '../../common/state/controleCommonConstants';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ControleCompteRenduScreen from './onglets/ControleCompteRenduScreen';
import controleCompteRenduScreen from './onglets/ControleCompteRenduScreen';

const Tab = createMaterialTopTabNavigator();


class ControleACVPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      checked: false,
    };
    console.log('-----constructor--');
  }

  initControleState = () => {
    console.log('-----initControleState--');
    if (!_.isNil(this.props.data.init)) {
      let controleVo = this.props.data.init;
      let refDeclaration = this.props.data.refDeclaration;
      console.log('---------------------');
      console.log('-----initControleState 1 data--', controleVo);
      console.log('-----initControleState 1', refDeclaration);
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

  onScreenReloaded = () => {
    console.log('************ OnScreen Reloaded *********');
    this.initControleState();
  };

  componentDidMount = () => {
    this.initControleState();
    console.log('************  componentDidMount *********');
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log('************  componentDidMount  IN *********');

      this.onScreenReloaded();
    });
  };

  componentWillUnmount() {
    console.log('************  Unmount *********');
    this.unsubscribe();
  }

  /*componentDidMount() {
    console.log('---tcomponentDidMount parent----');
    load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
    /!*this._unsubscribe = this.props.navigation.addListener('blur', () => {
      console.log('---tcomponentDidMount parent unsbscrib----');
      this.reset();
    });*!/
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.reset();
    });
  }*/

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
    var action = ControleCommonActionBtnAction.validateSave(
      {
        type: controleCommonConstants.VALIDATESAVE_CONTROLE_COMMUN_REQUEST,
        value: {
          commande: commande + this.state.typeControle,
          data: data,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo({ y: 0, animated: true });
    }
  };

  genererCompteRendu = () => {
    var data = {
      idDed: this.state.declaration.idDed,
      /*numeroVersionBase: this.state.numeroVersionCourante,
      numeroVersionCourante: this.state.numeroVersionCourante,*/
    };
    var action = ControleCommonActionBtnAction.genererCR(
      {
        type: controleCommonConstants.GENERERCR_CONTROLE_COMMUN_REQUEST,
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
  }*/

  reconnuChange = (index) => {
    var declaration = { ...this.state.declaration };
    declaration.documentAnnexeResultVOs[
      index
    ].documentAnnexe.reconnu = !declaration.documentAnnexeResultVOs[index]
      .documentAnnexe.reconnu;
    this.setState({ declaration });
  };

  demandeConsignationChange = (index) => {
    var declaration = { ...this.state.declaration };
    declaration.documentAnnexeResultVOs[
      index
    ].documentAnnexe.demandeConsignation = !declaration.documentAnnexeResultVOs[
      index
    ].documentAnnexe.demandeConsignation;
    this.setState({ declaration });
  };

  render() {
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          // back={true}
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
              <NavigationContainer independent={true}>

                <Tab.Navigator
                  initialLayout={{ height: Dimensions.get('window').height }}
                  swipeEnabled={false}
                  tabBarOptions={{
                    labelStyle: { fontSize: 16, fontWeight: 'bold' },
                    showLabel: true,
                    allowFontScaling: true,
                    activeBackgroundColor: primaryColor,
                    activeTintColor: primaryColor,
                    inactiveTintColor: 'gray',
                    indicatorStyle: {
                      backgroundColor: primaryColor,
                      borderWidth: 2.5,
                      borderColor: primaryColor,
                    },
                  }}>
                  <Tab.Screen name="Compte rendu" component={ControleCompteRenduScreen} />
                  <Tab.Screen name="info" component={controleCompteRenduScreen} />
                  <Tab.Screen name="reconnaissance" component={controleCompteRenduScreen} />
                </Tab.Navigator>
              </NavigationContainer>


              {/* Historique des comptes rendu de contrôle */}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  disable={
                    !(this.state.declaration?.historiqueCompte?.length > 0)
                  }
                  title={translate('controle.historiqueCompteRendu')}>
                  {this.state.declaration?.historiqueCompte?.length > 0 && (
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
                        this.setState({ decisionControle: value })
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
                    {
                      <BAD
                        idDeclaration={
                          this.props.data && this.props.data.init
                            ? this.props.data.init.idDed
                            : -1
                        }
                      />
                    }
                  </View>
                </ComAccordionComp>
              </ComBadrCardBoxComp>

              {/* Actions */}
              {/*<View
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
              </View>*/}

              <Row pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
                <Col size={1} />
                <Col size={3}>
                  <ComBadrButtonIconComp
                    style={styles.actionBtn}
                    onPress={() => {
                      this.sauvgarder('sauvegarder');
                    }}
                    disabled={this.state.decisionControle ? false : true}
                    icon="check-circle-outline"
                    text={translate('controle.sauvegarder')}
                  />
                </Col>
                <Col size={3}>
                  <ComBadrButtonIconComp
                    style={styles.actionBtn}
                    onPress={() => {
                      this.sauvgarder('valider');
                    }}
                    disabled={this.state.decisionControle ? false : true}
                    icon="check-circle-outline"
                    text={translate('controle.validerControle')}
                  />
                </Col>
                <Col size={3}>
                  <ComBadrButtonIconComp
                    style={styles.actionBtn}
                    icon="check-circle-outline"
                    text={translate('controle.redresserDeclaration')}
                  />
                </Col>
                <Col size={1} />
              </Row>
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
  flexColumn: { flexDirection: 'column' },

  actionBtn: {
    width: 250,
    height: 50,
  },
};

//const mapStateToProps = (state) => ({...state.controleACVPReducer});

function mapStateToProps(state) {
  return { ...state.controleCommonReducer };
}

export default connect(mapStateToProps, null)(ControleACVPScreen);
