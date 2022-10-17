import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Checkbox, IconButton, Text, TextInput } from 'react-native-paper';
import {
  ComAccordionComp, ComBadrButtonRadioComp,
  ComBadrKeyValueComp
} from '../../../../../../commons/component';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import translate from "../../../../../../commons/i18n/ComI18nHelper";
import { primaryColor } from '../../../../../../commons/styles/ComThemeStyle';
import styles from '../../../style/DedRedressementStyle';
import { BANQUE, CATEGORIE_PROVISOIRE_VOY, CODE_TYPEDUM_NEW_PROVISIONNELLE, CONSIGNATION, CONST_STRING_0, CONST_STRING_1, CONST_STRING_2, DC_ILLIMITEE, DC_LIMITEE_DUREE, DC_LIMITEE_UNE_OPERATION, TYPE_CAUTION_BANQUE, TYPE_CAUTION_CONSIGNATION, TYPE_CAUTION_DISPENSE, TYPE_CAUTION_DISPENSE_DO, TYPE_CAUTION_MIXTE } from '../../../utils/DedConstants';
import { effacerRubCautionBancaire, effacerRubriqueCaution, effacerValeursBanqueConsign, getValueByPath, initDedCategorie } from '../../../utils/DedUtils';
import DedRedressementRow from '../../common/DedRedressementRow';
import DateTimePicker from '@react-native-community/datetimepicker';
class DedRedressementCautionBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dedDumVo: this.props.data,
      selectedCautionType: {},
      selectedDecisionCauBanc: {},
      selectedDecisioConsignation: {},
      selectedBanque: {},
      selectedAgence: {},
      showDateAttributionBanque: false,
      dateAttributionBanque: new Date()
    };

    this.radioButtonsDataValidation = [{
      id: '1',
      label: translate('dedouanement.caution.validite.ILimiterTemps'),
      value: DC_ILLIMITEE
    }, {
      id: '2',
      label: translate('dedouanement.caution.validite.limiterOperation'),
      value: DC_LIMITEE_UNE_OPERATION
    }, {
      id: '3',
      label: translate('dedouanement.caution.validite.ILimiterTemps'),
      value: DC_LIMITEE_DUREE
    }];
    this.radioButtonsDataBanque = [{
      id: '1',
      label: translate('dedouanement.caution.banque.banque'),
      value: BANQUE
    }];
    this.radioButtonsDataConsignation = [{
      id: '1',
      label: translate('dedouanement.caution.banque.consignation'),
      value: CONSIGNATION
    }]


  }

  componentDidMount() {
   
  }

 

  refreshCombo = (source, target, params) => {
    if (target) {
      target.refresh(params, source);
    }
  };

  render() {

    let enregistree = this.state.dedDumVo.dedReferenceVO?.enregistree;
    let numeroVersion = this.state.dedDumVo.dedReferenceVO?.numeroVersion;
    let dateValidite = this.state.dedDumVo.dedReferenceVO?.dateValidite;
    let dedDumSectionCautionVO = this.state.dedDumVo.dedDumSectionCautionVO;
    let dedDumSectionEnteteVO = this.state.dedDumVo.dedDumSectionEnteteVO;
    let allElementsDisabled = (dedDumSectionCautionVO?.demandeDispenseCaution === 'true') && (enregistree == 'true' || numeroVersion == CONST_STRING_0);
    let dispenseCautionRendered = (enregistree == 'false' || numeroVersion == CONST_STRING_0);
    let dateEnregistrement = (enregistree == 'true') ? (this.state.dedDumVo.dedReferenceVO?.dateEnregistrement_VI) : '';
    let newProvisionnelle = dedDumSectionEnteteVO?.typeDUM === CODE_TYPEDUM_NEW_PROVISIONNELLE;
    let sousDum = this.state.categorie === CATEGORIE_PROVISOIRE_VOY;
    let transitCase = getValueByPath('transitCase', this.state.dedDumVo);

    let typeCaution = dedDumSectionCautionVO?.typeCaution;
    let banqueRubriqueDisabled = false;
    let consignRubriqueDisabled = false;
    let creditEnlevement = '';
    let banqueChecked = dedDumSectionCautionVO?.banqueConsign;


    if (typeCaution == TYPE_CAUTION_BANQUE) {
      banqueRubriqueDisabled = false;
      consignRubriqueDisabled = true;
      creditEnlevement = '';
      allElementsDisabled = false;
    } else if (typeCaution == TYPE_CAUTION_MIXTE) {
      banqueRubriqueDisabled = false;
      consignRubriqueDisabled = false;
      if (banqueChecked == CONST_STRING_1) {
        creditEnlevement = '';
      }
    }
    else if (typeCaution == TYPE_CAUTION_CONSIGNATION) {
      banqueRubriqueDisabled = true;
      consignRubriqueDisabled = false;
    } else {
      banqueRubriqueDisabled = true;
      consignRubriqueDisabled = true;
    }
    console.log('--------------------------------------------------------------------------');
    console.log('this.props : ', this.props.data);
    console.log('--------------------------------------------------------------------------');
    console.log('--transitCase--', transitCase);
    console.log('--this.state.categorie--', this.state.categorie);
    console.log('--sousDum--', sousDum);
    console.log('--newProvisionnelle--', newProvisionnelle);
    console.log('--typeCaution--', typeCaution);
    console.log('--banqueChecked--', banqueChecked);
    console.log('--allElementsDisabled--', allElementsDisabled);
    console.log('--allElementsDisabled || banqueRubriqueDisabled || dedDumSectionCautionVO?.banqueConsign === CONST_STRING_2 || this.props.readOnly--', allElementsDisabled || banqueRubriqueDisabled || dedDumSectionCautionVO?.decisionCautionVO === CONST_STRING_2 || this.props.readOnly);
    console.log('-- banqueRubriqueDisabled --', banqueRubriqueDisabled);
    console.log('-- dedDumSectionCautionVO?.banqueConsign === CONST_STRING_2 --', dedDumSectionCautionVO?.banqueConsign === CONST_STRING_2);
    console.log('--dedDumSectionCautionVO?.banqueConsign --', dedDumSectionCautionVO?.banqueConsign);
    console.log('--this.props.readOnly--', this.props.readOnly);
    console.log('--dedDumSectionCautionVO?.dateAttributionBanque--', dedDumSectionCautionVO?.dateAttributionBanque);
    return (

      <View style={styles.container}>
        <ComAccordionComp title="Caution" expanded={true}>
          <View style={styles.container}>
            {(enregistree == 'false' || numeroVersion == '0') && <DedRedressementRow>
              <ComBadrKeyValueComp
                libelleSize={4}
                rtl={true}
                libelle="Dispense de caution"
                children={<Checkbox
                  status={
                    dedDumSectionCautionVO?.demandeDispenseCaution === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  disabled={this.props.readOnly || dedDumSectionEnteteVO?.typeDUM === CODE_TYPEDUM_NEW_PROVISIONNELLE}
                  color={primaryColor}
                />}
              />
            </DedRedressementRow>}

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Type caution"
                children={
                  <ComBadrReferentielPickerComp
                    disabled={true}
                    onRef={(ref) => (this.typeCautioCombo = ref)}
                    onValueChanged={
                      this.handleTypeCautionChanged
                    }
                    selected={{
                      code: this.state.dedDumVo.dedDumSectionCautionVO?.typeCaution
                    }}
                    command="getCmbTypeCautionnementWithout"
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                    disabled={allElementsDisabled || (sousDum && newProvisionnelle) || this.props.readOnly}
                    params={{
                      dateValidite: dateValidite,
                      newProvisionnelle: newProvisionnelle,
                      transitCase: transitCase
                    }}
                  />
                }
              />
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Numéro décision"
                libelleSize={3}
                children={
                  <ComBadrReferentielPickerComp
                    onRef={(ref) => (this.numeroDecisionCauBanCombo = ref)}
                    onValueChanged={this.handleNumeroDecisionCautionChanged}
                    selected={{ code: this.state.dedDumVo.dedDumSectionCautionVO?.numDecision }}
                    command="ded.getListDecisionCautionNonResiliees"
                    typeService="SP"
                    module="DED_LIB"
                    code="code"
                    libelle="libelle"
                    disabled={allElementsDisabled || (sousDum && newProvisionnelle) || this.props.readOnly}
                    params={{
                      typeCaution: this.state.dedDumVo.dedDumSectionCautionVO?.typeCaution,
                      codeRegime: this.state.dedDumVo.dedReferenceVO.refRegime,
                      codeCentreRCDestinataire: dedDumSectionEnteteVO?.codeCentreRCDestinataire,
                      justNumeroCentreRCDestinataire: dedDumSectionEnteteVO?.justNumeroCentreRCDestinataire,
                      codeCentreRCExpediteur: dedDumSectionEnteteVO?.codeCentreRCExpediteur,
                      justNumeroRC: dedDumSectionEnteteVO?.codeCentreRCDestinataire
                    }}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelle="Date de création"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={this.state.dedDumVo.dedDumSectionCautionVO?.dateCreation}
                  />
                }
              />
            </DedRedressementRow>
            <DedRedressementRow>


              <ComBadrKeyValueComp
                libelle="Statut"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={this.state.dedDumVo.dedDumSectionCautionVO?.statut}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelle=""
                libelleSize={3}
              />
            </DedRedressementRow>
            <DedRedressementRow>


              <ComBadrKeyValueComp
                libelle="Commentaires"
                libelleSize={1}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    multiline={true}
                    numberOfLines={3}
                    disabled={true}
                    value={this.state.dedDumVo.dedDumSectionCautionVO?.commentaire}
                  />
                }
              />

            </DedRedressementRow>
          </View>
          <ComAccordionComp title={translate('dedouanement.caution.validite.titre')} expanded={true}>
            <View style={styles.container}>
              <DedRedressementRow>
                <ComBadrKeyValueComp
                  libelle=""
                  children={
                    <ComBadrButtonRadioComp
                      disabled={true}
                      styleContainer={{
                        flexDirection: 'column',
                        padding: 10,
                        color: '#009ab2'
                      }
                      }
                      value={this.state.dedDumVo.dedDumSectionCautionVO?.validite}
                      title={translate('dedouanement.caution.validite.titre')}
                      radioButtonsData={this.radioButtonsDataValidation}
                    />}
                />

                <ComBadrKeyValueComp
                  libelle="Statut d'utilisation"
                  libelleSize={3}
                  children={
                    <TextInput
                      type="flat"
                      label=""
                      disabled={true}
                      value={
                        this.state.dedDumVo.dedDumSectionCautionVO?.validite === 'true'
                          ? 'Utilisée'
                          : 'Non utilisée'
                      }
                    />
                  }
                />

              </DedRedressementRow>
              <DedRedressementRow>
                <ComBadrKeyValueComp
                  libelle="Date d'écheance"
                  libelleSize={3}
                  children={
                    <TextInput
                      type="flat"
                      label=""
                      disabled={true}
                      value={this.state.dedDumVo.dedDumSectionCautionVO?.dateEcheance}
                    />
                  }
                />
                <ComBadrKeyValueComp
                  libelle="Statut d'écheance"
                  libelleSize={3}
                  children={
                    <TextInput
                      type="flat"
                      label=""
                      disabled={true}
                      value={this.state.dedDumVo.dedDumSectionCautionVO?.statutEcheance === 'true' ? 'échue' : 'Non échue'}
                    />
                  }
                />
              </DedRedressementRow>
            </View>
          </ComAccordionComp>

          {/*Caution Donneur ordre*/}
          {(typeCaution == TYPE_CAUTION_DISPENSE_DO) && (

            <View style={styles.container}>
              {this.buildDonneurOrdreBlock(dedDumSectionCautionVO)}
            </View>
          )}

          {/*Caution */}
          {(typeCaution == TYPE_CAUTION_DISPENSE) && (

            <View style={styles.container}>
              {this.buildCautionBlock(dedDumSectionCautionVO)}
            </View>
          )}

          {!(allElementsDisabled || banqueRubriqueDisabled) && (

            <View style={styles.container}>
              <DedRedressementRow>
                <ComBadrKeyValueComp
                  libelle=""
                  children={
                    <ComBadrButtonRadioComp
                      disabled={allElementsDisabled || banqueRubriqueDisabled || this.props.readOnly}
                      styleContainer={{
                        flexDirection: 'column',
                        padding: 10,
                        color: '#009ab2'
                      }
                      }
                      value={this.state.dedDumVo.dedDumSectionCautionVO?.banqueConsign}
                      onValueChange={(value) => this.handleBanqueConsignationChanged({ code: value })}
                      radioButtonsData={this.radioButtonsDataBanque}
                    />}
                />
              </DedRedressementRow>
              <ComAccordionComp title={translate('dedouanement.caution.banque.titre')} expanded={true}>
                {this.buildBanqueBlock(dedDumSectionCautionVO, dateEnregistrement, allElementsDisabled || banqueRubriqueDisabled || dedDumSectionCautionVO?.banqueConsign === CONST_STRING_2 || this.props.readOnly)}
              </ComAccordionComp>
            </View>

          )}
          {!(allElementsDisabled || consignRubriqueDisabled) && (

            <View style={styles.container}>
              <DedRedressementRow>
                <ComBadrKeyValueComp
                  libelle=""
                  children={
                    <ComBadrButtonRadioComp
                      disabled={allElementsDisabled || consignRubriqueDisabled || this.props.readOnly}
                      styleContainer={{
                        flexDirection: 'column',
                        padding: 10,
                        color: '#009ab2'
                      }
                      }
                      value={this.state.dedDumVo.dedDumSectionCautionVO?.banqueConsign}
                      onValueChange={(value) => this.handleBanqueConsignationChanged({ code: value })}
                      radioButtonsData={this.radioButtonsDataConsignation}
                    />}
                />
              </DedRedressementRow>
              <ComAccordionComp title={translate('dedouanement.caution.consignation.titre')} expanded={true}>
                {this.buildConsignationBlock(dedDumSectionCautionVO)}
              </ComAccordionComp>
            </View>

          )}


        </ComAccordionComp>
      </View>
    );
  }

  /**
   * start
   * Handle components changes
   */
  handleBanqueChanged = (banque, dateEnregistrement) => {
    console.log('*-banque -*', banque);
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, banque: banque.code } };
    this.props.initCautionSection(dedDumVo, this.updateState);
    this.refreshCombo(null, this.refAgence, {
      codeBanque: banque.code,
      dateEnregistrement: dateEnregistrement
    });
  };

  handleAgenceChanged = (agence) => {
    console.log('*-agence -*', agence);
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, agence: agence.code } };
    this.setState({
      dedDumVo: dedDumVo
    });
    this.props.update(dedDumVo);
  };

  handleRefCautionBanqueChanged = (refCautionBanque) => {
    console.log('*-refCautionBanque -*', refCautionBanque);
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, refCautionBanque: refCautionBanque } };
    this.setState({
      dedDumVo: dedDumVo
    });
    this.props.update(dedDumVo);
  };



  handleMontantBanqueChanged = (montantBanque) => {
    console.log('*-montantBanque -*', montantBanque);
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, montantBanque: montantBanque } };
    this.setState({
      dedDumVo: dedDumVo
    });
    this.props.update(dedDumVo);
  };

  handleNumeroDecisionCautionChanged = (decisionCaution) => {
    console.log('*-decisionCaution -*', decisionCaution);

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, numDecision: decisionCaution.code } };
    this.props.initCautionSection(dedDumVo, this.updateState);

  };


  handleTypeCautionChanged = (typeCaution) => {
    console.log("handleTypeCautionChanged");
    console.log(typeCaution);
    let demandeDispenseCaution = 'false';
    if (typeCaution.code == TYPE_CAUTION_DISPENSE) {
      demandeDispenseCaution = 'true';
    }
    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, typeCaution: typeCaution.code, demandeDispenseCaution: demandeDispenseCaution, numDecision: '' } };
    if (typeCaution.code == TYPE_CAUTION_MIXTE) {
      dedDumVo = { ...dedDumVo, dedDumSectionCautionVO: { ...dedDumVo.dedDumSectionCautionVO, banqueConsign: '1' } };
    }

    if (typeCaution.code == TYPE_CAUTION_MIXTE || typeCaution.code == TYPE_CAUTION_BANQUE) {
      dedDumVo = effacerValeursBanqueConsign(dedDumVo);
      this.refBanque.enableDisable(false);
      this.refAgence.enableDisable(false);
      
    }

    dedDumVo = effacerRubriqueCaution(dedDumVo);
    dedDumVo = effacerRubCautionBancaire(dedDumVo);
    dedDumVo = effacerRubriqueCaution(dedDumVo);
    this.setState({
      dedDumVo: dedDumVo
    });
    this.refreshCombo(null, this.numeroDecisionCauBanCombo,
      {
        typeCaution: dedDumVo.dedDumSectionCautionVO?.typeCaution,
        codeRegime: dedDumVo.dedReferenceVO.refRegime,
        codeCentreRCDestinataire: dedDumVo.dedDumSectionEnteteVO?.codeCentreRCDestinataire,
        justNumeroCentreRCDestinataire: dedDumVo.dedDumSectionEnteteVO?.justNumeroCentreRCDestinataire,
        codeCentreRCExpediteur: dedDumVo.dedDumSectionEnteteVO?.codeCentreRCExpediteur,
        justNumeroRC: dedDumVo.dedDumSectionEnteteVO?.codeCentreRCDestinataire
      }
    );
    this.props.update(dedDumVo);
  }

  handleBanqueConsignationChanged = (banqueConsign) => {
    console.log("handleBanqueConsignationChanged");
    console.log(banqueConsign);

    let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, banqueConsign: banqueConsign.code } };

    if (banqueConsign?.code == CONST_STRING_2) {
      dedDumVo = effacerValeursBanqueConsign(dedDumVo);
      this.refBanque.enableDisable(true);
      this.refAgence.enableDisable(true);
    }
    this.setState({
      dedDumVo: dedDumVo
    });

      
  }

  onDateAttributionChange = (event, selectedDate) => {
    console.log('event : ', event);
    console.log('selectedDate : ', selectedDate);
    if (selectedDate != undefined) {
      console.log('selectedDate in :  ', selectedDate);
      let dedDumVo = { ...this.state.dedDumVo, dedDumSectionCautionVO: { ...this.state.dedDumVo.dedDumSectionCautionVO, dateAttributionBanque: moment(event.nativeEvent.timestamp).format('DD/MM/YYYY') } };
      this.setState({
        dedDumVo: dedDumVo, showDateAttributionBanque: false, dateAttributionBanque: event.nativeEvent.timestamp
      });

      this.props.update(dedDumVo);
    } else {
      this.setState({
        showDateAttributionBanque: false
      });

    }
  }

  buildConsignationBlock = (dedDumSectionCautionVO, dateHeureOrdonnancementConsigantion) => {
    return (
      <View>


        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Numéro Consignation : "
            libelleSize={3}
            value={dedDumSectionCautionVO?.numeroConsigantion}
          />

        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Date d'ordonnoncement : "
            libelleSize={3}
            value={dateHeureOrdonnancementConsigantion}
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Montant (En Dhs) : "
            libelleSize={3}
            value={dedDumSectionCautionVO?.montantConsigantion}
          />
        </DedRedressementRow>
      </View>
    );
  };


  buildBanqueBlock = (dedDumSectionCautionVO, dateEnregistrement, disabled) => {
    return (
      <View style={styles.container}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Banque"
            libelleSize={1}
            children={


              <ComBadrReferentielPickerComp
                onRef={(ref) => (this.refBanque = ref)}
                onValueChanged={(item) => { this.handleBanqueChanged(item, dateEnregistrement) }}
                selected={{ code: dedDumSectionCautionVO?.banque }}
                command="getCmbBanqueByDate"
                typeService="SP"
                module="REF_LIB"
                code="code"
                libelle="libelle"
                disabled={disabled}
                params={dateEnregistrement}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Agence"
            libelleSize={1}
            children={
              <ComBadrReferentielPickerComp
                onRef={(ref) => (this.refAgence = ref)}
                onValueChanged={(item) => { this.handleAgenceChanged(item, dateEnregistrement) }}
                selected={{ code: dedDumSectionCautionVO?.agence }}
                command="getCmbAgenceBancaireByDate"
                typeService="SP"
                module="REF_LIB"
                code="code"
                libelle="libelle"
                disabled={disabled}
                params={{ codeBanque: dedDumSectionCautionVO?.banque, dateEnregistrement }}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow>

          <ComBadrKeyValueComp
            libelleSize={3}
            libelle="Référence caution"
            children={

              <TextInput
                maxLength={16}
                disabled={disabled}
                value={dedDumSectionCautionVO?.refCautionBanque}
                onChangeText={this.handleRefCautionBanqueChanged}
              />
            }
          />

        </DedRedressementRow>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Date d'attribution"
            libelleSize={3}
            children={
              <Row>

                <Col size={4}>
                  <TextInput
                    disabled={true}
                    value={dedDumSectionCautionVO?.dateAttributionBanque}
                  />
                </Col>
                <Col>
                  {this.state.showDateAttributionBanque && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={this.state.dateAttributionBanque}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={this.onDateAttributionChange}
                    />
                  )}
                </Col>
                <Col style={{ paddingTop: 5 }}>
                  {!disabled && (<IconButton
                    icon="calendar"
                    onPress={() => {
                      this.setState({ showDateAttributionBanque: true });

                    }}
                  />)}
                </Col>
              </Row>
            }
          />
        </DedRedressementRow>


        <DedRedressementRow>

          <ComBadrKeyValueComp
            libelleSize={3}
            libelle="Montant (En Dhs)"
            children={

              <TextInput
                maxLength={14}
                disabled={disabled}
                keyboardType={'number-pad'}
                value={dedDumSectionCautionVO?.montantBanque}
                onChangeText={this.handleMontantBanqueChanged}
              />
            }
          />

        </DedRedressementRow>


        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Validité électronique de la caution"
            libelleSize={3}
            children={
              <Text>
                {dedDumSectionCautionVO?.validiteCb}
              </Text>
            }
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Référence bancaire attribué"
            libelleSize={3}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={dedDumSectionCautionVO?.referenceCBAttribuee}
              />
            }
          />
        </DedRedressementRow>


      </View>
    );
  };



  buildDonneurOrdreBlock = (decisionCautionVO) => {
    return (<ComAccordionComp title={translate('dedouanement.caution.donneurordre.titre')} expanded={true}>
      <View style={styles.container}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle={translate('dedouanement.caution.donneurordre.code')}
            libelleSize={2}
            children={

              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  decisionCautionVO?.codeDonneurOrdre
                } />
            }
          />

        </DedRedressementRow>

        <DedRedressementRow zebra={true}>

          <ComBadrKeyValueComp
            libelleSize={2}
            libelle={translate('dedouanement.caution.donneurordre.nomRaisonSociale')}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={decisionCautionVO?.nomDonneurOrdre
                }
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle={translate('dedouanement.caution.donneurordre.adresseCompelete')}
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={decisionCautionVO?.adresseDonneurOrdre}
              />
            }
          />
        </DedRedressementRow>



      </View>
    </ComAccordionComp>)
      ;
  };

  buildCautionBlock = (decisionCautionVO) => {
    return (<ComAccordionComp title={translate('dedouanement.caution.caution.titre')} expanded={true}>
      <View style={styles.container}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle={translate('dedouanement.caution.caution.nrc')}
            libelleSize={2}
            children={

              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  decisionCautionVO?.numeroRc
                } />
            }
          />

        </DedRedressementRow>

        <DedRedressementRow zebra={true}>

          <ComBadrKeyValueComp
            libelleSize={2}
            libelle={translate('dedouanement.caution.caution.centrerc')}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={decisionCautionVO?.centreRc}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle={translate('dedouanement.caution.caution.ifu')}
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={decisionCautionVO?.ifu}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle={translate('dedouanement.caution.caution.nomouraisonsociale')}
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={decisionCautionVO?.nom}
              />
            }
          />
        </DedRedressementRow>
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelle={translate('dedouanement.caution.caution.adressecomplete')}
            libelleSize={2}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={decisionCautionVO?.adresseComplete}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle={''}
            libelleSize={2}

          />
        </DedRedressementRow>



      </View>
    </ComAccordionComp>)
      ;
  };

  /**
   * end
   * Build blocks
   */

  /**
   * start
   * Functions
   */


  /**
   * end
   * Functions
   */

  /**
   * start
   * Redux
   */


  updateState = (dedDumVo) => {

    console.log("update block")
    this.setState({
      dedDumVo: dedDumVo
    });
    this.props.update(dedDumVo);
  }



  /**
   * end
   * Redux
   */


}






export default DedRedressementCautionBlock;
