import _ from 'lodash';
import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import {
  ComAccordionComp,
  ComBadrKeyValueComp
} from '../../../../../../commons/component';
import dedTraiterNumRCAction from '../../../state/actions/dedTraiterNumRCAction';
import { TRAITER_NUM_RC_REQUEST } from '../../../state/DedRedressementConstants';
import styles from '../../../style/DedRedressementStyle';
import { FLAG_OPER_ENGAGE_EXP, FLAG_OPER_ENGAGE_LEQUEL, PROPRIETAIRE_MARCHANDISE_DESTINATAIRE, PROPRIETAIRE_MARCHANDISE_EXPEDITEUR } from '../../../utils/DedConstants';
import { getValueByPath, getValueByPaths } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';

class DedRedressementEnteteDeclarantOpeBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dedDumVo: this.props.data,
      numeroCentreRCExpediteurDisabled: false,
      numeroCentreRCDestinataireDisabled:false
    };

  }

  componentDidMount() {
    this.isNumeroCentreRCExpediteurDisabled();
    this.isNumeroCentreRCDestinataireDisabled();
  }

  isNumeroCentreRCExpediteurDisabled = () => {

    if (!_.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.codeCentreRCExpediteur) && !_.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.justNumeroRC)) {
      let enregistree = getValueByPath('dedReferenceVO.enregistree', this.props.data);
      if (enregistree == 'true') {
        this.setState({ numeroCentreRCExpediteurDisabled: true });
      }
    } else {
      this.setState({ numeroCentreRCExpediteurDisabled: false });
    }



  }

  

  
  isNomOperateurExpediteurREmpty = () => {
    return _.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.nomOperateurExpediteurR);
  }



  isOperateurExpediteurGrise = () => {
    let typeProprietaireMarchandise = getValueByPath('dedDumSectionEnteteVO.typeProprietaireMarchandise', this.props.data);
    return typeProprietaireMarchandise === PROPRIETAIRE_MARCHANDISE_EXPEDITEUR;
  }

  onChangeCodeCentreRCExpediteur = (text, typeOperateur) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, codeCentreRCExpediteur: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (!_.isEmpty(typeOperateur)) {
      let justNumeroRC = this.state.dedDumVo.dedDumSectionEnteteVO.justNumeroRC
      if (!_.isEmpty(text) && !_.isEmpty(justNumeroRC)) {
        this.traiterNumRC(typeOperateur, text, justNumeroRC);
      }


      this.props.update(dedDumVo);
    }
  }


  onChangeJustNumeroRC = (text, typeOperateur) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, justNumeroRC: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (!_.isEmpty(typeOperateur)) {
      let codeCentreRCExpediteur = this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCExpediteur
      if (!_.isEmpty(text) && !_.isEmpty(codeCentreRCExpediteur)) {
        this.traiterNumRC(typeOperateur, codeCentreRCExpediteur, text);
      }

      this.props.update(dedDumVo);
    }
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
  onChangeNomOperateurExpediteur = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    if (this.isNomOperateurExpediteurREmpty()) {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, nomOperateurExpediteurS: text } };
    } else {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, nomOperateurExpediteurR: text } };
    }
    this.setState({
      dedDumVo: dedDumVo
    });
    if (update) {
      this.props.update(dedDumVo);
    }
  }

  onChangeAdresseOperateurExpediteur = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    if (this.isNomOperateurExpediteurREmpty()) {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, adresseOperateurExpediteurS: text } };
    } else {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, adresseOperateurExpediteurR: text } };
    }
    this.setState({
      dedDumVo: dedDumVo
    });

    if (update) {
      this.props.update(dedDumVo);
    }
  }


  isExpediteurEditable = () => {

    return !(_.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.justNumeroRC) || _.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.codeCentreRCExpediteur));
  }
   
  static getDerivedStateFromProps(props, state) {
    if (!_.isEmpty(state.dedDumVo?.dedDumSectionEnteteVO.codeCentreRCExpediteur) && !_.isEmpty(state.dedDumVo?.dedDumSectionEnteteVO.justNumeroRC) && ((props.data?.dedDumSectionEnteteVO.nomOperateurExpediteurR != state.dedDumVo.dedDumSectionEnteteVO.nomOperateurExpediteurR) || (props.data?.dedDumSectionEnteteVO.adresseOperateurExpediteurR != state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurExpediteurR))
    ) {
      return {
        ...state, dedDumVo: {
          ...state.dedDumVo, dedDumSectionEnteteVO: {
            ...state.dedDumVo.dedDumSectionEnteteVO,
            nomOperateurExpediteurR: props.data?.dedDumSectionEnteteVO.nomOperateurExpediteurR,// update the value of specific key
            adresseOperateurExpediteurR: props.data?.dedDumSectionEnteteVO.adresseOperateurExpediteurR
          }
        }
      };
    }

    if (!_.isEmpty(state.dedDumVo?.dedDumSectionEnteteVO.codeCentreRCDestinataire) && !_.isEmpty(state.dedDumVo?.dedDumSectionEnteteVO.justNumeroCentreRCDestinataire) && ((props.data?.dedDumSectionEnteteVO.nomOperateurDestinataireR != state.dedDumVo.dedDumSectionEnteteVO.nomOperateurDestinataireR) || (props.data?.dedDumSectionEnteteVO.adresseOperateurDestinataireR != state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurDestinataireR))
    ) {
      return {
        ...state, dedDumVo: {
          ...state.dedDumVo, dedDumSectionEnteteVO: {
            ...state.dedDumVo.dedDumSectionEnteteVO,
            nomOperateurDestinataireR: props.data?.dedDumSectionEnteteVO.nomOperateurDestinataireR,// update the value of specific key
            adresseOperateurDestinataireR: props.data?.dedDumSectionEnteteVO.adresseOperateurDestinataireR
          }
        }
      };
    }
   if (!_.isEmpty(state.dedDumVo?.dedDumSectionEnteteVO.codeCentreRCOperateurPourLequel) && !_.isEmpty(state.dedDumVo?.dedDumSectionEnteteVO.numeroRCOperateurPourLequel) && ((props.data?.dedDumSectionEnteteVO.nomOperateurPourLequel != state.dedDumVo.dedDumSectionEnteteVO.nomOperateurPourLequel) || (props.data?.dedDumSectionEnteteVO.adresseOperateurPourLequel != state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurPourLequel))
    ) {
      return {
        ...state, dedDumVo: {
          ...state.dedDumVo, dedDumSectionEnteteVO: {
            ...state.dedDumVo.dedDumSectionEnteteVO,
            nomOperateurPourLequel: props.data?.dedDumSectionEnteteVO.nomOperateurPourLequel,// update the value of specific key
            adresseOperateurPourLequel: props.data?.dedDumSectionEnteteVO.adresseOperateurPourLequel
          }
        }
      };
    }


    if (props.data?.dedReferenceVO?.identifiant != state.dedDumVo.dedReferenceVO?.identifiant
    ) {
      return {
        dedDumVo: props.data
        }
      }
    return null;
  }

  isOperateurDestinataireGrise = () => {
    let typeProprietaireMarchandise = getValueByPath('dedDumSectionEnteteVO.typeProprietaireMarchandise', this.props.data);
    return typeProprietaireMarchandise === PROPRIETAIRE_MARCHANDISE_DESTINATAIRE;
  }

  isNumeroCentreRCDestinataireDisabled = () => {

    if (!_.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.codeCentreRCDestinataire) && !_.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.justNumeroCentreRCDestinataire)) {
      let enregistree = getValueByPath('dedReferenceVO.enregistree', this.props.data);
      console.log('enregistree', enregistree);
      if (enregistree == 'true') {
        this.setState({ numeroCentreRCDestinataireDisabled: true });
      }
    } else {
      this.setState({ numeroCentreRCDestinataireDisabled: false });
    }



  }

  isDestinataireEditable = () => {
    return !(_.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.justNumeroCentreRCDestinataire) || _.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.codeCentreRCDestinataire));
  }

  isNomOperateurDestinataireREmpty = () => {
    return _.isEmpty(this.state.dedDumVo?.dedDumSectionEnteteVO.nomOperateurDestinataireR);
  }


  onChangeNomOperateurDestinataire = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    if (this.isNomOperateurDestinataireREmpty()) {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, nomOperateurDestinataireS: text } };
    } else {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, nomOperateurDestinataireR: text } };
    }
    this.setState({
      dedDumVo: dedDumVo
    });
    if (update) {
      this.props.update(dedDumVo);
    }
  }

  onChangeAdresseOperateurDestinataire = (text, update) => {
    let dedDumVo = { ...this.state.dedDumVo };
    if (this.isNomOperateurDestinataireREmpty()) {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, adresseOperateurDestinataireS: text } };
    } else {
      dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, adresseOperateurDestinataireR: text } };
    }
    this.setState({
      dedDumVo: dedDumVo
    });

    if (update) {
      this.props.update(dedDumVo);
    }
  }

  onChangeCodeCentreRCDestinataire = (text, typeOperateur) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, codeCentreRCDestinataire: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (!_.isEmpty(typeOperateur)) {
      let justNumeroCentreRCDestinataire = this.state.dedDumVo.dedDumSectionEnteteVO.justNumeroCentreRCDestinataire
      if (!_.isEmpty(text) && !_.isEmpty(justNumeroCentreRCDestinataire)) {
        this.traiterNumRC(typeOperateur, text, justNumeroCentreRCDestinataire);
      }


      this.props.update(dedDumVo);
    }
  }


  onChangeJustNumeroRCDestinataire = (text, typeOperateur) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, justNumeroCentreRCDestinataire: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (!_.isEmpty(typeOperateur)) {
      let codeCentreRCDestinataire = this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCDestinataire
      if (!_.isEmpty(text) && !_.isEmpty(codeCentreRCDestinataire)) {
        this.traiterNumRC(typeOperateur, codeCentreRCDestinataire, text);
      }

      this.props.update(dedDumVo);
    }
  }

  

  onChangeCodeCentreRCOperateurPourLequel = (text, typeOperateur) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, codeCentreRCOperateurPourLequel: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (!_.isEmpty(typeOperateur)) {
      let numeroRCOperateurPourLequel = this.state.dedDumVo.dedDumSectionEnteteVO.numeroRCOperateurPourLequel
      if (!_.isEmpty(text) && !_.isEmpty(numeroRCOperateurPourLequel)) {
        this.traiterNumRC(typeOperateur, text, numeroRCOperateurPourLequel);
      }


      this.props.update(dedDumVo);
    }
  }


  onChangeNumeroRCOperateurPourLequel = (text, typeOperateur) => {
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionEnteteVO: { ...this.state.dedDumVo.dedDumSectionEnteteVO, numeroRCOperateurPourLequel: text } };
    this.setState({
      dedDumVo: dedDumVo
    });
    if (!_.isEmpty(typeOperateur)) {
      let codeCentreRCOperateurPourLequel = this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCOperateurPourLequel
      if (!_.isEmpty(text) && !_.isEmpty(codeCentreRCOperateurPourLequel)) {
        this.traiterNumRC(typeOperateur, codeCentreRCOperateurPourLequel, text);
      }

      this.props.update(dedDumVo);
    }
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
          {this.buildExpediteurBlockEditable(
            'Expediteur / Exportateur / Cédant',
            'dedDumSectionEnteteVO.nomCentreRC',
            'dedDumSectionEnteteVO.ifuExpediteur',
            'dedDumSectionEnteteVO.activiteOperateurExpediteurR'
          )}
          {this.buildDestinataireBlockEditable(
            'Destinataire, Importateur / Cessionaire',
            'dedDumSectionEnteteVO.nomCentreRCDestinataire',
            'dedDumSectionEnteteVO.ifuDestinataire',
            'dedDumSectionEnteteVO.activiteOperateurDestinataireR'
          )}
          {this.buildOperateurBlockEditable(
            "Operateur pour lequel est engagé l'opération",
            'dedDumSectionEnteteVO.nomCentreRCOperateurPourLequel',
            'dedDumSectionEnteteVO.ifuOperateurPourLequel',
            'dedDumSectionEnteteVO.activiteOperateurPourLequel'
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
  buildExpediteurBlockEditable = (
    title,
    nomRC,
    ifu,
    activite) => {
    return (
      (!this.props.readOnly) && (<View style={styles.container}>
        <DedRedressementRow zebra={true}>
          <Text style={styles.headingText}>{title}</Text>
        </DedRedressementRow>

        <DedRedressementRow>

          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="N° R.C">
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TextInput
                style={{ margin: 1, width: 70 }}
                maxLength={5}
                mode="flat"
                value={this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCExpediteur}
                disabled={this.state.numeroCentreRCExpediteurDisabled || this.isOperateurExpediteurGrise()}
                onChangeText={(val) => this.onChangeCodeCentreRCExpediteur(val)}
                onEndEditing={(event) => this.onChangeCodeCentreRCExpediteur(event.nativeEvent.text, FLAG_OPER_ENGAGE_EXP)}

              />
              <TextInput
                style={{ margin: 1, width: 130 }}
                maxLength={12}
                mode="flat"
                value={this.state.dedDumVo.dedDumSectionEnteteVO.justNumeroRC}
                disabled={this.state.numeroCentreRCExpediteurDisabled || this.isOperateurExpediteurGrise()}
                onChangeText={(val) => this.onChangeJustNumeroRC(val)}
                onEndEditing={(event) => this.onChangeJustNumeroRC(event.nativeEvent.text, FLAG_OPER_ENGAGE_EXP)}
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
          {(!this.isNomOperateurExpediteurREmpty()) && (<ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isExpediteurEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.nomOperateurExpediteurR}
              onChangeText={(val) => this.onChangeNomOperateurExpediteur(val, false)}
              onEndEditing={(event) => this.onChangeNomOperateurExpediteur(event.nativeEvent.text)}
            />}

          />)


          }

          {(this.isNomOperateurExpediteurREmpty()) && (<ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isExpediteurEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.nomOperateurExpediteurS}
              onChangeText={(val) => this.onChangeNomOperateurExpediteur(val, false)}
              onEndEditing={(event) => this.onChangeNomOperateurExpediteur(event.nativeEvent.text, true)}
            />}
          />)


          }
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          {(!this.isNomOperateurExpediteurREmpty()) && (<ComBadrKeyValueComp
            libelle="Adresse complète"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isExpediteurEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurExpediteurR}
              onChangeText={(val) => this.onChangeAdresseOperateurExpediteur(val, false)}
              onEndEditing={(event) => this.onChangeAdresseOperateurExpediteur(event.nativeEvent.text, true)}
            />}

          />)


          }
          {(this.isNomOperateurExpediteurREmpty()) && (<ComBadrKeyValueComp
            libelle="Adresse complète"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isExpediteurEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurExpediteurS}
              onChangeText={(val) => this.onChangeAdresseOperateurExpediteur(val, false)}
              onEndEditing={(event) => this.onChangeAdresseOperateurExpediteur(event.nativeEvent.text, true)}
            />}

          />)


          }
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

  buildDestinataireBlockEditable = (
    title,
    nomRC,
    ifu,
    activite) => {
    return (
      (!this.props.readOnly) && (<View style={styles.container}>
        <DedRedressementRow zebra={true}>
          <Text style={styles.headingText}>{title}</Text>
        </DedRedressementRow>

        <DedRedressementRow>

          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="N° R.C">
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TextInput
                style={{ margin: 1, width: 70 }}
                maxLength={5}
                mode="flat"
                value={this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCDestinataire}
                disabled={this.state.numeroCentreRCDestinataireDisabled || this.isOperateurDestinataireGrise()}
                onChangeText={(val) => this.onChangeCodeCentreRCDestinataire(val)}
                onEndEditing={(event) => this.onChangeCodeCentreRCDestinataire(event.nativeEvent.text, FLAG_OPER_ENGAGE_DEST)}

              />
              <TextInput
                style={{ margin: 1, width: 130 }}
                maxLength={12}
                mode="flat"
                value={this.state.dedDumVo.dedDumSectionEnteteVO.justNumeroCentreRCDestinataire}
                disabled={this.state.numeroCentreRCDestinataireDisabled || this.isOperateurDestinataireGrise()}
                onChangeText={(val) => this.onChangeJustNumeroRCDestinataire(val)}
                onEndEditing={(event) => this.onChangeJustNumeroRCDestinataire(event.nativeEvent.text, FLAG_OPER_ENGAGE_DEST)}
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
          {(!this.isNomOperateurDestinataireREmpty()) && (<ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isDestinataireEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.nomOperateurDestinataireR}
              onChangeText={(val) => this.onChangeNomOperateurDestinataire(val, false)}
              onEndEditing={(event) => this.onChangeNomOperateurDestinataire(event.nativeEvent.text)}
            />}

          />)


          }

          {(this.isNomOperateurDestinataireREmpty()) && (<ComBadrKeyValueComp
            libelle="Nom ou raison sociale"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isDestinataireEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.nomOperateurDestinataireS}
              onChangeText={(val) => this.onChangeNomOperateurDestinataire(val, false)}
              onEndEditing={(event) => this.onChangeNomOperateurDestinataire(event.nativeEvent.text, true)}
            />}
          />)


          }
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          {(!this.isNomOperateurDestinataireREmpty()) && (<ComBadrKeyValueComp
            libelle="Adresse complète"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isDestinataireEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurDestinataireR}
              onChangeText={(val) => this.onChangeAdresseOperateurDestinataire(val, false)}
              onEndEditing={(event) => this.onChangeAdresseOperateurDestinataire(event.nativeEvent.text, true)}
            />}

          />)


          }
          {(this.isNomOperateurDestinataireREmpty()) && (<ComBadrKeyValueComp
            libelle="Adresse complète"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={this.isDestinataireEditable()}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurDestinataireS}
              onChangeText={(val) => this.onChangeAdresseOperateurDestinataire(val, false)}
              onEndEditing={(event) => this.onChangeAdresseOperateurDestinataire(event.nativeEvent.text, true)}
            />}

          />)


          }
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
    nomRC,
    ifu,
    activite) => {
    return (
      (!this.props.readOnly) && (<View style={styles.container}>
        <DedRedressementRow zebra={true}>
          <Text style={styles.headingText}>{title}</Text>
        </DedRedressementRow>

        <DedRedressementRow>

          <ComBadrKeyValueComp
            libelleSize={1}
            libelle="N° R.C">
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TextInput
                style={{ margin: 1, width: 70 }}
                maxLength={5}
                mode="flat"
                value={this.state.dedDumVo.dedDumSectionEnteteVO.codeCentreRCOperateurPourLequel}
                onChangeText={(val) => this.onChangeCodeCentreRCOperateurPourLequel(val)}
                onEndEditing={(event) => this.onChangeCodeCentreRCOperateurPourLequel(event.nativeEvent.text, FLAG_OPER_ENGAGE_LEQUEL)}

              />
              <TextInput
                style={{ margin: 1, width: 130 }}
                maxLength={12}
                mode="flat"
                value={this.state.dedDumVo.dedDumSectionEnteteVO.numeroRCOperateurPourLequel}
                onChangeText={(val) => this.onChangeNumeroRCOperateurPourLequel(val)}
                onEndEditing={(event) => this.onChangeNumeroRCOperateurPourLequel(event.nativeEvent.text, FLAG_OPER_ENGAGE_LEQUEL)}
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
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={true}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.nomOperateurPourLequel}
            />}

          />


         
          
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle="Adresse complète"
            children=
            {<TextInput
              type="flat"
              label=""
              disabled={true}
              value={this.state.dedDumVo.dedDumSectionEnteteVO.adresseOperateurPourLequel}
            />}

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
