import React, {Component} from 'react';
import {View, Dimensions, SafeAreaView} from 'react-native';

import {
  Container,
  CardBox,
  Accordion,
  BadrButton,
  BadrErrorMessage,
  BadrInfoMessage,
  BadrProgressBar,
  Toolbar,
  BadrLibelleBleu,
  BadrLibelleNoir,
  BadrPopup,
  BadrDatePicker,
  BadrAutoComplete,
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
import {translate} from '../../../common/translations/i18n';
import {CustomStyleSheet, primaryColor} from '../../../styles';
import _ from 'lodash';

import {load} from '../../../services/storage-service';
import {connect} from 'react-redux';
import * as Constants from '../../../common/constants/ecorExport/vuEmbarquer';
import * as vuEmbarquerAction from '../../../redux/actions/ecorExport/vuEmbarquer';
import {column} from '../../../styles/containers';

const screenHeight = Dimensions.get('window').height;

class VuEmbarque extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      checked: false,
      refDeclaration: props.route.params.refDeclaration,
      cle: props.route.params.cle,
      numeroVoyage: props.route.params.numeroVoyage,
      vuEmbarque: props.route.params.declarationRI,
      moyenTransportCode: '',
    };
  }

  componentDidMount() {
    console.log('componentDidMount DelivrerMLV:');
    /*load('user').then((user) => {
      this.setState({login: JSON.parse(user).login});
    });*/
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
  onTimeChanged = (time) => {
    console.log('time', time);
  };
  handleCmbMoyenTransport = (item, id) => {
    //console.log('handleCmbMoyenTransport', item);
    this.setState({moyenTransportCode: item.code});
  };
  render() {
    const {vuEmbarque} = this.state;
    return (
      <View style={CustomStyleSheet.fullContainer}>
        <Toolbar
          navigation={this.props.navigation}
          title={translate('ecorexport.title')}
          subtitle={translate('ecorexport.vuEmbarque.title')}
          icon="menu"
        />
        <Container
          ContainerRef={(ref) => {
            this.scrollViewRef = ref;
          }}>
          {this.props.showProgress && <BadrProgressBar />}
          <BadrPopup
            message={this.state.message}
            type={this.state.messageType}
            visible={this.state.messageVisibility}
            onClosePressed={this.onCloseMessagesPressed}
          />
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
              </Row>
            </Grid>
          </CardBox>

          {/* Accordion Déclaration en Détail */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('ecorimport.declarationDetail.title')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.declarationDetail.dateHeureEnreg')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refDedServices.dateEnregistrement}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('transverse.poidsBrut')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refDedServices.poidsBruts}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.declarationDetail.typeDed')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refDedServices.typeDeD}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('transverse.poidsNet')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refDedServices.poidsNet}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'ecorimport.declarationDetail.operateurDeclarant',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refDedServices.operateurDeclarant}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.nbreContenant')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refDedServices.nombreContenants}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.declarationDetail.valeurDeclaree')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refDedServices.valeurDeclaree}
                    </BadrLibelleNoir>
                  </Col>
                  <Col size={2} />
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Accordion Entrée marchandises dans l'enceinte douanière */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'ecorexport.vuEmbarque.entreeMarchandise.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'ecorexport.vuEmbarque.entreeMarchandise.dateHeureSorti',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.dateHeureEntree}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refAgentEntree.nom}{' '}
                      {vuEmbarque.refAgentEntree.prenom}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'ecorexport.vuEmbarque.entreeMarchandise.referenceDocument',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.documentEntreeEnceinte}
                    </BadrLibelleNoir>
                  </Col>
                  <Col size={2} />
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Accordion Mainlevée */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('ecorimport.mainlevee.title')}>
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
                    <BadrLibelleNoir>
                      {vuEmbarque.refMainlevee.dateValidation}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'ecorimport.mainlevee.agentValidationMainlevee',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refMainlevee.refAgentValidation.nom}{' '}
                      {vuEmbarque.refMainlevee.refAgentValidation.prenom}
                    </BadrLibelleNoir>
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
                    <BadrLibelleNoir>
                      {vuEmbarque.refMainlevee.dateImpression}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'ecorimport.mainlevee.agentDelivranceMainlevee',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refMainlevee.refAgentEdition.nom}{' '}
                      {vuEmbarque.refMainlevee.refAgentEdition.prenom}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Accordion Autorisation acheminement */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'ecorexport.vuEmbarque.autorisationAcheminement.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.dateHeure')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.dateHeureAcheminement}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refAgentAutorisationAcheminement.nom}{' '}
                      {vuEmbarque.refAgentAutorisationAcheminement.prenom}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Accordion Confirmation arrivée */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'ecorexport.vuEmbarque.confirmationArrivee.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.dateHeure')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.dateHeureArrive}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refAgentConfirmationArrive.nom}{' '}
                      {vuEmbarque.refAgentConfirmationArrive.prenom}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Accordion Autorisation suite revérification */}
          <CardBox style={styles.cardBox}>
            <Accordion
              title={translate(
                'ecorexport.vuEmbarque.autorisationSuiteReverification.title',
              )}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.dateHeure')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.dateHeureAutorisation}
                    </BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refAgentAutorisation.nom}{' '}
                      {vuEmbarque.refAgentAutorisation.prenom}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'ecorexport.vuEmbarque.autorisationSuiteReverification.numeroPince',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>{vuEmbarque.numeroPince}</BadrLibelleNoir>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'ecorexport.vuEmbarque.autorisationSuiteReverification.nombreScelles',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>{vuEmbarque.nombreScelle}</BadrLibelleNoir>
                  </Col>
                </Row>
              </Grid>
            </Accordion>
          </CardBox>

          {/* Accordion Vu Embarquer */}
          <CardBox style={styles.cardBox}>
            <Accordion title={translate('ecorexport.vuEmbarque.title')}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.dateHeure')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrDatePicker
                      dateFormat="DD/MM/YYYY"
                      onDateChanged={this.onDateApurementChanged}
                      onTimeChange={this.onTimeChanged}
                      inputStyle={styles.textInputsStyle}
                    />
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <BadrLibelleNoir>
                      {vuEmbarque.refAgentEmbarquement.nom}{' '}
                      {vuEmbarque.refAgentEmbarquement.prenom}
                    </BadrLibelleNoir>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorexport.vuEmbarque.navire')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <BadrAutoComplete
                      onRef={(ref) => (this.CmbMoyenTransport = ref)}
                      key="CmbMoyenTransport"
                      handleSelectItem={(item, id) =>
                        this.handleCmbMoyenTransport(item, id)
                      }
                      command="getCmbMoyenTransport"
                    />
                  </Col>
                </Row>
              </Grid>
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
              text={translate('mainlevee.validerMainlevee')}
              disabled={this.state.decisionControle ? false : true}
            />
            <BadrButton
              style={styles.actionBtn}
              onPress={() => {
                this.sauvgarderValider('validerRI');
              }}
              text={translate('mainlevee.delivrerMainlevee.title')}
              disabled={this.state.decisionControle ? false : true}
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

const mapStateToProps = (state) => ({...state.vuEmbarquerReducer});

export default connect(mapStateToProps, null)(VuEmbarque);
