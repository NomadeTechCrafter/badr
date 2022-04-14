import React from 'react';

import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { translate } from '../../../../../commons/i18n/ComI18nHelper';
import {
  ComAccordionComp as Accordion,
  ComBadrAutoCompleteChipsComp,
  ComBadrAutoCompleteComp,
  ComBadrButtonComp,
  ComBadrCardBoxComp as CardBox,
  ComBadrDialogComp,
  ComBadrErrorMessageComp,
  ComBadrInfoMessageComp,
  ComBadrKeyValueComp,
  ComBadrPickerComp,
  ComBasicDataTableComp,
} from '../../../../../commons/component';

import _ from 'lodash';
import {
  CustomStyleSheet,
  accentColor,
} from '../../../../../commons/styles/ComThemeStyle';
import { HelperText, TextInput } from 'react-native-paper';
import GestionApurementAction from '../../state/actions/GestionApurementAction';
import * as Constants from '../../state/ApurementConstants';
import { DeclarationTriptiqueHeader } from './DeclarationTryptiqueHeader';
import { DeclarationEnDetailApurementBlock } from './DeclarationEnDetailApurementBlock';
import { LotDSApurementBlock } from './LotDSApurementBlock';
import { EtatChargementApurementBlock } from './EtatChargementApurementBlock';

class OngletApurement extends React.Component {

   defaultState = {
    showErrorMsg: false,
    dialogVisibility: false,
    motif: '',
    displayError: false,
    errorMessage: '',

  };
  constructor(props) {
    super(props);
    this.state = {
      showErrorMsg: false,
      dialogVisibility: false,
      motif: '',
      displayError: false,
      errorMessage: '',

    };
    // this.props.actions.dispatch({
    //   type: Constants.APUR_CONFIRMER_INIT,
    //   value: {},
    // });
  }
  
  hasErrors = (field) => {
    return this.state.showErrorMsg && _.isEmpty(this.state[field]);
  };
  // ajouter une DUM dans le tableau
  ajouterDUM = (data) => {
    const typeRegime = this.props.dataVo?.declarationTriptique?.refRegime;
    const listDUM = this.props.listDUM;
    const listLot = this.props.listLot;
    const listEC = this.props.listEC;
    //Check only one ele exists for D17
    if (typeRegime === 'D17' && (!_.isEmpty(listDUM) || !_.isEmpty(listLot) || !_.isEmpty(listEC))) {
      this.scrollViewRef.scrollTo({ y: 0, animated: true });
      //Err :  Une seule ligne doit être servi pour un régime d'importation (D17).
      this.setState({
        displayError: true,
        errorMessage: translate('D17D20.errors.seuleLigneD17'),
      });
      return;
    }
    //Dont add the same ele
    if (typeRegime === 'D20' && listDUM.find(ele => ele.referenceEnregistrement === data.refDUM)) {
      this.scrollViewRef.scrollTo({ y: 0, animated: true });
      //Une ligne DUM existe portant la même référence..
      this.setState({
        displayError: true,
        errorMessage: translate('D17D20.errors.memeDUM'),
      });
      return;
    }
    let action = GestionApurementAction.request(
      {
        type: Constants.AJOUTER_LIGNE_DUM_REQUEST,
        value: {
          login: this.state.login,
          commande: 'tryptique.ajouterLigneDUMApurement',
          module: 'DED_LIB',
          typeService: 'SP',
          data: data
        },
      },

    );
    this.props.actions.dispatch(action);
   
  }
  //Ajouter un lot dans le tableau
  ajouterLot = (data, refDS, libelleTypeDS, libelleLieuChargement) => {
    const typeRegime = this.props.dataVo?.declarationTriptique?.refRegime;
    const listLot = this.props.listLot;
    //Dont add the same ele
    const lot = listLot.find(ele => {
      ele.typeDS === data.typeDS &&
        ele.preapBureau === data.bureauDS &&
        ele.preapRegime === data.regimeDS &&
        ele.preapAnnee === data.anneeDS &&
        ele.preapSerie === data.serieDS &&
        ele.referenceLot === data.referenceLot &&
        ele.codelieuChargement === data.codeLieuChargement
    });
    if (typeRegime === 'D20' &&  (typeof lot !== "undefined") && lot !== null) {
      this.scrollViewRef.scrollTo({ y: 0, animated: true });
      //Une ligne DUM existe portant la même référence..
      this.setState({
        displayError: true,
        errorMessage: translate('D17D20.errors.memeLot'),
      });
      return;
    }
    let action = GestionApurementAction.request(
      {
        type: Constants.AJOUTER_LOT_DS_REQUEST,
        value: {
          login: this.state.login,
          commande: 'tryptique.ajouterLotDS',
          module: 'DED_LIB',
          typeService: 'SP',
          data: data,
          refDS: refDS,
          libelleTypeDS: libelleTypeDS,
          libelleLieuChargement: libelleLieuChargement,
        },
      },

    );
    this.props.actions.dispatch(action);

  }

