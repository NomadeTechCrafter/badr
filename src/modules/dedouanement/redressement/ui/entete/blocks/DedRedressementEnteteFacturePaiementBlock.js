import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
  ComBasicDataTableComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput, Subheading, Checkbox} from 'react-native-paper';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';
import {primaryColor} from '../../../../../../commons/styles/ComThemeStyle';
import {getValueByPath} from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';
import ComBadrPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrPickerComp';
import translate from '../../../../../../commons/i18n/ComI18nHelper';

class DedRedressementEnteteFacturePaiementBlock extends React.Component {
  constructor(props) {
    super(props);
    this.cols = [
      {
        code: 'numeroOrdre',
        libelle: translate('dedouanement.info.numeroOrdre'),
        width: 150,
      },
      {
        code: 'numero',
        libelle: translate('dedouanement.info.numeroFacture'),
        width: 250,
      },
      {
        code: 'fournisseur',
        libelle: translate('dedouanement.info.fournisseurClients'),
        width: 300,
      },
      {
        code: 'stringDateFacture',
        libelle: translate('dedouanement.info.dateFacture'),
        width: 150,
      },
      {
        code: 'devise',
        libelle: translate('dedouanement.info.devise'),
        width: 200,
      },
      {
        code: 'valeurDevise',
        libelle: translate('dedouanement.info.valeurDevise'),
        width: 200,
      }
    ];
  }

  componentDidMount() {}

  handleDeviseChipsChanged = (devise) => {};

  handleModePaiementChanged = (mode) => {};

  render() {
    const factures = this.props?.data?.dedDumSectionEnteteVO?.listDeclarationFactureVO ? this.props?.data?.dedDumSectionEnteteVO?.listDeclarationFactureVO : [];
    return (
      <View style={styles.container}>
        <ComAccordionComp title="Facture" expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <ComBasicDataTableComp
                ref="_badrTable"
                id="scannerTable"
                rows={factures}
                cols={this.cols}
                totalElements={factures.length}
                maxResultsPerPage={10}
                paginate={true}
                showProgress={this.props.showProgress}
                withId={false}
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Conditions de livraison"
                children={
                  <ComBadrReferentielPickerComp
                    disabled={true}
                    selected={{
                      code: getValueByPath(
                        'dedDumSectionEnteteVO.conditionLivraison',
                        this.props.data,
                      ),
                    }}
                    onRef={(ref) => (this.combo2 = ref)}
                    command="getCmbIncoterm"
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Montant total"
                children={
                  <TextInput
                    type="flat"
                    disabled={true}
                    label=""
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.montantTotal',
                      this.props.data,
                    )}
                  />
                }
              />
              <ComBadrKeyValueComp />
            </DedRedressementRow>
            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Devise"
                children={
                  <ComBadrAutoCompleteChipsComp
                    onRef={(ref) => (this.refDevise = ref)}
                    code="code"
                    disabled={true}
                    selected={getValueByPath(
                      'dedDumSectionEnteteVO.deviseLibelle',
                      this.props.data,
                    )}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbDevise"
                    paramName="libelleDevise"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleDeviseChipsChanged}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Taux de change"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.tauxChange',
                  this.props.data,
                )}
              />
            </DedRedressementRow>
          </View>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Totaux</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Montant fret"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.montantFret',
                      this.props.data,
                    )}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Poids net total"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.poidsNetTotal',
                  this.props.data,
                )}
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Montant assurance"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    disabled={true}
                    label=""
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.montantAssurance',
                      this.props.data,
                    )}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Poids brut total"
                children={
                  <TextInput
                    disabled={true}
                    type="flat"
                    label=""
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.poidsBrutTotal',
                      this.props.data,
                    )}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Aconage et autres frais"
                libelleSize={3}
                children={
                  <TextInput
                    type="flat"
                    label=""
                    disabled={true}
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.montantAutresFrais',
                      this.props.data,
                    )}
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={2}
                libelle="Valeur Totale declarée"
                value={getValueByPath(
                  'dedDumSectionEnteteVO.valeurTotaleDeclaree',
                  this.props.data,
                )}
              />
            </DedRedressementRow>
          </View>

          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <Text style={styles.headingText}>Paiement</Text>
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Mode"
                children={
                  <ComBadrReferentielPickerComp
                    disabled={true}
                    selected={{
                      code: getValueByPath(
                        'dedDumSectionEnteteVO.modePaiement',
                        this.props.data,
                      ),
                    }}
                    onRef={(ref) => (this.comboModePaiement = ref)}
                    command="getCmbModePaiement"
                    onValueChanged={this.handleModePaiementChanged}
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
              <ComBadrKeyValueComp
                libelleSize={3}
                libelle="Crédit d'enlevement"
                children={
                  <ComBadrReferentielPickerComp
                    disabled={true}
                    selected={{
                      code: getValueByPath(
                        'dedDumSectionEnteteVO.numero',
                        this.props.data,
                      ),
                    }}
                    onRef={(ref) => (this.comboCreditEnlevements = ref)}
                    command="ded.loadCreditEnlevement"
                    module="DED_LIB"
                    onValueChanged={this.handleModePaiementChanged}
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                    params={{
                      codeDeclarant: getValueByPath(
                        'dedDumSectionEnteteVO.codeDeclarant',
                        this.props.data,
                      ),
                      idOperateurEngage: getValueByPath(
                        'dedDumSectionEnteteVO.idOperateurEngage',
                        this.props.data,
                      ),
                      cde:
                        'null-' +
                        getValueByPath(
                          'dedDumSectionEnteteVO.modePaiement',
                          this.props.data,
                        ) +
                        '-null',
                    }}
                  />
                }
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteFacturePaiementBlock;
