import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
  ComBadrButtonIconComp, ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp, ComContainerComp
} from '../../../../commons/component';
import { GENERIC_REQUEST } from '../../../../commons/constants/generic/ComGenericConstants';
/**i18n */
import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { CustomStyleSheet, primaryColor } from '../../../../commons/styles/ComThemeStyle';
import * as dedInitRedresserDumAction from '../../../dedouanement/redressement/state/actions/dedInitRedresserDumAction';
import * as ControleCommonActionBtnAction from '../../common/state/actions/controleCommonActionBtnAction';
import * as ControleRechercheRefDumAction from '../../common/state/actions/controleCommonRechercheRefDumAction';
import controleCommonShowErrorAction from '../../common/state/actions/controleCommonShowErrorAction';
import controleHideRedressementAction from '../../common/state/actions/controleHideRedressementAction';
import * as controleCommonConstants from '../../common/state/controleCommonConstants';
import ctrlUpdateControleAction from '../state/actions/ctrlUpdateControleAction';
import { CONTROLE_UPDATE_CONTROLE_OBJECT_REQUEST } from '../state/controleACVPConstants';
import ControleBonDelivrerScreen from './onglets/bonDelivrer/ControleBonDelivrerScreen';
import ControleCompteRenduScreen from './onglets/compteRendu/ControleCompteRenduScreen';
import ControleDeclarationsApurementScreen from './onglets/declarationsApurement/ControleDeclarationsApurementScreen';
import ControleInfoScreen from './onglets/info/ControleInfoScreen';
import ControleReconnaissanceScreen from './onglets/reconnaissance/ControleReconnaissanceScreen';



const Tab = createMaterialTopTabNavigator();


class ControleACVPScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    console.log('-----constructor--');
  }

  initControleState = () => {
    console.log('-----initControleState--');
    if (!_.isNil(this.props.data.init)) {
      console.log('JSON.stringify(this.props.data)-----------------------------------------');
      console.log(JSON.stringify(this.props.data));
     /*  let controleVo = this.props.data.init;
      let refDeclaration = this.props.data.refDeclaration; */
      this.setState({
        ...this.state,
        /* refDeclaration: refDeclaration,
        cle: this.cleDUM(refDeclaration?.slice(3, 6), refDeclaration?.slice(10, 17)), */
        numeroVoyage: '',
        /* declaration: controleVo,
        typeRegime: translate('controle.ACVP'),
        decisionControle: controleVo.decisionControle,
        typeControle: controleVo.decision,
        observation: controleVo.observation, */
        numeroVersionCourante: 0,
        isConsultation: false,
       /*  compteRendu: '', */
      });
    }
  };


  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    /*while (serie.length < 6) {
        serie = '0' + serie;
      }*/
    if (serie.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie == '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
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

  update = () => {
    console.log('this.props.data : ', JSON.stringify(this.props.data));
      let action = ctrlUpdateControleAction.update(
       {
         type: CONTROLE_UPDATE_CONTROLE_OBJECT_REQUEST,
         value: this.props.data,
       }
     );
     this.props.dispatch(action);
    console.log('************update*********');
    console.log('this.props.data.init : ', JSON.stringify(this.props.data.init));
  };

  // init documentAnnexeResultVOItem JSON field for action save/validate
  initDocumentJSONField = () => {
    let documentAnnexeResultVO = [];
    let documentAnnexeResultVOItem = {};
    for (let doc of this.props.data.init?.documentAnnexeResultVOs) {
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
    if (_.isEmpty(this.props.data.init?.decisionControle)) {
      this.setMessageError(translate('controle.choixDecisionRequired'));
      return;
    } else { this.setMessageError(null); }
    var data = {
      idControle: this.props.data.init?.idControle,
      idDed: this.props.data.init?.idDed,
      referenceDed: this.props.data?.refDeclaration,
      documentAnnexeResultVO: this.initDocumentJSONField(),
      observation: this.props.data.init?.observation,
      decisions: this.props.data.init?.decisionControle,
      numeroVersionCourante: this.state.numeroVersionCourante,
    };
    console.log('data----', data);
    var action = ControleCommonActionBtnAction.validateSave(
      {
        type: controleCommonConstants.VALIDATESAVE_CONTROLE_COMMUN_REQUEST,
        value: {
          commande: commande + this.props.data.init?.decision,
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
      idDed: this.props.data.init?.idDed,
      /*numeroVersionBase: this.state.numeroVersionCourante,
      numeroVersionCourante: this.state.numeroVersionCourante,*/
    };
    var action = ControleCommonActionBtnAction.genererCR(
      {
        type: controleCommonConstants.GENERERCR_CONTROLE_COMMUN_REQUEST,
        value: {
          data: data,
        },
      },
      this.props.navigation,
    );
    this.props.dispatch(action);
    console.log('dispatch fired !!');
  };


  redresserDeclaration = () => {

    var data = this.props.data.init?.idDed;

    console.log('data----', data);
    let refDeclaration = this.props.data.refDeclaration;
    
    let cle = this.cleDUM(refDeclaration?.slice(3, 6), refDeclaration?.slice(10, 17));
    var action = dedInitRedresserDumAction.request(
      {
        type: GENERIC_REQUEST,
        value: {
          jsonVO: {
            reference: this.props.data.refDeclaration,
            nVoyage: this.state.numeroVoyage,
            enregistre: true,
          },
          idDed: data,
          cle: cle,
          hideRedressementButton:true

        },
      },
      this.props.navigation, this.props.route.params.successRedirection
    );
    console.log('dispatch fired redresserDeclaration 1  !!');
    this.props.dispatch(action);
    console.log('dispatch fired redresserDeclaration 2  !!');
    this.hideRedressement(true);
    console.log('dispatch fired redresserDeclaration 3  !!');

  };



  setMessageError(msg) {
    console.log('setMessageError :',msg);
    var action = controleCommonShowErrorAction.setMessage(
      {
        type: controleCommonConstants.CONTROLE_SET_ERROR_MESSAGE_REQUEST,
        value: msg
      }

    );
    this.props.dispatch(action);
  }

  hideRedressement = (hideRedressementButton)=> {
    console.log('hideRedressementButton methode:', hideRedressementButton);
    var action = controleHideRedressementAction.hideRedressement(
      {
        type: controleCommonConstants.CONTROLE_HIDE_REDRESSEMENT_REQUEST,
        value: hideRedressementButton
      }

    );
    this.props.dispatch(action);
  }

  render() {
    console.log("this.state begin");
    console.log("this.state :", this.state);
    console.log("this.props.errorMessage :", this.props.errorMessage);
    console.log("this.props.hideRedressementButton :", this.props.hideRedressementButton);
    console.log("this.state end");
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
          {this.props.infoMessage != null && (
            <ComBadrInfoMessageComp message={this.props.infoMessage} />
          )}
          <View style={{ flex: 1 }}>
            <NavigationContainer independent={true}>

              <Tab.Navigator
                swipeEnabled={true}
                lazy={true}
                optimizationsEnabled={true}
                tabBarOptions={{
                  scrollEnabled: true,
                  labelStyle: { fontSize: 14, fontWeight: 'bold' },
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

                <Tab.Screen name="Compte rendu" component={() => (
                  <ControleCompteRenduScreen 
                    controleVo={this.props.data.init}
                    refDeclaration={this.props.data.refDeclaration}
                    isConsultation={this.state.isConsultation}
                    
                    updateControle={this.update} />
                )} />

                <Tab.Screen name="info" component={ControleInfoScreen} />
                <Tab.Screen name="reconnaissance" component={ControleReconnaissanceScreen} />
                <Tab.Screen name="Bon à délivrer" component={ControleBonDelivrerScreen} />
                <Tab.Screen name="Déclarations d'apurement" component={ControleDeclarationsApurementScreen} />
              </Tab.Navigator>
            </NavigationContainer>



            {/* BAD */}
            {/* <ComBadrCardBoxComp style={styles.cardBox}>
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
              </ComBadrCardBoxComp> */}

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
                  disabled={this.props.data.init.decisionControle ? false : true}
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
                  disabled={this.props.data.init.decisionControle ? false : true}
                  icon="check-circle-outline"
                  text={translate('controle.validerControle')}
                />
              </Col>
              <Col size={3}>
                {(!this.props.hideRedressementButton) &&<ComBadrButtonIconComp
                  style={styles.actionBtn}
                  icon="check-circle-outline"
                  text={translate('controle.redresserDeclaration')}
                  onPress={() => {
                    this.redresserDeclaration();
                  }}
                />}
              </Col>
              <Col size={1} />
            </Row>
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
