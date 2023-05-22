import React, {Component} from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

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
import styles from '../style/mlvDelivrerStyle';
import {Col, Row, Grid} from 'react-native-easy-grid';
/**i18n */

import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';

import {load} from '../../../../commons/services/async-storage/ComStorageService';

import {connect} from 'react-redux';

import * as Constants from '../state/mlvDelivrerConstants';
import mlvDelivrerAction from '../state/actions/mlvDelivrerAction';
import mlvValiderAction from '../state/actions/mlvValiderAction';
import style from '../../../../modules/controle/controleApresScanner/style/ctrlControleApresScannerStyle';
import * as MLVInitDelivrerAction from '../state/actions/mlvInitDelivrerAction';
import {DELIVRERMLV_DELIVRERMLV_IN_PROGRESS} from '../state/mlvDelivrerConstants';
import ComBadrAutoCompleteChipsComp
  from "../../../../commons/component/shared/autoComplete/ComBadrAutoCompleteChipsComp";
import {ComSessionService} from "../../../../commons/services/session/ComSessionService";

const RECONNU = 'reconnu';
const DEMANDE_CONSIGNATION = 'dconsignation';

class DelivrerMLV extends React.Component {
  constructor(props) {

    console.log('props inside delivrerscreen', props.route.params);
    super(props);
    let arr=[]
    Object.entries(props.route.params.declarationRI.scelles).forEach((entry) => {
      //const [key, value] = entry;
      arr.push(entry[1]);
    })

    this.state = {
      login: '',
      checked: false,
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      declaration: props.route.params.declarationRI,
      delivrerMainleveeVO: props.route.params.declarationRI,
      fusion: props.fusion,
      typeRegime: translate('controle.regimeInterne'),
      decisionControle: props.route.params.declarationRI?.decisionControle,
      observation: props.route.params.declarationRI?.observation,
      sousReservePaiementMLV: props.route.params.sousReservePaiementMLV,
      numeroVersionCourante: 0,
      isConsultation: false,
      compteRendu: '',
      generateurNumScelleAu: '',
      generateurNumScelleDu: '',
      messagesErreur: props.route.params.messagesErreur,
      messagesInfo: props.route.params.infoMessage,
      listeNombreDeScelles: arr,
      errorMessage: null,
      messageVisibility: false,
      message: '',
      messageType: '',
      delivred:props.route.params.delivred,
      selectedItemListScelle: '',
      infoEcorScelle: props.route.params.declarationRI?.infoEcorScelle,
      infoEcorScelleF: props.route.params.declarationRI?.infoEcorScelle,
    };
    this.numeroScelle = '';

    let conteneurs = [];
    for (let i = 0; i < this.state.delivrerMainleveeVO?.conteneurs.length; i++) {
      var conteneur = this.state.delivrerMainleveeVO?.conteneurs[i];
      conteneurs.push({
        code: i,
        libelle: conteneur,
        actif: false,
        disabled: false,
      });
    }

    let conteneursCibles = [];
    for (
        let j = conteneurs.length;
        j <
        conteneurs.length +
        this.state.delivrerMainleveeVO?.conteneursCibles.length;
        j++
    ) {
      var conteneurCible = this.state.delivrerMainleveeVO?.conteneursCibles[
      j - conteneurs.length
          ];
      conteneursCibles.push({
        code: j,
        libelle: conteneurCible,
        actif: false,
        disabled: true,
      });
    }

    this.state.conteneurs = conteneurs;
    this.state.conteneursCibles = conteneursCibles;
    console.log('props deliver', this.props);
  }
  initDelivrer = async () => {
    let action = await MLVInitDelivrerAction.request(
        {
          type: Constants.DELIVRERMLV_INIT_DELIVRERMLV_REQUEST,
          value: {},
        },
        this.props.navigation,
    );
    this.props.actions.dispatch(action);
  };
  handleOperateurChanged = (operateur) => {
    console.log('operateur', operateur)


    this.setState({

      delivrerMainleveeVO:{
        ...this.state.delivrerMainleveeVO,
        idOperateurScelle:operateur.code,
        libelleOperateurScelle:operateur.libelle
      }
    })
    this.initDelivrer();
  };

  onScreenReloaded = () => {
    //alert('reload1')
    this.setState({delivred:false})
    this.initDelivrer();

  };
  componentDidMount() {
    // this.state = {...initialState};
    // this.initRechercheDum();
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.onScreenReloaded();
    });
