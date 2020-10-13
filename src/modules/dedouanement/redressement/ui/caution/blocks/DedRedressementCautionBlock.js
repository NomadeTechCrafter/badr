import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {Checkbox, RadioButton, TextInput} from 'react-native-paper';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import {getValueByPath} from '../../../utils/DedUtils';

import {request} from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';

class DedRedressementCautionBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCautionType: {},
      selectedDecisionCauBanc: {},
      selectedDecisioConsignation: {},
      selectedBanque: {},
      selectedAgence: {},
    };
  }

  componentDidMount() {}

  initSectionsToShow(typeCautionSelected) {
    this.setState({
      isBanque: typeCautionSelected === '01',
      isMixte: typeCautionSelected === '02',
      isConsignation: typeCautionSelected === '08',
      isGlobalIndustrie: typeCautionSelected === '05',
    });
  }

  refreshCombo = (source, target, params) => {
    if (target) target.refresh(params, source);
  };

  render() {
    if (this.props.genericReducer) {
      /*console.log('------------ generic reducer----------');
      console.log(
        this.extractCommandData(
          'ded.getDecisionCautionVO',
          'genericDedReducer',
        ),
      );
      console.log('------------ generic reducer----------');
      */
    }
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Caution bancaire" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelleSize={4}
                rtl={true}
                libelle="Dispense de caution"
                children={<Checkbox />}
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Type caution"
                children={
                  <ComBadrReferentielPickerComp
                    onRef={(ref) => (this.typeCautioCombo = ref)}
                    onValueChanged={(value, index) => {
                      this.setState({selectedCautionType: value});
                      this.initSectionsToShow(value.code);
                    }}
                    selectedValue={this.state.selectedCautionType}
                    command="getCmbAllTypeCautionnement"
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
            </DedRedressementRow>
          </View>
          {/*Caution bancaire case*/}
          {this.state.isBanque && this.buildCautionBancaireBlock('Banque')}

          {/*Caution mixte case*/}
          {this.state.isMixte && (
            <View>
              <View style={styles.container}>
                <ComBadrKeyValueComp
                  libelleSize={12}
                  libelle="Banque"
                  rtl={true}
                  children={<RadioButton />}
                />
                {this.buildBanqueBlock()}
              </View>
              <View style={styles.container}>
                <ComBadrKeyValueComp
                  libelleSize={12}
                  libelle="Consignation"
                  rtl={true}
                  children={<RadioButton />}
                />
                {this.buildConsignationBlock(true)}
              </View>
            </View>
          )}

          {/*Caution consignation*/}
          {this.state.isConsignation && (
            <View style={styles.container}>
              {this.buildConsignationBlock(false)}
            </View>
          )}

          {/*Caution globale industriel*/}

          {this.state.isGlobalIndustrie &&
            this.buildCautionBancaireBlock('Caution bancaire', true)}
        </ComAccordionComp>
      </View>
    );
  }

  /**
   * start
   * Handle components changes
   */
  handleBanqueChanged = (banque) => {
    this.setState({
      selectedBanque: banque,
    });
    this.refreshCombo(null, this.refAgence, {
      codeBanque: banque.code,
    });
  };

  handleAgenceChanged = (agence) => {
    this.setState({
      selectedAgence: agence,
    });
  };

  handleDecisionChangedCau = (value, index) => {
    this.callRedux({
      command: 'ded.getDecisionCautionVO',
      typeService: 'SP',
      jsonVO: value,
    });

    this.setState({selectedDecisionCauBanc: value});
  };

  handleDecisionChangedConsignation = (value, index) => {
    this.callRedux({
      command: 'ded.getDecisionCautionVO',
      typeService: 'SP',
      jsonVO: value,
    });

    this.setState({selectedDecisioConsignation: value});
  };

  /**
   * end
   * Handle components changes
   */

  /**
   * start
   * Build blocks
   */

  buildCautionBancaireBlock = (libelleBanque, hideValidites) => {
    return (
      <View style={styles.container}>
        <View>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Numéro décision"
              libelleSize={3}
              children={
                <ComBadrReferentielPickerComp
                  onRef={(ref) => (this.numeroDecisionCauBanCombo = ref)}
                  onValueChanged={this.handleDecisionChangedCau}
                  selected={this.state.selectedDecisionCauBanc}
                  command="ded.getListDecisionCautionNonResiliees"
                  typeService="SP"
                  module="DED_LIB"
                  code="."
                  libelle="."
                  params={{
                    numeroRC: this.getCentreRC(),
                    numeroCentreRC: this.getNumeroCentreRC(),
                    typeCaution: this.state.selectedCautionType.code,
                    codeEtatResilie: '004',
                  }}
                />
              }
            />
            <ComBadrKeyValueComp
              libelle="Date de création"
              libelleSize={3}
              value=""
            />
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Validité"
              libelleSize={3}
              children={<TextInput />}
            />
            <ComBadrKeyValueComp
              libelle="Statut d'utilisation"
              libelleSize={3}
              value=""
            />
          </DedRedressementRow>

          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Date d'écheance"
              libelleSize={3}
              value=""
            />
            <ComBadrKeyValueComp
              libelle="Statut d'écheance"
              libelleSize={3}
              value=""
            />
          </DedRedressementRow>
        </View>

        {/*Caution bancaire case*/}
        <ComAccordionComp title={libelleBanque} expanded={true}>
          {this.buildBanqueBlock(hideValidites)}
        </ComAccordionComp>
      </View>
    );
  };

  buildConsignationBlock = (banque) => {
    return (
      <View>
        {!banque && (
          <View>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Numéro décision"
                children={
                  <ComBadrReferentielPickerComp
                    onRef={(ref) => (this.numeroDecisionConsign = ref)}
                    onValueChanged={this.handleDecisionChangedConsignation}
                    selected={this.state.selectedDecisioConsignation}
                    command="ded.getListDecisionCautionNonResiliees"
                    typeService="SP"
                    module="DED_LIB"
                    code="."
                    libelle="."
                    params={{
                      numeroRC: this.getCentreRC(),
                      numeroCentreRC: this.getNumeroCentreRC(),
                      typeCaution: this.state.selectedCautionType.code,
                      codeEtatResilie: '004',
                    }}
                  />
                }
              />
              <ComBadrKeyValueComp libelleSize={3} libelle="Date de création" />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Validité"
                children={<TextInput />}
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Statut d'utilisation"
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Date d'écheances'"
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Statut d'écheances"
              />
            </DedRedressementRow>
          </View>
        )}

        {!banque && (
          <ComBadrKeyValueComp
            style={{color: '#000000'}}
            libelleSize={3}
            libelle="Consignation"
          />
        )}
        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp libelle="Numéro" libelleSize={3} value="" />
          <ComBadrKeyValueComp
            libelle="Date de création"
            libelleSize={3}
            value=""
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Date d'ordonnoncement"
            libelleSize={3}
            value=""
          />
          <ComBadrKeyValueComp
            libelle="Montant (En Dhs)"
            libelleSize={3}
            value=""
          />
        </DedRedressementRow>
      </View>
    );
  };

  buildBanqueBlock = (hideValidite) => {
    return (
      <View style={styles.container}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Banque"
            libelleSize={1}
            children={
              <ComBadrAutoCompleteChipsComp
                onRef={(ref) => (this.refBanque = ref)}
                maxItems={3}
                command="getCmbBanque"
                paramName="libelleBanque"
                libelle="libelle"
                selected={this.state.selectedBanque}
                onDemand={true}
                searchZoneFirst={false}
                onValueChange={(item) => this.handleBanqueChanged(item)}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Agence"
            libelleSize={2}
            children={
              <ComBadrReferentielPickerComp
                selected={this.state.selectedAgence}
                onRef={(ref) => (this.refAgence = ref)}
                command="getCmbAgenceBancaireParBanque"
                params={{codeBanque: this.state.selectedBanque.code}}
                libelle="libelle"
                code="code"
                onValueChanged={(item) => {
                  this.handleAgenceChanged(item);
                }}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow zebra={true}>
          <ComBadrKeyValueComp
            libelleSize={3}
            children={
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Référence caution"
                children={<TextInput type="flat" label="" value="" />}
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Date d'attribution"
            libelleSize={3}
            children={<TextInput type="flat" label="" value="" />}
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Montant (En Dhs)"
            libelleSize={3}
            children={<TextInput type="flat" label="" value="" />}
          />
          <ComBadrKeyValueComp />
        </DedRedressementRow>

        {!hideValidite && (
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelleSize={4}
              libelle="Validité électronique de la caution"
              value=""
            />
            <ComBadrKeyValueComp
              libelleSize={4}
              libelle="Référence bancaire attribué"
              value=""
            />
          </DedRedressementRow>
        )}
      </View>
    );
  };

  /**
   * end
   * Build blocks
   */

  /**
   * start
   * Functions
   */

  getNumeroCentreRC = () => {
    let dedDumSectionEnteteVO = getValueByPath(
      'dedDumSectionEnteteVO',
      this.props.data,
    );
    let numeroCRC = dedDumSectionEnteteVO.regimeExport
      ? dedDumSectionEnteteVO.codeCentreRCExpediteur
      : dedDumSectionEnteteVO.codeCentreRCDestinataire;
    return numeroCRC;
  };

  getCentreRC = () => {
    let dedDumSectionEnteteVO = getValueByPath(
      'dedDumSectionEnteteVO',
      this.props.data,
    );
    const CRC = dedDumSectionEnteteVO.regimeExport
      ? dedDumSectionEnteteVO.justNumeroRC
      : dedDumSectionEnteteVO.justNumeroCentreRCDestinataire;
    return CRC;
  };

  /**
   * end
   * Functions
   */

  /**
   * start
   * Redux
   */

  callRedux = (jsonVO) => {
    if (this.props.dispatch) {
      this.props.dispatch(request({type: GENERIC_DED_REQUEST, value: jsonVO}));
    }
  };

  init = () => {
    this.props.dispatch(request({type: GENERIC_DED_INIT, value: {}}));
  };

  extractCommandData = (command, reducerName) => {
    return this.props[reducerName]
      ? this.props[reducerName].picker[command]
      : null;
  };

  /**
   * end
   * Redux
   */
}

function mapStateToProps(state) {
  return {...state};
}

export default connect(mapStateToProps, null)(DedRedressementCautionBlock);
