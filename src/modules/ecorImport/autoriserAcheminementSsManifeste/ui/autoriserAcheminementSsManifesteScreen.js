import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

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
import {
  IconButton,
  TextInput,
  FAB,
  Button,
  Text,
  RadioButton,
} from 'react-native-paper';
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
import {
  request,
  requestModal,
  init,
} from '../state/actions/autoriserAcheminementSsManifesteAction';
import {
  GENERIC_CLOSE_MODAL,
  GENERIC_ECI_INIT,
  GENERIC_ECI_REQUEST,
  GENERIC_OPEN_MODAL,
} from '../state/autoriserAcheminementSsManifesteConstants';
import ComUtils from '../../../../commons/utils/ComUtils';
import moment from 'moment';
import {ComSessionService} from '../../../../commons/services/session/ComSessionService';

import EciDeclarationEnDetailBlock from '../ui/blocks/EciDeclarationEnDetailBlock';
import EciMainleveeBlock from '../ui/blocks/EciMainleveeBlock';
import EciListEnlevementsEffectuesBlock from '../ui/blocks/EciListEnlevementsEffectuesBlock';
import EciReferenceDeclarationBlock from '../ui/blocks/EciReferenceDeclarationBlock';
import EciMainleveeScelleBlock from '../ui/blocks/EciMainleveeScelleBlock';
import verifierPContreEcorSsManifesteReducer from '../state/reducers/autoriserAcheminementSsManifesteReducer';
import confirmerArriveeSsManifesteReducer from "../state/reducers/autoriserAcheminementSsManifesteReducer";
import autoriserAcheminementSsManifesteReducer from "../state/reducers/autoriserAcheminementSsManifesteReducer";
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
class AutoriserAcheminementSsManifesteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      autoriserAcheminementVO: props.route.params.declarationRI,
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
      indexEditItem: null,
      indexsSuppItem: null,
      isConsultationMode: false,
      generateurNumScelleAu: '',
      generateurNumScelleDu: '',
      numeroScelle: '',
      listeNombreDeScelles: [],
      selectedItemListScelle: '',
      includeScelles: false,
      selectedScelle: {},
      errorMessageScelle: '',
      bonSortie: {},
    };
  }

  componentDidMount() {
    this.props.dispatch(
      init({
        type: GENERIC_ECI_INIT,
        value: {command: 'confirmerAutoriserAcheminementSansManifeste'},
      }),
    );
    this.props.dispatch(
      init({
        type: GENERIC_ECI_INIT,
        value: {command: 'confirmerAutoriserAcheminementSansManifeste'},
      }),
    );
    load('user', false, true).then((user) => {
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
        pontBaculePesage: '',
        tarePesage: '',
        poidsBrutPesage: '',
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
          identifiantDS: '449061',
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
        code: 'referenceEquipement',
        libelle: translate('ecorimport.listeEquipementsLot.refEquipement'),
        width: 200,
      },
      {
        code: 'typeEquipement',
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
      this.state.autoriserAcheminementVO,
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

      let refEquipementEnleve = this.chargerListeEquipementsLot(
        this.state.selectedLot.refEquipementEnleve,
      );
      this.setState(
        {
          ...this.state,
          showEnlevements: false,
          autoriserAcheminementVO: {
            ...this.state.autoriserAcheminementVO,
            refMarchandiseEnlevee: [
              ...this.state.autoriserAcheminementVO.refMarchandiseEnlevee,
              {
                ...this.state.selectedLot,
                refEquipementEnleve: refEquipementEnleve,
                acteurInterneEnlevement: acteurInterneEnlevement,
                acteurInternePesage: acteurInternePesage,
                dateHeureEffectiveEnlevement:
                  this.state.selectedLot.dateEffectiveEnlevement +
                  ' ' +
                  this.state.selectedLot.heureEffectiveEnlevement,
                allRefEquipementEnleve: [],
              },
            ],
          },
        },
        () =>
          console.log(
            'autoriserAcheminementVO',
            JSON.stringify(this.state.autoriserAcheminementVO),
          ),
      );
    }
  };
  validerUpdate = () => {
    console.log('valider update');
    if (this.testIsChampsValid(champsObligatoire) === true) {
      const currentIndex = _.findIndex(
        this.state.autoriserAcheminementVO.refMarchandiseEnlevee,
        ['id', this.state.selectedLot.id],
      );
      console.log('currentIndex----', currentIndex);
      const myNewArray = Object.assign(
        [...this.state.autoriserAcheminementVO.refMarchandiseEnlevee],
        {
          [this.state.indexEditItem]: this.state.selectedLot,
        },
      );
      this.setState(
        {
          ...this.state,
          showEnlevements: false,
          autoriserAcheminementVO: {
            ...this.state.autoriserAcheminementVO,
            refMarchandiseEnlevee: myNewArray,
          },
        },
        () =>
          console.log(
            'autoriserAcheminementVO after update',
            JSON.stringify(this.state.autoriserAcheminementVO),
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
    this.scrollViewRef.scrollTo({y: 0, animated: true});
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
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState(
      {
        selectedLot: this.state.autoriserAcheminementVO.refMarchandiseEnlevee[index],
      },
      () => this.initEditEnlevement(this.state.selectedLot),
    );
    this.setState({
      showEnlevements: true,
      isUpdateMode: true,
      indexEditItem: index,
    });
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
    let listeEquipementsLot = [];
    _.forEach(selectedLot.refEquipementEnleve, (equipement) => {
      let equipementTemp = {
        referenceEquipement: equipement.identifiantEquipement,
        tareEquipement: equipement.tareEquipement,
        dateHeureEnlevement: '',
        typeEquipement: equipement?.ligneLotVO?.libelleTypeContenant,
        //set row to not selected
        selected: false,
      };
      /*if (this.testIfEquipementDisponible(equipementTemp)) {
        return equipementTemp;
      }*/
      listeEquipementsLot.push(equipementTemp);
    });
    return listeEquipementsLot;
  };
  testIfEquipementDisponible = (equipement) => {
    let res = true;
    _.forEach(this.state.autoriserAcheminementVO.refMarchandiseEnlevee, (value) => {
      _.forEach(value.refEquipementEnleve, (value) => {
        if (value.referenceEquipement === equipement.referenceEquipement) {
          res = false;
        }
      });
    });
    return res;
  };
  deleteEnlevement = () => {
    let autoriserAcheminementVO = {...this.state.autoriserAcheminementVO};
    autoriserAcheminementVO.refMarchandiseEnlevee.splice(
      this.state.indexsSuppItem,
      1,
    );
    this.setState({
      autoriserAcheminementVO: autoriserAcheminementVO,
      suppDialogVisibility: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {}
  onActionMenuStateChange = () => {
    this.setState({isActionMenuOpen: !this.state.isActionMenuOpen});
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('statedataafter',nextProps)
    let getEquipementsbyLot =
      nextProps.picker && nextProps.picker.getEquipementsbyLot
        ? nextProps.picker.getEquipementsbyLot
        : null;

    if (
      !_.isEmpty(getEquipementsbyLot?.data) &&
      prevState.selectedLot.refEquipementEnleve !== getEquipementsbyLot.data
    ) {
      // console.log('getDerivedStateFromProps--- 2',JSON.stringify( prevState.selectedLot.refEquipementEnleve), JSON.stringify(getEquipementsbyLot.data));

      let listeEquipementsLot = [];
      _.forEach(getEquipementsbyLot.data, (equipement) => {
        let equipementTemp = {
          referenceEquipement: equipement.identifiantEquipement,
          tareEquipement: equipement.tareEquipement,
          dateHeureEnlevement: '',
          typeEquipement: equipement?.ligneLotVO?.libelleTypeContenant,
          //set row to not selected
          selected: false,
        };
        listeEquipementsLot.push(equipementTemp);
      });
      return {
        selectedLot: {
          ...prevState.selectedLot,
          refEquipementEnleve: listeEquipementsLot,
        },
      };
    }
    console.log('datapicker',nextProps.picker)
    let dataAfterConfirmation =
      nextProps.picker && nextProps.picker.confirmerAutoriserAcheminementSansManifeste
        ? nextProps.picker.confirmerAutoriserAcheminementSansManifeste
        : null;
    /*console.log(
      'getDerivedStateFromProps dataAfterConfirmation 0',
      dataAfterConfirmation,
    );*/
    if (
      !_.isEmpty(dataAfterConfirmation?.data) &&
      prevState.autoriserAcheminementVO !== dataAfterConfirmation.data
    ) {
      /*console.log(
        'getDerivedStateFromProps dataAfterConfirmation 1',
        JSON.stringify(dataAfterConfirmation),
      );*/

      return {autoriserAcheminementVO: dataAfterConfirmation.data};
    }

    return null;
  }

  confirmerEcor = () => {
    console.log('confirmer ecor -----');
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState({IsChampsAddEnlevementsValid: true});
    let data = Utils.deepDelete(this.state.autoriserAcheminementVO, [
      '$$hashKey',
      'defaultConverter',
      'isRowSelected',
      'selected',
    ]);
    delete data.referenceDED.regime;
    data.referenceDED.numeroOrdreVoyage = this.state.numeroVoyage;

    console.log('confirmer ecor sent data-----', JSON.stringify(data));
    this.callRedux({
      command: 'confirmerAutoriserAcheminementSansManifeste',
      typeService: 'UC',
      module: 'ECI_LIB',
      jsonVO: data,
    });
  };
  supprimerEcor = () => {
    console.log('supprimer ecor -----');
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState({IsChampsAddEnlevementsValid: true});
    let data = Utils.deepDelete(this.state.autoriserAcheminementVO, [
      '$$hashKey',
      'defaultConverter',
      'isRowSelected',
      'selected',
    ]);
    delete data.referenceDED.regime;
    data.referenceDED.numeroOrdreVoyage = this.state.numeroVoyage;

    console.log('supprimer ecor sent data-----', JSON.stringify(data));
    this.callRedux({
      command: 'supprimerAutoriserAcheminementSansManifeste',
      typeService: 'UC',
      module: 'ECI_LIB',
      jsonVO: data,
    });
  };
  genererNumeroScelle = () => {
    console.log('generateurNumScelleDu');
    let listeScelles = [];
    const {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
    } = this.state;
    if (generateurNumScelleDu && generateurNumScelleAu) {
      if (
        generateurNumScelleDu.length === 8 &&
        generateurNumScelleAu.length === 8
      ) {
        let du = Number(generateurNumScelleDu);
        let au = Number(generateurNumScelleAu);
        if (au > du) {
          if (au - du <= 100) {
            console.log('generateurNumScelleDu ok condition');
            let nbScelle = du;
            for (let i = du; i <= au; i++) {
              listeScelles.push(('00000000' + nbScelle).slice(-8));
              nbScelle += 1;
            }
            console.log('generateurNumScelleDu listeScelles', listeScelles);

            this.setState({
              ...this.state,
              listeNombreDeScelles: _.concat(
                listeNombreDeScelles,
                listeScelles,
              ),
              generateurNumScelleDu: '',
              generateurNumScelleAu: '',
            });
            console.log('after set state genrete list ');
            this.generateurNumScelleDu.clear();
            this.generateurNumScelleAu.clear();
            //this.props.setError(null);
          } else {
            this.displayErrorScelle(translate('errors.maxNombreScelle'));
          }
        } else {
          this.displayErrorScelle(translate('errors.numScelleInferieur'));
        }
      } else {
        this.displayErrorScelle(translate('errors.numScelleLongueur'));
      }
    }
  };

  addNumeroScelle = () => {
    const {numeroScelle, listeNombreDeScelles} = this.state;
    if (numeroScelle && numeroScelle.length === 8) {
      if (listeNombreDeScelles.length < 100) {
        if (_.indexOf(listeNombreDeScelles, numeroScelle) === -1) {
          this.setState({
            ...this.state,
            listeNombreDeScelles: [...listeNombreDeScelles, numeroScelle],
            numeroScelle: '',
          });
          this.numeroScelleInput.clear();
        } else {
          this.displayErrorScelle(translate('errors.numScelleExisteDeja'));
        }
      } else {
        this.displayErrorScelle(translate('errors.maxNombreScelle'));
      }
    } else {
      this.displayErrorScelle(translate('errors.numScelleLongueur'));
    }
  };

  deleteNumeroScelle = () => {
    const {selectedScelle, listeNombreDeScelles} = this.state;
    let selectedScelleIndex = _.indexOf(listeNombreDeScelles, selectedScelle);
    if (selectedScelle !== '' && selectedScelleIndex) {
      listeNombreDeScelles.splice(selectedScelleIndex, 1);
      this.setState({
        selectedScelle: {},
      });
    }
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

  displayErrorScelle = (msg) => {
    this.setState({
      errorMessageScelle: msg,
    });
    this.scrollViewRef.scrollTo({y: 0, animated: true});
  };

  render() {
    const {
      autoriserAcheminementVO,
      refDeclaration,
      cle,
      numeroVoyage,
      isActionMenuOpen,
      selectedLot,
      bonSortie,
    } = this.state;
    console.log('in render selectedLot ', JSON.stringify(selectedLot));
    let lotsApures = this.extractCommandData('getLotsApures');
    let isConsultationMode = true;
    /*  !_.isEmpty(this.extractCommandData('initEnleverMarchandiseParPesage')) &&
      !_.isEmpty(
        this.extractCommandData('initEnleverMarchandiseParPesage').successMessage,
      )
        ? true
        : false;*/
    console.log(' isConsultationMode----', isConsultationMode);
    //let equipementsbyLot = this.extractCommandData('getEquipementsbyLot');
    let {
      generateurNumScelleDu,
      generateurNumScelleAu,
      listeNombreDeScelles,
      numeroScelle,
    } = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('ecorimport.title')}
          subtitle={translate(
            'ecorimport.autoriserAcheminementSsManifeste.title',
          )}
          icon="menu"
        />
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.showProgress && <ComBadrProgressBarComp />}

          {(!_.isEmpty(
            this.extractCommandData(
              'confirmerAutoriserAcheminementSansManifeste',
            ),
          ) &&
            !_.isEmpty(
              this.extractCommandData(
                'confirmerAutoriserAcheminementSansManifeste',
              ).successMessage,
            ) && (
              <ComBadrInfoMessageComp
                message={
                  this.extractCommandData(
                    'confirmerAutoriserAcheminementSansManifeste',
                  ).successMessage
                }
              />
            )) ||
            (!_.isEmpty(
              this.extractCommandData(
                'supprimerAutoriserAcheminementSansManifeste',
              ),
            ) &&
              !_.isEmpty(
                this.extractCommandData(
                  'supprimerAutoriserAcheminementSansManifeste',
                ).successMessage,
              ) && (
                <ComBadrInfoMessageComp
                  message={
                    this.extractCommandData(
                      'supprimerAutoriserAcheminementSansManifeste',
                    ).successMessage
                  }
                />
              ))}
          {(!_.isEmpty(
            this.extractCommandData(
              'confirmerAutoriserAcheminementSansManifeste',
            ),
          ) &&
            !_.isEmpty(
              this.extractCommandData(
                'confirmerAutoriserAcheminementSansManifeste',
              ).errorMessage,
            ) && (
              <ComBadrErrorMessageComp
                message={
                  this.extractCommandData(
                    'confirmerAutoriserAcheminementSansManifeste',
                  ).errorMessage
                }
              />
            )) ||
            (!_.isEmpty(
              this.extractCommandData(
                'supprimerAutoriserAcheminementSansManifeste',
              ),
            ) &&
              !_.isEmpty(
                this.extractCommandData(
                  'supprimerAutoriserAcheminementSansManifeste',
                ).errorMessage,
              ) && (
                <ComBadrErrorMessageComp
                  message={
                    this.extractCommandData(
                      'supprimerAutoriserAcheminementSansManifeste',
                    ).errorMessage
                  }
                />
              ))}
          {!_.isEmpty(this.state.errorMessageScelle) && (
            <ComBadrErrorMessageComp message={this.state.errorMessageScelle} />
          )}
          {/* Référence déclaration */}
          <EciReferenceDeclarationBlock
            autoriserAcheminementVO={autoriserAcheminementVO}
            refDeclaration={refDeclaration}
            cle={cle}
            numeroVoyage={numeroVoyage}
          />
          {/* Affichge du bloc initiale */}
          {!this.state.showEnlevements && (
            <View>
              {/* Accordion Déclaration en Détail*/}
              <EciDeclarationEnDetailBlock
                autoriserAcheminementVO={autoriserAcheminementVO}
              />

              {/*Accordion Mainlevée
              <EciMainleveeBlock autoriserAcheminementVO={autoriserAcheminementVO} />
              */}
              {/*Accordion Liste des Enlevements Effectues*/}

              {/*Accordion Mainlevée Scelle*/}
              <EciMainleveeScelleBlock autoriserAcheminementVO={autoriserAcheminementVO} />

              {/*Accordion Liste des Enlevements Effectues*/}
            </View>
          )}
          {/* <ComBadrDialogComp
            title={translate('transverse.suppressionTitre')}
            confirmMessage={translate('transverse.confirmer')}
            cancelMessage={translate('transverse.annuler')}
            dialogMessage={translate('transverse.supprimerLigne')}
            onCancel={this.hideSuppDialog}
            onOk={this.deleteEnlevement}
            dialogVisibility={this.state.suppDialogVisibility}
          />*/}
          {
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

                {/* Accordion Marchandises Enlevées */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate('ecorimport.agentEcoreur')}
                    extraFieldKey={translate('ecorimport.agentEcoreur')}
                    extraFieldValue={translate('ecorimport.agentEcoreur')}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col>
                          <ComBadrLibelleComp>
                            {
                              autoriserAcheminementVO
                                ?.refActeurEnlevement?.nom
                            }{' '}
                            {
                              autoriserAcheminementVO
                                ?.refActeurEnlevement?.prenom
                            }
                          </ComBadrLibelleComp>
                        </Col>
                      </Row>
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
                            disabled={isConsultationMode}
                            onRef={(ref) => (this.comboLieuStockage = ref)}
                            style={{
                              flex: 1,
                              /*   marginLeft: -80,*/
                            }}
                            titleStyle={{flex: 1}}
                            key="lieuStockage"
                            cle="code"
                            libelle="libelle"
                            module="REF_LIB"
                            command="getCmbLieuStockageParBureau"
                            typeService="SP"
                            selectedValue={ComUtils.getValueByPath(
                              'refLieuStockage.codeLieuStockage',
                              autoriserAcheminementVO,
                            )}
                            /*onValueChange={(
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
                            }}*/
                            param={{
                              codeBureau: '',
                            }}
                          />
                        </Col>
                      </Row>
                      {/*<Row style={CustomStyleSheet.lightBlueRow}>
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
                            disabled={isConsultationMode}
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
                      </Row>*/}
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
                            value={autoriserAcheminementVO.numeroBonSortie}
                            disabled={isConsultationMode}
                            /*onChangeText={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  numeroBonSortie: text,
                                },
                              })
                            }*/
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
                            disabled={isConsultationMode}
                            selected={
                              _.isEmpty(
                                ComUtils.getValueByPath(
                                  'gestionnaireEnceinte.nomOperateur',
                                  autoriserAcheminementVO,
                                ),
                              )
                                ? ''
                                : ComUtils.getValueByPath(
                                    'gestionnaireEnceinte.nomOperateur',
                                    autoriserAcheminementVO,
                                  ) /* +
                                  '(' +
                                  ComUtils.getValueByPath(
                                    'gestionnaireEnceinte.identifiantOperateur',
                                    autoriserAcheminementVO,
                                  ) +
                                  ')'*/
                            }
                            maxItems={3}
                            libelle="libelle"
                            command="getCmbOperateur"
                            onDemand={true}
                            searchZoneFirst={false}
                            /*onValueChange={(item) => {
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
                            }}*/
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
                            value={autoriserAcheminementVO.immatriculationsVehicules}
                            disabled={isConsultationMode}
                            /*onChangeText={(text) =>
                              this.setState({
                                ...this.state,
                                selectedLot: {
                                  ...this.state.selectedLot,
                                  immatriculationsVehicules: text,
                                },
                              })
                            }*/
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
                              autoriserAcheminementVO.dateHeureEffectiveEnlevement
                                ? moment(
                                    autoriserAcheminementVO.dateHeureEffectiveEnlevement?.split(' ')[0],
                                    'DD/MM/yyyy',
                                    true,
                                  )
                                : ''
                            }
                            timeValue={
                              autoriserAcheminementVO.dateHeureEffectiveEnlevement
                                ? moment(
                                      autoriserAcheminementVO.dateHeureEffectiveEnlevement?.split(' ')[1],
                                    'HH:mm',
                                    true,
                                  )
                                : ''
                            }
                            onDateChanged={(date) =>
                              this.setState({
                                ...this.state,
                                autoriserAcheminementVO: {
                                  ...this.state.autoriserAcheminementVO,
                                  dateHeureEffectiveEnlevement: date,
                                },
                              })
                            }
                            onTimeChanged={(time) =>
                              this.setState({
                                ...this.state,
                                autoriserAcheminementVO: {
                                  ...this.state.autoriserAcheminementVO,
                                  dateHeureEffectiveEnlevement: time,
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
                            readonly={isConsultationMode}
                          />
                        </Col>
                      </Row>
                    </Grid>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>

                {/* Accordion Scellés */}
                <ComBadrCardBoxComp noPadding={true}>
                  {/* Informations ECOR */}
                  <ComAccordionComp
                    title={translate('ecorimport.scelles.title')}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('ecorimport.scelles.nouveauxScelles')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col>
                          <View style={styles.flexRow}>
                            <RadioButton.Group
                              onValueChange={(choix) =>
                                this.setState({
                                  ...this.state,
                                  autoriserAcheminementVO: {
                                    ...this.state.autoriserAcheminementVO,
                                    infoEcorScelle: choix,
                                  },
                                })
                              }
                              value={
                                autoriserAcheminementVO?.infoEcorScelle
                                  ? autoriserAcheminementVO?.infoEcorScelle.toString()
                                  : 'false'
                              }>
                              <View style={styles.flexColumn}>
                                <Text>
                                  {translate('ecorimport.scelles.oui')}
                                </Text>
                                <RadioButton
                                  value="true"
                                  disabled={isConsultationMode}
                                  color={primaryColor}
                                />
                              </View>
                              <View style={styles.flexColumn}>
                                <Text>
                                  {translate('ecorimport.scelles.non')}
                                </Text>
                                <RadioButton
                                  value="false"
                                  disabled={isConsultationMode}
                                  color={primaryColor}
                                />
                              </View>
                            </RadioButton.Group>
                          </View>
                        </Col>
                        <Col />
                        <Col />
                      </Row>
                      {selectedLot?.infoEcorScelle == 'true' && (
                        <View>
                          <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={1}>
                              <TextInput
                                mode={'outlined'}
                                maxLength={8}
                                value={autoriserAcheminementVO.numeroPince}
                                label={translate(
                                  'ecorimport.scelles.numeroPince',
                                )}
                                style={CustomStyleSheet.badrInputHeight}
                                disabled={isConsultationMode}
                                onChangeText={(text) =>
                                  this.setState({
                                    ...this.state,
                                    autoriserAcheminementVO: {
                                      ...this.state.autoriserAcheminementVO,
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
                                value={autoriserAcheminementVO.nombreScelle}
                                disabled={isConsultationMode}
                                label={translate(
                                  'ecorimport.scelles.nombreScelles',
                                )}
                                onChangeBadrInput={(text) =>
                                  this.setState({
                                    ...this.state,
                                    autoriserAcheminementVO: {
                                      ...this.state.autoriserAcheminementVO,
                                      nombreScelle: text,
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
                                  'ecorimport.scelles.generateurScelle',
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
                                disabled={isConsultationMode}
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
                                disabled={isConsultationMode}
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
                                disabled={isConsultationMode}
                                onPress={this.genererNumeroScelle}>
                                {translate('transverse.Ok')}
                              </Button>
                            </Col>
                            <Col size={2} />
                          </Row>
                          <Row
                            style={[
                              CustomStyleSheet.whiteRow,
                              style.rowListNumScelle,
                            ]}>
                            <Col size={5}>
                              <ComBadrNumericTextInputComp
                                onRef={(input) => {
                                  this.numeroScelleInput = input;
                                }}
                                maxLength={8}
                                value={numeroScelle}
                                label={translate(
                                  'ecorimport.scelles.numeroScelle',
                                )}
                                disabled={isConsultationMode}
                                onChangeBadrInput={(text) => {
                                  this.setState({
                                    numeroScelle: text,
                                  });
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
                                disabled={isConsultationMode}
                                style={style.btnActionList}
                              />
                              <Button
                                onPress={this.deleteNumeroScelle}
                                icon="delete"
                                mode="contained"
                                compact="true"
                                disabled={isConsultationMode}
                                style={style.btnActionList}
                              />
                            </Col>
                            <Col size={2} />

                            <Col size={5} style={style.boxContainer}>
                              <SafeAreaView style={style.boxSafeArea}>
                                {_.isEmpty(listeNombreDeScelles) && (
                                  <Text style={style.boxItemText}>
                                    {translate(
                                      'ecorimport.scelles.aucunElement',
                                    )}
                                  </Text>
                                )}

                                {!_.isEmpty(listeNombreDeScelles) && (
                                  <FlatList
                                    data={listeNombreDeScelles}
                                    renderItem={(item) =>
                                      this.renderBoxItem(item)
                                    }
                                    keyExtractor={(item) => item}
                                    nestedScrollEnabled={true}
                                  />
                                )}
                              </SafeAreaView>
                            </Col>
                          </Row>
                          <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={1}>
                              <ComBadrLibelleComp withColor={true}>
                                {translate(
                                  'ecorimport.scelles.transporteurExploitantMEAD',
                                )}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrAutoCompleteChipsComp
                                placeholder={translate(
                                  'ecorimport.scelles.choisirValeur',
                                )}
                                code="code"
                                disabled={isConsultationMode}
                                selected={
                                  this.state.autoriserAcheminementVO
                                    ?.transporteurExploitantMEAD
                                }
                                maxItems={3}
                                libelle="libelle"
                                command="getCmbOperateur"
                                onDemand={true}
                                searchZoneFirst={false}
                                onValueChange={(item) => {
                                  this.setState({
                                    ...this.state,
                                    autoriserAcheminementVO: {
                                      ...this.state.autoriserAcheminementVO,
                                      transporteurExploitantMEAD: item.code,
                                    },
                                  });
                                }}
                              />
                            </Col>
                          </Row>
                        </View>
                      )}
                    </Grid>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>
                {/* Accordion Bon Sortie  */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate('ecorimport.bonSortie.bonDeSortie')}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('ecorimport.bonSortie.bonDeSortie')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <ComBadrPickerComp
                            onRef={(ref) => (this.pickerBonSortie = ref)}
                            disabled={isConsultationMode}
                            style={{
                              flex: 1,
                              /*  marginLeft: -80,*/
                            }}
                            titleStyle={{flex: 1}}
                            key="bonDeSortie"
                            cle="code"
                            libelle="libelle"
                            module="ECI"
                            command="getListeBonSortieSsManifeste"
                            typeService="SP"
                            selectedValue={ComUtils.getValueByPath(
                              'bonSortie.id',
                              autoriserAcheminementVO,
                            )}
                            onValueChange={(
                              selectedValue,
                              selectedIndex,
                              item,
                            ) =>
                              this.chargerListeBondeSortie(autoriserAcheminementVO)
                            }
                            param={{
                              //idDs: selectedLot.referenceDS.identifiantDS,
                              //idLot: selectedLot.referenceLot,
                              refDed:
                                autoriserAcheminementVO.referenceDED
                                  .referenceEnregistrement,
                              idDed:
                                autoriserAcheminementVO.referenceDED.indentifiant,
                            }}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.enleverMarchandise.nombreColis',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <ComBadrNumericTextInputComp
                            ref={(ref) => (this.nombreContenantBS = ref)}
                            mode={'outlined'}
                            disabled={true}
                            value={autoriserAcheminementVO.bonSortie?.nombreColis}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={1}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('ecorimport.bonSortie.poidsNet')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={1}>
                          <TextInput
                            ref={(ref) => (this.numeroBonSortieBS = ref)}
                            mode="outlined"
                            disabled={true}
                            style={styles.columnThree}
                            label=""
                            value={autoriserAcheminementVO.bonSortie?.poidsNet}
                          />
                        </Col>
                        <Col size={1}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.marchandisesEnlevees.delivrePar',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={4}>
                          <ComBadrLibelleComp withColor={false}>
                            {bonSortie?.delivrePar}
                          </ComBadrLibelleComp>
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate('ecorimport.bonSortie.dateHeureBS')}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <TextInput
                            mode="outlined"
                            style={styles.columnThree}
                            disabled={true}
                            label=""
                            value={autoriserAcheminementVO.bonSortie?.dateHeureBS}
                            numberOfLines={6}
                          />
                        </Col>
                      </Row>
                      <Row style={CustomStyleSheet.lightBlueRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.bonSortie.immatriculationsVehicules',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <TextInput
                            mode="outlined"
                            style={styles.columnThree}
                            disabled={true}
                            label=""
                            value={
                              autoriserAcheminementVO.bonSortie
                                ?.immatriculationsVehicules
                            }
                            numberOfLines={6}
                          />
                        </Col>
                      </Row>
                    </Grid>
                  </ComAccordionComp>
                </ComBadrCardBoxComp>

                {/* Accordion Contre Ecor */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate(
                      'ecorimport.autoriserAcheminement.title',
                    )}
                    expanded={true}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col>
                          <ComBadrDatePickerComp
                            dateFormat="DD/MM/yyyy"
                            /*   heureFormat="HH:mm"*/
                            readonly={false}
                            value={
                              autoriserAcheminementVO.dateHeureAutorisationAcheminement
                                ? moment(
                                    autoriserAcheminementVO.dateHeureAutorisationAcheminement?.split(' ')[0],
                                    'DD/MM/yyyy',
                                    true,
                                  )
                                : ''
                            }
                              timeValue={
                                autoriserAcheminementVO.dateHeureAutorisationAcheminement
                                ? moment(
                                      autoriserAcheminementVO.dateHeureAutorisationAcheminement?.split(' ')[1],
                                    'HH:mm',
                                    true,
                                  )
                                : ''
                            }
                            onDateChanged={(date) =>
                              this.setState({
                                ...this.state,
                                autoriserAcheminementVO: {
                                  ...this.state.autoriserAcheminementVO,
                                  dateHeureAutorisationAcheminement: date+' '+autoriserAcheminementVO.dateHeureAutorisationAcheminement?.split(' ')[1]
                                },
                              })
                            }
                             onTimeChanged={(time) =>
                              this.setState({
                                ...this.state,
                                autoriserAcheminementVO: {
                                  ...this.state.autoriserAcheminementVO,
                                  dateHeureAutorisationAcheminement:autoriserAcheminementVO.dateHeureAutorisationAcheminement?.split(' ')[0]+' ' +time,
                                },
                              })
                            }
                            labelDate={translate(
                              'ecorimport.verifierParContreEcor.contreEcor.dateHeureSorti',
                            )}
                            /*  labelHeure={translate(
                              'ecorimport.verifierParContreEcor.contreEcor.dateHeureSorti',
                            )}*/
                            inputStyle={style.dateInputStyle}

                          />
                        </Col>

                        {/*<Col size={20}>
                          <ComBadrNumericTextInputComp
                            ref={(ref) => (this.agentecoreur = ref)}
                            mode={'outlined'}
                            value={
                              autoriserAcheminementVO.refActeurContreEcor.refBureau
                            }
                            disabled={false}
                            onChangeBadrInput={(text) =>
                              this.setState({
                                ...this.state,
                                autoriserAcheminementVO: {
                                  ...this.state.autoriserAcheminementVO,
                                  nombreContenant: text,
                                },
                              })
                            }
                          />
                        </Col>
                        <Col >
                          <ComBadrLibelleComp
                            withColor={true}
                            isRequired={true}>
                            {translate('etatChargementVE.agentEcoreur')}
                          </ComBadrLibelleComp>
                        </Col>*/}
                      </Row>

                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                                'autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col>
                          <ComBadrLibelleComp>
                            {
                              autoriserAcheminementVO
                                  ?.refActeurAutorisationAcheminement?.nom
                            }{' '}
                            {
                              autoriserAcheminementVO
                                  ?.refActeurAutorisationAcheminement?.prenom
                            }
                          </ComBadrLibelleComp>
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
                        readonly={isConsultationMode}
                      />
                    </ComAccordionComp>
                  </ComBadrCardBoxComp>
                )}

                {/* Modal Lot Apures
                {!_.isNil(lotsApures) && !_.isNil(lotsApures.data) && (
                  <ComBadrModalComp
                    visible={this.props.showListeLotsApures}
                    onDismiss={this.onCloseModal}>
                    <ComAccordionComp
                      title={translate('ecorimport.popUpListeLotApures.title')}
                      expanded={true}>

                      <ComBadrButtonIconComp
                        onPress={this.validerChoixLot}
                        icon="check-circle-outline"
                        loading={this.props.showProgress}
                        text={translate('transverse.valider')}
                      />
                    </ComAccordionComp>
                  </ComBadrModalComp>
                )}
            */}
              </ComContainerComp>
            </View>
          }
        </ComContainerComp>

        {/*<FAB.Group
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
        />*/}
        {((_.isEmpty(
            this.extractCommandData(
                'confirmerAutoriserAcheminementSansManifeste',
            ),
        )||_.isEmpty(
            this.extractCommandData(
                'confirmerAutoriserAcheminementSansManifeste',
            ).successMessage,
        ))&&(_.isEmpty(
        this.extractCommandData(
        'supprimerAutoriserAcheminementSansManifeste',
        ),
        )||_.isEmpty(
            this.extractCommandData(
                'supprimerAutoriserAcheminementSansManifeste',
            ).successMessage,
        ))) && (
        <View style={styles.ComContainerCompBtn}>
          <Button
            onPress={this.confirmerEcor}
            icon="check"
            compact="true"
            mode="contained"
            style={styles.btnConfirmer}
            loading={this.props.showProgress}>
            {translate('transverse.confirmer')}
          </Button>
          <Button
            onPress={this.supprimerEcor}
            icon="trash-can-outline"
            mode="contained"
            style={styles.btnRetablir}>
            {translate('transverse.supprimer')}
          </Button>
        </View>
        )}
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

  ComContainerCompBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnConfirmer: {
    color: '#FFF',
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: '#FFF',
    padding: 5,
  },
  actionBtn: {
    width: 200,
    height: 50,
  },
  columnThree: {
    marginRight: 10,
  },
  flexColumn: {flexDirection: 'column'},
  flexRow: {flexDirection: 'row'},
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
};

function mapStateToProps(state) {
  return {...state.autoriserAcheminementSsManifesteReducer};
}

export default connect(
  mapStateToProps,
  null,
)(AutoriserAcheminementSsManifesteScreen);