//alert('reload')
//    this.initDelivrer();

    console.log('componentDidMount DelivrerMLV:');
    load('user', false, true).then((user) => {
      this.setState({login: JSON.parse(user).login});
    });

  }
  // init documentAnnexeResultVOItem JSON field for action save/validate
  initDocumentJSONField = () => {
    let documentAnnexeResultVO = [];
    let documentAnnexeResultVOItem = {};
    for (var doc of this.state.delivrerMainleveeVO.documentAnnexeResultVOs) {
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
    if (this.state.infoEcorScelle == null) {
      this.setState({
        errorMessage: [
          translate(
              'newmlv.delivrerMainlevee.informationsEcor.nouveauxScellesMandatory',
          ),
        ],
      });
    } else {
      this.setState({
        errorMessage: null,
      });
      this.state.delivrerMainleveeVO.infoEcorScelle=this.state.infoEcorScelle;
      var scell={}
      this.state.listeNombreDeScelles?.forEach((item,index)=> {
        scell[index]=item;
      })
      this.state.delivrerMainleveeVO.scelles=scell
      var data = this.state.delivrerMainleveeVO;
      var action = mlvValiderAction.request(
          {
            type: Constants.DELIVRERMLV_VALIDERMLV_REQUEST,
            value: {
              data: data,
            },
          },
          this.props.navigation,
      );
      this.props.actions.dispatch(action);
    }
  };
  delivrerMainLevee = () => {
    console.log('decision controle', this.state.infoEcorScelle);
    if (this.state.infoEcorScelle == null) {
      this.setState({
        errorMessage: [
          translate(
              'newmlv.delivrerMainlevee.informationsEcor.nouveauxScellesMandatory',
          ),
        ],
      });
    } else {
      this.setState({
        errorMessage: null,
      });
//alert(this.state.listeNombreDeScelles)
      this.state.delivrerMainleveeVO.infoEcorScelle=this.state.infoEcorScelle;
      var scell={}
      this.state.listeNombreDeScelles?.forEach((item,index)=> {
        scell[index]=item;
      })
      this.state.delivrerMainleveeVO.scelles=scell

      var data = this.state.delivrerMainleveeVO;
      console.log("delivrerdata",JSON.stringify(data))
      var action = mlvDelivrerAction.request(
          {
            type: Constants.DELIVRERMLV_DELIVRERMLV_REQUEST,
            value: {
              data: data,
            },
          },
          this.props.navigation,
      );
      this.props.actions.dispatch(action);
      this.setState({delivred:true})
    }
  };
  showMessages = (type, message) => {
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState({
      messageVisibility: true,
      message: message,
      messageType: type,
      infoEcorScelleF:this.state.infoEcorScelle
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
    let listDoc = this.state.delivrerMainleveeVO.listeDocsExigibles;

    if (listDoc[indexDocument][key]) {
      listDoc[indexDocument][key] = false;
    } else {
      listDoc[indexDocument][key] = true;

      var otherKey = key === RECONNU ? DEMANDE_CONSIGNATION : RECONNU;
      listDoc[indexDocument][otherKey] = false;
    }

    return listDoc;
  };
  setChoiceDocAnnexe = (indexDocument, key) => {
    console.log('index', indexDocument);
    this.setState((prevState) => ({
      declaration: {
        ...prevState.declaration,
        delivrerMainleveeVO: {
          listeDocsExigibles: this.toggleChoiceInList(indexDocument, key),
        },
      },
    }));
  };

  static getDerivedStateFromProps(nextProps, prevState) {

    console.log(
        'getDerivedStateFromPropsdelivrer--------------------props ',
        nextProps,
    );
    console.log(
        'getDerivedStateFromPropsdelivrer--------------------state ',
        prevState,
    );


//    if (props.reponseData)
    //   if(nextProps.route.params.refDeclaration!==prevState.refDeclaration)

    if(nextProps.route.params.refDeclaration!==prevState.refDeclaration) {
      let arr=[]
      Object.entries(nextProps.route.params.declarationRI.scelles).
      forEach((entry) => {
        arr.push(entry[1]);
      })
      return {

        errorMessage: nextProps.errorMessage,
        refDeclaration: nextProps.route.params.refDeclaration,
        cle: nextProps.route.params.cle,
        fusion: nextProps.fusion,
        numeroVoyage: nextProps.route.params.numeroVoyage,
        declaration: {...nextProps.route.params.declarationRI,
          historiqueCompte: nextProps.reponseData?.historiqueCompte,
          validee:""},
        delivrerMainleveeVO: {...nextProps.route.params.declarationRI,validee:""},
        decisionControle: nextProps.route.params.declarationRI?.decisionControle,
        observation: nextProps.route.params.declarationRI?.observation,
        sousReservePaiementMLV: nextProps.route.params.sousReservePaiementMLV,
        infoEcorScelle: nextProps.route.params.declarationRI?.infoEcorScelle,
        infoEcorScelleF: nextProps.route.params.declarationRI?.infoEcorScelle,
        delivred:false,
        listeNombreDeScelles:arr
      }
    }

    /*   if (
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
       }*/

    if (nextProps.fusion) {

      return {
        fusion: nextProps.fusion,
        delivrerMainleveeVO: {...prevState.delivrerMainleveeVO,...nextProps.data.jsonVO},
        errorMessage: nextProps.errorMessage ? nextProps.errorMessage : prevState.errorMessage,
        // infoEcorScelleF:nextProps.data?.jsonVO?.infoEcorScelle
        // delivred: prevState.infoEcorScelleF===true||prevState.infoEcorScelleF===false?false:prevState.delivred,
        infoEcorScelleF:typeof nextProps.data?.jsonVO?.infoEcorScelle !=="undefined"?nextProps.data?.jsonVO.infoEcorScelle:nextProps.route.params.declarationRI?.infoEcorScelle
        //  declaration: {...nextProps.route.params.declarationRI, historiqueCompte: nextProps.reponseData?.historiqueCompte},
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
        libelle: translate('newmlv.delivrerMainlevee.listeD17D20.reference'),
        width: 290,
      },
      {
        code: 'dateCreation',
        libelle: translate('newmlv.delivrerMainlevee.listeD17D20.dateCreation'),
        width: 290,
      },
      {
        code: 'numeroVersionCourante',
        libelle: translate(
            'newmlv.delivrerMainlevee.listeD17D20.numeroVersion',
        ),
        width: 290,
      },
    ];
  };

  buildApurementD17D20TableColumns = () => {
    return [
      {
        code: 'referenceEnregistrement',
        libelle: translate(
            'newmlv.delivrerMainlevee.listeDeclarationsApurementD17D20.reference',
        ),
        width: 290,
      },
      {
        code: 'dateCreation',
        libelle: translate(
            'newmlv.delivrerMainlevee.listeDeclarationsApurementD17D20.dateCreation',
        ),
        width: 290,
      },
      {
        code: 'numeroVersionCourante',
        libelle: translate(
            'newmlv.delivrerMainlevee.listeDeclarationsApurementD17D20.numeroVersion',
        ),
        width: 290,
      },
    ];
  };

  renderBoxItem = ({item}) => {
    const itemStyle =
        item === this.state.selectedScelle
            ? styles.selectedBoxItem
            : styles.boxItem;
    const itemTextStyle =
        item === this.state.selectedScelle
            ? styles.selectedBoxItemText
            : styles.boxItemText;

    return (
        <View style={itemStyle}>
          <TouchableOpacity
              disabled={this.state.isConsultation}
              onPress={() =>
                  this.setState({
                    ...this.state,
                    selectedScelle: item,
                  })
              }>
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
              title={translate('newmlv.title')}
              subtitle={translate('newmlv.delivrerMainlevee.title')}
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
            {this.state.errorMessage != null  &&this.state.errorMessage != ''  && (
                <ComBadrErrorMessageComp
                    message={[].concat(
                        //  this.props.errorMessage,
                        this.state.errorMessage,

                    )}
                />
            )}
            {(!_.isEmpty(
                    this.props.successMessage?.filter((elt) => {
                      return elt != '';
                    }),
                ) ||
                !_.isEmpty(
                    this.state.messagesInfo?.filter((elt) => {
                      return elt != '';
                    }),
                )) && (
                <ComBadrInfoMessageComp
                    message={[].concat(
                        this.props.successMessage,
                        this.state.messagesInfo,
                    )}
                />
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
                      {translate('newmlv.refDroitTaxGaran')}
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
                    <ComBadrLibelleComp withColor={false}>
                      {this.state.cle}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={1}>
                    <ComBadrLibelleComp withColor={false}>
                      {this.state.numeroVoyage}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={4}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('newmlv.refPaiementAmend')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={false}>
                      {delivrerMainleveeVO.paiement}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                {/*    <Row style={CustomStyleSheet.whiteRow}>
                                <Col size={10} />
                                <Col size={4}>
                                    <ComBadrLibelleComp withColor={true}>
                                        {translate('newmlv.mainleveeSousReservePaiement')}
                                    </ComBadrLibelleComp>
                                </Col>
                                <Col size={2} />
                            </Row>*/}
              </Grid>
            </ComBadrCardBoxComp>

            <View style={styles.flexDirectionRow}>
              <Text style={styles.libelleL}>
                {translate('newmlv.delivrerMainlevee.secondTitle')}
              </Text>
            </View>

            {/* Annotations */}
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp
                  title={translate('newmlv.delivrerMainlevee.annotations.title')}>
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
                      'newmlv.delivrerMainlevee.listeDocumentsExigibles.title',
                  )}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={3}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.listeDocumentsExigibles.documentAnnexe',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.listeDocumentsExigibles.portee',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.listeDocumentsExigibles.numArticle',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.listeDocumentsExigibles.reconnu',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.listeDocumentsExigibles.dConsignation',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={1}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.listeDocumentsExigibles.laisserPasser',
                        )}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={2}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.listeDocumentsExigibles.decisionOrganismeControle',
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
                              <ComBadrLibelleComp withColor={false}>
                                {item.docAnnexe}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                              <ComBadrLibelleComp withColor={false}>
                                {item.portee}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                              <ComBadrLibelleComp withColor={false}>
                                {item.narticle}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                              <Checkbox
                                  color={primaryColor}
                                  status={item.reconnu ? 'checked' : 'unchecked'}
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
                      'newmlv.delivrerMainlevee.redressementOperes.title',
                  )}>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Text>{delivrerMainleveeVO.redressementsOperes}</Text>
                </Row>
              </ComAccordionComp>
            </ComBadrCardBoxComp>

            {/* Motivations */}
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp
                  title={translate('newmlv.delivrerMainlevee.motivations.title')}>
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
                  title={translate('newmlv.delivrerMainlevee.decision.title')}>
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
                            value={delivrerMainleveeVO.redressement}>
                          <View style={styles.decisionContainerRB}>
                            <Text style={styles.textRadio}>
                              {translate(
                                  'newmlv.delivrerMainlevee.decision.redressementAvecContentieux',
                              )}
                            </Text>
                            <RadioButton
                                disabled
                                color={styles.textRadio.color}
                                value="1"
                            />
                          </View>
                          <View style={styles.decisionContainerRB}>
                            <Text style={styles.textRadio}>
                              {translate(
                                  'newmlv.delivrerMainlevee.decision.redressementSansContentieux',
                              )}
                            </Text>
                            <RadioButton
                                disabled
                                color={styles.textRadio.color}
                                value="2"
                            />
                          </View>
                        </RadioButton.Group>
                      </View>
                    </Col>
                    <Col size={1} style={styles.checkboxCol}>
                      <Checkbox
                          disabled
                          color={primaryColor}
                          status={
                            delivrerMainleveeVO.suggererVisite
                                ? 'checked'
                                : 'unchecked'
                          }
                          // disabled={this.state.isConsultation}
                          onPress={() => {
                            this.setChoiceDocAnnexe(DEMANDE_CONSIGNATION);
                          }}
                      />
                      <Text>
                        {translate(
                            'newmlv.delivrerMainlevee.decision.suggererVisitePhysique',
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
                      'newmlv.delivrerMainlevee.constationMarchandise.title',
                  )}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.constationMarchandise.numeroBulletinReception',
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
                            'newmlv.delivrerMainlevee.constationMarchandise.etatChargement',
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
                  title={translate('newmlv.delivrerMainlevee.annotations.title')}>
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
                        <View>
                          <Checkbox
                              color={primaryColor}
                              status={
                                delivrerMainleveeVO.avecPesage
                                    ? 'checked'
                                    : 'unchecked'
                              }
                              onPress={() => {
                                this.setState({
                                  delivrerMainleveeVO: {
                                    ...this.state.delivrerMainleveeVO,
                                    avecPesage: !this.state?.delivrerMainleveeVO
                                        ?.avecPesage,
                                  },
                                });
                              }}
                          />
                        </View>
                        <Paragraph>
                          {translate(
                              'newmlv.delivrerMainlevee.annotations.avecPesage',
                          )}
                        </Paragraph>
                      </View>
                    </TouchableRipple>
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
                        <View>
                          <Checkbox
                              color={primaryColor}
                              status={
                                delivrerMainleveeVO.avecScanner
                                    ? 'checked'
                                    : 'unchecked'
                              }
                              onPress={() => {
                                this.setState({
                                  delivrerMainleveeVO: {
                                    ...this.state.delivrerMainleveeVO,
                                    avecScanner: !this.state?.delivrerMainleveeVO
                                        ?.avecScanner,
                                  },
                                });
                              }}
                          />
                        </View>
                        <Paragraph>
                          {translate(
                              'newmlv.delivrerMainlevee.annotations.avecScanner',
                          )}
                        </Paragraph>
                      </View>
                    </TouchableRipple>
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
                        <View>
                          <Checkbox
                              color={primaryColor}
                              status={
                                delivrerMainleveeVO.sansSortie
                                    ? 'checked'
                                    : 'unchecked'
                              }
                              onPress={() => {
                                this.setState({
                                  delivrerMainleveeVO: {
                                    ...this.state.delivrerMainleveeVO,
                                    sansSortie: !this.state?.delivrerMainleveeVO
                                        ?.sansSortie,
                                  },
                                });
                              }}
                          />
                        </View>
                        <Paragraph>
                          {translate(
                              'newmlv.delivrerMainlevee.annotations.sansSortie',
                          )}
                        </Paragraph>
                      </View>
                    </TouchableRipple>
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
                        <View>
                          <Checkbox
                              color={primaryColor}
                              status={
                                delivrerMainleveeVO.sousEscorteGendarmerie
                                    ? 'checked'
                                    : 'unchecked'
                              }
                              onPress={() => {
                                this.setState({
                                  delivrerMainleveeVO: {
                                    ...this.state.delivrerMainleveeVO,
                                    sousEscorteGendarmerie: !this.state
                                        ?.delivrerMainleveeVO?.sousEscorteGendarmerie,
                                  },
                                });
                              }}
                          />
                        </View>
                        <Paragraph>
                          {translate(
                              'newmlv.delivrerMainlevee.annotations.sousEscorteGendarmerie',
                          )}
                        </Paragraph>
                      </View>
                    </TouchableRipple>
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
                        <View>
                          <Checkbox
                              color={primaryColor}
                              status={
                                delivrerMainleveeVO.sousEscorteDouane
                                    ? 'checked'
                                    : 'unchecked'
                              }
                              onPress={() => {
                                this.setState({
                                  delivrerMainleveeVO: {
                                    ...this.state.delivrerMainleveeVO,
                                    sousEscorteDouane: !this.state
                                        ?.delivrerMainleveeVO?.sousEscorteDouane,
                                  },
                                });
                              }}
                          />
                        </View>
                        <Paragraph>
                          {translate(
                              'newmlv.delivrerMainlevee.annotations.sousEscorteDouane',
                          )}
                        </Paragraph>
                      </View>
                    </TouchableRipple>
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
                        <View>
                          <Checkbox
                              color={primaryColor}
                              status={
                                delivrerMainleveeVO.pourEntrepesage
                                    ? 'checked'
                                    : 'unchecked'
                              }
                              onPress={() => {
                                this.setState({
                                  delivrerMainleveeVO: {
                                    ...this.state.delivrerMainleveeVO,
                                    pourEntrepesage: !this.state
                                        ?.delivrerMainleveeVO?.pourEntrepesage,
                                  },
                                });
                              }}
                          />
                        </View>
                        <Paragraph>
                          {translate(
                              'newmlv.delivrerMainlevee.annotations.pourEntrepesage',
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
                      'newmlv.delivrerMainlevee.informationsEcor.title',
                  )}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={30}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.informationsEcor.scellesConfirmationEntree',
                        )}
                      </ComBadrLibelleComp>
                    </Col>

                    <Col size={70} style={styles.boxContainer}>
                      <SafeAreaView style={styles.boxSafeArea}>
                        {(delivrerMainleveeVO.scellesConfirmationEntree == null ||
                            delivrerMainleveeVO.scellesConfirmationEntree.size ===
                            0) && (
                            <Text style={styles.boxItemText}>Aucun élément</Text>
                        )}

                        {delivrerMainleveeVO.scellesConfirmationEntree != null &&
                            delivrerMainleveeVO.scellesConfirmationEntree.size !==
                            0 && (
                                <FlatList
                                    data={Object.values(
                                        delivrerMainleveeVO.scellesConfirmationEntree,
                                    )}
                                    renderItem={(item) => this.renderBoxItem(item)}
                                    keyExtractor={(item) => item}
                                    nestedScrollEnabled={true}
                                />
                            )}
                      </SafeAreaView>
                    </Col>
                  </Row>

                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={30}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.informationsEcor.nouveauxScelles',
                        )}
                      </ComBadrLibelleComp>
                    </Col>

                    <Col size={10}>
                      <RadioButton
                          color={primaryColor}
                          disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                          value={
                            this.state.infoEcorScelle === true ? 'true' : 'false'
                          }
                          status={
                            this.state.infoEcorScelle === true
                                ? 'checked'
                                : 'unchecked'
                          }
                          onPress={() =>
                              this.setState({

                                infoEcorScelle:true
                              })
                          }
                      />
                    </Col>

                    <Col size={10} style={style.labelContainer}>
                      <Text style={style.labelTextStyle}>
                        {translate(
                            'newmlv.delivrerMainlevee.informationsEcor.oui',
                        )}
                      </Text>
                    </Col>

                    <Col size={10}>
                      <RadioButton
                          color={primaryColor}
                          disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                          value={
                            this.state.infoEcorScelle === false ? 'true' : 'false'
                          }
                          status={
                            this.state.infoEcorScelle === false
                                ? 'checked'
                                : 'unchecked'
                          }
                          onPress={() =>
                              this.setState({

                                infoEcorScelle:false
                              })

                          }
                      />
                    </Col>

                    <Col size={10} style={style.labelContainer}>
                      <Text style={style.labelTextStyle}>
                        {translate(
                            'newmlv.delivrerMainlevee.informationsEcor.non',
                        )}
                      </Text>
                    </Col>

                    <Col size={40} />
                  </Row>

                  {this.state.infoEcorScelle && (
                      <View>
                        <Row style={CustomStyleSheet.whiteRow}>
                          <Col size={1}>
                            <TextInput
                                mode={'outlined'}
                                maxLength={8}

                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                                value={delivrerMainleveeVO.numeroPince}
                                label={translate(
                                    'newmlv.delivrerMainlevee.informationsEcor.numeroPince',
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
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                                value={delivrerMainleveeVO.nombreDeScelles}
                                label={translate(
                                    'newmlv.delivrerMainlevee.informationsEcor.nombreScelles',
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
                                  'newmlv.delivrerMainlevee.informationsEcor.generateurScelle',
                              )}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col size={2}>
                            <ComBadrNumericTextInputComp
                                onRef={(input) => {
                                  this.generateurNumScelleDu = input;
                                }}
                                maxLength={8}
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
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
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
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
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                                compact="true"
                                onPress={this.genererNumeroScelle}>
                              {translate('transverse.Ok')}
                            </Button>
                          </Col>
                          <Col size={2} />
                        </Row>
                        <Row
                            style={[
                              CustomStyleSheet.whiteRow,
                              styles.rowListNumScelle,
                            ]}>
                          <Col size={5}>
                            <ComBadrNumericTextInputComp
                                onRef={(input) => {
                                  this.numeroScelleInput = input;
                                }}
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                                maxLength={8}
                                value={this.numeroScelle}
                                label={translate(
                                    'newmlv.delivrerMainlevee.informationsEcor.numeroScelle',
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
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                                mode="contained"
                                compact="true"
                            />
                            <Button
                                onPress={this.deleteNumeroScelle}
                                icon="delete"
                                mode="contained"
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
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

                        <Row>
                          <Col size={30} style={style.labelContainer}>
                            <ComBadrLibelleComp withColor={true}>
                              {translate(
                                  'newmlv.delivrerMainlevee.informationsEcor.transporteurExploitantMEAD',
                              )}
                            </ComBadrLibelleComp>
                          </Col>
                          <Col size={70}>
                            <ComBadrAutoCompleteChipsComp
                                placeholder={translate(
                                    'newmlv.delivrerMainlevee.informationsEcor.choisirValeur'
                                )}
                                code="code"
                                disabled={this.state.infoEcorScelleF===true||this.state.infoEcorScelleF===false}
                                selected={this.state.delivrerMainleveeVO?.libelleOperateurScelle}
                                maxItems={3}
                                libelle="libelle"
                                command="getCmbOperateur"
                                onDemand={true}
                                searchZoneFirst={false}

                                onValueChange={(item, id) =>this.handleOperateurChanged(item)}
                            />

                            {(this.props.readOnly) && <TextInput
                                value={this.props.transporteurExploitantMEADAutoAchemin?.libelle }
                                disabled={true}
                            />}
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
                      'newmlv.delivrerMainlevee.dedouanementRemorque.title',
                  )}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col size={1}>
                      <TextInput
                          mode={'outlined'}
                          maxLength={8}
                          value={delivrerMainleveeVO.numeroCarnetTIR}
                          label={translate(
                              'newmlv.delivrerMainlevee.dedouanementRemorque.carnetTir',
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
                              'newmlv.delivrerMainlevee.dedouanementRemorque.carnetAta',
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
                              'newmlv.delivrerMainlevee.dedouanementRemorque.dechargeAquitCaution',
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
                  title={translate('newmlv.delivrerMainlevee.transit.title')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={1}>
                      <TextInput
                          mode={'outlined'}
                          maxLength={8}
                          value={delivrerMainleveeVO.delaiAcheminement}
                          label={
                              translate(
                                  'newmlv.delivrerMainlevee.transit.delaiAcheminement',
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
                  title={translate('newmlv.delivrerMainlevee.conteneurs.title')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow} size={100}>
                    <Col size={30}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate(
                            'newmlv.delivrerMainlevee.conteneurs.conteneursCibles',
                        )}
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
                  title={translate('newmlv.delivrerMainlevee.listeD17D20.title')}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow} size={100}>
                    <Col size={100}>
                      <ComBasicDataTableComp
                          onRef={(ref) => (this.d17d20Table = ref)}
                          id="d17d20Table"
                          hasId={false}
                          rows={
                            delivrerMainleveeVO.declarationsTryptique
                                ? delivrerMainleveeVO.declarationsTryptique
                                : []
                          }
                          cols={this.buildD17D20TableColumns()}
                          totalElements={
                            delivrerMainleveeVO.declarationsTryptique
                                ? delivrerMainleveeVO.declarationsTryptique.length
                                : 0
                          }
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
                  title={translate(
                      'newmlv.delivrerMainlevee.listeDeclarationsApurementD17D20.title',
                  )}>
                <Grid>
                  <Row style={CustomStyleSheet.lightBlueRow} size={100}>
                    <Col size={100}>
                      <ComBasicDataTableComp
                          onRef={(ref) => (this.apurementd17d20Table = ref)}
                          id="apurementd17d20Table"
                          hasId={false}
                          rows={
                            delivrerMainleveeVO.declarationsApurementTryptique
                                ? delivrerMainleveeVO.declarationsApurementTryptique
                                : []
                          }
                          cols={this.buildApurementD17D20TableColumns()}
                          totalElements={
                            delivrerMainleveeVO.declarationsApurementTryptique
                                ? delivrerMainleveeVO.declarationsApurementTryptique
                                    .length
                                : 0
                          }
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
              {!this.state.fusion && (
                  <ComBadrButtonComp
                      style={styles.actionBtn}
                      onPress={() => {
                        //   this.sauvgarderValider('sauvegarderRI');
                        this.validerMainLevee();
                      }}
                      text={translate('newmlv.validerMainlevee')}
                      //disabled={this.state.decisionControle ? false : true}

                  />
              )}
              {(!this.state.delivred||(this.state.infoEcorScelleF!==true&&this.state.infoEcorScelleF!==false))&&(<ComBadrButtonComp
                      style={styles.actionBtn}
                      onPress={() => {
                        // this.sauvgarderValider('validerRI');
                        this.delivrerMainLevee();
                      }}
                      text={translate('newmlv.delivrerMainlevee.title')}

                  />
              )}
            </View>
          </ComContainerComp>
        </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

function mapStateToProps(state) {
  return {...state.mlvDelivrerReducer};
}

export default connect(mapStateToProps, mapDispatchToProps)(DelivrerMLV);
