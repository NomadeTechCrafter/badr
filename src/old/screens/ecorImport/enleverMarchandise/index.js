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
  BadrLibelleBleu,
  BadrLibelleNoir,
  ComBadrNumericTextInputComp,
  ComBadrPopupComp,
  ComBasicDataTableComp,
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
import {translate} from '../../../../commons/i18n/I18nHelper';
import {CustomStyleSheet, primaryColor} from '../../../styles';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
const screenHeight = Dimensions.get('window').height;

class EnleverMarchandise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      checked: false,
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      enleverMarchandiseVO: props.route.params.declarationRI,
      typeRegime: translate('controle.regimeInterne'),
      decisionControle: props.route.params.declarationRI.decisionControle,
      observation: props.route.params.declarationRI.observation,
      sousReservePaiementMLV: props.route.params.sousReservePaiementMLV,
      numeroVersionCourante: 0,
      isConsultation: false,
      compteRendu: '',
      generateurNumScelleAu: '',
      generateurNumScelleDu: '',
      messagesErreur: [],
      listeNombreDeScelles: [],
      messageVisibility: false,
      message: '',
      messageType: '',
      selectedItemListScelle: '',
    };
    this.numeroScelle = '';

    this.cols = [
      {
        code: [
          'referenceDS.refBureauDouane.codeBureau',
          'referenceDS.regime',
          'referenceDS.anneeEnregistrement',
          'referenceDS.numeroSerieEnregistrement',
          'referenceDS.cle',
          '-',
        ],
        libelle: translate('transverse.refDS'),
        width: 250,
      },
      {
        code: ['lieuChargement.descriptionLieuChargement', 'referenceLot', '.'],
        libelle: translate('ecorimport.lotDedouanement.title'),
        width: 250,
      },
      {
        code: 'numeroBonSortie',
        libelle: translate('ecorimport.enleverMarchandise.numBonSortie'),
        width: 200,
      },
      {
        code: 'nombreContenant',
        libelle: translate(
          'ecorimport.enleverMarchandise.listeEnlevementsEffectues.colis',
        ),
        width: 200,
      },
      {
        code: 'dateHeureEnlevement',
        libelle: translate(
          'ecorimport.enleverMarchandise.listeEnlevementsEffectues.dateHeureEnlevement',
        ),
        width: 200,
      },
    ];
  }

  componentDidMount() {
    console.log('componentDidMount DelivrerMLV:');
    load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });
  }

  showMessages = (type, message) => {
    this.scrollViewRef.scrollTo({y: 0, animated: true});
    this.setState({
      messageVisibility: true,
      message: message,
      messageType: type,
    });
  };

  onCloseMessagesPressed = () => {
    this.setState({
      messageVisibility: false,
      message: '',
      messageType: '',
    });
  };
  onItemSelected = (row) => {
    console.log(row);
  };

  onUpdate = (index) => {
    console.log('update', index);
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
    const {enleverMarchandiseVO} = this.state;
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
          <ComBadrPopupComp
            message={this.state.message}
            type={this.state.messageType}
            visible={this.state.messageVisibility}
            onClosePressed={this.onCloseMessagesPressed}
          />
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
                    {translate('ecorimport.ouverture')}
                  </BadrLibelleBleu>
                </Col>
                <Col size={2}>
                  <BadrLibelleBleu>
                    {translate('ecorimport.cloture')}
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
                  <BadrLibelleNoir>
                    {enleverMarchandiseVO.dateHeureDebut}
                  </BadrLibelleNoir>
                </Col>
                <Col size={2}>
                  <BadrLibelleNoir>
                    {enleverMarchandiseVO.dateHeureFin}
                  </BadrLibelleNoir>
                </Col>
              </Row>
            </Grid>
          </ComBadrCardBoxComp>

          {/* Déclaration en Détail */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp title={translate('ecorimport.declarationDetail.title')}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('ecorimport.declarationDetail.dateHeureEnreg')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.dateEnregistrement}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('transverse.poidsBrut')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.poidsBruts}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('ecorimport.declarationDetail.typeDed')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.libelleTypeDED}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('transverse.poidsNet')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.poidsNet}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'ecorimport.declarationDetail.operateurDeclarant',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.operateurDeclarant}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('ecorimport.nbreContenant')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.nombreContenants}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={1}>
                    <BadrLibelleBleu>
                      {translate('ecorimport.declarationDetail.valeurDeclaree')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col size={1}>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refDedServices.valeurDeclaree}
                    </BadrLibelleNoir>
                  </Col>
                  <Col size={2} />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Déclaration en Mainlevée */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp title={translate('ecorimport.mainlevee.title')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'ecorimport.mainlevee.dateValidationMainlevee',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refMainlevee.dateValidation}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'ecorimport.mainlevee.agentValidationMainlevee',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <BadrLibelleNoir>
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentValidation
                              .nom
                          }
                        </BadrLibelleNoir>
                      </Col>
                      <Col>
                        <BadrLibelleNoir>
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentValidation
                              .prenom
                          }
                        </BadrLibelleNoir>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'ecorimport.mainlevee.dateDelivranceMainlevee',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {enleverMarchandiseVO.refMainlevee.dateImpression}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'ecorimport.mainlevee.agentDelivranceMainlevee',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <BadrLibelleNoir>
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentEdition
                              .nom
                          }
                        </BadrLibelleNoir>
                      </Col>
                      <Col>
                        <BadrLibelleNoir>
                          {
                            enleverMarchandiseVO.refMainlevee.refAgentEdition
                              .prenom
                          }
                        </BadrLibelleNoir>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Liste des Enlevements Effectues */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate(
                'ecorimport.enleverMarchandise.listeEnlevementsEffectues.title',
              )}>
              <View>
                <ComBasicDataTableComp
                  ref="_listeEnlevement"
                  id="listeEnlevement"
                  rows={enleverMarchandiseVO.refMarchandiseEnlevee}
                  cols={this.cols}
                  onItemSelected={this.onItemSelected}
                  totalElements={
                    enleverMarchandiseVO.refMarchandiseEnlevee.length
                  }
                  maxResultsPerPage={5}
                  addAction={true}
                  updateAction={true}
                  onUpdate={this.onUpdate}
                  deleteAction={true}
                  paginate={true}
                />
              </View>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Déclaration Sommaire */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp
              title={translate('ecorimport.declarationSommaire.title')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate(
                        'ecorimport.declarationSommaire.typeDeclaration',
                      )}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {/*itemEcor.referenceDS.refTypeDS.descriptionTypeDS*/}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrButtonComp
                      style={styles.actionBtn}
                      onPress={() => {
                        this.sauvgarderValider('sauvegarderRI');
                      }}
                      text={translate(
                        'ecorimport.declarationSommaire.choisirLotDedouanement',
                      )}
                      disabled={this.state.decisionControle ? false : true}
                    />
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col size={2}>
                    <BadrLibelleBleu>
                      {translate(
                        'ecorimport.declarationSommaire.referenceDeclaration',
                      )}
                    </BadrLibelleBleu>
                  </Col>
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
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={2} />
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
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Lot de dedouanement */}
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp title={translate('ecorimport.lotDedouanement.title')}>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('transverse.lieuChargement')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {/*itemEcor.lieuChargement.descriptionLieuChargement*/}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('transverse.referenceLot')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {/*itemEcor.referenceLot*/}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('transverse.nature')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>{/*itemEcor.nature*/}</BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <BadrLibelleBleu>
                      {translate('ecorimport.lotDedouanement.marque')}
                    </BadrLibelleBleu>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>{/*itemEcor.marque*/}</BadrLibelleNoir>
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Actions */}
          <View
            style={styles.containerActionBtn}
            pointerEvents={this.state.isConsultation ? 'none' : 'auto'}>
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('sauvegarderRI');
              }}
              text={translate('mainlevee.validerMainlevee')}
              disabled={this.state.decisionControle ? false : true}
            />
            <ComBadrButtonComp
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('validerRI');
              }}
              text={translate('mainlevee.delivrerMainlevee.title')}
              disabled={this.state.decisionControle ? false : true}
            />
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
  },
  rowListNumScelle: {
    height: 170,
  },
};
export default EnleverMarchandise;
