import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import * as Constants from '../../state/decAnnoterConstants';
import * as RechParRefConfirmerAction from '../../state/actions/decAnnoterUcAction';
import _ from 'lodash';

import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrCardBoxComp as CardBox,
  ComAccordionComp as Accordion,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../commons/component';
import {Button, Checkbox} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

import moment from 'moment';
import {ComSessionService} from '../../../../../commons/services/session/ComSessionService';
import {Col, Row} from "react-native-easy-grid";

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  errorMessage: null,
  dateDebutAnnoter: '',
  heureDebutAnnoter: '',
};

class RechParRefEntete extends React.Component {
  constructor(props) {
    super(props);

    this.scrollViewRef = React.createRef();

    //define actions switch between Confirmer and Annuler
    const screenActions = [];

    /*  if (this.props.dataVo?.declarationTriptique?.sortieExisteDeja) {
    screenActions.push({
      title: translate('annoter.actionAnnoter'),
      icon: 'remove',
      onActionPressed: this.handleAnnulerRechParRef,
    });
      } else {
    screenActions.push({
      title: translate('annoter.subTitleAction'),
      icon: 'check',
      onActionPressed: this.handleConfirmRechParRef,
    });*/
    //  }

    if (
        this.props.dataVo &&
        this.props.dataVo?.declarationTriptique &&
        this.props.dataVo?.declarationTriptique?.sortiePort
    ) {
      const annoter = this.props.dataVo?.declarationTriptique?.sortiePort;
      // this.setState({commentaire: annoter.commentaire});
      // this.setState({dateRechParRef: annoter.dateRechParRef});
      console.log('  test date : ' + annoter.dateRechParRef);
      this.state = {
        ...initialState,
        commentaire: annoter?.commentaire,
        dateRechParRef: annoter?.dateSortie,
        rechParRefExisteDeja: this.props.dataVo?.declarationTriptique
            ?.sortieExisteDeja,
        screenActions,
        dateDebutAnnoter: annoter?.dateSortie?.split(' ')[0],
        heureDebutAnnoter: annoter?.dateSortie?.split(' ')[1],
      };
    } else {
      this.state = {
        ...initialState,
        commentaire: '',
        dateRechParRef: '',
        rechParRefExisteDeja: false,
        screenActions,
      };
    }
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    // this.setState(initialState);
  }

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie?.length > 6) {
      let firstSerie = serie.substring(0, 1);
      if (firstSerie === '0') {
        serie = serie.substring(1, 7);
      }
    }
    let obj = regime + serie;
    let RS = obj % 23;
    alpha = alpha.charAt(RS);
    return alpha;
  };

  getNatureVehicule = function (idNature) {
    let natureVehicule = '';
    natureVehicule = this.props.dataVo?.vctNaturesVehicule?.filter(
        (vehicule) => {
          return vehicule.code === idNature;
        },
    );

    if (natureVehicule && natureVehicule[0]) {
      return natureVehicule[0].libelle;
    }

    return natureVehicule;
  };

  getNomVehicule = function (idVehicule) {
    let nomVehicule = '';
    let vehiculeObjet = this.props.dataVo?.vctVehicules?.find((vehicule) => {
      return vehicule.code === idVehicule;
    });

    if (vehiculeObjet && vehiculeObjet.libelle) {
      return vehiculeObjet.libelle;
    }

    return nomVehicule;
  };

  getNomVehiculeSecondaires = function (idVehicule) {
    let nomVehicule = '';
    let vehiculeObjet = this.props.dataVo?.vctVehiculeSecondaires?.find(
        (vehicule) => {
          return vehicule.code === idVehicule;
        },
    );

    if (vehiculeObjet && vehiculeObjet.libelle) {
      return vehiculeObjet.libelle;
    }

    return nomVehicule;
  };
  confirmer = () => {
    if (

        !this.state.commentaire ||
        this.state.commentaire === ''
    ) {
      console.log('datetest',this.state.commentaire)
      this.setState({
        errorMessage: translate('annoter.dateVuEmb'),
      });
      this.scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      return;
    }

    const jsonVO = {};
    jsonVO.indentifiant = this.props.dataVo?.declarationTriptique?.indentifiant;
    jsonVO.motifIntervention = this.state.commentaire; //'My Comment ',

    +console.log('-----------------');
    +console.log(JSON.stringify(jsonVO));
    +console.log('-----------------');
    +console.log('-----------------');

    var action = RechParRefConfirmerAction.request(
        {
          type: Constants.VU_EMB_CONFIRMER_REQUEST,
          value: {
            login: this.state.login,
            commande: 'ded.annoterDeclarationTryp',
            module: 'DED_LIB',
            typeService: 'UC',
            data: jsonVO,
          },
        },
        this.props.navigation,
    );
    this.props.actions.dispatch(action);
    this.scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  abandonner = () => {
    const jsonVO = {};
    jsonVO.indentifiant = this.props.dataVo?.declarationTriptique?.indentifiant;

    var action = RechParRefConfirmerAction.request(
        {
          type: Constants.VU_EMB_CONFIRMER_REQUEST,
          value: {
            login: this.state.login,
            commande: 'ded.rechParRefAnnulerDeclarationTrypByRef',
            module: 'DED_LIB',
            typeService: 'UC',
            data: jsonVO,
          },
        },
        this.props.navigation,
    );
    this.props.actions.dispatch(action);
    this.scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  getConducteurById = function (codeConducteur) {
    const vctConducteurs = this.props.dataVo?.vctConducteurs;

    const conducteur = vctConducteurs?.find(
        (cond) => cond.code === codeConducteur,
    );
    if (conducteur) {
      return conducteur.libelle;
    }
    return '';
  };

  render() {
    const declarationTriptique = this.props.dataVo?.declarationTriptique;
    const enteteTrypVO = this.props.dataVo?.enteteTrypVO;
    const traceSignature = this.props.dataVo?.traceSignature;
    const referenceEnregistrement = this.props.dataVo?.declarationTriptique
        ?.referenceEnregistrement;
    const datePassage = this.props.dataVo?.datePassage;

    const renderDateRechParRef = () => {
      return (
          <ComBadrDatePickerComp
              dateFormat="DD/MM/YYYY"
              readonly={true}
              heureFormat="HH:mm"
              value={
                this.state?.dateDebutAnnoter
                    ? moment(this.state.dateDebutAnnoter, 'DD/MM/yyyy', true)
                    : ''
              }
              timeValue={
                this.state?.heureDebutAnnoter
                    ? moment(this.state.heureDebutAnnoter, 'HH:mm', true)
                    : ''
              }
              /*onDateChanged={(date) => {
                console.log(' changed date : ' + date);
                const dateToSet = date ? date : '';
                this.setState({
                  dateDebutAnnoter: dateToSet,
                });
              }}
              onTimeChanged={(time) =>
                this.setState({
                  heureDebutAnnoter: time,
                })
              }*/
              labelDate={translate('operateursEconomiques.core.dateDebut')}
              labelHeure={translate('operateursEconomiques.core.heureDebut')}
              // inputStyle={style.dateInputStyle}
              // readonly={this.state.rechParRefExisteDeja || this.state.success}
          />
      );
    };

    return (
        <View style={styles.fabContainer}>
          <ScrollView ref={this.scrollViewRef}>
            {/* <ComBadrToolbarComp
            navigation={this.props.navigation}
            icon="menu"
            title={translate('annoter.title')}
            subtitle={translate('annoter.subTitleAction')}
          /> */}
            {this.props.errorMessage != null && (
                <View style={styles.messages}>
                  <ComBadrErrorMessageComp
                      style={styles.centerErrorMsg}
                      message={this.props.errorMessage}
                  />
                </View>
            )}
            {this.state.errorMessage != null && (
                <View style={styles.messages}>
                  <ComBadrErrorMessageComp
                      style={styles.centerErrorMsg}
                      message={this.state.errorMessage}
                  />
                </View>
            )}
            {this.props.messageInfo != null && (
                <View style={styles.messages}>
                  <ComBadrInfoMessageComp
                      style={styles.centerInfoMsg}
                      message={this.props.messageInfo}
                  />
                </View>
            )}
            {/* Référence déclaration */}
            <CardBox style={styles.cardBoxInfoDum}>
              <View style={[styles.flexDirectionRow, styles.margtb]}>
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
                <Text style={styles.libelleS}>{translate('transverse.cle')}</Text>
                <Text style={styles.libelleL}>
                  {translate('transverse.type')}
                </Text>
                <Text style={styles.libelleL}>
                  {translate('transverse.libRegime')}
                </Text>
              </View>
              <View style={styles.flexDirectionRow}>
                <Text style={styles.valueM}>
                  {referenceEnregistrement?.slice(0, 3)}
                </Text>
                <Text style={styles.valueM}>
                  {referenceEnregistrement?.slice(3, 6)}
                </Text>
                <Text style={styles.valueM}>
                  {referenceEnregistrement?.slice(6, 10)}
                </Text>
                <Text style={styles.valueL}>
                  {referenceEnregistrement?.slice(10, 17)}
                </Text>
                <Text style={styles.valueS}>
                  {this.cleDUM(
                      referenceEnregistrement?.slice(3, 6),
                      referenceEnregistrement?.slice(10, 17),
                  )}
                </Text>
                <Text style={styles.valueL}>TRYPTIQUE</Text>
                <Text style={styles.valueL}>{enteteTrypVO?.libelleRegime}</Text>
              </View>
            </CardBox>
            {/* Version */}
            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('annoter.version')}>
                <View style={styles.flexColumn}>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.type')} :
                    </Text>
                    <Text style={styles.valueM}>{enteteTrypVO?.type}</Text>
                    <Text style={styles.libelleS}>
                      {translate('annoter.numeroVersion')} :
                    </Text>
                    <Text style={styles.valueS}>
                      {enteteTrypVO?.numeroVersion}
                    </Text>
                    <Text style={styles.libelleM}>
                      {translate('annoter.statut')} :
                    </Text>
                    <Text style={styles.valueM}>{enteteTrypVO?.status}</Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.modeAcquisition')} :
                    </Text>
                    <Text style={styles.valueM}>Interactif</Text>
                    <Text style={styles.libelleM} />
                    <Text style={styles.valueM} />
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.codeInitiateur')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {enteteTrypVO?.codeInitiateur}
                    </Text>
                    <Text style={styles.libelleS}>
                      {translate('annoter.nomInitiateur')} :
                    </Text>
                    <Text style={styles.valueS}>
                      {enteteTrypVO?.nomDeclarant}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.dateCreation')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {enteteTrypVO?.dateCreaTryp}
                    </Text>
                  </View>

                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.dateSauvegarde')}{' '}
                      {translate('annoter.versionCourante')}:
                    </Text>
                    <Text style={styles.valueM}>
                      {enteteTrypVO?.dateCreation_VC}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.dateSauvegarde')}{' '}
                      {translate('annoter.versionInitiale')}:
                    </Text>
                    <Text style={styles.valueM}>
                      {enteteTrypVO?.dateCreation_VI}
                    </Text>
                  </View>
                </View>
              </Accordion>
            </CardBox>
            {/* Informations sur le signataire */}
            {!_.isEmpty(traceSignature) && (
                <CardBox style={styles.cardBox}>
                  <Accordion badr title={translate('annoter.infoSignataire')}>
                    <View style={styles.flexColumn}>
                      <View style={[styles.flexDirectionRow, styles.marg]}>
                        <Text style={styles.libelleM}>
                          {translate('annoter.qualite')} :
                        </Text>
                        <Text style={styles.valueM}>
                          {traceSignature.qualite_signataire}
                        </Text>
                      </View>
                      <View style={[styles.flexDirectionRow, styles.marg]}>
                        <Text style={styles.libelleS}>
                          {translate('annoter.par')} :
                        </Text>
                        <Text style={styles.valueS}>
                          {traceSignature.ident_signataire}
                        </Text>
                      </View>
                      <View style={[styles.flexDirectionRow, styles.marg]}>
                        <Text style={styles.libelleM}>
                          {translate('annoter.le')} :
                        </Text>
                        <Text style={styles.valueM}>
                          {traceSignature.date_signature}
                        </Text>
                      </View>
                      <View style={[styles.flexDirectionRow, styles.marg]}>
                        <Text style={styles.libelleM}>
                          {translate('annoter.numTransaction')} :
                        </Text>
                        <Text style={styles.valueM}>
                          {traceSignature.numeroTransaction}{' '}
                        </Text>
                      </View>
                    </View>
                  </Accordion>
                </CardBox>
            )}
            {/* Informations sur la mainlevée */}
            {!_.isEmpty(datePassage) && (
                <CardBox style={styles.cardBox}>
                  <Accordion badr title={translate('annoter.infoMLV')}>
                    <View style={styles.flexColumn}>
                      <View style={[styles.flexDirectionRow, styles.marg]}>
                        <Text style={styles.libelleM}>
                          {translate('annoter.dateMLV')} :
                        </Text>
                        <Text style={styles.valueM}>
                          {this.props.dataVo?.datePassage}
                        </Text>
                      </View>
                      <View style={[styles.flexDirectionRow, styles.marg]}>
                        <Text style={styles.libelleS}>
                          {translate('annoter.agent')} :
                        </Text>
                        <Text style={styles.valueS}>
                          {this.props.dataVo?.agentPassage}
                        </Text>
                      </View>
                    </View>
                  </Accordion>
                </CardBox>
            )}
            {/* Transporteur */}
            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('annoter.transporteur')}>
                <View style={styles.flexColumn}>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.numRc')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {enteteTrypVO?.numeroRCTransporteur}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleS}>
                      {translate('annoter.nomRaisonSociale')} :
                    </Text>
                    <Text style={styles.valueS}>
                      {enteteTrypVO?.nomTransporteur}
                    </Text>
                  </View>
                </View>
              </Accordion>
            </CardBox>
            {/* Conducteur et Véhicule */}
            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('annoter.condEtVehicule')}>
                <View style={styles.flexColumn}>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.conducteur')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {this.getConducteurById(enteteTrypVO?.idConducteur)}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.conducteur2')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {this.getConducteurById(
                          enteteTrypVO?.idConducteurSecondaire,
                      )}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.conducteur3')} :
                    </Text>
                    <Text style={styles.valueM}> {this.getConducteurById(
                        enteteTrypVO?.idConducteurTroisieme,
                    )}</Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.natureVehicule')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {this.getNatureVehicule(enteteTrypVO?.idNatureVehicule)}
                    </Text>

                    <Text style={styles.libelleM}>
                      {translate('annoter.vehicule')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {this.getNomVehicule(enteteTrypVO?.idVehicule)}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.natureVehicule2')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {this.getNatureVehicule(
                          enteteTrypVO?.idNatureVehiculeSecondaire,
                      )}
                    </Text>

                    <Text style={styles.libelleM}>
                      {translate('annoter.vehicule2')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {this.getNomVehiculeSecondaires(
                          enteteTrypVO?.idVehiculeSecondaire,
                      )}
                    </Text>
                  </View>
                </View>
              </Accordion>
            </CardBox>
            {/* Marchandise */}
            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('annoter.march')}>
                <View style={styles.flexColumn}>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleS}>
                      {translate('annoter.natureMarch')} :
                    </Text>
                    <Text style={styles.valueL}>
                      {enteteTrypVO?.natureMarchandise}
                    </Text>
                  </View>
                </View>
              </Accordion>
            </CardBox>
            {/* Autorisation MA */}
            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('annoter.autorisation')}>
                <View style={styles.flexColumn}>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('annoter.numAutorisation')} :
                    </Text>
                    <Text style={styles.valueS}>
                      {enteteTrypVO?.autorisationMa}
                    </Text>
                    <Text style={styles.libelleS}>
                      {translate('annoter.du')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {enteteTrypVO?.dateDebutAutorisationMa}
                    </Text>
                    <Text style={styles.libelleS}>
                      {translate('annoter.au')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {enteteTrypVO?.dateFinAutorisationMa}
                    </Text>
                  </View>
                </View>
                {/* <View style={[styles.flexDirectionRow, styles.marg]}>
                <Text style={[styles.marg, styles.libelle]}>
                  {translate('annoter.vide')} :
                </Text>
                <Checkbox
                  color="#009ab2"
                  status={enteteTrypVO?.avide ? 'checked' : 'unchecked'}
                />
              </View>
              <View style={[styles.flexDirectionRow, styles.marg]}>
                <Text style={styles.libelleS}>
                  {translate('annoter.autresDocument')} :
                </Text>
                <Text style={styles.valueL}>
                  {enteteTrypVO?.autreDocument}
                </Text>
              </View> */}
              </Accordion>
            </CardBox>
            {/* Sorti du Port */}

            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('annoter.annoter')}>
                <View style={styles.flexColumn}>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleS}>
                      {translate('annoter.dateAnnoter')} :
                    </Text>
                    <View style={styles.libelleM}>{renderDateRechParRef()}</View>
                    <Text style={styles.libelleS} />
                  </View>

                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleS}>
                      {translate('annoter.commentAnnoter')}
                    </Text>


                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={[styles.marg, styles.libelle]}>
                      {translate('annoter.vide')} :
                    </Text>
                    <Checkbox
                        color="#009ab2"
                        status={enteteTrypVO?.avide ? 'checked' : 'unchecked'}
                    />
                  </View>
                  {enteteTrypVO?.refRegime === '009' && (
                      <View style={[styles.flexDirectionRow, styles.marg]}>
                        <Text style={[styles.marg, styles.libelle]}>
                          {translate('vuEmbarquee.sansManifest')} :
                        </Text>
                        <Checkbox
                            color="#009ab2"
                            status={
                              enteteTrypVO?.sansManifest ? 'checked' : 'unchecked'
                            }
                        />
                      </View>
                  )}
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleS}>
                      {translate('annoter.autresDocument')} :
                    </Text>
                    <Text style={styles.valueL}>
                      {enteteTrypVO?.autreDocument}
                    </Text>
                  </View>
                </View>
              </Accordion>
            </CardBox>

            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('annoter.commentAnnoter')}>
                <View style={styles.flexColumn}>


                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleS}>
                      {translate('annoter.commentAnnoter')}
                    </Text>

                    <TextInput
                        style={styles.libelleL}
                        maxLength={250}
                        multiline
                        /*disabled={
                            this.state.rechParRefExisteDeja || this.props.success
                          }*/
                        numberOfLines={3}
                        //  placeholder={translate('annoter.commentAnnoter')}
                        value={this.state.commentaire}
                        onChangeText={(text) => this.setState({commentaire: text})}
                    />
                  </View>

                </View>

              </Accordion>
            </CardBox>
            <View style={[styles.flexDirectionRow, styles.marg]}>
              <Row>
                <Col />
                <Col size={3}>
                  <Button
                      disabled={this.props?.success }
                      onPress={() => this.confirmer()}
                      mode="contained"
                      style={styles.btnActions}
                  >
                    {translate('transverse.confirmer')}
                  </Button>
                </Col>
                <Col size={3}>
                  <Button
                      disabled={this.props?.success}
                      onPress={() => this.abandonner()}
                      mode="contained"
                      style={styles.btnActions}
                  >
                    {translate('transverse.abandonner')}
                  </Button>
                </Col>
                <Col />
              </Row>
            </View>
          </ScrollView>

          {/* <ComBadrActionButtonComp
          style={styles.badrActionsStyle}
          // visible={this.state.dateRechParRef && this.state.commentaire}
          visible={!this.props.success}
          active={false}
          actions={this.state.screenActions}
        />*/}
        </View>
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

const styles = StyleSheet.create({
  messages: {},
  fabContainer: {
    height: '100%',
  },
  centerErrorMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerInfoMsg: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBoxInfoDum: {
    flexDirection: 'column',
    margin: 10,
  },
  cardBox: {
    flexDirection: 'column',
    padding: 0,
    margin: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  libelle: {...libelle},
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
  margLeft: {
    marginLeft: 20,
  },
  marg: {
    margin: 10,
  },
  margtb: {
    marginBottom: 10,
  },
  textarea: {
    height: 50,
    marginRight: 50,
  },
  date: {
    fontWeight: 'bold',
    borderColor: 'red',
  },
});

function mapStateToProps(state) {
  return {...state.sortiPortReducer};
}

function mapDispatchToProps(dispatch) {
  let actions = {dispatch};
  return {
    actions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RechParRefEntete);
