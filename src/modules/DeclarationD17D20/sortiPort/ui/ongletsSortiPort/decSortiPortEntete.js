import React from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import {translate} from '../../../../../commons/i18n/ComI18nHelper';
import * as Constants from '../../state/decSortiPortConstants';
import * as SortiPortConfirmerAction from '../../state/actions/decSortiPortUcAction';

import {
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrCardBoxComp as CardBox,
  ComAccordionComp as Accordion,
  ComBadrDatePickerComp,
  ComBadrActionButtonComp,
} from '../../../../../commons/component';
import {Checkbox} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

import moment from 'moment';

const initialState = {
  reference: '',
  dialogVisibility: false,
  dialogMessage: '',
  errorMessage: null,
  dateDebutSortiPort: '',
  heureDebutSortiPort: '',
};

class SortiPortEntete extends React.Component {
  constructor(props) {
    super(props);

    this.scrollViewRef = React.createRef();

    //define actions switch between Confirmer and Annuler
    const screenActions = [];

    if (this.props.dataVo.declarationTriptique.sortiPortExisteDeja) {
      screenActions.push({
        title: translate('sortiPort.actionAnnuler'),
        icon: 'remove',
        onActionPressed: this.handleAnnulerSortiPort,
      });
    } else {
      screenActions.push({
        title: translate('sortiPort.subTitleAction'),
        icon: 'check',
        onActionPressed: this.handleConfirmSortiPort,
      });
    }

    if (
      this.props.dataVo &&
      this.props.dataVo.declarationTriptique &&
      this.props.dataVo.declarationTriptique.sortiPort
    ) {
      const sortiPort = this.props.dataVo.declarationTriptique.sortiPort;
      // this.setState({commentaire: sortiPort.commentaire});
      // this.setState({dateSortiPort: sortiPort.dateSortiPort});
      console.log('  test date : ' + sortiPort.dateSortiPort);
      this.state = {
        ...initialState,
        commentaire: sortiPort.commentaire,
        dateSortiPort: sortiPort.dateSortiPort,
        sortiPortExisteDeja: this.props.dataVo.declarationTriptique
          .sortiPortExisteDeja,
        screenActions,
        dateDebutSortiPort: sortiPort.dateSortiPort.split(' ')[0],
        heureDebutSortiPort: sortiPort.dateSortiPort.split(' ')[1],
      };
    } else {
      this.state = {
        ...initialState,
        commentaire: '',
        dateSortiPort: '',
        sortiPortExisteDeja: false,
        screenActions,
      };
    }
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(initialState);
  }

