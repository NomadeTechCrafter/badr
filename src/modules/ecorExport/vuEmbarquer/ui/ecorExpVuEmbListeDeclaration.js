import React from 'react';

import { View, ScrollView, Text, SafeAreaView, FlatList } from 'react-native';
import moment from 'moment';

import { translate } from '../../../../commons/i18n/ComI18nHelper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import _ from 'lodash';

import { CustomStyleSheet, primaryColor } from '../../../../commons/styles/ComThemeStyle';
import * as getCmbOperateurByCodeAction from '../../autoriserAcheminement/mainScreen/state/actions/getCmbOperateurByCodeAction';
import * as ConfirmerVuEmbAction from '../state/actions/ecorExpVuEmbConfirmerAction';
import * as SupprimerVuEmbAction from '../state/actions/ecorExpVuEmbSupprimerAction';
import * as ResultatScannerVuEmbAction from '../state/actions/ecorExpVuEmbResultatScannerAction';
import * as Constants from '../../autoriserAcheminement/mainScreen/state/autoriserAcheminementMainConstants';
import * as VuEmbConstants from '../state/ecorExpVuEmbarquerConstants';
import { isCreation, stringNotEmpty } from '../../../t6bis/utils/t6bisUtils';

/**Custom Components */
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonIconComp,
  ComBadrCardBoxComp,
  ComBadrDatePickerComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrLibelleComp,
  ComBadrNumericTextInputComp,
  ComBadrProgressBarComp,
  ComBadrToolbarComp,
  ComBasicDataTableComp,
} from '../../../../commons/component';

/** REDUX **/
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Button, HelperText, RadioButton, TextInput } from 'react-native-paper';
import { ComSessionService } from '../../../../commons/services/session/ComSessionService';

const initialState = {
  ecorDUM: null,
  dateVuEmbarquer: '',
  heureVuEmbarquer: '',
  moyenTransportCode: '',
  navire: '',
  dateVoyage: '',
  heureVoyage: '',
  numeroVoyage: '',
  commentaire: '',
  showErrorMsg: false,
  erreur: null,
  modeConsultation: false,
  resultatsScanner: null,
};

class VuEmbListeDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.cols = [
      {
        code: 'dateScannage',
        libelle: translate('etatChargement.dateScannage'),
        width: 200,
      },
      {
        code: 'agent',
        libelle: translate('etatChargement.agent'),
        width: 150,
      },
      {
        code: 'resultat',
        libelle: translate('etatChargement.resultat'),
        width: 250,
      },
      {
        code: 'commentaire',
        libelle: translate('etatChargement.commentaire'),
        width: 300,
      }
    ];
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({ ...initialState });
      this.setState({
        ecorDUM: this.props?.vuEmbInit?.value?.jsonVO
      });

      if (this.props?.vuEmbInit?.value?.jsonVO?.dateHeureEmbarquement) {
        let jsonVO = this.props?.vuEmbInit?.value?.jsonVO;
        this.setState({
          modeConsultation: true,
          dateVuEmbarquer: jsonVO?.dateHeureEmbarquement?.slice(0, 10),
          heureVuEmbarquer: jsonVO?.dateHeureEmbarquement?.slice(11, 16),
          navire: jsonVO?.refMoyenTransport?.codeMoyenTransport ? jsonVO?.refMoyenTransport?.descriptionMoyenTransport + '(' + jsonVO?.refMoyenTransport?.codeMoyenTransport + ')' : '',
          dateVoyage: jsonVO?.dateHeureVoyage?.slice(0, 10),
          heureVoyage: jsonVO?.dateHeureVoyage?.slice(11, 16),
          numeroVoyage: jsonVO?.numeroVoyage,
          commentaire: jsonVO?.commentaireEmbarquement,
        });
      } else {
        this.setState({ navire: '' });
      }
      this.populateResultatScanner();
      this.setState({
        resultatsScanner: this.props?.resScan?.dataScanner ? this.props?.resScan?.dataScanner : null
      });
      this.populateLibelleTransporteurControleApresScanner();
      this.populateLibelleTransporteur();


      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log(JSON.stringify(this.props));
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  populateResultatScanner() {

    let localReference = this.props?.route?.params?.params?.params;
    let data = localReference?.bureau + localReference?.regime + localReference?.annee + localReference?.serie;

    var action = ResultatScannerVuEmbAction.request(
      {
        type: VuEmbConstants.SCANNER_VU_EMB_REQUEST,
        value: {
          login: ComSessionService.getInstance().getLogin(),
          commande: "echange.findResultatScannerByDum",
          module: "ECHANGE_LIB",
          typeService: "SP",
          data: data,
        },
      }
    );
    this.props.actions.dispatch(action);
  }

  populateLibelleTransporteurControleApresScanner() {
    let transporteurExploitantMEADCrtlApresScanner = this.props?.vuEmbInit?.value?.jsonVO?.transporteurExploitantMEADCrtlApresScanner;
    console.log('transporteurExploitantMEADCrtlApresScanner', transporteurExploitantMEADCrtlApresScanner);
    if (!_.isEmpty(transporteurExploitantMEADCrtlApresScanner)) {
      if (_.isEmpty(this.props.transporteurExploitantMEADCtrlApresScanner) || this.props.transporteurExploitantMEADCtrlApresScanner.code !== transporteurExploitantMEADCrtlApresScanner) {
        console.log('transporteurExploitantMEADCtrlApresScannerLibelle', this.props.transporteurExploitantMEADCtrlApresScanner);
        let action = getCmbOperateurByCodeAction.request({
          type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_REQUEST, value: { idOperateur: transporteurExploitantMEADCrtlApresScanner, isCtrlApresScanner: true, isAutoAchemin: false }
        });
        this.props.actions.dispatch(action);
      }
    }
  }

  populateLibelleTransporteur() {
    let transporteurExploitantMEAD = this.props?.vuEmbInit?.value?.jsonVO?.transporteurExploitantMEAD;
    console.log('populateLibelleTransporteur', transporteurExploitantMEAD);
    if (!_.isEmpty(transporteurExploitantMEAD)) {
      if (_.isEmpty(this.props.transporteurExploitantMEAD) || this.props.transporteurExploitantMEAD.code !== transporteurExploitantMEAD) {
        console.log('transporteurExploitantMEADCtrl', this.props.transporteurExploitantMEAD);
        let action = getCmbOperateurByCodeAction.request({
          type: Constants.AUTORISER_ACHEMINEMENT_GET_CMB_OPERATEUR_BY_CODE_REQUEST, value: { idOperateur: transporteurExploitantMEAD, isCtrlApresScanner: false, isAutoAchemin: false }
        });
        this.props.actions.dispatch(action);
      }
    }
  }

  getFormattedScelles = (scelles) => {
    let listeNombreDeScelles = [];
    Object.entries(scelles).map(item => {
      console.log(item[0]);
      listeNombreDeScelles.push(item[0]);
    })
    return listeNombreDeScelles;
  }

  renderBoxItem = ({ item }) => {
    return (
      <View style={styles.boxItem}>
        <Text style={styles.boxItemText}>{item}</Text>
      </View>
    );
  };

  handleCmbMoyenTransport = (item, id) => {
    this.setState({ moyenTransportCode: item.code, navire: item.libelle });
  };

  confirmerVuEmbarquer = () => {
    if (!stringNotEmpty(this.state.dateVuEmbarquer) || !stringNotEmpty(this.state.heureVuEmbarquer)) {
      this.setState({ erreur: 'Date et Heure embarquement: Valeur obligatoire.' });
    } else {
      this.setState({ erreur: null });
      // console.log(JSON.stringify(this.state));
      let data = this.state?.ecorDUM;
      let localReference = this.props?.route?.params?.params?.params;

      delete data?.refAgentEmbarquement?.defaultConverter;
      delete data?.refAgentEmbarquement?.refBureau?.defaultConverter;

      delete data?.refAgentEntree?.defaultConverter;
      delete data?.refAgentEntree?.refBureau?.defaultConverter;

      delete data?.refAgentAutorisationAcheminement?.defaultConverter;
      delete data?.refAgentAutorisationAcheminement?.refBureau?.defaultConverter;

      delete data?.refAgentAnnulationEmbarquement?.defaultConverter;
      delete data?.refAgentAnnulationEmbarquement?.refBureau?.defaultConverter;

      delete data?.refAgentAutorisation?.defaultConverter;
      delete data?.refAgentAutorisation?.refBureau?.defaultConverter;

      delete data?.refAgentConfirmationArrive?.defaultConverter;
      delete data?.refAgentConfirmationArrive?.refBureau?.defaultConverter;

      delete data?.refMoyenTransport?.defaultConverter;
      delete data?.refMoyenTransport?.refModeTransport?.defaultConverter;

      delete data?.refDUM?.defaultConverter;
      delete data?.refDedServices?.defaultConverter;

      delete data?.refMainlevee?.defaultConverter;

      delete data?.refMainlevee?.refAgentValidation?.defaultConverter;
      delete data?.refMainlevee?.refAgentValidation?.refBureau?.defaultConverter;

      delete data?.refMainlevee?.refAgentEdition?.defaultConverter;
      delete data?.refMainlevee?.refAgentEdition?.refBureau?.defaultConverter;

      delete data?.refAgentCrtlApresScanner?.defaultConverter;
      delete data?.refAgentCrtlApresScanner?.refBureau?.defaultConverter;

      delete data?.defaultConverter;


      data.refDUM = localReference;
      data.dateHeureEmbarquement = this.state.dateVuEmbarquer + ' ' + this.state.heureVuEmbarquer;
      data.dateHeureVoyage = this.state.dateVoyage + ' ' + this.state.heureVoyage;
      data.numeroVoyage = this.state.numeroVoyage;
      data.commentaireEmbarquement = this.state.commentaire;
      data.refMoyenTransport = {
        codeMoyenTransport: this.state.moyenTransportCode,
        descriptionMoyenTransport: this.state.navire
      };

      var action = ConfirmerVuEmbAction.request(
        {
          type: VuEmbConstants.VU_EMB_CONFIRMER_REQUEST,
          value: {
            login: ComSessionService.getInstance().getLogin(),
            commande: "confirmerVuEmbarquer",
            module: "ECOREXP_LIB",
            typeService: "UC",
            data: data,
          },
        }
      );
      this.props.actions.dispatch(action);
    }
  };

  abandonnerVuEmbarquer = () => {
    this.props.navigation.replace('Home', {});
  };

  supprimerVuEmbarquer = () => {
    let localReference = this.props?.route?.params?.params?.params;

    let data = { refDUM: localReference };

    var action = SupprimerVuEmbAction.request(
      {
        type: VuEmbConstants.VU_EMB_SUPPRIMER_REQUEST,
        value: {
          login: ComSessionService.getInstance().getLogin(),
          commande: "supprimerVuEmbarquer",
          module: "ECOREXP_LIB",
          typeService: "UC",
          data: data,
        },
      }
    );
    this.props.actions.dispatch(action);
  };



  render() {
    let reference = this.props?.route?.params?.params?.params;
    return (
      <View style={styles.container}>
        <ComBadrToolbarComp
          navigation={this.props.navigation}
          icon="menu"
          title={translate('vuEmbarquee.title')}
          subtitle={translate('vuEmbarquee.subTitleAction')}
        />
        {this.props.showProgress && <ComBadrProgressBarComp />}
        <View style={styles.messages}>
          <ComBadrErrorMessageComp
            style={styles.centerErrorMsg}
            message={this.state.erreur}
          />
        </View>
        {this.props?.vuEmbInit?.messageInfo != null && (
          <View style={styles.messages}>
            <ComBadrInfoMessageComp
              style={styles.centerInfoMsg}
              message={this.props?.vuEmbInit?.messageInfo}
            />
          </View>
        )}
        {this.props?.vuEmbInit?.errorMessage != null && (
          <View style={styles.messages}>
            <ComBadrErrorMessageComp
              style={styles.centerInfoMsg}
              message={this.props?.vuEmbInit?.errorMessage}
            />
          </View>
        )}
        <ScrollView>
          <ComBadrCardBoxComp style={styles.cardBoxInfoDum}>
            <Row>
              <Col size={7}>
                <View style={[styles.flexDirectionRow, styles.margtb]}>
                  <Text style={styles.libelleS}>
                    {translate('transverse.bureau')}
                  </Text>
                  <Text style={styles.libelleS}>
                    {translate('transverse.regime')}
                  </Text>
                  <Text style={styles.libelleS}>
                    {translate('transverse.annee')}
                  </Text>
                  <Text style={styles.libelleM}>
                    {translate('transverse.serie')}
                  </Text>
                  <Text style={styles.libelleS}>{translate('transverse.cle')}</Text>
                  {/* <Text style={styles.libelleS}>{translate('controleApresScanner.search.declarationEnDetail.numeroSousDum')}</Text> */}

                </View>
                <View style={styles.flexDirectionRow}>
                  <Text style={styles.valueS}>
                    {reference.bureau}
                  </Text>
                  <Text style={styles.valueS}>
                    {reference.regime}
                  </Text>
                  <Text style={styles.valueS}>
                    {reference.annee}
                  </Text>
                  <Text style={styles.valueM}>
                    {reference.serie}
                  </Text>
                  <Text style={styles.valueS}>
                    {reference.cle}
                  </Text>
                  {/* <Text style={styles.valueS}>
                {reference.cle}
              </Text> */}

                </View>
              </Col>
              <Col size={3}>
                <Row>
                  <Col>
                    <Text style={styles.libelleS}>{translate('controleApresScanner.search.declarationEnDetail.numeroSousDum')}</Text>
                  </Col>
                  <Col>
                    <Text style={styles.valueS}>
                      {this.state?.ecorDUM?.refDUM?.numeroOrdreVoyage}
                    </Text></Col>
                </Row>
              </Col>
            </Row>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp title={translate('autoriserAcheminemenMainScreen.declarationDetail.title')} expanded={true}>
              {/* <Grid> */}
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.dateHeureEnreg')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refDedServices?.dateEnregistrement}
                  </ComBadrLibelleComp>
                </Col>
                <Col />
                <Col />
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.typeDed')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refDedServices.libelleTypeDED}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.poidsBrut')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refDedServices.poidsBruts}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.operateurDeclarant')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refDedServices.operateurDeclarant}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('transverse.poidsNet')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refDedServices.poidsNet}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={1}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.valeurDeclaree')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={1}>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refDedServices.valeurDeclaree}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.declarationDetail.nbreContenant')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refDedServices.nombreContenants}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              {/* </Grid> */}
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp style={styles.cardBox}>
            <ComAccordionComp title={translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.title')} expanded={true}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.dateHeure')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.dateHeureEntree}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.refAgentEntree?.nom}{' '}
                      {this.state?.ecorDUM?.refAgentEntree?.prenom}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.refDocument')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={2}>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.documentEntreeEnceinte}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col />
                  <Col />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          <ComBadrCardBoxComp>
            {/* Informations ECOR */}
            <ComAccordionComp
              title={translate(
                'autoriserAcheminemenMainScreen.informationsEcor.title',
              )} expanded={true}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.informationsEcor.numeroPince')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.numeroPinceConfirmationEntree}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.informationsEcor.nombreScelles')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.nombreScelleConfirmationEntree}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={2}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'confirmationEntree.informationsEcor.generateurScelle',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col >
                    <ComBadrNumericTextInputComp
                      // onRef={(input) => {
                      //   this.generateurNumScelleDu = input;
                      // }}
                      maxLength={8}
                      // value={this.state.generateurNumScelleDu}
                      label={translate('transverse.du')}
                      // onChangeBadrInput={(text) =>
                      //   this.setState({
                      //     generateurNumScelleDu: text,
                      //   })
                      // }
                      disabled={true}
                    />
                  </Col>
                  <Col />
                  <Col>
                    <ComBadrNumericTextInputComp
                      // onRef={(input) => {
                      //   this.generateurNumScelleAu = input;
                      // }}
                      maxLength={8}
                      // value={generateurNumScelleAu}
                      label={translate('transverse.au')}
                      // onChangeBadrInput={(text) =>
                      //   this.setState({
                      //     generateurNumScelleAu: text,
                      //   })
                      // }
                      disabled={true}
                    />
                  </Col>
                  <Col />
                  <Col>
                    <Button
                      mode="contained"
                      compact="true"
                      // onPress={this.genererNumeroScelle}
                      disabled={true}>
                      {translate('transverse.Ok')}
                    </Button>
                  </Col>
                  <Col />
                </Row>
              </Grid>
              <Row>
                <Col>
                  <ComBadrNumericTextInputComp
                    // onRef={(input) => {
                    //   this.numeroScelleInput = input;
                    // }}
                    maxLength={8}
                    // value={numeroScelle}
                    label={translate(
                      'confirmationEntree.informationsEcor.numeroScelle',
                    )}
                    // onChangeBadrInput={(text) => {
                    //   this.setState({
                    //     numeroScelle: text,
                    //   });
                    // }}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Button
                    onPress={this.addNumeroScelle}
                    icon="plus-box"
                    mode="contained"
                    compact="true"
                    style={styles.btnActionList}
                    disabled={true}
                  />
                  <Button
                    onPress={this.deleteNumeroScelle}
                    icon="minus-box"
                    mode="contained"
                    compact="true"
                    style={styles.btnActionList}
                    disabled={true}
                  />
                </Col>
                <Col style={styles.boxContainer}>
                  <SafeAreaView style={styles.boxSafeArea}>
                    {_.isEmpty(this.state?.ecorDUM?.scelles) && (
                      <Text style={styles.boxItemText}>
                        {translate(
                          'confirmationEntree.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}

                    {!_.isEmpty(this.state?.ecorDUM?.scelles) && (
                      <FlatList
                        data={this.state?.ecorDUM?.scelles}
                        renderItem={(item) => this.renderBoxItem(item)}
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                      // disabled={true}
                      />
                    )}
                  </SafeAreaView>
                </Col>
                <Col style={styles.boxContainer}>
                  {_.isEmpty(this.state?.ecorDUM?.scelles) && (
                    <Text style={styles.boxItemText}>
                      {translate(
                        'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                      )}
                    </Text>
                  )}

                  {!_.isEmpty(this.state?.ecorDUM?.scelles) && (
                    <SafeAreaView style={styles.boxSafeArea}>
                      <FlatList
                        data={this.getFormattedScelles(this.state?.ecorDUM?.scelles)}
                        renderItem={(item) => this.renderBoxItem(item)}
                        keyExtractor={(item) => item}
                        nestedScrollEnabled={true}
                        disabled={true}
                      />
                    </SafeAreaView>
                  )}
                </Col>
              </Row>
              <Grid>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col size={40} style={styles.labelContainer}>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('autoriserAcheminemenMainScreen.informationsEcor.transporteurExploitantMEAD')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col size={70}>
                    <TextInput
                      value={this.props?.resOperateur?.transporteurExploitantMEAD?.libelle}
                      disabled={true}
                    />
                  </Col>
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/*Accordion Mainlevée*/}
          <ComBadrCardBoxComp>
            <ComAccordionComp
              title={translate('ecorimport.mainlevee.title')}
              expanded={true}>
              <Grid>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.dateValidationMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.refMainlevee?.dateValidation}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.agentValidationMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.refMainlevee?.refAgentValidation?.nom}{' '}
                      {this.state?.ecorDUM?.refMainlevee?.refAgentValidation?.prenom}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.dateDelivranceMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.refMainlevee.dateImpression}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('ecorimport.mainlevee.agentDelivranceMainlevee')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    <ComBadrLibelleComp>
                      {this.state?.ecorDUM?.refMainlevee.refAgentEdition.nom}{' '}
                      {this.state?.ecorDUM?.refMainlevee.refAgentEdition.prenom}
                    </ComBadrLibelleComp>
                  </Col>
                </Row>
                <Row style={CustomStyleSheet.whiteRow}>
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate('vuEmbarquee.conteneursCibles')}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    {_.isEmpty(this.state?.ecorDUM?.refMainlevee?.conteneursCibles) && (
                      <Text>
                        {translate(
                          'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}

                    {!_.isEmpty(this.state?.ecorDUM?.refMainlevee?.conteneursCibles) && (
                      <SafeAreaView style={styles.boxSafeArea}>
                        <FlatList
                          data={this.state?.ecorDUM?.refMainlevee?.conteneursCibles}
                          renderItem={(item) => this.renderBoxItem(item)}
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                          disabled={true}
                        />
                      </SafeAreaView>
                    )}
                  </Col>
                  <Col />
                  <Col />
                </Row>
                <Row style={CustomStyleSheet.lightBlueRow} >
                  <Col>
                    <ComBadrLibelleComp withColor={true}>
                      {translate(
                        'autoriserAcheminemenMainScreen.mainlevee.scellesMainLevee',
                      )}
                    </ComBadrLibelleComp>
                  </Col>
                  <Col>
                    {_.isEmpty(this.state?.ecorDUM?.refMainlevee?.listScelle) && (
                      <Text >
                        {translate(
                          'autoriserAcheminemenMainScreen.informationsEcor.aucunElement',
                        )}
                      </Text>
                    )}
                    {!_.isEmpty(this.state?.ecorDUM?.refMainlevee?.listScelle) && (
                      <SafeAreaView>
                        <FlatList
                          data={this.getFormattedScelles(this.state?.ecorDUM?.refMainlevee?.listScelle)}
                          renderItem={(item) => this.renderBoxItem(item)}
                          keyExtractor={(item) => item}
                          nestedScrollEnabled={true}
                          disabled={true}
                        />
                      </SafeAreaView>
                    )}
                  </Col>
                  <Col />
                  <Col />
                </Row>
              </Grid>
            </ComAccordionComp>
          </ComBadrCardBoxComp>

          {/* Accordion Autorisation acheminement */}
          {(!_.isEmpty(this.state?.ecorDUM?.dateHeureAcheminement)) &&
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp expanded={true}
                title={translate(
                  'autoriserAcheminemenMainScreen.autorisationAcheminement.title',
                )}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.dateHeure')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.dateHeureAcheminement}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.refAgentAutorisationAcheminement?.nom}{' '}
                        {this.state?.ecorDUM?.refAgentAutorisationAcheminement?.prenom}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.informationsEcor.nouveauxScelles')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <View style={styles.flexRow}>
                        <RadioButton.Group
                          value={this.state?.ecorDUM?.infoEcorScelle + ''}>
                          <View style={styles.flexRowRadioButton}>
                            <Text >
                              {translate('confirmationArrivee.oui')}
                            </Text>
                            <RadioButton value="true" color={primaryColor} disabled={true} />
                          </View>
                          <View style={styles.flexRowRadioButton}>
                            <Text >
                              {translate('confirmationArrivee.non')}
                            </Text>
                            <RadioButton value="false" color={primaryColor} disabled={true} />
                          </View>
                        </RadioButton.Group>
                      </View>
                    </Col>
                    <Col />
                    <Col />
                  </Row>
                </Grid>
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          }
          {/* Accordion Confirmation Arrivée */}
          {(!_.isEmpty(this.state?.ecorDUM?.dateHeureArrive)) &&
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp expanded={true}
                title={translate(
                  'autoriserAcheminemenMainScreen.confirmationArrivee.title',
                )}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.dateHeure')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.dateHeureArrive}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.refAgentConfirmationArrive?.nom}{' '}
                        {this.state?.ecorDUM?.refAgentConfirmationArrive?.prenom}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('confirmationArrivee.avecReserves')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <View style={styles.flexRow}>
                        <RadioButton.Group
                          value={this.state?.ecorDUM?.sousReserve + ''}>
                          <View style={styles.flexRowRadioButton}>
                            <Text >
                              {translate('confirmationArrivee.oui')}
                            </Text>
                            <RadioButton value="true" color={primaryColor} disabled={true} />
                          </View>
                          <View style={styles.flexRowRadioButton}>
                            <Text >
                              {translate('confirmationArrivee.non')}
                            </Text>
                            <RadioButton value="false" color={primaryColor} disabled={true} />
                          </View>
                        </RadioButton.Group>
                      </View>
                    </Col>
                    <Col />
                    <Col />
                  </Row>
                </Grid>
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          }


          {/* Accordion Contrôle Après Scanner */}
          {(!_.isEmpty(this.state?.ecorDUM?.dateHeureAcheminement)) &&
            <ComBadrCardBoxComp style={styles.cardBox}>
              <ComAccordionComp expanded={true}
                title={translate(
                  'confirmationArrivee.controleApresScanner.title',
                )}>
                <Grid>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.dateHeure')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.dateHeureCtrlApresScanner}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.entreeEnceinteDouaniere.agentDouanier')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.refAgentCrtlApresScanner?.nom}{' '}
                        {this.state?.ecorDUM?.refAgentCrtlApresScanner?.prenom}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.informationsEcor.nouveauxScelles')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <View style={styles.flexRow}>
                        <RadioButton.Group
                          value={this.state?.ecorDUM?.infoEcorScelleCrtlApresScanner + ''}>
                          <View style={styles.flexRowRadioButton}>
                            <Text >
                              {translate('confirmationArrivee.oui')}
                            </Text>
                            <RadioButton value="true" color={primaryColor} disabled={true} />
                          </View>
                          <View style={styles.flexRowRadioButton}>
                            <Text >
                              {translate('confirmationArrivee.non')}
                            </Text>
                            <RadioButton value="false" color={primaryColor} disabled={true} />
                          </View>
                        </RadioButton.Group>
                      </View>
                    </Col>
                    <Col />
                    <Col />
                  </Row>
                  <Row style={CustomStyleSheet.whiteRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.informationsEcor.numeroPince')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.numeroPinceCrtlApresScanner}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.informationsEcor.nombreScelles')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col>
                      <ComBadrLibelleComp>
                        {this.state?.ecorDUM?.nombreScelleCrtlApresScanner}
                      </ComBadrLibelleComp>
                    </Col>
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('vuEmbarquee.numerosScelles')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col style={styles.boxContainer}>
                      <SafeAreaView style={styles.boxSafeArea}>
                        {_.isEmpty(this.state?.ecorDUM?.scellesCrtlApresScanner) && (
                          <Text style={styles.boxItemText}>
                            {translate(
                              'confirmationEntree.informationsEcor.aucunElement',
                            )}
                          </Text>
                        )}

                        {!_.isEmpty(this.state?.ecorDUM?.scellesCrtlApresScanner) && (
                          <FlatList
                            data={this.getFormattedScelles(this.state?.ecorDUM?.scellesCrtlApresScanner)}
                            renderItem={(item) => this.renderBoxItem(item)}
                            keyExtractor={(item) => item}
                            nestedScrollEnabled={true}
                          // disabled={true}
                          />
                        )}
                      </SafeAreaView>
                    </Col>
                    <Col />
                    <Col />
                  </Row>
                  <Row style={CustomStyleSheet.lightBlueRow}>
                    <Col size={40} style={styles.labelContainer}>
                      <ComBadrLibelleComp withColor={true}>
                        {translate('autoriserAcheminemenMainScreen.informationsEcor.transporteurExploitantMEAD')}
                      </ComBadrLibelleComp>
                    </Col>
                    <Col size={70}>
                      <TextInput
                        value={this.props?.resOperateur?.transporteurExploitantMEADCtrlApresScanner?.libelle}
                        disabled={true}
                      />
                    </Col>
                  </Row>
                </Grid>
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          }

          {/* Accordion vuEmbarquee */}
          <ComBadrCardBoxComp>
            <ComAccordionComp expanded={true} title={translate('vuEmbarquee.subTitleAction')}>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('vuEmbarquee.dateHeure')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrDatePickerComp
                    dateFormat="DD/MM/YYYY"
                    readonly={this.props.success || this.state.modeConsultation}
                    value={!_.isEmpty(this.state.dateVuEmbarquer) ? moment(this.state.dateVuEmbarquer, 'DD/MM/yyyy', true) : null}
                    timeValue={!_.isEmpty(this.state.heureVuEmbarquer) ? moment(this.state.heureVuEmbarquer, 'HH:mm', true) : null}
                    labelDate={translate('vuEmbarquee.dateHeure')}
                    // inputStyle={styles.textInputsStyle}
                    onDateChanged={(date) =>
                      this.setState({
                        ...this.state,
                        dateVuEmbarquer: date,
                      })
                    }
                    onTimeChanged={(time) =>
                      this.setState({
                        ...this.state,
                        heureVuEmbarquer: time,
                      })
                    }
                  />
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('autoriserAcheminemenMainScreen.autorisationAcheminement.agentDouanier')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <ComBadrLibelleComp>
                    {this.state?.ecorDUM?.refAgentEmbarquement?.nom}{' '}
                    {this.state?.ecorDUM?.refAgentEmbarquement?.prenom}
                  </ComBadrLibelleComp>
                </Col>
              </Row>
              <Row style={CustomStyleSheet.whiteRow}>
                <Col size={50}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('etatChargementVE.navire')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={150}>
                  <ComBadrAutoCompleteChipsComp
                    code="code"
                    disabled={this.props.success || this.state.modeConsultation}
                    placeholder={translate(
                      'etatChargement.navire',
                    )}
                    selected={this.state.navire}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbMoyenTransport"
                    paramName="libelleMoyenTransport"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleCmbMoyenTransport}
                  />
                </Col>
              </Row>
              <Row style={CustomStyleSheet.lightBlueRow}>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('etatChargementVE.dateHeureVoyage')}
                  </ComBadrLibelleComp>
                </Col>
                <Col size={2}>
                  <ComBadrDatePickerComp
                    dateFormat="DD/MM/YYYY"
                    readonly={this.props.success || this.state.modeConsultation}
                    value={!_.isEmpty(this.state.dateVoyage) ? moment(this.state.dateVoyage, 'DD/MM/yyyy', true) : null}
                    timeValue={!_.isEmpty(this.state.heureVoyage) ? moment(this.state.heureVoyage, 'HH:mm', true) : null}
                    labelDate={translate('etatChargementVE.dateHeureVoyage')}
                    // inputStyle={styles.textInputsStyle}
                    onDateChanged={(date) =>
                      this.setState({
                        ...this.state,
                        dateVoyage: date,
                      })
                    }
                    onTimeChanged={(time) =>
                      this.setState({
                        ...this.state,
                        heureVoyage: time,
                      })
                    }
                  />
                </Col>
                <Col>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('vuEmbarquee.numeroVoyage')}
                  </ComBadrLibelleComp>
                </Col>
                <Col>
                  <TextInput
                    disabled={this.props.success || this.state.modeConsultation}
                    value={this.state.numeroVoyage}
                    onChangeText={(val) => this.setState({ numeroVoyage: val })}
                  />
                </Col>
              </Row>
              <Row size={200} style={CustomStyleSheet.whiteRow}>
                <Col size={40}>
                  <ComBadrLibelleComp withColor={true}>
                    {translate('etatChargementVE.commentaire')}
                  </ComBadrLibelleComp>
                </Col>

                <Col size={160}>
                  {/* <ComBadrCardBoxComp style={[styles.cardBoxInfoDum, styles.container, styles.width90]}> */}
                  <TextInput
                    disabled={this.props.success || this.state.modeConsultation}
                    value={this.state.commentaire}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(val) => this.setState({ commentaire: val })}
                  />
                </Col>
              </Row>
            </ComAccordionComp>
          </ComBadrCardBoxComp>
          {this.state?.resScan?.dataScanner && (
            <ComBadrCardBoxComp>
              <ComAccordionComp
                badr
                expanded={true}
                title={translate('etatChargement.resultatScanner')}
              >
                <ComBasicDataTableComp
                  ref="_badrTable"
                  id="scannerTable"
                  rows={this.state?.resScan?.dataScanner}
                  cols={this.cols}
                totalElements={this.state?.resScan?.dataScanner?.length}
                  maxResultsPerPage={10}
                  paginate={true}
                  showProgress={this.props.showProgress}
                  withId={false}
                />
              </ComAccordionComp>
            </ComBadrCardBoxComp>
          )}
          <ComBadrCardBoxComp>
            <Row style={CustomStyleSheet.lightBlueRow}>
              <Col>
                {(!this.props.success && !this.state.modeConsultation) &&
                  <ComBadrButtonIconComp
                    onPress={() => this.confirmerVuEmbarquer()}
                    style={styles.buttonIcon}
                    loading={this.props.showProgress}
                    text={translate('etatChargementVE.buttonConfirmerVuEmbarquer')}
                  />
                }
                {(!this.props.success && this.state.modeConsultation) &&
                  <ComBadrButtonIconComp
                    onPress={() => this.supprimerVuEmbarquer()}
                    style={styles.buttonIcon}
                    loading={this.props.showProgress}
                    text={translate('vuEmbarquee.SUPPRIMER')}
                  />
                }
                <ComBadrButtonIconComp
                  onPress={() => this.abandonnerVuEmbarquer()}
                  style={styles.buttonIcon}
                  loading={this.props.showProgress}
                  text={translate('vuEmbarquee.ABANDONNER')}
                />
              </Col>
            </Row>
          </ComBadrCardBoxComp>
        </ScrollView>
      </View >
    );
  }
}