  // Ajouter un EC dans le tableau

  ajouterEC = (data) => {
    const typeRegime = this.props.dataVo?.declarationTriptique?.refRegime;
    const listDUM = this.props.listDUM;
    const listLot = this.props.listLot;
    const listEC = this.props.listEC;

    if (typeRegime === 'D17' && (!_.isEmpty(listDUM) || !_.isEmpty(listLot) || !_.isEmpty(listEC))) {
      //Err :  Une seule ligne doit être servi pour un régime d'importation (D17).
      this.scrollViewRef.scrollTo({ y: 0, animated: true });
      this.setState({
        displayError: true,
        errorMessage: translate('D17D20.errors.seuleLigneD17'),
      });
      return;
    }

    let action = GestionApurementAction.request(
      {
        type: Constants.AJOUTER_LIGNE_EC_REQUEST,
        value: {
          login: this.state.login,
          commande: 'tryptique.ajouterLigneEC',
          module: 'DED_LIB',
          typeService: 'SP',
          data: data,
        },
      },

    );
    this.props.actions.dispatch(action);
    
  }

  deleteConnaissement = (row, index) => {
    this.props.actions.dispatch({
      type: Constants.DELETE_LOT_DS,
      value: {
        row: row,
        index: index,
      },
    });
 
  };
  deleteDUM = (row, index) => {
    this.props.actions.dispatch({
      type: Constants.DELETE_LIGNE_DUM,
      value: {
        row: row,
        index: index,
      },
    });
  };

  deleteEC = (row, index) => {
    this.props.actions.dispatch({
      type: Constants.DELETE_LIGNE_EC,
      value: {
        row: row,
        index: index,
      },
    });
  };

  apurer = () => this.setState({ dialogVisibility: true });

  hideDialog = () => this.setState({ dialogVisibility: false });
 
  apurerEffective = () => { 

    //Motif obligatoire
    this.setState({ showErrorMsg: true });
    if (this.state.motif !== '') {

      const identifiant = this.props.dataVo?.declarationTriptique?.indentifiant;
     
      //DUM
      let lignesDedApures = [];
      this.props.listDUM.forEach(dum => {
        lignesDedApures.push({
          dedServicesVO: {
            identifiantDED: dum.identifiantDED
          }
        });
      });

      //LotDS
      let lignesLotDsApures = [];
      this.props.listLot.forEach(lot => {
        lignesLotDsApures.push({
          preapAnnee: lot.preapAnnee,
          preapBureau: lot.preapBureau,
          preapRegime: lot.preapRegime,
          preapSerie: lot.preapSerie,
          referenceLot: lot.referenceLot,
          typeDS: lot.typeDS,
          lieuChargement: lot.codelieuChargement,
          numeroOrdre: lot.N
        });
      });

      //EC
      let lignesEtatChargementApures = [];
      this.props.listEC.forEach(ec => {
        lignesEtatChargementApures.push({
          refetatchargement:ec.IdEtatchargement
        });
      });

      const data = {
        indentifiant: identifiant,
        refVersionsDeclarationEnDouane: [
          {
            lignesLotDsApures: [
              ...lignesLotDsApures
            ],
            lignesEtatChargementApures: [
              ...lignesEtatChargementApures
            ],
            lignesDedApures: [
              ...lignesDedApures
            ]
          }
        ],
        motifIntervention: this.state.motif
      };
      console.log(data);
      let action = GestionApurementAction.request(
        {
          type: Constants.APUR_CONFIRMER_USE_CASE_REQUEST,
          value: {
            login: this.state.login,
            commande: 'tryptique.confirmerApurement',
            module: 'DED_LIB',
            typeService: 'UC',
            data: data,
          },
        },

      );
      this.props.actions.dispatch(action);
    }

  }


