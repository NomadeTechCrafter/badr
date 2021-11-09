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
import { getValueByPath } from '../../../utils/DedUtils';
import * as ReferentielAction from '../../../../../../commons/state/actions/ReferentielAction';
import _ from 'lodash';
import {request} from '../../../state/actions/DedAction';
import {
  GENERIC_DED_INIT,
  GENERIC_DED_REQUEST,
} from '../../../state/DedRedressementConstants';
import {connect} from 'react-redux';
import { GENERIC_REF_REQUEST } from '../../../../../../commons/constants/generic/ComGenericConstants';

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

  componentDidMount() {
    if (
      !_.isNil(this.props.data.dedDumSectionCautionVO) &&
      !_.isNil(this.props.data.dedDumSectionCautionVO.typeCaution)
    ) {
      this.initSectionsToShow(
        this.props.data.dedDumSectionCautionVO.typeCaution,
        this.props.data.dedDumSectionCautionVO.numDecision,
      );
      this.setState({
        cautionVo: this.props.data.dedDumSectionCautionVO,
      });
      if (this.props.data.dedDumSectionCautionVO.banque) {
        let action = ReferentielAction.request({
          type: GENERIC_REF_REQUEST,
          value: {
            command: 'getCmbBanque',
            jsonVO: { codeBanque: this.props.data.dedDumSectionCautionVO.banque },
            module: 'REF_LIB',
          },
        });
        this.props.dispatch(action);
      }
    }
  }

  initSectionsToShow(typeCautionSelected, numDecision) {
    console.log('initSectionsToShow typeCautionSelected : ', typeCautionSelected);
    console.log('initSectionsToShow numDecision : ', numDecision);
    this.setState({
      isBanque: typeCautionSelected === '01',
      isMixte: typeCautionSelected === '02',
      isConsignation: typeCautionSelected === '08',
      isGlobalIndustrie: typeCautionSelected === '05',
    });
    if (
      !_.isNil(numDecision) &&
      !_.isEmpty(numDecision)
    ) { this.handleDecisionChangedCau(numDecision); }
  }
  getCodeValiditeStatus = (codeValidite) => {
    if (codeValidite === '0') {
      return 'Illimite dans le temps';
    } else if (codeValidite === '1') {
      return 'Limitée une durée de';
    } else {
      return 'Limitée une operation';
    }
  };

  refreshCombo = (source, target, params) => {
    if (target) {
      target.refresh(params, source);
    }
  };

  render() {
    let decisionCautionVO = this.extractCommandData(
      'ded.getDecisionCautionVO',
      'genericDedReducer',
    );

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
                    disabled={true}
                    onRef={(ref) => (this.typeCautioCombo = ref)}
                    onValueChanged={(value, index) => {
                      this.setState({selectedCautionType: value});
                      this.initSectionsToShow(value.code);
                    }}
                    selected={{
                      code: getValueByPath(
                        'dedDumSectionCautionVO.typeCaution',
                        this.props.data,
                      ),
                    }}
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
                {this.buildCautionBancaireBlock(null, null, decisionCautionVO)}
              </View>
              {/*<View style={styles.container}>
                <ComBadrKeyValueComp
                  libelleSize={12}
                  libelle="Banque"
                  rtl={true}
                  children={<RadioButton disabled={true} />}
                />
                {this.buildBanqueBlock()}
              </View>*/}
              <View style={styles.container}>
                <ComBadrKeyValueComp
                  libelleSize={12}
                  libelle="Consignation"
                  rtl={true}
                  children={<RadioButton disabled={true} />}
                />
                {this.buildConsignationBlock(true, decisionCautionVO)}
              </View>
            </View>
          )}

          {/*Caution consignation*/}
          {this.state.isConsignation && (
            <View style={styles.container}>
              {this.buildConsignationBlock(false, decisionCautionVO)}
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

  buildCautionBancaireBlock = (
    libelleBanque,
    hideValidites,
    decisionCautionVO,
  ) => {
    return (
      <View style={styles.container}>
        <View>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Numéro décision"
              libelleSize={3}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={getValueByPath('numDecision', this.state.cautionVo)}
                />
              }
            />
            {/*<ComBadrKeyValueComp
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
            />*/}
            <ComBadrKeyValueComp
              libelle="Date de création"
              libelleSize={3}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={(decisionCautionVO)?getValueByPath('data.dateCreation', decisionCautionVO):""}
                />
              }
            />
          </DedRedressementRow>

          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelle="Validité"
              libelleSize={3}
              children={
                <TextInput
                  type="flat"
                  label=""
                  disabled={true}
                  value={(decisionCautionVO) ?this.getCodeValiditeStatus(
                    getValueByPath('data.validite', decisionCautionVO),
                  ):""}
                />
              }
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
                    (decisionCautionVO) ?(getValueByPath(
                      'data.statutUtilisation',
                      decisionCautionVO,
                    ) === 'true'
                      ? 'Utilisée'
                      : 'Non utilisée'):""
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
                  value={(decisionCautionVO) ?(getValueByPath('data.dateEcheance', decisionCautionVO)):""}
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
                  value={
                    (decisionCautionVO) ?( getValueByPath('data.statutEcheance', decisionCautionVO) ===
                    'true'
                      ? 'échue'
                      : 'Non échue'):""
                  }
                />
              }
            />
          </DedRedressementRow>
          <DedRedressementRow>
            <ComBadrKeyValueComp
              libelle="Date d'écheance"
              libelleSize={1}
              value={(decisionCautionVO) ?getValueByPath('data.statut', decisionCautionVO):""}
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

  buildConsignationBlock = (banque, decisionCautionVO) => {
    return (
      <View>
        {!banque && (
          <View>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Numéro décision"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={getValueByPath('numDecision', this.state.cautionVo)}
                  />
                }
              />
              {/*<ComBadrKeyValueComp
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
            />*/}
              <ComBadrKeyValueComp
                libelle="Date de création"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={getValueByPath(
                      'data.dateCreation',
                      decisionCautionVO,
                    )}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Validité"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={this.getCodeValiditeStatus(
                      getValueByPath('data.validite', decisionCautionVO),
                    )}
                  />
                }
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
                      getValueByPath(
                        'data.statutUtilisation',
                        decisionCautionVO,
                      ) === 'true'
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
                    value={getValueByPath(
                      'data.dateEcheance',
                      decisionCautionVO,
                    )}
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
                    value={
                      getValueByPath(
                        'data.statutEcheance',
                        decisionCautionVO,
                      ) === 'true'
                        ? 'échue'
                        : 'Non échue'
                    }
                  />
                }
              />
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Date d'écheance"
                libelleSize={1}
                value={getValueByPath('data.statut', decisionCautionVO)}
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
          <ComBadrKeyValueComp
            libelle="Numéro Consignation"
            libelleSize={3}
            value={getValueByPath('numeroConsigantion', this.state.cautionVo)}
          />
          {/*<ComBadrKeyValueComp
            libelle="Date de création"
            libelleSize={3}
            value=""
          />*/}
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Date d'ordonnoncement"
            libelleSize={3}
            value={getValueByPath(
              'dateHeureOrdonnancementConsigantion',
              this.state.cautionVo,
            )}
          />
          <ComBadrKeyValueComp
            libelle="Montant (En Dhs)"
            libelleSize={3}
            value={getValueByPath('montantConsigantion', this.state.cautionVo)}
          />
        </DedRedressementRow>
      </View>
    );
  };

  buildBanqueBlock = (hideValidite) => {
    let banqueLibelle = (this.extractCommandData('getCmbBanque', 'referentielReducer').data) ? this.extractCommandData('getCmbBanque', 'referentielReducer').data[0].libelle:"" ;
    return (
      <View style={styles.container}>
        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Banque"
            libelleSize={1}
            children={
              
              <ComBadrAutoCompleteChipsComp
                disabled={true}
                onRef={(ref) => (this.refBanque = ref)}
                maxItems={3}
                command="getCmbBanque"
                paramName="libelleBanque"
                libelle="libelle"
                selected={banqueLibelle}
                onDemand={true}
                searchZoneFirst={false}
                onValueChange={(item) => this.handleBanqueChanged(item)}
              />
            }
          />
          {console.log('yassine test', banqueLibelle)}
          <ComBadrKeyValueComp
            libelle="Agence"
            libelleSize={1}
            children={
              /*<ComBadrReferentielPickerComp
                disabled={true}
                onRef={(ref) => (this.refAgence = ref)}
                command="getCmbAgenceBancaireParBanque"
                params={{codeBanque: this.state.selectedBanque.code}}
                libelle="libelle"
                code="code"
                onValueChanged={(item) => {
                  this.handleAgenceChanged(item);
                }}
                selected={
                  getValueByPath('agenceLibelle', this.state.cautionVo) +
                  '(' +
                  getValueByPath('agence', this.state.cautionVo) +
                  ')'
                }
              />*/
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={
                  getValueByPath('agenceLibelle', this.state.cautionVo) +
                  '(' +
                  getValueByPath('agence', this.state.cautionVo) +
                  ')'
                }
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
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={getValueByPath(
                      'refCautionBanque',
                      this.state.cautionVo,
                    )}
                  />
                }
              />
            }
          />
          <ComBadrKeyValueComp
            libelle="Date d'attribution"
            libelleSize={3}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath(
                  'dateAttributionBanque',
                  this.state.cautionVo,
                )}
              />
            }
          />
        </DedRedressementRow>

        <DedRedressementRow>
          <ComBadrKeyValueComp
            libelle="Montant (En Dhs)"
            libelleSize={3}
            children={
              <TextInput
                type="flat"
                label=""
                disabled={true}
                value={getValueByPath('montantBanque', this.state.cautionVo)}
              />
            }
          />
          <ComBadrKeyValueComp />
        </DedRedressementRow>

        {!hideValidite && (
          <DedRedressementRow zebra={true}>
            <ComBadrKeyValueComp
              libelleSize={4}
              libelle="Validité électronique de la caution"
              value={getValueByPath('validiteCb', this.state.cautionVo)}
            />
            <ComBadrKeyValueComp
              libelleSize={4}
              libelle="Référence bancaire attribué"
              value={getValueByPath(
                'referenceCBAttribuee',
                this.state.cautionVo,
              )}
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
    console.log('---------  getNumeroCentreRC :');

    let dedDumSectionEnteteVO = getValueByPath(
      'dedDumSectionEnteteVO',
      this.props.data,
    );
    console.log('---------  getNumeroCentreRC :', dedDumSectionEnteteVO);
    let numeroCRC = dedDumSectionEnteteVO.regimeExport
      ? dedDumSectionEnteteVO.codeCentreRCExpediteur
      : dedDumSectionEnteteVO.codeCentreRCDestinataire;
    return numeroCRC;
  };

  getCentreRC = () => {
    console.log('---------  getCentreRC :');
    let dedDumSectionEnteteVO = getValueByPath(
      'dedDumSectionEnteteVO',
      this.props.data,
    );
    console.log('---------  getNumeroCentreRC :', dedDumSectionEnteteVO);
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
