import React from 'react';
import {View} from 'react-native';
import styles from '../../../style/DedRedressementStyle';
import {
  ComAccordionComp,
  ComBadrAutoCompleteChipsComp,
  ComBadrItemsPickerComp,
  ComBadrKeyValueComp,
} from '../../../../../../commons/component';
import DedRedressementRow from '../../common/DedRedressementRow';
import {TextInput} from 'react-native-paper';
import ComBadrLibelleComp from '../../../../../../commons/component/shared/text/ComBadrLibelleComp';

class DedRedressementEnteteLocalisationMarchandiseBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <ComAccordionComp
          title="Localisation de la marchandise"
          expanded={false}>
          <View style={styles.container}>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Pays de provenance"
                children={
                  <ComBadrAutoCompleteChipsComp
                    label={
                      <ComBadrLibelleComp>Choix du pays</ComBadrLibelleComp>
                    }
                    code="code"
                    libelle="libelle"
                    command="getCmbPays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleBureauChipsChanged}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Référence de la déclaration d'export"
                children={<TextInput type="flat" label="" value="" />}
              />
            </DedRedressementRow>
            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Pays d'origine"
                children={
                  <ComBadrAutoCompleteChipsComp
                    label={
                      <ComBadrLibelleComp>Choix du pays</ComBadrLibelleComp>
                    }
                    code="code"
                    libelle="libelle"
                    command="getCmbPays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleBureauChipsChanged}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow>
              <ComBadrKeyValueComp
                libelle="Pays de destination"
                children={
                  <ComBadrAutoCompleteChipsComp
                    label={
                      <ComBadrLibelleComp>Choix du pays</ComBadrLibelleComp>
                    }
                    code="code"
                    libelle="libelle"
                    command="getCmbPays"
                    onDemand={true}
                    searchZoneFirst={false}
                    onValueChange={this.handleBureauChipsChanged}
                  />
                }
              />
            </DedRedressementRow>

            <DedRedressementRow zebra={true}>
              <ComBadrKeyValueComp
                libelle="Lieu de stockage"
                children={<ComBadrItemsPickerComp items={[]} label="" />}
              />
              <ComBadrKeyValueComp
                libelle="Date de voyage"
                children={<TextInput type="flat" label="" value="" />}
              />
            </DedRedressementRow>
          </View>
        </ComAccordionComp>
      </View>
    );
  }
}

export default DedRedressementEnteteLocalisationMarchandiseBlock;