  render() {
    const libelleRegime = this.props.dataVo?.enteteTrypVO.libelleRegime;
    const referenceEnregistrement = this.props.dataVo?.declarationTriptique?.referenceEnregistrement;
    const regimeTryptique = referenceEnregistrement.slice(3, 6)
    const typeRegime = this.props.dataVo?.declarationTriptique?.refRegime;
    const listDUM = this.props.listDUM;
    const listLot = this.props.listLot;
    const listEC = this.props.listEC;
    
    return (
      <View style={styles.fabContainer}>
        <ScrollView ref={(ref) => {
          this.scrollViewRef = ref;
        }}  >
         
          <View style={styles.messages}>
            {this.props.displayError && (
              <ComBadrErrorMessageComp
                style={styles.centerErrorMsg}
                message={this.props.errorMessage}
              />
            )}
            {this.state.displayError && (
              <ComBadrErrorMessageComp
                style={styles.centerErrorMsg}
                message={this.state.errorMessage}
              />
            )}
            {this.props.messageInfo !== ''  && (
              <ComBadrInfoMessageComp style={styles.centerErrorMsg}
                message={this.props.messageInfo} />
            )}
            
          </View>
          {/* Référence déclaration */}
          <DeclarationTriptiqueHeader reference={referenceEnregistrement} libelleRegime={libelleRegime} />

          {/* This is the list of DUM */}
          <DeclarationEnDetailApurementBlock listDUM={listDUM} disabled={this.props.success}
            regimeTryptique={regimeTryptique} onAjouter={this.ajouterDUM}
             onDelete ={this.deleteDUM} />

          {/* Connaissements  */}
          {typeRegime === 'D20' && (
            <LotDSApurementBlock listLot={listLot} disabled={this.props.success}
              onAjouter={this.ajouterLot}
              onDelete={this.deleteConnaissement} />
          )}

          {/* Etat de Chargement  */}
          {typeRegime === 'D17' && (
            <EtatChargementApurementBlock listEC={listEC} disabled={this.props.success}
              onAjouter={this.ajouterEC}
              onDelete={this.deleteEC} />
          )}

          <View style={styles.containerActionBtn}>
            {!this.props.success && (
              <ComBadrButtonComp
                style={styles.actionBtn}
                onPress={() => {
                  this.apurer();
                }}
                text={'APURER'}
              />
            )}
            
          </View>
          <ComBadrDialogComp
            title={'Motif'}
            confirmMessage={'OK'}
            cancelMessage={'Abandonner'}
            onCancel={this.hideDialog}
            onOk={this.apurerEffective}
            dialogVisibility={this.state.dialogVisibility}
          >
            <View >
              <TextInput
                mode={'outlined'}
                disabled={false}
                style={{ height: 90, fontSize: 12, textAlignVertical: 'top' }}
                value={this.state.motif}
                multiline={true}
                numberOfLines={5}
                onChangeText={(text) => {
                  this.setState({
                    motif: text
                  });
                }}
              />
              <HelperText
                type="error"
                padding="none"
                visible={this.hasErrors('motif')}>
                {translate('errors.donneeObligatoire', {
                  champ: 'Motif',
                })}
              </HelperText>

            </View>


          </ComBadrDialogComp>
        </ScrollView>
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
  row: {
    margin: 0,
    padding: 0,
    flex: 1,
    width: '90%',
    flexDirection: 'row',
  },
  containerInputs: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
   fabContainer: {
    height: '100%',
    flex: 1,
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

  cardBox: {
    padding: 0,
    margin: 10,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  containerActionBtn: {
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  decisionContainerRB: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#009ab2',
    padding: 0,
    margin: 0,
  },
  
  textRadio: {
    color: '#FFF',
  },
  flexColumn: { flexDirection: 'column' },
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
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#ecf0f1',
  },
  centre: {
    alignSelf: 'center',
  },
  nombreResult: { margin: 20, marginVertical: 10, ...value },
  cardBoxInfoDum: {
    flexDirection: 'column',
    margin: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  containerInputs: {
    flexDirection: 'column',
    borderWidth:1,
    alignItems: 'center',
    marginTop: 20,
  },
  containerInputsWithBorder: {
    borderWidth: 1,
    borderColor: '#009ab2',
    borderBottomEndRadius:0.5,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  cleHelperMsg: { width: 150 },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  actionsContainer:{
  flexDirection: 'row',
    justifyContent: 'center',
  marginTop: 10,
  },
  btnConfirmer: {
    color: accentColor,
    padding: 5,
    marginRight: 15,
  },
  btnRetablir: {
    color: accentColor,
    padding: 5,
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  alignStart: {
    alignItems: 'flex-start',
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
    flex: 1,
  },
  BtnWidth: { width: 100 }
});

function mapStateToProps(state) {
  return { ...state.gestionApurementReducer };
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
)(OngletApurement);
