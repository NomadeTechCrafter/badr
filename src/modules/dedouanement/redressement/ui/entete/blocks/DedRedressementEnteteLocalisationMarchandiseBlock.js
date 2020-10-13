import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';
import {getValueByPath} from '../../../utils/DedUtils';
import ComBadrReferentielPickerComp from '../../../../../../commons/component/shared/pickers/ComBadrReferentielPickerComp';

class DedRedressementEnteteLocalisationMarchandiseBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handlePaysProvChipsChanged = (pays) => {};

  handlePaysOrigineChipsChanged = (pays) => {};

  handlePaysDestinationTransChipsChanged = (pays) => {};

  handleLieuStockageChanged = (pays) => {};
  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title="Localisation de la marchandise"
          expanded={true}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Pays de provenance"
                children={
                  <ComBadrAutoCompleteChipsComp
                    disabled={true}
                    onRef={(ref) => (this.refPaysProv = ref)}
                    code="code"
                    selected={getValueByPath(
                      'dedDumSectionEnteteVO.paysProvenanceOuDestinationLibelle',
                      this.props.data,
                    )}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbPays"
                    paramName="libellePays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handlePaysProvChipsChanged}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Référence de la déclaration d'export"
                children={
                  <TextInput
                    disabled={true}
                    type="flat"
                    label=""
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.referenceDeclarationExport',
                      this.props.data,
                    )}
                  />
                }
              />
            </DedRedressementRow>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Pays d'origine"
                children={
                  <ComBadrAutoCompleteChipsComp
                    disabled={true}
                    onRef={(ref) => (this.refPaysOrigine = ref)}
                    code="code"
                    selected={getValueByPath(
                      'dedDumSectionEnteteVO.paysOrigineLibelle',
                      this.props.data,
                    )}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbPays"
                    paramName="libellePays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handlePaysOrigineChipsChanged}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Pays de destination"
                children={
                  <ComBadrAutoCompleteChipsComp
                    disabled={true}
                    onRef={(ref) => (this.refPaysDestinationTrans = ref)}
                    code="code"
                    selected={getValueByPath(
                      'dedDumSectionEnteteVO.paysDestinationTransbordementLibelle',
                      this.props.data,
                    )}
                    maxItems={3}
                    libelle="libelle"
                    command="getCmbPays"
                    paramName="libellePays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handlePaysDestinationTransChipsChanged}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Lieu de stockage"
                children={
                  <ComBadrReferentielPickerComp
                    key="lieuStockage"
                    disabled={true}
                    selected={{
                      code: getValueByPath(
                        'dedDumSectionEnteteVO.lieuStockageLocalisation',
                        this.props.data,
                      ),
                    }}
                    module="REF_LIB"
                    onRef={(ref) => (this.comboLieuStockage = ref)}
                    command="getCmbLieuStockageParBureau"
                    onValueChange={(selectedValue, selectedIndex, item) =>
                      this.handleLieuStockageChanged(
                        selectedValue,
                        selectedIndex,
                        item,
                      )
                    }
                    params={{
                      codeBureau: getValueByPath(
                        'dedDumSectionEnteteVO.refBureauDedouanement',
                        this.props.data,
                      ),
                    }}
                    typeService="SP"
                    code="code"
                    libelle="libelle"
                  />
                }
              />
              <ComBadrKeyValueComp
                libelle="Date de voyage"
                children={
                  <TextInput
                    type="flat"
                    disabled={true}
                    label=""
                    value={getValueByPath(
                      'dedDumSectionEnteteVO.dateVoyage',
                      this.props.data,
                    )}
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

export default DedRedressementEnteteLocalisationMarchandiseBlock;