const libelle = {
  fontSize: 14,
  color: '#006acd',
  fontWeight: 'bold',
};

const value = {
  fontSize: 14,
  fontWeight: 'bold',
};

const styles = {
  messages: {},
  container: { width: '100%', height: '100%' },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  cardBoxInfoDum: {
    flexDirection: 'column',
  },
  width90: { width: '90%', height: '70%' },
  buttonIcon: { margin: 10, marginTop: 40 },
  cardBoxInfoDum: {
    flexDirection: 'column',
    margin: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  margtb: {
    marginBottom: 10,
  },
  libelle: { ...libelle },
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
  valueS: {
    ...value,
    flex: 1,
  },
  valueM: {
    ...value,
    flex: 2,
  },
  valueL: {
    ...value,
    flex: 3,
  },
  flexColumn: { flexDirection: 'column' },
  flexRow: { flexDirection: 'row' },
  flexRowRadioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  // boxSafeArea: {
  //   margin: '5%',
  //   height: 200,
  //   borderRadius: 4,
  // },
  // boxContainer: {
  //   backgroundColor: '#ebecf3',
  //   borderRadius: 4,
  // },
};

function mapStateToProps(state) {
  // console.log("+++++++++++++++++++++++++++++state++++++++++++++++++++++++++++++++++++++++++++");
  // console.log("+++++++++++++++++++++++++++++state++++++++++++++++++++++++++++++++++++++++++++");
  // console.log("++++++++++++++++++++++++++++++state+++++++++++++++++++++++++++++++++++++++++++");
  // console.log("+++++++++++++++++++++++++++++++state++++++++++++++++++++++++++++++++++++++++++");
  // console.log(JSON.stringify(state));
  // console.log("++++++++++++++++++++++++++++++state+++++++++++++++++++++++++++++++++++++++++++");
  // console.log("++++++++++++++++++++++++++++++state+++++++++++++++++++++++++++++++++++++++++++");
  // console.log("++++++++++++++++++++++++++++++state+++++++++++++++++++++++++++++++++++++++++++");
  // console.log("++++++++++++++++++++++++++++++state+++++++++++++++++++++++++++++++++++++++++++");
  return { vuEmbInit: state.ecorExportVuEmbInitReducer, resOperateur: state.autoriserAcheminementMainReducer, resScan: state.ecorExpVuEmbResScanReducer };
}

function mapDispatchToProps(dispatch) {
  let actions = { dispatch };
  return {
    actions,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VuEmbListeDeclaration);