  cleDUM = function (regime, serie) {
    let alpha = 'ABCDEFGHJKLMNPRSTUVWXYZ';
    if (serie.length > 6) {
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
    natureVehicule = this.props.dataVo.vctNaturesVehicule.filter((vehicule) => {
      return vehicule.code === idNature;
    });

    if (natureVehicule && natureVehicule[0]) {
      return natureVehicule[0].libelle;
    }

    return natureVehicule;
  };

  getNomVehicule = function (idVehicule) {
    let nomVehicule = '';
    let vehiculeObjet = this.props.dataVo.vctVehicules.find((vehicule) => {
      return vehicule.code === idVehicule;
    });

    if (vehiculeObjet && vehiculeObjet.libelle) {
      return vehiculeObjet.libelle;
    }

    return nomVehicule;
  };

  handleConfirmSortiPort = () => {
    if (
      !this.state.dateDebutSortiPort ||
      this.state.dateDebutSortiPort === '' ||
      !this.state.heureDebutSortiPort ||
      this.state.heureDebutSortiPort === '' ||
      !this.state.commentaire ||
      this.state.commentaire === ''
    ) {
      this.setState({
        errorMessage: translate('sortiPort.dateSortiPortObligatoire'),
      });
      this.scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
      return;
    }

    const jsonVO = {};
    jsonVO.indentifiant = this.props.dataVo.declarationTriptique.indentifiant;
    jsonVO.sortiPort = {
      dateSortiPort: this.state.dateSortiPort, //'18/01/2021 11:08',
      commentaire: this.state.commentaire, //'My Comment ',
      agent: this.state.login, //'AD6025',
    };

    var action = SortiPortConfirmerAction.request(
      {
        type: Constants.VU_EMB_CONFIRMER_REQUEST,
        value: {
          login: this.state.login,
          commande: 'ded.sortiPortConfirmerDeclarationTrypByRef',
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

  handleAnnulerSortiPort = () => {
    const jsonVO = {};
    jsonVO.indentifiant = this.props.dataVo.declarationTriptique.indentifiant;

    var action = SortiPortConfirmerAction.request(
      {
        type: Constants.VU_EMB_CONFIRMER_REQUEST,
        value: {
          login: this.state.login,
          commande: 'ded.sortiPortAnnulerDeclarationTrypByRef',
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
    const vctConducteurs = this.props.dataVo.vctConducteurs;

    const conducteur = vctConducteurs.find(
      (cond) => cond.code === codeConducteur,
    );
    if (conducteur) {
      return conducteur.libelle;
    }
    return '';
  };

  render() {
    const {enteteTrypVO, traceSignature} = this.props.dataVo;
    const {referenceEnregistrement} = this.props.dataVo.declarationTriptique;

    const renderDateSortiPort = () => {
      return (
        <ComBadrDatePickerComp
          dateFormat="DD/MM/yyyy"
          heureFormat="HH:mm"
          value={
            this.state.dateDebutSortiPort
              ? moment(this.state.dateDebutSortiPort, 'DD/MM/yyyy', true)
              : ''
          }
          timeValue={
            this.state.heureDebutSortiPort
              ? moment(this.state.heureDebutSortiPort, 'HH:mm', true)
              : ''
          }
          onDateChanged={(date) => {
            console.log(' changed date : ' + date);
            const dateToSet = date ? date : '';
            this.setState({
              dateDebutSortiPort: dateToSet,
            });
          }}
          onTimeChanged={(time) =>
            this.setState({
              heureDebutSortiPort: time,
            })
          }
          labelDate={translate('operateursEconomiques.core.dateDebut')}
          labelHeure={translate('operateursEconomiques.core.heureDebut')}
          // inputStyle={style.dateInputStyle}
          readonly={this.state.sortiPortExisteDeja || this.state.success}
        />
      );
    };

    return (
      <View style={styles.fabContainer}>
        <ScrollView ref={this.scrollViewRef}>
          {/* <ComBadrToolbarComp
            navigation={this.props.navigation}
            icon="menu"
            title={translate('sortiPort.title')}
            subtitle={translate('sortiPort.subTitleAction')}
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
                {referenceEnregistrement.slice(0, 3)}
              </Text>
              <Text style={styles.valueM}>
                {referenceEnregistrement.slice(3, 6)}
              </Text>
              <Text style={styles.valueM}>
                {referenceEnregistrement.slice(6, 10)}
              </Text>
              <Text style={styles.valueL}>
                {referenceEnregistrement.slice(10, 17)}
              </Text>
              <Text style={styles.valueS}>
                {this.cleDUM(
                  referenceEnregistrement.slice(3, 6),
                  referenceEnregistrement.slice(10, 17),
                )}
              </Text>
              <Text style={styles.valueL}>TRYPTIQUE</Text>
              <Text style={styles.valueL}>{enteteTrypVO.libelleRegime}</Text>
            </View>
          </CardBox>
          {/* Version */}
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('sortiPort.version')}>
              <View style={styles.flexColumn}>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.type')} :
                  </Text>
                  <Text style={styles.valueM}>{enteteTrypVO.type}</Text>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.numeroVersion')} :
                  </Text>
                  <Text style={styles.valueS}>
                    {enteteTrypVO.numeroVersion}
                  </Text>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.statut')} :
                  </Text>
                  <Text style={styles.valueM}>{enteteTrypVO.status}</Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.modeAcquisition')} :
                  </Text>
                  <Text style={styles.valueM}>?????</Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.codeInitiateur')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {enteteTrypVO.codeInitiateur}
                  </Text>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.nomInitiateur')} :
                  </Text>
                  <Text style={styles.valueS}>
                    {enteteTrypVO.nomInitiateur}
                  </Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.dateCreation')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {enteteTrypVO.dateCreation_VC}
                  </Text>
                </View>

                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.dateSauvegarde')}{' '}
                    {translate('sortiPort.versionCourante')}:
                  </Text>
                  <Text style={styles.valueM}>{enteteTrypVO.dateDepot_VC}</Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.dateSauvegarde')}{' '}
                    {translate('sortiPort.versionInitiale')}:
                  </Text>
                  <Text style={styles.valueM}>{enteteTrypVO.dateDepot_VI}</Text>
                </View>
              </View>
            </Accordion>
          </CardBox>
          {/* Informations sur le signataire */}
          {traceSignature && (
            <CardBox style={styles.cardBox}>
              <Accordion badr title={translate('sortiPort.infoSignataire')}>
                <View style={styles.flexColumn}>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('sortiPort.qualite')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {traceSignature.qualite_signataire}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleS}>
                      {translate('sortiPort.par')} :
                    </Text>
                    <Text style={styles.valueS}>
                      {traceSignature.ident_signataire}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('sortiPort.le')} :
                    </Text>
                    <Text style={styles.valueM}>
                      {traceSignature.date_signature}
                    </Text>
                  </View>
                  <View style={[styles.flexDirectionRow, styles.marg]}>
                    <Text style={styles.libelleM}>
                      {translate('sortiPort.numTransaction')} :
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
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('sortiPort.infoMLV')}>
              <View style={styles.flexColumn}>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.dateMLV')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {this.props.dataVo.datePassage}
                  </Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.agent')} :
                  </Text>
                  <Text style={styles.valueS}>
                    {this.props.dataVo.agentPassage}
                  </Text>
                </View>
              </View>
            </Accordion>
          </CardBox>
          {/* Transporteur */}
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('sortiPort.transporteur')}>
              <View style={styles.flexColumn}>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.numRc')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {enteteTrypVO.numeroRCTransporteur}
                  </Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.nomRaisonSociale')} :
                  </Text>
                  <Text style={styles.valueS}>
                    {enteteTrypVO.nomTransporteur}
                  </Text>
                </View>
              </View>
            </Accordion>
          </CardBox>
          {/* Conducteur et Véhicule */}
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('sortiPort.condEtVehicule')}>
              <View style={styles.flexColumn}>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.conducteur')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {this.getConducteurById(enteteTrypVO.idConducteur)}
                  </Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.conducteur2')} :
                  </Text>
                  <Text style={styles.valueM}>{''}</Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.conducteur3')} :
                  </Text>
                  <Text style={styles.valueM}>{''}</Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.natureVehicule')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {this.getNatureVehicule(enteteTrypVO.idNatureVehicule)}
                  </Text>

                  <Text style={styles.libelleM}>
                    {translate('sortiPort.vehicule')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {this.getNomVehicule(enteteTrypVO.idVehicule)}
                  </Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.natureVehicule2')} :
                  </Text>
                  <Text style={styles.valueM}>{''}</Text>

                  <Text style={styles.libelleM}>
                    {translate('sortiPort.vehicule2')} :
                  </Text>
                  <Text style={styles.valueM}>{''}</Text>
                </View>
              </View>
            </Accordion>
          </CardBox>
          {/* Marchandise */}
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('sortiPort.march')}>
              <View style={styles.flexColumn}>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.natureMarch')} :
                  </Text>
                  <Text style={styles.valueL}>
                    {enteteTrypVO.natureMarchandise}
                  </Text>
                </View>
              </View>
            </Accordion>
          </CardBox>
          {/* Autorisation MA */}
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('sortiPort.autorisation')}>
              <View style={styles.flexColumn}>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleM}>
                    {translate('sortiPort.numAutorisation')} :
                  </Text>
                  <Text style={styles.valueS}>????</Text>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.du')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {enteteTrypVO.dateDebutAutorisationMa}
                  </Text>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.au')} :
                  </Text>
                  <Text style={styles.valueM}>
                    {enteteTrypVO.dateFinAutorisationMa}
                  </Text>
                </View>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={[styles.marg, styles.libelle]}>
                    {translate('sortiPort.vide')} :
                  </Text>
                  <Checkbox
                    color="#009ab2"
                    status={enteteTrypVO.avide ? 'checked' : 'unchecked'}
                  />
                </View>
              </View>
            </Accordion>
          </CardBox>
          {/* Sorti du Port */}
          <CardBox style={styles.cardBox}>
            <Accordion badr title={translate('sortiPort.sortiPort')} expanded>
              <View style={styles.flexColumn}>
                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.dateSortiPort')} :
                  </Text>
                  <View style={styles.libelleM}>{renderDateSortiPort()}</View>
                  <Text style={styles.libelleS} />
                </View>

                <View style={[styles.flexDirectionRow, styles.marg]}>
                  <Text style={styles.libelleS}>
                    {translate('sortiPort.commentSortiPort')} :{' '}
                  </Text>

                  <TextInput
                    style={styles.libelleL}
                    maxLength={250}
                    multiline
                    disabled={
                      this.state.sortiPortExisteDeja || this.props.success
                    }
                    numberOfLines={3}
                    placeholder={translate('sortiPort.commentSortiPort')}
                    value={this.state.commentaire}
                    onChangeText={(text) => this.setState({commentaire: text})}
                  />
                  {/* <ComBadrTextInputComp
                  keyboardType="text"
                  placeholder={translate('sortiPort.commentSortiPort')}
                  onChangeText={(text) => this.setState({commentaire: text})}
                  value={this.state.commentaire}
                /> */}
                </View>
              </View>
            </Accordion>
          </CardBox>
        </ScrollView>

        <ComBadrActionButtonComp
          style={styles.badrActionsStyle}
          // visible={this.state.dateSortiPort && this.state.commentaire}
          visible={!this.props.success}
          active={false}
          actions={this.state.screenActions}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(SortiPortEntete);
