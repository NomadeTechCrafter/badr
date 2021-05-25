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
  ComBadrListComp,
  ComBadrLibelleComp,
  ComBadrNumericTextInputComp,
  ComBadrPopupComp,
  ComBasicDataTableComp,
  ComBadrDatePickerComp,
  ComBadrAutoCompleteComp,
  ComBadrButtonIconComp,
  ComBadrAlphabetPickerComp,
  ComBadrModalComp,
  ComBadrPickerComp,
  ComBadrAutoCompleteChipsComp,
} from '../../../../commons/component';
import {
  Checkbox,
  TextInput,
  Text,
  RadioButton,
  Paragraph,
  TouchableRipple,
  Button,
  IconButton,
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
import RechercheEcorImport from '../rechercheEcorImport';
import rechercheRefDumReducer from '../../../../commons/state/reducers/rechercheDum';
import style from '../../../../modules/referentiel/plaquesImmatriculation/style/refPlaquesImmStyle';
import AddEnlevements from './addEnlevements';
import {getValueByPath} from '../../../../modules/dedouanement/redressement/utils/DedUtils';
import {
  request,
  requestModal,
} from '../../../redux/actions/ecorImport/EcorImportAction';
import {
  GENERIC_ECI_INIT,
  GENERIC_ECI_REQUEST,
  GENERIC_CLOSE_MODAL,
  GENERIC_OPEN_MODAL,
} from '../../../common/constants/ecorImport/EcorImportConstants';
import ComUtils from '../../../../commons/utils/ComUtils';
import moment from 'moment';
const screenHeight = Dimensions.get('window').height;

class EnleverMarchandise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      enleverMarchandiseVO: props.route.params.declarationRI,
      showEnlevements: false,
      showPopUpLots: false,
      listLotsCols: this.listLotsCols(),
      listEquipementLotsCols: this.listEquipmentLotsCols(),
      selectedLot: {},
      newEcorItem: {},
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
  selectedLotChanged = (row, index) => {
    if (row) {
      this.setState({selectedLot: row});
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
        refTypeDS: {
          codeTypeDS: lot.codeTypeDS,
          descriptionTypeDS: lot.typeDS,
        },
        referenceDS: {
          refBureauDouane: {
            codeBureau: referenceDSTab[0],
            nomBureauDouane: '',
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
        code: 'referenceLot',
        libelle: translate('ecorimport.lotDedouanement.title'),
        width: 150,
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
        action: (row, index) => this.selectedLotChanged(row, index),
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
        code: '',
        libelle: translate(
          'ecorimport.listeEquipementsLot.dateHeureEnlevement',
        ),
        width: 200,
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
    this.callRedux({
      command: 'getEquipementsbyLot',
      typeService: 'SP',
      jsonVO: selectedRow,
    });
  };
  validerAjout = () => {
    this.setState({
      ...this.state,
      enleverMarchandiseVO: {
        ...this.state.enleverMarchandiseVO,
        refMarchandiseEnlevee: [
          ...this.state.enleverMarchandiseVO.refMarchandiseEnlevee,
          this.state.selectedLot,
        ],
      },
    });
  };
  editEnlevement = (item, index) => {
    this.setState({
      selectedLot: this.state.enleverMarchandiseVO.refMarchandiseEnlevee[index],
    });
    this.setState({showEnlevements: true});
  };

  deleteEnlevement = (item, index) => {
    let enleverMarchandiseVO = {...this.state.enleverMarchandiseVO};
    enleverMarchandiseVO.refMarchandiseEnlevee.splice(index, 1);
    this.setState({enleverMarchandiseVO: enleverMarchandiseVO});
  };

  componentDidUpdate(prevProps, prevState) {}
  render() {
    const {enleverMarchandiseVO} = this.state;
    const {selectedLot} = this.state;

    let lotsApures = this.extractCommandData(
      'getLotsApures',
      'EcorImportReducer',
    );
    let equipementsbyLot = this.extractCommandData(
      'getEquipementsbyLot',
      'EcorImportReducer',
    );
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          title={translate('ecorimport.title')}
          subtitle={translate('ecorimport.enleverMarchandise.title')}
          icon="menu"
        />
        <ComContainerComp
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.showProgress && <ComBadrProgressBarComp />}

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
                    {translate('ecorimport.ouverture')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('ecorimport.cloture')}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {this.state.refDeclaration.slice(0, 3)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {this.state.refDeclaration.slice(3, 6)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {this.state.refDeclaration.slice(6, 10)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {this.state.refDeclaration.slice(10, 17)}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>{this.state.cle}</ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {this.state.numeroVoyage}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={4}>
                  <ComBadrLibelleComp>
                    {enleverMarchandiseVO.dateHeureDebut}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrLibelleComp>
                    {enleverMarchandiseVO.dateHeureFin}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>

          {!this.state.showEnlevements && (
            <View>
              {/* Accordion Déclaration en Détail*/}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  title={translate('ecorimport.declarationDetail.title')}>
                  <Grid>
                    <Row style={CustomStyleSheet.lightBlueRow}>
                      <Col>
                        <ComBadrLibelleComp>
                          {translate(
                            'ecorimport.declarationDetail.dateHeureEnreg',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {
                            enleverMarchandiseVO.refDedServices
                              .dateEnregistrement
                          }
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {translate('transverse.poidsBrut')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {enleverMarchandiseVO.refDedServices.poidsBruts}
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                    <Row style={CustomStyleSheet.whiteRow}>
                      <Col>
                        <ComBadrLibelleComp>
                          {translate('ecorimport.declarationDetail.typeDed')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {enleverMarchandiseVO.refDedServices.libelleTypeDED}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {translate('transverse.poidsNet')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {enleverMarchandiseVO.refDedServices.poidsNet}
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                    <Row style={CustomStyleSheet.lightBlueRow}>
                      <Col>
                        <ComBadrLibelleComp>
                          {translate(
                            'ecorimport.declarationDetail.operateurDeclarant',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {
                            enleverMarchandiseVO.refDedServices
                              .operateurDeclarant
                          }
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {translate('ecorimport.nbreContenant')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {enleverMarchandiseVO.refDedServices.nombreContenants}
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                    <Row style={CustomStyleSheet.whiteRow}>
                      <Col size={1}>
                        <ComBadrLibelleComp>
                          {translate(
                            'ecorimport.declarationDetail.valeurDeclaree',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={1}>
                        <ComBadrLibelleComp>
                          {enleverMarchandiseVO.refDedServices.valeurDeclaree}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={2} />
                    </Row>
                  </Grid>
                </ComAccordionComp>
              </ComBadrCardBoxComp>
              {/*Accordion Mainlevée*/}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  title={translate('ecorimport.mainlevee.title')}>
                  <Grid>
                    <Row style={CustomStyleSheet.whiteRow}>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate(
                            'ecorimport.mainlevee.dateValidationMainlevee',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {enleverMarchandiseVO.refMainlevee.dateValidation}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate(
                            'ecorimport.mainlevee.agentValidationMainlevee',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentValidation
                              .nom
                          }{' '}
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentValidation
                              .prenom
                          }
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                    <Row style={CustomStyleSheet.lightBlueRow}>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate(
                            'ecorimport.mainlevee.dateDelivranceMainlevee',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {enleverMarchandiseVO.refMainlevee.dateImpression}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp withColor={true}>
                          {translate(
                            'ecorimport.mainlevee.agentDelivranceMainlevee',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col>
                        <ComBadrLibelleComp>
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentEdition
                              .nom
                          }{' '}
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentEdition
                              .prenom
                          }
                        </ComBadrLibelleComp>
                      </Col>
                    </Row>
                  </Grid>
                </ComAccordionComp>
              </ComBadrCardBoxComp>
              {/*Accordion Liste des Enlevements Effectues*/}
              <ComBadrCardBoxComp style={styles.cardBox}>
                <ComAccordionComp
                  title={translate(
                    'ecorimport.enleverMarchandise.listeEnlevementsEffectues.title',
                  )}>
                  <Grid>
                    <Row style={CustomStyleSheet.lightBlueRow}>
                      <Col size={1}>
                        <IconButton
                          icon="plus"
                          size={20}
                          color={'white'}
                          style={{backgroundColor: primaryColor}}
                          onPress={() => {
                            this.setState({showEnlevements: true});
                          }}
                        />
                      </Col>
                      <Col size={1}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('ecorimport.numLigne')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('transverse.refDS')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate('ecorimport.lotDedouanement.title')}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={1}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate(
                            'ecorimport.enleverMarchandise.numBonSortie',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={1}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate(
                            'ecorimport.enleverMarchandise.listeEnlevementsEffectues.colis',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={2}>
                        <ComBadrLibelleComp withColor={true}>
                          {translate(
                            'ecorimport.enleverMarchandise.listeEnlevementsEffectues.dateHeureEnlevement',
                          )}
                        </ComBadrLibelleComp>
                      </Col>
                      <Col size={1} />
                    </Row>
                    {enleverMarchandiseVO.refMarchandiseEnlevee.map(
                      (item, index) => {
                        return (
                          <Row style={CustomStyleSheet.whiteRow}>
                            <Col size={1} />
                            <Col size={1}>
                              <ComBadrLibelleComp>
                                {index + 1}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrLibelleComp>
                                {_.join(
                                  [
                                    item.referenceDS.refBureauDouane.codeBureau,
                                    item.referenceDS.regime,
                                    item.referenceDS.anneeEnregistrement,
                                    item.referenceDS.numeroSerieEnregistrement,
                                    item.referenceDS.cle,
                                  ],
                                  '-',
                                )}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrLibelleComp>
                                {_.join(
                                  [
                                    item.lieuChargement
                                      .descriptionLieuChargement,
                                    item.referenceLot,
                                  ],
                                  '.',
                                )}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                              <ComBadrLibelleComp>
                                {item.numeroBonSortie}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                              <ComBadrLibelleComp>
                                {item.nombreContenant}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={2}>
                              <ComBadrLibelleComp>
                                {item.dateHeureEnlevement}
                              </ComBadrLibelleComp>
                            </Col>
                            <Col size={1}>
                              <Row>
                                <IconButton
                                  icon="pencil-outline"
                                  color={'white'}
                                  size={20}
                                  style={{backgroundColor: primaryColor}}
                                  onPress={() =>
                                    this.editEnlevement(item, index)
                                  }
                                />
                                <IconButton
                                  icon="trash-can-outline"
                                  color={'white'}
                                  size={20}
                                  style={{backgroundColor: primaryColor}}
                                  onPress={() =>
                                    this.deleteEnlevement(item, index)
                                  }
                                />
                              </Row>
                            </Col>
                          </Row>
                        );
                      },
                    )}
                  </Grid>
                </ComAccordionComp>
              </ComBadrCardBoxComp>
            </View>
          )}

          {this.state.showEnlevements && (
            <View style={CustomStyleSheet.fullContainer}>
              <ComContainerComp
                ContainerRef={(ref) => {
                  this.scrollViewRef = ref;
                }}>
                {this.props.showProgress && <ComBadrProgressBarComp />}

                {this.props.errorMessage != null && (
                  <ComBadrErrorMessageComp message={this.props.errorMessage} />
                )}
                {this.props.successMessage != null && (
                  <ComBadrInfoMessageComp message={this.props.successMessage} />
                )}

                {/* Accordion Déclaration Sommaire */}
                <ComBadrCardBoxComp style={styles.cardBox}>
                  <ComAccordionComp
                    title={translate('ecorimport.declarationSommaire.title')}>
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
                    title={translate('ecorimport.lotDedouanement.title')}>
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
                    extraFieldValue={translate('ecorimport.agentEcoreur')}>
                    <Grid>
                      <Row style={CustomStyleSheet.whiteRow}>
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
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
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.enleverMarchandise.nombreColis',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <TextInput
                            mode="outlined"
                            style={style.columnThree}
                            label=""
                            value={selectedLot.nombreContenant}
                            onChangeText={(text) =>
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
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.enleverMarchandise.numBonSortie',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <TextInput
                            mode="outlined"
                            style={style.columnThree}
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
                        <Col size={2}>
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.marchandisesEnlevees.delivrePar',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={2}>
                          <ComBadrAutoCompleteChipsComp
                            onRef={(ref) => (this.refDelivrePar = ref)}
                            code="code"
                            disabled={false}
                            selected={''}
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
                          <ComBadrLibelleComp withColor={true}>
                            {translate(
                              'ecorimport.marchandisesEnlevees.immatriculationsVehicules',
                            )}
                          </ComBadrLibelleComp>
                        </Col>
                        <Col size={6}>
                          <TextInput
                            mode="outlined"
                            style={style.columnThree}
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
                              this.state.dateFin
                                ? moment(
                                    selectedLot.dateEffectiveEnlevement,
                                    'DD/MM/yyyy',
                                    true,
                                  )
                                : ''
                            }
                            timeValue={
                              this.state.heureFin
                                ? moment(
                                    selectedLot.heureEffectiveEnlevement,
                                    'HH:mm:ss',
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
                {!_.isNil(equipementsbyLot) && !_.isNil(equipementsbyLot.data) && (
                  <ComBadrCardBoxComp style={styles.cardBox}>
                    <ComAccordionComp
                      title={translate('ecorimport.listeEquipementsLot.title')}
                      expanded={true}>
                      <ComBasicDataTableComp
                        rows={equipementsbyLot.data}
                        cols={this.state.listEquipementLotsCols}
                        totalElements={equipementsbyLot.data.length}
                        maxResultsPerPage={10}
                        paginate={true}
                      />
                    </ComAccordionComp>
                  </ComBadrCardBoxComp>
                )}
                {/* Modal Lot Apures*/}
                {!_.isNil(lotsApures) && !_.isNil(lotsApures.data) && (
                  <ComBadrModalComp
                    visible={this.props.EcorImportReducer.showListeLotsApures}
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
                      onPress={this.validerAjout}
                      icon="check-circle-outline"
                      loading={this.props.showProgress}
                      text={translate('transverse.confirmer')}
                    />
                  </Col>
                  <Col size={1}>
                    <ComBadrButtonIconComp
                      style={styles.actionBtn}
                      onPress={this.onCloseAddEnlevements}
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
  extractCommandData = (command, reducerName) => {
    return this.props[reducerName] && this.props[reducerName].picker
      ? this.props[reducerName].picker[command]
      : null;
  };
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
    height: 50,
  },
  rowListNumScelle: {
    height: 170,
  },
  borderCol: {
    borderLeftColor: '#f1f1f1',
    borderLeftWidth: 2,
  },
};

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(EnleverMarchandise);
