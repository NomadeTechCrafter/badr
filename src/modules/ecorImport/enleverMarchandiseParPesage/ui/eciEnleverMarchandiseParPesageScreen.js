import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';

import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonIconComp,
  ComBadrCardBoxComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrLibelleComp,
  ComBadrModalComp,
  ComBadrPickerComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
  ComContainerComp,
  ComBadrDialogComp,
  ComBadrNumericTextInputComp,
} from '../../../../commons/component';
import {IconButton, TextInput, FAB} from 'react-native-paper';
import {Col, Grid, Row} from 'react-native-easy-grid';
/**i18n */
import {translate} from '../../../../commons/i18n/ComI18nHelper';
import {
  CustomStyleSheet,
  primaryColor,
  accentColor,
} from '../../../../commons/styles/ComThemeStyle';
import _ from 'lodash';
import Utils from '../../../../commons/utils/ComUtils';
import {load} from '../../../../commons/services/async-storage/ComStorageService';
import {connect} from 'react-redux';
import style from '../../../referentiel/plaquesImmatriculation/style/refPlaquesImmStyle';
import {getValueByPath} from '../../../dedouanement/redressement/utils/DedUtils';
import {request, requestModal, init} from '../state/actions/eciEnleverMarchandiseParPesageAction';
import {
  GENERIC_CLOSE_MODAL,
  GENERIC_ECI_INIT,
  GENERIC_ECI_REQUEST,
  GENERIC_OPEN_MODAL,
} from '../state/eciEnleverMarchandiseParPesageConstants';
import ComUtils from '../../../../commons/utils/ComUtils';
import moment from 'moment';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';

