import _ from 'lodash';
import React from 'react';
import { Text, View } from 'react-native';
import { Row,Col } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  ComAccordionComp,
  ComBadrKeyValueComp
} from '../../../../../../commons/component';
import dedTraiterNumRCAction from '../../../state/actions/dedTraiterNumRCAction';
import { TRAITER_NUM_RC_REQUEST } from '../../../state/DedRedressementConstants';
import styles from '../../../style/DedRedressementStyle';
import { FLAG_OPER_ENGAGE_EXP, PROPRIETAIRE_MARCHANDISE_EXPEDITEUR } from '../../../utils/DedConstants';
import { getValueByPath, getValueByPaths } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';

class DedRedressementEnteteDeclarantOpeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dedDumVo: this.props.data,
      numeroCentreRCExpediteurDisabled: false
    };
    this.isNumeroCentreRCExpediteurDisabled();
  }

  componentDidMount() { }

  isNumeroCentreRCExpediteurDisabled = () => {

    if (!_.isEmpty(this.props.data?.dedDumSectionEnteteVO.codeCentreRCExpediteur) && !_.isEmpty(this.props.data?.dedDumSectionEnteteVO.justNumeroRC)) {
      let enregistree = getValueByPath('dedReferenceVO.enregistree', this.props.data);
      console.log('enregistree', enregistree);
      if (enregistree == 'true') {
        this.state({ numeroCentreRCExpediteurDisabled: true });
      }
    }

  }

  isOperateurExpediteurGrise = () => {
    let typeProprietaireMarchandise = getValueByPath('dedDumSectionEnteteVO.typeProprietaireMarchandise', this.props.data);
    console.log("typeProprietaireMarchandise", typeProprietaireMarchandise);
    console.log("PROPRIETAIRE_MARCHANDISE_EXPEDITEUR :", PROPRIETAIRE_MARCHANDISE_EXPEDITEUR);
    return typeProprietaireMarchandise === PROPRIETAIRE_MARCHANDISE_EXPEDITEUR;
  }

  onChangeCodeCentreRCExpediteur = (typeOperateur, text) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, codeCentreRCExpediteur: text } };
    let justNumeroRC = this.state.dedDumVo.dedDumSectionEnteteVO.justNumeroRC
    if (!_.isEmpty(text) && !_.isEmpty(justNumeroRC)) {
      this.traiterNumRC(typeOperateur, text, justNumeroRC);
    }

    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  }
  onChangeJustNumeroRC = (typeOperateur, text) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, justNumeroRC: text } };
    let codeCentreRCExpediteur = this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCExpediteur
    if (!_.isEmpty(text) && !_.isEmpty(codeCentreRCExpediteur)) {
      this.traiterNumRC(typeOperateur, codeCentreRCExpediteur, text);
    }
    this.setState({
      dedDumVo: dedDumVo
    });

    this.props.update(dedDumVo);
  }

  traiterNumRC = (typeOperateur, codeCentreRC, numeroRC) => {

    var action = dedTraiterNumRCAction.request({
      type: TRAITER_NUM_RC_REQUEST,
      value: {
        typeOperateur: typeOperateur,
        operateurEngageFlag: this.state.dedDumVo.dedReferenceVO.operateurEngageFlag,
        data: this.state.dedDumVo,
        dedDumOperateurVO: {
          codeRegime: this.state.dedDumVo.dedReferenceVO.refRegime,
          codeCentreRC: codeCentreRC,
          numeroRC: numeroRC
        }
      },
    });
    this.props.dispatch(action);

  }


  viderExpediteurDestinataire = (typeOperateur) => {
    /* if (DedCstPresentation.FLAG_OPER_ENGAGE_EXP.equals(typeOperateur)) {
      webBean.getSectionEnteteWebBean().setNomAdresseOperateurExpediteurDisabled(false);
      webBean.getSectionEnteteWebBean().setAdresseOperateurExpediteur(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().setNomOperateurExpediteur(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().getVo().setIfuExpediteur(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().setActiviteOperateurExpediteur(DedCstPresentation.AUCUN);
    } else if (DedCstPresentation.FLAG_OPER_ENGAGE_DEST.equals(typeOperateur)) {
      webBean.getSectionEnteteWebBean().setNomAdresseOperateurDestinataireDisabled(false);
      webBean.getSectionEnteteWebBean().setAdresseOperateurDestinataire(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().setNomOperateurDestinataire(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().setActiviteOperateurDestinataire(DedCstPresentation.AUCUN);
    } else if (DedCstPresentation.FLAG_OPER_ENGAGE_LEQUEL.equals(typeOperateur)) {
      DedViewUtils.setAdresseOperateurPourLequel(webBean.getSectionEnteteWebBean(), DedCstPresentation.AUCUN);
      DedViewUtils.setNomOperateurPourLequel(webBean.getSectionEnteteWebBean(), DedCstPresentation.AUCUN);
      DedViewUtils.setActiviteOperateurPourLequel(webBean.getSectionEnteteWebBean(), DedCstPresentation.AUCUN);
    } else if (DedCstPresentation.FLAG_OPER_DECLARANT.equals(typeOperateur)) {
      webBean.getSectionEnteteWebBean().setNomAdresseOperateurExpediteurDisabled(false);
      webBean.getSectionEnteteWebBean().getVo().setAdresseOperateurDeclarant(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().getVo().setNomOperateurDeclarant(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().getVo().setIfuDeclarant(DedCstPresentation.AUCUN);
      webBean.getSectionEnteteWebBean().getVo().setIOperateurDeclarant(null);
      webBean.getSectionEnteteWebBean().getVo().setActiviteDeclarant(DedCstPresentation.AUCUN);
    } */
  }


  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Déclarant (Opérateur)" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Déclarant (Opérateur)</Text>
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Code"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.codeDeclarant',
                  this.props.data,
                )}
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="N° Répertoire"
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.numeroRepertoire',
                      this.props.data,
                    )}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Nom ou raison sociale"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.nomDeclarant',
                  this.props.data,
                )}
              />
            </DedRedressementRow>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Activité"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.activiteDeclarant',
                  this.props.data,
                )}
              />
            </DedRedressementRow>
          </View>

          {this.buildOperateurBlock(
            'Expediteur / Exportateur / Cédant',
            'dedDumSectionEnteteVO.codeCentreRCExpediteur',
            'dedDumSectionEnteteVO.justNumeroRC',
            'dedDumSectionEnteteVO.nomCentreRC',
            'dedDumSectionEnteteVO.ifuExpediteur',
            'dedDumSectionEnteteVO.nomOperateurExpediteurR',
            'dedDumSectionEnteteVO.nomOperateurExpediteurS',
            'dedDumSectionEnteteVO.adresseOperateurExpediteurR',
            'dedDumSectionEnteteVO.adresseOperateurExpediteurS',
            'dedDumSectionEnteteVO.preIfuExpediteur',
            'dedDumSectionEnteteVO.activiteOperateurDestinataireR0'
          )}
          {this.buildOperateurBlock(
            'Destinataire, Importateur / Cessionaire',
            'dedDumSectionEnteteVO.codeCentreRCDestinataire',
            'dedDumSectionEnteteVO.justNumeroCentreRCDestinataire',
            'dedDumSectionEnteteVO.nomCentreRCDestinataire',
            'dedDumSectionEnteteVO.ifuDestinataire',
            'dedDumSectionEnteteVO.nomOperateurDestinataireR',
            'dedDumSectionEnteteVO.nomOperateurDestinataireS',
            'dedDumSectionEnteteVO.adresseOperateurDestinataireR',
            'dedDumSectionEnteteVO.adresseOperateurDestinataireS',
            'dedDumSectionEnteteVO.preIfuDestinataire',
            'dedDumSectionEnteteVO.activiteOperateurDestinataireR'
          )}
          {this.buildOperateurBlock(
            "Operateur pour lequel est engagé l'opération",
            'dedDumSectionEnteteVO.codeCentreRCOperateurPourLequel',
            'dedDumSectionEnteteVO.numeroRCOperateurPourLequel',
            'dedDumSectionEnteteVO.nomCentreRCOperateurPourLequel',
            'dedDumSectionEnteteVO.ifuOperateurPourLequel',
            'dedDumSectionEnteteVO.nomOperateurPourLequel',
            'dedDumSectionEnteteVO.nomOperateurPourLequel',
            'dedDumSectionEnteteVO.adresseOperateurPourLequel',
            'dedDumSectionEnteteVO.adresseOperateurPourLequel',
            'dedDumSectionEnteteVO.preIfuDestinataire',
            'dedDumSectionEnteteVO.activiteOperateurPourLequel'
          )}
          {this.buildOperateurBlockEditable(
            'Expediteur / Exportateur / Cédant',
            'dedDumSectionEnteteVO.codeCentreRCExpediteur',
            'dedDumSectionEnteteVO.justNumeroRC',
            'dedDumSectionEnteteVO.nomCentreRC',
            'dedDumSectionEnteteVO.ifuExpediteur',
            'dedDumSectionEnteteVO.nomOperateurExpediteurR',
            'dedDumSectionEnteteVO.nomOperateurExpediteurS',
            'dedDumSectionEnteteVO.adresseOperateurExpediteurR',
            'dedDumSectionEnteteVO.adresseOperateurExpediteurS',
            'dedDumSectionEnteteVO.activiteOperateurExpediteurR'
          )}
        </ComAccordionComp>
      </View>
    );
  }

  buildOperateurBlock = (
    title,
    codeCentreRC,
    numRC,
    nomRC,
    ifu,
    nomOpeExpR,
    nomOpeExpS,
    adressOpeExpR,
    adressOpeExpS,
    preIfu,
    activite,
  ) => {
    return (
      (this.props.readOnly) && (<View style={styles.container}>
        <DedRedressementRow zebra={true}>
          <Text style={styles.headingText}>{title}</Text>
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="N° R.C"
            value={(getValueByPath(codeCentreRC, this.props.data) ? getValueByPath(codeCentreRC, this.props.data) : "") + " " + (getValueByPath(numRC, this.props.data) ? getValueByPath(numRC, this.props.data) : "")}
          />

          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="Centre R.C"
            value={getValueByPath(nomRC, this.props.data)}
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="IFU"
            value={
              getValueByPath(preIfu, this.props.data)
                ? getValueByPath(ifu, this.props.data)
                : ''
            }
          />
          <ComBadrKeyValueComp />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPaths(nomOpeExpR, nomOpeExpS, this.props.data)}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Adresse complète"
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPaths(
                  adressOpeExpR,
                  adressOpeExpS,
                  this.props.data,
                )}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Activité"
            value={getValueByPath(activite, this.props.data)}
          />
        </DedRedressementRow>
      </View>)
    );
  };
  buildOperateurBlockEditable = (
    title,
    codeCentreRC,
    numRC,
    nomRC,
    ifu,
    nomOpeExpR,
    nomOpeExpS,
    adressOpeExpR,
    adressOpeExpS,
    activite,
  ) => {
    return (
      (!this.props.readOnly) && (<View style={styles.container}>
        <DedRedressementRow zebra={true}>
          <Text style={styles.headingText}>{title}</Text>
        </DedRedressementRow>

        <DedRedressementRow>

          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="N° R.C">
            <View style={{flex: 1, flexDirection: 'row' }}>
                <TextInput
                  style={{ margin: 1, width: 70 }}
                  maxLength={5}
                  mode="flat"
                  value={this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCExpediteur}
                  disabled={this.state.numeroCentreRCExpediteurDisabled || this.isOperateurExpediteurGrise()}
                  onEndEditing={(event) => this.onChangeCodeCentreRCExpediteur(FLAG_OPER_ENGAGE_EXP, event.nativeEvent.text)}
 
                />
                <TextInput
                  style={{ margin: 1, width: 130 }}
                  maxLength={12}
                  mode="flat"
                  value={this.state.dedDumVo.dedDumSectionEnteteVO.justNumeroRC}
                  disabled={this.state.numeroCentreRCExpediteurDisabled || this.isOperateurExpediteurGrise()}
                  onEndEditing={(event) => this.onChangeJustNumeroRC(FLAG_OPER_ENGAGE_EXP, event.nativeEvent.text)}
                />
            </View>

          </ComBadrKeyValueComp>
        

          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="Centre R.C"
            value={getValueByPath(nomRC, this.props.data)}
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="IFU"
            value={getValueByPath(ifu, this.props.data)}
          />
          <ComBadrKeyValueComp />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children={
              <TextInput
                type="flat"
                label=""
                disabled={this.isOperateurExpediteurGrise() || this.props.nomAdresseOperateurExpediteurDisabled}
                value={this.state.dedDumVo.dedDumSectionEnteteVO.nomOperateurExpediteurR}
                value={getValueByPaths(nomOpeExpR, nomOpeExpS, this.props.data)}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Adresse complète"
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPaths(
                  adressOpeExpR,
                  adressOpeExpS,
                  this.props.data,
                )}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Activité"
            value={getValueByPath(activite, this.props.data)}
          />
        </DedRedressementRow>
      </View>)
    );
  };

}
function mapStateToProps(state) {
  return { ...state.dedEnteteReducer };
}

export default connect(
  mapStateToProps,
  null,
)(DedRedressementEnteteDeclarantOpeBlock);
