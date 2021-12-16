import React from 'react';
import { Text, View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { TextInput } from 'react-native-paper';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrButtonComp,
  ComBadrErrorMessageComp,
  ComBadrItemsPickerComp,
} from '../../../../../../../../commons/component';
import translate from '../../../../../../../../commons/i18n/ComI18nHelper';
import * as T6BISConstantes from '../../../../../../utils/t6bisConstants';
import {
  isCreation,
  stringNotEmpty,
  validateCin,
  verifyIntervenant,
} from '../../../../../../utils/t6bisUtils';
import * as Constantes from '../../../../../state/t6bisGestionConstants';
import styles from '../../../../../style/t6bisGestionStyle';

class T6bisEnteteRedevableSousBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervenantVO:
        !isCreation() && this.props.t6bis.intervenantVO
          ? this.props.t6bis.intervenantVO
          : {
            adresse: '',
            prenomIntervenant: '',
          },
      infoCompleted: null,
      newIntervenant: isCreation(),
      acNationalite: null,
      readonly: null,
      expanded: false,
      fieldsetcontext: this.props.fieldsetcontext,
      modificationInProgress: false
    };
  }

  handlePaysChanged = (pays) => {
    this.setState({
      acNationalite: pays,
      intervenantVO: {
        ...this.state.intervenantVO,
        nationaliteFr: pays.code,
      },
      modificationInProgress: true
      , errorMessage: null
    });
    this.state.intervenantVO.nationaliteFr = pays.code;

    this.checkType();
  };




  reset = () => {
    console.log('reset');
  };

  isParamSetted = function () {
    console.log('isParamSetted----------------------------  : ');
    if (this.isPasseport()) {
      if (
        this.state.intervenantVO.numeroDocumentIndentite &&
        this.state.intervenantVO.refTypeDocumentIdentite &&
        this.state.intervenantVO.nationaliteFr
      ) {
        console.log('isParamSetted----------------------------  : true');
        return true;
      }
    } else if (
      this.state.intervenantVO.numeroDocumentIndentite &&
      this.state.intervenantVO.refTypeDocumentIdentite
    ) {
      console.log('isParamSetted----------------------------  : true');
      return true;
    }
    console.log('isParamSetted----------------------------  : false');
    return false;
  };

  isPasseport = function () {
    if (this.state.intervenantVO) {
      return (
        '05' === this.state.intervenantVO.refTypeDocumentIdentite ||
        '06' === this.state.intervenantVO.refTypeDocumentIdentite ||
        '07' === this.state.intervenantVO.refTypeDocumentIdentite
      );
    } else {
      return false;
    }
  };

  checkType = function () {
    console.log('checkType----------------------------  : ');
    this.syncIntervenantInfo();
  };

  syncIntervenantInfo = function () {
    console.log('syncIntervenantInfo----------------------------  : ');
    if (this.isParamSetted()) {
      this.completeRedevableInfo();
    }
  };

  completeRedevableInfo = function () {
    if (this.isParamSetted()) {
      let data = {
        type: Constantes.FIND_INTERVENANT_REQUEST,
        value: {
          identifiants: this.buildRedevableCompletionParam(),
        },
      };
      this.props.callbackHandler(T6BISConstantes.FIND_INTERVENANT_TASK, data);
    }
    this.setState({

      modificationInProgress: false,
      errorMessage: null
    });
  };


  copyIntervenantToProp = function (nomIntervenantParam, prenomIntervenantParam, adresseParam) {

    let data = {
      intervenantVO:
      {
        nomIntervenant: nomIntervenantParam,
        prenomIntervenant: prenomIntervenantParam,
        adresse: adresseParam,
      },
    };
    this.props.callbackHandler(T6BISConstantes.UPDATE_INTERVENANT_TASK, data);

  };
  buildRedevableCompletionParam = function () {
    if (this.isPasseport()) {
      return {
        typeIdentifiant: this.state.intervenantVO.refTypeDocumentIdentite,
        numeroDocumentIdentite: this.state.intervenantVO
          .numeroDocumentIndentite,
        nationalite: this.state.intervenantVO.nationaliteFr,
      };
    } else {
      if (
        this.state.intervenantVO &&
        this.state.intervenantVO.numeroDocumentIndentite && this.state.intervenantVO.refTypeDocumentIdentite == '01'
      ) {
        this.state.intervenantVO.numeroDocumentIndentite = validateCin(
          this.state.intervenantVO.numeroDocumentIndentite,
        );
      }
      return {
        typeIdentifiant: this.state.intervenantVO.refTypeDocumentIdentite,
        numeroDocumentIdentite: this.state.intervenantVO
          .numeroDocumentIndentite,
      };
    }
  };

  confirmer = () => {
    console.log('confirmer', this.state.expanded);
    console.log('confirmer', this.props?.infoCompleted);
    this.state.expanded = this.props?.infoCompleted
      ? this.props.infoCompleted
      : false;
    console.log('confirmer', this.state.expanded);
   
    console.log('confirmer', this.state.expanded);

    if (!verifyIntervenant(this.state.intervenantVO)) {
      this.setState({

        errorMessage: translate('t6bisGestion.tabs.entete.redevableBlock.messageError')
      });
    } else { 
      this.accordionComp.toggleExpand();
    }
  };

  retablir = () => {
    console.log('retablir');
    this.props.t6bis.intervenantVO = {};
    this.setState({
      intervenantVO: {
        refTypeDocumentIdentite: '',
        numeroDocumentIndentite: '',
        nationaliteFr: '',
        nomIntervenant: '',
        prenomIntervenant: '',
        adresse: '',
      },
      infoCompleted: false,
      newIntervenant: false,
      acNationalite: {},
      modificationInProgress: false
    });
    console.log(this.state);
  };

  onBlurIdentifiant(text) {
    console.log('onBlurIdentifiant----------------------------  : ', text);
    /* this.state.intervenantVO = {
      ...this.state.intervenantVO,
      numeroDocumentIndentite: text,
    }; */

    if (this.props?.t6bis?.intervenantVO?.refTypeDocumentIdentite == this.state?.intervenantVO?.refTypeDocumentIdentite
      &&
      this.props?.t6bis?.intervenantVO?.numeroDocumentIndentite == this.state?.intervenantVO?.numeroDocumentIndentite) return;

    if (!this.isParamSetted()) {
      this.setState({
        ...this.state,
        intervenantVO: {
          ...this.state.intervenantVO,
          nationaliteFr: '',
          nomIntervenant: '',
          prenomIntervenant: '',
          adresse: '',
        },
        infoCompleted: false,
        newIntervenant: false,
        acNationalite: {},
        modificationInProgress: false,
        errorMessage: null
      });
    } else {
      this.checkType();
    }
  }

  onChangeTypeIdentifiant(text) {
    console.log('onChangeTypeIdentifiant----------------------------  : ', text);
    this.setState({
      intervenantVO: {
        refTypeDocumentIdentite: text,
        numeroDocumentIndentite: '',
        nationaliteFr: '',
        nomIntervenant: '',
        prenomIntervenant: '',
        adresse: '',
      },
      infoCompleted: false,
      newIntervenant: false,
      acNationalite: {},
      modificationInProgress: false,
      errorMessage: null
    });
  }

  idNewIntervenant() {
    return this.state?.newIntervenant === false ? false : true;
  }

  traiterRetourProps() {
    if (this.props?.retourFindIntervenant) {
      this.state.intervenantVO = {
        ...this.state.intervenantVO,
        ...this.props.t6bis?.intervenantVO,
      };
      this.state.newIntervenant = this.props?.newIntervenant;
      this.props.retourFindIntervenant = false;
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps - 03052021 - props  : ', props);
    console.log('getDerivedStateFromProps - 03052021 - state  : ', state);
    console.log('getDerivedStateFromProps - 03052021 - state  : ', !props.t6bis.hasOwnProperty('intervenantVO'));
    console.log('getDerivedStateFromProps - 03052021 - state  : ', props.t6bis.hasOwnProperty('intervenantVO'));
    if (
      props.t6bis.intervenantVO &&
      props?.retourFindIntervenant &&

      props?.t6bis?.intervenantVO?.refTypeDocumentIdentite == state?.intervenantVO?.refTypeDocumentIdentite
      &&
      props?.t6bis?.intervenantVO?.numeroDocumentIndentite == state?.intervenantVO?.numeroDocumentIndentite
      && !state.modificationInProgress
    ) {
      console.log(' 1 ');
      return {
        intervenantVO: props.t6bis?.intervenantVO,
        newIntervenant: props.newIntervenant,
      };
    }
    if (!props.t6bis.hasOwnProperty('intervenantVO') && !state.hasOwnProperty('intervenantVO')) {
      console.log(' 2 ');
      return {

        intervenantVO: {
          refTypeDocumentIdentite: '',
          numeroDocumentIndentite: '',
          nationaliteFr: '',
          nomIntervenant: '',
          prenomIntervenant: '',
          adresse: '',
        },
        infoCompleted: false,
        newIntervenant: false,
        acNationalite: {},
        modificationInProgress: false,
        errorMessage: null
      };
    }
    /* if (
      props?.t6bis?.intervenantVO?.numeroDocumentIndentite != state?.intervenantVO?.numeroDocumentIndentite
    ) {
      console.log(' 3 ');
      return {
        intervenantVO: { ...state.intervenantVO, ...props.t6bis?.intervenantVO }
      };
    } */

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    return (
      <ComAccordionComp
        onRef={(ref) => (this.accordionComp = ref)}
        title={translate('t6bisGestion.tabs.entete.redevableBlock.title')}
        expanded={false}>
        
        {this.state.errorMessage != null && (
          <View style={styles.messages}>
            <ComBadrErrorMessageComp message={this.state.errorMessage} />
          </View>
        )}
        <View>
          <Row size={200}>
            <Col size={30} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.entete.redevableBlock.typeIdentifiant',
                )}
              </Text>
            </Col>
            <Col size={70} style={styles.labelContainer}>
              <ComBadrItemsPickerComp
                disabled={this.props.readOnly}
                style={{
                  ...styles.labelTextStyle,
                  borderWidth: 1,
                  borderColor: '#696969',
                  borderRadius: 4,
                }}
                label={translate(
                  't6bisGestion.tabs.entete.redevableBlock.typeIdentifiant',
                )}
                selectedValue={this.state.intervenantVO.refTypeDocumentIdentite}
                items={this.props.identifiants}
                onValueChanged={(value, index) =>
                  value?.code ? this.onChangeTypeIdentifiant(value.code) : {}
                }
              />
            </Col>
            <Col size={30} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate(
                  't6bisGestion.tabs.entete.redevableBlock.identifiant',
                )}
              </Text>
            </Col>

            <Col size={70} style={styles.labelContainer}>
              <TextInput
                disabled={this.props.readOnly}
                mode="outlined"
                label={translate(
                  't6bisGestion.tabs.entete.redevableBlock.identifiant',
                )}
                value={this.state.intervenantVO.numeroDocumentIndentite}
                onEndEditing={(event) =>
                  this.onBlurIdentifiant(event.nativeEvent.text)
                }
                onChangeText={(text) => {
                  console.log('onChangeText => text : ', text);
                  this.setState({
                    ...this.state,
                    intervenantVO: {
                      ...this.state.intervenantVO,
                      numeroDocumentIndentite: text.toUpperCase(),
                    }, errorMessage: null
                  });
                }

                }
              />
            </Col>
          </Row>
          {this.isPasseport() && (
            <Row size={200}>
              <Col size={30} style={styles.labelContainer}>
                <Text style={styles.labelTextStyle}>
                  {translate(
                    't6bisGestion.tabs.entete.redevableBlock.nationalite',
                  )}
                </Text>
              </Col>

              <Col size={70} style={styles.labelContainer}>
                <ComBadrAutoCompleteChipsComp
                  disabled={
                    (stringNotEmpty(this.state.intervenantVO.adresse) &&
                      !this.idNewIntervenant()) ||
                    this.props.readOnly
                  }
                  code="code"
                  placeholder={translate(
                    't6bisGestion.tabs.entete.redevableBlock.nationalite',
                  )}
                  selected={this.state.intervenantVO.nationaliteFr}
                  maxItems={3}
                  libelle="libelle"
                  command="getCmbPays"
                  paramName="libellePays"
                  onDemand={true}
                  searchZoneFirst={false}
                  onValueChange={this.handlePaysChanged}
                />
              </Col>
            </Row>
          )}
          <Row size={200}>
            <Col size={30} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
              </Text>
            </Col>

            <Col size={70} style={styles.labelContainer}>
              <TextInput
                mode="outlined"
                label={translate('t6bisGestion.tabs.entete.redevableBlock.nom')}
                value={this.state.intervenantVO.nomIntervenant}
                disabled={
                  (stringNotEmpty(this.state.intervenantVO.adresse) &&
                    !this.idNewIntervenant()) ||
                  this.props.readOnly
                }
                onChangeText={(text) => {
                  text
                    ? this.setState({
                      ...this.state,
                      intervenantVO: {
                        ...this.state.intervenantVO,
                        nomIntervenant: text,
                      }, modificationInProgress: true, errorMessage: null
                    })
                    : {};
                  this.copyIntervenantToProp(text, this.state.intervenantVO.prenomIntervenant, this.state.intervenantVO.adresse);
                }
                }
              />
            </Col>
            <Col size={30} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate('t6bisGestion.tabs.entete.redevableBlock.prenom')}
              </Text>
            </Col>

            <Col size={70} style={styles.labelContainer}>
              <TextInput
                mode="outlined"
                label={translate(
                  't6bisGestion.tabs.entete.redevableBlock.prenom',
                )}
                value={this.state.intervenantVO.prenomIntervenant}
                disabled={
                  (stringNotEmpty(this.state.intervenantVO.adresse) &&
                    !this.idNewIntervenant()) ||
                  this.props.readOnly
                }
                onChangeText={(text) => {
                  text
                    ? this.setState({
                      ...this.state,
                      intervenantVO: {
                        ...this.state.intervenantVO,
                        prenomIntervenant: text, modificationInProgress: true, errorMessage: null
                      },
                    })
                    : {};
                  this.copyIntervenantToProp(this.state.intervenantVO.nomIntervenant, text, this.state.intervenantVO.adresse);
                }
                }
              />
            </Col>
          </Row>
          <Row size={200}>
            <Col size={30} style={styles.labelContainer}>
              <Text style={styles.labelTextStyle}>
                {translate('t6bisGestion.tabs.entete.redevableBlock.adresse')}
              </Text>
            </Col>

            <Col size={170} style={{ ...styles.labelContainer, marginLeft: 10 }}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                mode="outlined"
                label={translate(
                  't6bisGestion.tabs.entete.redevableBlock.adresse',
                )}
                value={this.state.intervenantVO.adresse}
                disabled={
                  (stringNotEmpty(this.state.intervenantVO.adresse) &&
                    !this.idNewIntervenant()) ||
                  this.props.readOnly
                }
                onChangeText={(text) => {
                  this.setState({
                    ...this.state,
                    intervenantVO: {
                      ...this.state.intervenantVO,
                      adresse: text, modificationInProgress: true, errorMessage: null
                    },
                  });
                  this.copyIntervenantToProp(this.state.intervenantVO.nomIntervenant, this.state.intervenantVO.prenomIntervenant, text);
                }
                }
              />
            </Col>
          </Row>

          {!this.props.readOnly && (
            <Row size={100}>
              <Col size={100}>
                <View style={styles.ComContainerCompBtn}>
                  <ComBadrButtonComp
                    style={styles.actionBtn}
                    onPress={() => {
                      this.confirmer();
                    }}
                    text={translate(
                      't6bisGestion.tabs.entete.buttons.confirmer',
                    )}
                  />
                  <ComBadrButtonComp
                    style={styles.actionBtn}
                    onPress={() => {
                      this.retablir();
                    }}
                    text={translate(
                      't6bisGestion.tabs.entete.buttons.retablir',
                    )}
                  />
                </View>
              </Col>
            </Row>
          )}
        </View>
      </ComAccordionComp>
    );
  }
}

export default T6bisEnteteRedevableSousBlock;