import EciDeclarationEnDetailBlock from './blocks/EciDeclarationEnDetailBlock';
import EciMainleveeBlock from './blocks/EciMainleveeBlock';
import EciListEnlevementsEffectuesBlock from './blocks/EciListEnlevementsEffectuesBlock';
import EciReferenceDeclarationBlock from './blocks/EciReferenceDeclarationBlock';
const screenHeight = Dimensions.get('window').height;
const champsObligatoire = [
  'lieuStockage',
  'nombreContenant',
  'numeroBonSortie',
  'gestionnaireEnceinte',
  'immatriculationsVehicules',
  'dateEffectiveEnlevement',
  'heureEffectiveEnlevement',
  'pontBaculePesage',
  'tarePesage',
  'poidsBrutPesage',
];
class EciEnleverMarchandiseParPesageScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      enleverMarchandiseVO: props.route.params.declarationRI,
      showEnlevements: false,
      isUpdateMode: false,
      showPopUpLots: false,
      listLotsCols: this.listLotsCols(),
      listEquipementLotsCols: this.listEquipmentLotsCols(),
      selectedLot: {},
      newEcorItem: {},
      IsChampsAddEnlevementsValid: true,
      isActionMenuOpen: false,
      suppDialogVisibility: false,
      indexEditItem:null,
      indexsSuppItem: null,
      isConsultationMode: false,
    };
  }

  componentDidMount() {
    load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
  }
  onCloseAddEnlevements = () => {
    this.setState({
      showEnlevements: false,
    });
  };
  hideSuppDialog = () => {
    this.setState({
      suppDialogVisibility: false,
    });
  };
  onRestAddEnlevements = () => {
    this.comboLieuStockage.clearInput();
    //this.acOperateur.clearInput();
    /*this.nombreContenant.clear();
      this.numeroBonSortie.clear();*/
    this.setState({
      ...this.state,
      selectedLot: {
        ...this.state.selectedLot,
        nombreContenant: '',
        gestionnaireEnceinte: {
          identifiantOperateur: '',
          nomOperateur: '',
        },
        immatriculationsVehicules: '',
        numeroBonSortie: '',
        dateEffectiveEnlevement: '',
        heureEffectiveEnlevement: '',
        pontBaculePesage ,
        tarePesage:'',
        poidsBrutPesage:'',
      },
    });
  };
  selectedLotChanged = (row, index) => {
    if (row) {
      this.setState({selectedLot: row});
    }
  };
  selectedEquipmentLotChanged = (row, index) => {
    if (row) {
      //this.setState({selectedLot: row});
    }
  };
  validerChoixLot = () => {
    let lot = this.state.selectedLot;
    let referenceDSTab = lot.referenceDS.split('-');
    this.setState({
      selectedLot: {
        referenceLot: lot.referenceLot,
        lieuChargement: {
          codeLieuChargement: lot.codeLieuChargement,
          descriptionLieuChargement: lot.lieuChargement,
        },
        referenceDS: {
          identifiantDS: "449061",
          refBureauDouane: {
            codeBureau: referenceDSTab[0],
            nomBureauDouane: ComSessionService.getInstance().getNomBureauDouane(),
          },
          refTypeDS: {
            codeTypeDS: lot.codeTypeDS,
            descriptionTypeDS: lot.typeDS,
          },
          anneeEnregistrement: referenceDSTab[2],
          regime: referenceDSTab[1],
          numeroSerieEnregistrement: referenceDSTab[3],
          cle: ComUtils.cleDS(
            referenceDSTab[1] + referenceDSTab[3] + referenceDSTab[2],
          ),
        },
        marque: lot.marques,
        nature: lot.natureMarchandise,
      },
    });
    this.getListeEquipementLots(lot);
    this.onCloseModal();
  };
  listLotsCols = () => {
    return [
      {
        code: '',
        libelle: translate('at.apurement.selectionner'),
        width: 100,
        component: 'radio',
        action: (row, index) => this.selectedLotChanged(row, index),
      },
      {
        code: 'typeDS',
        libelle: translate('transverse.typeDS'),
        width: 80,
      },
      {
        code: 'referenceDS',
        libelle: translate('transverse.refDS'),
        width: 200,
      },
      {
        code: 'render',
        libelle: translate('ecorimport.popUpListeLotApures.natureMarchandise'),
        width: 150,
        render: (row) => {
          return row.lieuChargement + '.' + row.referenceLot;
        },
      },
      {
        code: 'natureMarchandise',
        libelle: translate('ecorimport.popUpListeLotApures.natureMarchandise'),
        width: 150,
      },
      {
        code: 'nombreColis',
        libelle: translate('ecorimport.enleverMarchandise.nombreColis'),
        width: 100,
      },
      {
        code: 'marques',
        libelle: translate('ecorimport.popUpListeLotApures.marques'),
        width: 100,
      },
    ];
  };
  listEquipmentLotsCols = () => {
    return [
      {
        code: '',
        libelle: '',
        width: 100,
        component: 'checkbox',
        action: (row, index) => this.selectedEquipmentLotChanged(row, index),
      },
      {
        code: 'identifiantEquipement',
        libelle: translate('ecorimport.listeEquipementsLot.refEquipement'),
        width: 200,
      },
      {
        code: 'ligneLotVO.libelleTypeContenant',
        libelle: translate('ecorimport.listeEquipementsLot.typeEquipement'),
        width: 200,
      },
      {
        code: 'tareEquipement',
        libelle: translate('ecorimport.listeEquipementsLot.tareEquipement'),
        width: 150,
      },
      {
        code: 'render',
        width: 200,
        render: (row) => {
          return this.state.selectedLot.dateHeureEnlevement;
        },
        libelle: translate(
          'ecorimport.listeEquipementsLot.dateHeureEnlevement',
        ),
      },
    ];
  };
  getListeLotsApures = () => {
    this.props.dispatch(requestModal({type: GENERIC_OPEN_MODAL, value: {}}));
    let identifiant = getValueByPath(
      'referenceDED.indentifiant',
      this.state.enleverMarchandiseVO,
    );
    this.callRedux({
      command: 'getLotsApures',
      typeService: 'SP',
      jsonVO: identifiant,
    });
  };
  getListeEquipementLots = (selectedRow) => {
    let data = Utils.deepDelete(selectedRow, [
      '$$hashKey',
      'isRowSelected',
      'nombreColis',
      'idLigne',
      'selected',
      'refEquipementEnleve',
    ]);
    this.callRedux({
      command: 'getEquipementsbyLot',
      typeService: 'SP',
      jsonVO: data,
    });
  };
  validerAjout = () => {
    console.log('valider Ajout');


    if (this.testIsChampsValid(champsObligatoire) === true) {
      console.log('IsChampsValid selectedLot', this.state.selectedLot);
      let acteurInterneEnlevement = {
        idActeur: ComSessionService.getInstance().getLogin(),
        nom: ComSessionService.getInstance().getUserObject().nomAgent,
        prenom: ComSessionService.getInstance().getUserObject().prenomAgent,
        refBureau: {
          codeBureau: ComSessionService.getInstance().getCodeBureau(),
          nomBureauDouane: ComSessionService.getInstance().getNomBureauDouane(),
        },
      };

      let acteurInternePesage = {
        idActeur: ComSessionService.getInstance().getLogin(),
        nom: ComSessionService.getInstance().getUserObject().nomAgent,
        prenom: ComSessionService.getInstance().getUserObject().prenomAgent,
        refBureau: {
          codeBureau: ComSessionService.getInstance().getCodeBureau(),
          nomBureauDouane: ComSessionService.getInstance().getNomBureauDouane(),
        },
      };

      let refEquipementEnleve = this.chargerListeEquipementsLot(this.state.selectedLot.refEquipementEnleve);
      this.setState(
        {
          ...this.state,
          showEnlevements: false,
          enleverMarchandiseVO: {
            ...this.state.enleverMarchandiseVO,
            refMarchandiseEnlevee: [
              ...this.state.enleverMarchandiseVO.refMarchandiseEnlevee,
              {
                ...this.state.selectedLot,
                refEquipementEnleve: refEquipementEnleve,
                acteurInterneEnlevement: acteurInterneEnlevement,
                acteurInternePesage: acteurInternePesage,
                dateHeureEffectiveEnlevement: this.state.selectedLot.dateEffectiveEnlevement + " " + this.state.selectedLot.heureEffectiveEnlevement,
                allRefEquipementEnleve : [],
              },
            ],
          },
        },
        () =>
          console.log(
            'enleverMarchandiseVO',
            JSON.stringify(this.state.enleverMarchandiseVO),
          ),
      );
    }
  };
  validerUpdate = () => {
    console.log('valider update');
    if (this.testIsChampsValid(champsObligatoire) === true) {
      const currentIndex = _.findIndex(
        this.state.enleverMarchandiseVO.refMarchandiseEnlevee,
        ['id', this.state.selectedLot.id],
      );
      console.log('currentIndex----', currentIndex);
      const myNewArray = Object.assign(
        [...this.state.enleverMarchandiseVO.refMarchandiseEnlevee],
        {
          [this.state.indexEditItem]: this.state.selectedLot,
        },
      );
      this.setState(
        {
          ...this.state,
          showEnlevements: false,
          enleverMarchandiseVO: {
            ...this.state.enleverMarchandiseVO,
            refMarchandiseEnlevee: myNewArray,
          },
        },
        () =>
          console.log(
            'enleverMarchandiseVO after update',
            JSON.stringify(this.state.enleverMarchandiseVO),
          ),
      );
    }
  };
  testIsChampsValid = (champsObligatoire) => {
    let isChampsValid = true;
    _.forEach(champsObligatoire, (field) => {
      console.log('champsObligatoire', field);
      if (this.hasErrors(field)) {
        this.setState({
          ...this.state,
          IsChampsAddEnlevementsValid: false,
        });
        isChampsValid = false;
        return false;
      }
    });
    return isChampsValid;
  };
  hasErrors = (field) => {
    return _.isEmpty(this.state.selectedLot[field]);
  };
  addEnlevement = () => {
    this.props.dispatch(
      init({type: GENERIC_ECI_INIT, value: {command: 'getEquipementsbyLot'}}),
    );
    this.setState({
      showEnlevements: true,
      isUpdateMode: false,
      selectedLot: {},
    });
  };
  editEnlevement = (item, index) => {
    this.setState(
      {
        selectedLot: this.state.enleverMarchandiseVO.refMarchandiseEnlevee[
          index
        ],
      },
      () => this.initEditEnlevement(this.state.selectedLot),
    );
    this.setState({showEnlevements: true, isUpdateMode: true, indexEditItem: index});
  };
  initEditEnlevement = (selectedLot) => {
    _.forEach(selectedLot.refEquipementEnleve, (equipement) => {
      equipement.isRowSelected = true;
    });

    if (selectedLot.dateHeureEffectiveEnlevement) {
      let tab = selectedLot.dateHeureEffectiveEnlevement.split(' ');
      this.setState({
        selectedLot: {
          ...this.state.selectedLot,
          dateEffectiveEnlevement: tab[0],
          heureEffectiveEnlevement: tab[1],
        },
      });
    }
  };
  chargerListeEquipementsLot = (selectedLot) => {
    _.forEach(selectedLot.refEquipementEnleve, (equipement) => {
      let equipementTemp = {
        referenceEquipement: equipement.identifiantEquipement,
        tareEquipement: equipement.tareEquipement,
        dateHeureEnlevement: '',
        typeEquipement: equipement?.ligneLotVO?.libelleTypeContenant,
        //set row to not selected
        selected: false,
      };
      if (this.testIfEquipementDisponible(equipementTemp)) {
        return equipementTemp;
      }
      return equipement;
    });
  };
  testIfEquipementDisponible = (equipement) => {
    let res = true;
    _.forEach(
      this.state.enleverMarchandiseVO.refMarchandiseEnlevee,
      (value) => {
        _.forEach(value.refEquipementEnleve, (value) => {
          if (value.referenceEquipement === equipement.referenceEquipement) {
            res = false;
          }
        });
      },
    );
    return res;
  };
  deleteEnlevement = () => {
    let enleverMarchandiseVO = {...this.state.enleverMarchandiseVO};
    enleverMarchandiseVO.refMarchandiseEnlevee.splice(
      this.state.indexsSuppItem,
      1,
    );
    this.setState({
      enleverMarchandiseVO: enleverMarchandiseVO,
      suppDialogVisibility: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {}
  onActionMenuStateChange = () => {
    this.setState({isActionMenuOpen: !this.state.isActionMenuOpen});
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    let getEquipementsbyLot =
      nextProps.picker && nextProps.picker.getEquipementsbyLot
        ? nextProps.picker.getEquipementsbyLot
        : null;

    if (
      !_.isEmpty(getEquipementsbyLot) &&
      prevState.selectedLot.refEquipementEnleve !== getEquipementsbyLot.data
    ) {
      console.log('getDerivedStateFromProps--- 2', getEquipementsbyLot.data);
      return {
        selectedLot: {
          ...prevState.selectedLot,
          refEquipementEnleve: getEquipementsbyLot.data,
        },
      };
    }
    return null;
  }

  confirmerEcor = () => {
    console.log('confirmer ecor -----');
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState({IsChampsAddEnlevementsValid: true});
    let data = Utils.deepDelete(this.state.enleverMarchandiseVO, [
      '$$hashKey',
      'defaultConverter',
      'isRowSelected',
    ]);
    delete data.referenceDED.regime;
    data.referenceDED.numeroOrdreVoyage = this.state.numeroVoyage;
    _.forEach(data.refMarchandiseEnlevee, (MarchandiseEnlevee, index) => {
      _.forEach(
        MarchandiseEnlevee.refEquipementEnleve,
        (equipement, indexEq) => {
          let equipementTemp = {
            referenceEquipement: equipement.identifiantEquipement,
            tareEquipement: equipement.tareEquipement,
            dateHeureEnlevement: '',
            typeEquipement: equipement?.ligneLotVO?.libelleTypeContenant,
          };
          data.refMarchandiseEnlevee[index].refEquipementEnleve[
            indexEq
          ] = equipementTemp;
        },
      );
    });
    console.log('confirmer ecor sent data-----', JSON.stringify(data));
    this.callRedux({
      command: 'enleverMarchandiseParPesage',
      typeService: 'UC',
      module:'ECI_LIB',
      jsonVO: data,
    });
  };
  render() {
    const {
      enleverMarchandiseVO,
      refDeclaration,
      cle,
      numeroVoyage,
      isActionMenuOpen,
      selectedLot,
      isConsultationMode,
    } = this.state;
    // console.log('in render selectedLot ', JSON.stringify(selectedLot));
    let lotsApures = this.extractCommandData('getLotsApures');
    /*console.log(
      'equipementsbyLot----',
      this.extractCommandData('getEquipementsbyLot'),
    );*/
    //let equipementsbyLot = this.extractCommandData('getEquipementsbyLot');

    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('ecorimport.title')}
          subtitle={translate('ecorimport.enleverMarchandiseParPesage.title')}
          icon="menu"
        />
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.showProgress && <ComBadrProgressBarComp />}

          {!_.isEmpty(this.extractCommandData('enleverMarchandiseParPesage')) &&
            !_.isEmpty(
              this.extractCommandData('enleverMarchandiseParPesage').successMessage,
            ) && (
              <ComBadrInfoMessageComp
                message={
                this.extractCommandData('enleverMarchandiseParPesage').successMessage
                }
              />
            )}

          {!_.isEmpty(this.extractCommandData('enleverMarchandiseParPesage')) &&
            !_.isEmpty(
              this.extractCommandData('enleverMarchandiseParPesage').errorMessage,
            ) && (
            <ComBadrErrorMessageComp
                message={
                this.extractCommandData('enleverMarchandiseParPesage').errorMessage
                }
              />
            )}
          {/* Référence déclaration */}
          <EciReferenceDeclarationBlock
            enleverMarchandiseVO={enleverMarchandiseVO}
            refDeclaration={refDeclaration}
            cle={cle}
            numeroVoyage={numeroVoyage}
          />
          {/* Affichge du bloc initiale */}
          {!this.state.showEnlevements && (
            <View>
              {/* Accordion Déclaration en Détail*/}
              <EciDeclarationEnDetailBlock
                enleverMarchandiseVO={enleverMarchandiseVO}
              />

              {/*Accordion Mainlevée*/}
              <EciMainleveeBlock enleverMarchandiseVO={enleverMarchandiseVO} />

              {/*Accordion Liste des Enlevements Effectues*/}
              <EciListEnlevementsEffectuesBlock
                enleverMarchandiseVO={enleverMarchandiseVO}
                IsConsultationMode={isConsultationMode}
                addEnlevement={this.addEnlevement}
                editEnlevement={(item, index) =>
                  this.editEnlevement(item, index)
                }
                deleteEnlevement={(item, index) =>
                  this.setState({
                    indexsSuppItem: index,
                    suppDialogVisibility: true,
                  })
                }
              />
            </View>
          )}
          <ComBadrDialogComp
            title={translate('transverse.suppressionTitre')}
            confirmMessage={translate('transverse.confirmer')}
            cancelMessage={translate('transverse.annuler')}
            dialogMessage={translate('transverse.supprimerLigne')}
            onCancel={this.hideSuppDialog}
            onOk={this.deleteEnlevement}
            dialogVisibility={this.state.suppDialogVisibility}
          />
          {this.state.showEnlevements && (
            <View style={CustomStyleSheet.fullContainer}>
              <ComContainerComp
                ContainerRef={(ref) => {
                  this.scrollViewRefShowEnlevements = ref;
                }}>
                {this.props.showProgress && <ComBadrProgressBarComp />}

                {this.state.IsChampsAddEnlevementsValid === false && (
                  <ComBadrErrorMessageComp
                    message={translate('ecorimport.errorChampsObligatoire')}
                  />
                )}

                {/* Accordion Déclaration Sommaire */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate('ecorimport.declarationSommaire.title')}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.declarationSommaire.typeDeclaration',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'referenceDS.refTypeDS.descriptionTypeDS',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col>
                          <ComBadrButtonIconComp
                            onPress={this.getListeLotsApures}
                            icon="file-eye"
                            loading={this.props.showProgress}
                            text={translate(
                              'ecorimport.declarationSommaire.choisirLotDedouanement',
                            )}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.declarationSommaire.referenceDeclaration',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
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
                      </Row>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={2} />
                        <Col size={2}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'referenceDS.refBureauDouane.codeBureau',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'referenceDS.regime',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'referenceDS.anneeEnregistrement',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'referenceDS.numeroSerieEnregistrement',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'referenceDS.cle',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                      </Row>
                    </Grid>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>

                {/* Accordion Lot de dédouanement */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate('ecorimport.lotDedouanement.title')}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={1}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('transverse.lieuChargement')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={3}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'lieuChargement.descriptionLieuChargement',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={1}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('transverse.referenceLot')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={3}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath(
                              'referenceLot',
                              selectedLot,
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={1}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('transverse.nature')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={3}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath('nature', selectedLot)}
                          </ComBadrLibelleComp>
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={1}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('ecorimport.lotDedouanement.marque')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={3}>
                          <ComBadrLibelleComp>
                            {ComUtils.getValueByPath('marque', selectedLot)}
                          </ComBadrLibelleComp>
                        </Col>
                      </Row>
                    </Grid>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>

                {/* Accordion Marchandises Enlevées */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate('ecorimport.marchandisesEnlevees.title')}
                    extraFieldKey={translate('ecorimport.agentEcoreur')}
                    extraFieldValue={translate('ecorimport.agentEcoreur')}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.marchandisesEnlevees.lieuStockage',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <ComBadrPickerComp
                            disabled={false}
                            onRef={(ref) => (this.comboLieuStockage = ref)}
                            style={{
                              flex: 1,
                              marginLeft: -80,
                            }}
                            titleStyle={{flex: 1}}
                            key="lieuStockage"
                            cle="code"
                            libelle="libelle"
                            module="REF_LIB"
                            command="getCmbLieuStockageParBureau"
                            typeService="SP"
                            selectedValue={ComUtils.getValueByPath(
                              'lieuStockage.codeLieuStockage',
                              selectedLot,
                            )}
                            onValueChange={(
                              selectedValue,
                              selectedIndex,
                              item,
                            ) => {
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  lieuStockage: {
                                    codeLieuStockage: selectedValue,
                                    descriptionLieuStockage: item.libelle,
                                  },
                                },
                              });
                            }}
                            param={{
                              codeBureau: enleverMarchandiseVO.referenceDED.referenceEnregistrement.substring(
                                0,
                                3,
                              ),
                            }}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.enleverMarchandise.nombreColis',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <ComBadrNumericTextInputComp
                            ref={(ref) => (this.nombreContenant = ref)}
                            mode={'outlined'}
                            value={selectedLot.nombreContenant}
                            onChangeBadrInput={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  nombreContenant: text,
                                },
                              })
                            }
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={1}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.enleverMarchandise.numBonSortie',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                          <TextInput
                            ref={(ref) => (this.numeroBonSortie = ref)}
                            mode="outlined"
                            style={styles.columnThree}
                            label=""
                            value={selectedLot.numeroBonSortie}
                            onChangeText={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  numeroBonSortie: text,
                                },
                              })
                            }
                          />
                        </Col>
                        <Col size={1}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.marchandisesEnlevees.delivrePar',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={4}>
                          <ComBadrAutoCompleteChipsComp
                            onRef={(ref) => (this.acOperateur = ref)}
                            code="code"
                            disabled={false}
                            selected={
                              _.isEmpty(
                                ComUtils.getValueByPath(
                                  'gestionnaireEnceinte.nomOperateur',
                                  selectedLot,
                                ),
                              )
                                ? ''
                                : ComUtils.getValueByPath(
                                    'gestionnaireEnceinte.nomOperateur',
                                    selectedLot,
                                  ) +
                                  '(' +
                                  ComUtils.getValueByPath(
                                    'gestionnaireEnceinte.identifiantOperateur',
                                    selectedLot,
                                  ) +
                                  ')'
                            }
                            maxItems={3}
                            libelle="libelle"
                            command="getCmbOperateur"
                            onDemand={true}
                            searchZoneFirst={false}
                            onValueChange={(item) => {
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  gestionnaireEnceinte: {
                                    identifiantOperateur: item.code,
                                    nomOperateur: item.libelle,
                                  },
                                },
                              });
                            }}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.marchandisesEnlevees.immatriculationsVehicules',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <TextInput
                            mode="outlined"
                            style={styles.columnThree}
                            label=""
                            value={selectedLot.immatriculationsVehicules}
                            onChangeText={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  immatriculationsVehicules: text,
                                },
                              })
                            }
                            numberOfLines={6}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col>
                          <ComBadrDatePickerComp
                            dateFormat="DD/MM/yyyy"
                            heureFormat="HH:mm"
                            value={
                              selectedLot.dateEffectiveEnlevement
                                ? moment(
                                    selectedLot.dateEffectiveEnlevement,
                                    'DD/MM/yyyy',
                                    true,
                                  )
                                : ''
                            }
                            timeValue={
                              selectedLot.heureEffectiveEnlevement
                                ? moment(
                                    selectedLot.heureEffectiveEnlevement,
                                    'HH:mm',
                                    true,
                                  )
                                : ''
                            }
                            onDateChanged={(date) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  dateEffectiveEnlevement: date,
                                },
                              })
                            }
                            onTimeChanged={(time) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  heureEffectiveEnlevement: time,
                                },
                              })
                            }
                            labelDate={translate(
                              'ecorimport.marchandisesEnlevees.dateEffectiveEnlevement',
                            )}
                            labelHeure={translate(
                              'ecorimport.marchandisesEnlevees.heureEffectiveEnlevement',
                            )}
                            inputStyle={style.dateInputStyle}
                            readonly={false}
                          />
                        </Col>
                      </Row>
                    </Grid>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>

                {/* Accordion liste des équipement du lot */}
                {!_.isNil(selectedLot.refEquipementEnleve) && (
                  <ComBadrCardBoxComp style={styles.cardBox}>
                    <ComAccordionComp
                      title={translate('ecorimport.listeEquipementsLot.title')}
                      expanded={true}>
                      <ComBasicDataTableComp
                        rows={selectedLot.refEquipementEnleve}
                        cols={this.state.listEquipementLotsCols}
                        totalElements={selectedLot.refEquipementEnleve.length}
                        maxResultsPerPage={10}
                        paginate={true}
                      />
                    </ComAccordionComp>
                  </ComBadrCardBoxComp>
                )}
                {/* Accordion Relevé de pesage */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate('ecorimport.peserMarchandise.relevePesage.title')}
                    extraFieldKey={translate('ecorimport.agentEcoreur')}
                    extraFieldValue={translate('ecorimport.agentEcoreur')}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.peserMarchandise.relevePesage.numPontBascule',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <ComBadrNumericTextInputComp
                            ref={(ref) => (this.pontBaculePesage = ref)}
                            mode={'outlined'}
                            value={selectedLot.pontBaculePesage}
                            onChangeBadrInput={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  pontBaculePesage: text,
                                },
                              })
                            }
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.peserMarchandise.relevePesage.tares',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <ComBadrNumericTextInputComp
                            ref={(ref) => (this.tarePesage = ref)}
                            mode={'outlined'}
                            value={selectedLot.tarePesage}
                            onChangeBadrInput={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  tarePesage: text,
                                },
                              })
                            }
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate(
                              'ecorimport.peserMarchandise.relevePesage.poidsBrut',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <ComBadrNumericTextInputComp
                            ref={(ref) => (this.poidsBrutPesage = ref)}
                            mode={'outlined'}
                            value={selectedLot.poidsBrutPesage}
                            onChangeBadrInput={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  poidsBrutPesage: text,
                                },
                              })
                            }
                          />
                        </Col>
                      </Row>
                    </Grid>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>

                {/* Modal Lot Apures*/}
                {!_.isNil(lotsApures) && !_.isNil(lotsApures.data) && (
                  <ComBadrModalComp
                    visible={this.props.showListeLotsApures}
                    onDismiss={this.onCloseModal}>
                    <ComAccordionComp
                      title={translate('ecorimport.popUpListeLotApures.title')}
                      expanded={true}>
                      <ComBasicDataTableComp
                        rows={lotsApures.data}
                        cols={this.state.listLotsCols}
                        totalElements={lotsApures.data.length}
                        maxResultsPerPage={10}
                        paginate={true}
                      />
                      <ComBadrButtonIconComp
                        onPress={this.validerChoixLot}
                        icon="check-circle-outline"
                        loading={this.props.showProgress}
                        text={translate('transverse.valider')}
                      />
                    </ComAccordionComp>
                  </ComBadrModalComp>
                )}
                {/* Actions */}
                <Row>
                  <Col size={1} />
                  <Col size={1}>
                    <ComBadrButtonIconComp
                      style={styles.actionBtn}
                      onPress={
                        this.state.isUpdateMode
                          ? this.validerUpdate
                          : this.validerAjout
                      }
                      icon="check-circle-outline"
                      loading={this.props.showProgress}
                      text={translate('transverse.confirmer')}
                    />
                  </Col>
                  <Col size={1}>
                    <ComBadrButtonIconComp
                      style={styles.actionBtn}
                      onPress={this.onRestAddEnlevements}
                      icon="restore"
                      loading={this.props.showProgress}
                      text={translate('transverse.retablir')}
                    />
                  </Col>
                  <Col size={1}>
                    <ComBadrButtonIconComp
                      style={styles.actionBtn}
                      onPress={this.onCloseAddEnlevements}
                      icon="close-circle-outline"
                      loading={this.props.showProgress}
                      text={translate('transverse.quitter')}
                    />
                  </Col>
                  <Col size={1} />
                </Row>
              </ComContainerComp>
            </View>
          )}
        </ComContainerComp>

        <FAB.Group
          open={isActionMenuOpen}
          icon={isActionMenuOpen ? 'close' : 'plus'}
          color={primaryColor}
          actions={[
            {
              icon: 'check-bold',
              label: 'Confirmer',
              onPress: () => this.confirmerEcor(),
            },
            {
              icon: 'cancel',
              label: 'Abondonner',
              onPress: () => console.log('Pressed email'),
            },
          ]}
          onStateChange={() => this.onActionMenuStateChange()}
          onPress={() => {
            if (isActionMenuOpen) {
              // do something if the speed dial is open
            }
          }}
        />
      </View>
    );
  }

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      this.props.dispatch(request({type: GENERIC_ECI_REQUEST, value: jsonVO}));
    }
  };
  onCloseModal = () => {
    this.props.dispatch(requestModal({type: GENERIC_CLOSE_MODAL, value: {}}));
  };

  init = () => {
    this.props.dispatch(request({type: GENERIC_ECI_INIT, value: {}}));
  };
  extractCommandData = (command) => {
    return this.props && this.props.picker ? this.props.picker[command] : null;
  };
  static extractCommandDataFromProps = (nextProps, command) => {
    return nextProps && nextProps.picker && nextProps.picker[command]
      ? nextProps.picker[command]
      : null;
  };
}

const libelle = {
  fontSize: 14,
  color: '#006acd',
};

const styles = {
  cardBox: {
    flexDirection: 'column',
    padding: 0,
  },
  actionBtn: {
    width: 200,
    height: 50,
  },
  columnThree: {
    marginRight: 10,
  },
};

function mapStateToProps(state) {
  return {...state.EcorImportReducer};
}

export default connect(
  mapStateToProps,
  null,
)(EciEnleverMarchandiseParPesageScreen);
